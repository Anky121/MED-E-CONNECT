import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, Users, DollarSign, Video, FileText, Star, TrendingUp } from 'lucide-react'

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [earnings, setEarnings] = useState(0)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API calls
  const mockAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'video',
      reason: 'Regular checkup',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      date: '2024-03-20',
      time: '11:30 AM',
      status: 'upcoming',
      type: 'in-person',
      reason: 'Follow-up consultation',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: 3,
      patient: 'Mike Davis',
      date: '2024-03-19',
      time: '2:30 PM',
      status: 'completed',
      type: 'video',
      reason: 'Heart palpitations',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: 4,
      patient: 'Emily Wilson',
      date: '2024-03-19',
      time: '4:00 PM',
      status: 'completed',
      type: 'in-person',
      reason: 'Chest pain evaluation',
      avatar: '/api/placeholder/50/50'
    }
  ]

  const mockStats = {
    totalPatients: 247,
    monthlyEarnings: 12450,
    completedAppointments: 156,
    rating: 4.8
  }

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setAppointments(mockAppointments)
      setEarnings(mockStats.monthlyEarnings)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const baseClasses = 'px-2 py-1 text-xs rounded-full font-medium'
    switch (status) {
      case 'upcoming':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getTypeIcon = (type) => {
    return type === 'video' ? <Video className="h-4 w-4" /> : <Calendar className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.date).toDateString() === new Date().toDateString()
  )
  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your practice overview for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalPatients}</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                <p className="text-sm text-gray-500 mt-1">{upcomingAppointments.length} upcoming</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${mockStats.monthlyEarnings.toLocaleString()}</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.rating}</p>
                <p className="text-sm text-gray-500 mt-1">Based on 156 reviews</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
                <Link to="/doctor/schedule" className="btn-primary">
                  Manage Schedule
                </Link>
              </div>

              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map(appointment => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={appointment.avatar}
                            alt={appointment.patient}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                            <p className="text-sm text-gray-600">{appointment.reason}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {getTypeIcon(appointment.type)}
                                <span className="capitalize">{appointment.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={getStatusBadge(appointment.status)}>
                            {appointment.status}
                          </span>
                          {appointment.status === 'upcoming' && (
                            <div className="flex space-x-2">
                              {appointment.type === 'video' && (
                                <Link
                                  to={`/consultation/${appointment.id}`}
                                  className="btn-primary text-sm px-3 py-1"
                                >
                                  Join Call
                                </Link>
                              )}
                              <button className="btn-secondary text-sm px-3 py-1">
                                View Details
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments today</h3>
                  <p className="text-gray-600">Your schedule is clear for today</p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="card mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Prescription sent to John Smith</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Video className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Video consultation completed with Sarah Johnson</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Received 5-star review from Mike Davis</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/doctor/schedule"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-900">Manage Schedule</span>
                </Link>
                
                <Link
                  to="/doctor/patients"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-900">View Patients</span>
                </Link>
                
                <Link
                  to="/doctor/prescriptions"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-900">Prescriptions</span>
                </Link>
                
                <Link
                  to="/doctor/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-gray-900">Edit Profile</span>
                </Link>
              </div>
            </div>

            {/* Availability Status */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Status</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Currently:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Available
                </span>
              </div>
              <button className="w-full btn-secondary mb-3">
                Update Availability
              </button>
              <p className="text-sm text-gray-600">
                Next available slot: Today at 3:00 PM
              </p>
            </div>

            {/* Performance Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultations:</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Patients:</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-medium"> 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard