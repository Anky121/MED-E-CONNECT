import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, Video, MapPin, User, CreditCard, CheckCircle } from 'lucide-react'

const Appointment = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentType, setAppointmentType] = useState('video')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  // Mock doctor data - replace with API call
  const mockDoctor = {
    id: 1,
    name: 'Dr. Alexander Smith',
    specialty: 'Cardiology',
    image: '/api/placeholder/150/150',
    rating: 4.7,
    reviews: 120,
    fee: 150,
    about: 'Specialist in heart diseases with over 15 years of experience',
    qualifications: ['MBBS', 'MD Cardiology', 'FACC'],
    availability: {
      '2024-03-20': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2024-03-21': ['09:00', '10:00', '11:30', '14:00', '15:30'],
      '2024-03-22': ['09:30', '10:30', '11:00', '13:00', '14:30', '16:00'],
      '2024-03-23': ['09:00', '10:00', '11:00', '15:00', '16:00'],
      '2024-03-25': ['09:00', '10:30', '11:30', '14:00', '15:00', '16:30']
    }
  }

  useEffect(() => {
    const doctorId = searchParams.get('doctorId')
    if (doctorId) {
      // Simulate API call to fetch doctor details
      setSelectedDoctor(mockDoctor)
    }
  }, [searchParams])

  const getNext7Days = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    return days
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (time) => {
    const [hour, minute] = time.split(':')
    const date = new Date()
    date.setHours(parseInt(hour), parseInt(minute))
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !reason.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setStep(4) // Success step
    }, 2000)
  }

  const resetBooking = () => {
    setSelectedDate('')
    setSelectedTime('')
    setReason('')
    setStep(1)
  }

  if (!selectedDoctor) {
    return (
      <div className="container-custom py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <p className="text-gray-600 mb-8">Please select a doctor to book an appointment</p>
          <button
            onClick={() => navigate('/doctors')}
            className="btn-primary"
          >
            Browse Doctors
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {step === 1 && 'Select Date & Time'}
                {step === 2 && 'Appointment Details'}
                {step === 3 && 'Payment & Confirmation'}
                {step === 4 && 'Booking Confirmed'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info Sidebar */}
          <div className="lg:order-2">
            <div className="card sticky top-24">
              <div className="text-center mb-4">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">{selectedDoctor.name}</h3>
                <p className="text-primary-600 font-medium">{selectedDoctor.specialty}</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({selectedDoctor.reviews} reviews)</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="text-2xl font-bold text-gray-900">${selectedDoctor.fee}</span>
                </div>

                {selectedDate && selectedTime && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Appointment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>{formatTime(selectedTime)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointmentType === 'video' ? (
                          <Video className="h-4 w-4 text-blue-600" />
                        ) : (
                          <MapPin className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="capitalize">{appointmentType} Consultation</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <p className="mb-2">{selectedDoctor.about}</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedDoctor.qualifications.map((qual, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {qual}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 lg:order-1">
            {step === 1 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                
                {/* Appointment Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Consultation Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                      appointmentType === 'video' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="type"
                        value="video"
                        checked={appointmentType === 'video'}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        className="sr-only"
                      />
                      <Video className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium">Video Call</p>
                        <p className="text-sm text-gray-600">Online consultation</p>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                      appointmentType === 'in-person' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="type"
                        value="in-person"
                        checked={appointmentType === 'in-person'}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        className="sr-only"
                      />
                      <MapPin className="h-5 w-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium">In-Person</p>
                        <p className="text-sm text-gray-600">Visit clinic</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Select Date</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {getNext7Days().map((date) => {
                      const dateStr = formatDate(date)
                      const hasSlots = selectedDoctor.availability[dateStr]?.length > 0
                      
                      return (
                        <button
                          key={dateStr}
                          onClick={() => hasSlots && setSelectedDate(dateStr)}
                          disabled={!hasSlots}
                          className={`p-3 text-center rounded-lg border transition-colors ${
                            selectedDate === dateStr
                              ? 'border-primary-600 bg-primary-600 text-white'
                              : hasSlots
                              ? 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {formatDisplayDate(date)}
                          </div>
                          <div className="text-xs mt-1">
                            {hasSlots ? `${selectedDoctor.availability[dateStr]?.length} slots` : 'No slots'}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && selectedDoctor.availability[selectedDate] && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Select Time</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {selectedDoctor.availability[selectedDate].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 text-center rounded-lg border transition-colors ${
                            selectedTime === time
                              ? 'border-primary-600 bg-primary-600 text-white'
                              : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit *
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                      className="input-field"
                      placeholder="Please describe your symptoms or reason for consultation..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="input-field"
                      placeholder="Any additional information you'd like the doctor to know..."
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!reason.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment & Confirmation</h2>
                
                {/* Payment Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-medium">${selectedDoctor.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-medium">$5</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900">${selectedDoctor.fee + 5}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3 flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-gray-600">Pay securely with your card</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Card Details</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the Terms of Service and Privacy Policy. I understand the 
                      cancellation policy and payment terms.
                    </span>
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={loading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : `Pay ${selectedDoctor.fee + 5} & Book`}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Your appointment has been successfully booked. You'll receive a confirmation 
                  email with all the details shortly.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg mb-6 text-left">
                  <h3 className="font-medium text-blue-900 mb-4">Appointment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{selectedDoctor.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formatTime(selectedTime)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{appointmentType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-medium">APT-{Date.now().toString().slice(-6)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4">
                    <p className="mb-2">
                      <strong>What's Next?</strong>
                    </p>
                    <ul className="text-left space-y-1">
                      <li>• You'll receive a confirmation email with appointment details</li>
                      <li>• {appointmentType === 'video' 
                        ? 'Join the video call 5 minutes before your appointment time' 
                        : 'Arrive at the clinic 15 minutes before your appointment'}
                      </li>
                      <li>• Prepare any medical records or questions you'd like to discuss</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate('/patient-dashboard')}
                      className="btn-primary"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={resetBooking}
                      className="btn-secondary"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment