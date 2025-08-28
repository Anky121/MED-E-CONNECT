import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Video, VideoOff, Mic, MicOff, Phone, MessageCircle, 
  FileText, Share, Settings, Monitor, Users, Clock 
} from 'lucide-react'

const Consultation = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [appointment, setAppointment] = useState(null)
  const [callDuration, setCallDuration] = useState(0)
  const [loading, setLoading] = useState(true)

  // Mock appointment data
  const mockAppointment = {
    id: appointmentId,
    patient: user?.role === 'patient' ? user.name : 'John Smith',
    doctor: user?.role === 'doctor' ? user.name : 'Dr. Alexander Smith',
    specialty: 'Cardiology',
    date: '2024-03-20',
    time: '10:00 AM',
    reason: 'Regular checkup and heart palpitations',
    patientAge: 45,
    patientAvatar: '/api/placeholder/100/100',
    doctorAvatar: '/api/placeholder/100/100'
  }

  useEffect(() => {
    // Simulate loading appointment data
    setTimeout(() => {
      setAppointment(mockAppointment)
      setLoading(false)
    }, 1000)

    // Simulate call duration timer
    let interval
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCallActive, appointmentId])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleJoinCall = () => {
    setIsCallActive(true)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
    // Navigate to appointment summary or dashboard
    navigate('/patient-dashboard')
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: user?.name,
        senderRole: user?.role,
        message: message.trim(),
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, newMessage])
      setMessage('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading consultation...</p>
        </div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Consultation Not Found</h1>
          <button
            onClick={() => navigate('/patient-dashboard')}
            className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.role === 'patient' ? appointment.doctorAvatar : appointment.patientAvatar}
                  alt="Participant"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-white font-semibold">
                    {user?.role === 'patient' ? appointment.doctor : appointment.patient}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {user?.role === 'patient' ? appointment.specialty : `Age: ${appointment.patientAge}`}
                  </p>
                </div>
              </div>
              
              {isCallActive && (
                <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">{formatDuration(callDuration)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-2 rounded-lg transition-colors ${
                  showChat ? 'bg-primary-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
              </button>
              
              <button className="p-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className={`${showChat ? 'w-3/4' : 'w-full'} flex flex-col`}>
          {!isCallActive ? (
            // Pre-call screen
            <div className="flex-1 flex items-center justify-center bg-gray-800">
              <div className="text-center text-white p-8">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-16 w-16 text-gray-400" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4">Ready to start your consultation?</h3>
                <p className="text-gray-300 mb-2">
                  Appointment with {user?.role === 'patient' ? appointment.doctor : appointment.patient}
                </p>
                <p className="text-gray-400 text-sm mb-8">
                  Scheduled for {appointment.date} at {appointment.time}
                </p>
                
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-4 rounded-full ${
                      isVideoOn ? 'bg-gray-600' : 'bg-red-600'
                    }`}
                  >
                    {isVideoOn ? (
                      <Video className="h-6 w-6 text-white" />
                    ) : (
                      <VideoOff className="h-6 w-6 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={`p-4 rounded-full ${
                      isAudioOn ? 'bg-gray-600' : 'bg-red-600'
                    }`}
                  >
                    {isAudioOn ? (
                      <Mic className="h-6 w-6 text-white" />
                    ) : (
                      <MicOff className="h-6 w-6 text-white" />
                    )}
                  </button>
                </div>
                
                <button
                  onClick={handleJoinCall}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Join Call
                </button>
              </div>
            </div>
          ) : (
            // Active call screen
            <div className="flex-1 bg-black relative">
              {/* Main video (remote participant) */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-lg">
                    {user?.role === 'patient' ? appointment.doctor : appointment.patient}
                  </p>
                  <p className="text-gray-400">Video consultation in progress</p>
                </div>
              </div>
              
              {/* Picture-in-picture (local video) */}
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Video className="h-6 w-6" />
                  </div>
                  <p className="text-sm">You</p>
                </div>
              </div>
            </div>
          )}

          {/* Control Bar */}
          {isCallActive && (
            <div className="bg-gray-800 p-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoOn 
                      ? 'bg-gray-600 hover:bg-gray-500' 
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="h-6 w-6 text-white" />
                  ) : (
                    <VideoOff className="h-6 w-6 text-white" />
                  )}
                </button>
                
                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isAudioOn 
                      ? 'bg-gray-600 hover:bg-gray-500' 
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {isAudioOn ? (
                    <Mic className="h-6 w-6 text-white" />
                  ) : (
                    <MicOff className="h-6 w-6 text-white" />
                  )}
                </button>
                
                <button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors">
                  <Share className="h-6 w-6 text-white" />
                </button>
                
                <button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors">
                  <FileText className="h-6 w-6 text-white" />
                </button>
                
                <button
                  onClick={handleEndCall}
                  className="p-3 bg-red-600 hover:bg-red-500 rounded-full transition-colors"
                >
                  <Phone className="h-6 w-6 text-white transform rotate-[135deg]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-1/4 bg-white border-l border-gray-300 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${
                    msg.senderRole === user?.role ? 'justify-end' : 'justify-start'
                  }`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.senderRole === user?.role
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderRole === user?.role ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Appointment Info Panel (when not in call) */}
      {!isCallActive && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Today's Consultation</h4>
                <p className="text-sm text-gray-600">
                  Reason: {appointment.reason}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Scheduled: {appointment.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Consultation