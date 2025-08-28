import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle, X } from 'lucide-react'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({})
  const [pendingDoctors, setPendingDoctors] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API calls
  const mockStats = {
    totalUsers: 1250,
    totalDoctors: 85,
    totalPatients: 1165,
    totalAppointments: 3420,
    monthlyRevenue: 45600,
    pendingVerifications: 12
  }

  const mockPendingDoctors = [
    {
      id: 1,
      name: 'Dr. James Wilson',
      email: 'james.wilson@email.com',
      specialty: 'Cardiology',
      experience: 8,
      qualification: 'MD Cardiology',
      license: 'CRD12345',
      submittedDate: '2024-03-18',
      documents: ['License', 'Degree', 'Experience Certificate']
    },
    {
      id: 2,
      name: 'Dr. Lisa Chen',
      email: 'lisa.chen@email.com',
      specialty: 'Dermatology',
      experience: 6,
      qualification: 'MD Dermatology',
      license: 'DRM67890',
      submittedDate: '2024-03-17',
      documents: ['License', 'Degree']
    },
    {
      id: 3,
      name: 'Dr. Robert Kumar',
      email: 'robert.kumar@email.com',
      specialty: 'Orthopedics',
      experience: 12,
      qualification: 'MS Orthopedics',
      license: 'ORT11111',
      submittedDate: '2024-03-16',
      documents: ['License', 'Degree', 'Experience Certificate', 'Specialization']
    }
  ]

  const mockActivity = [
    {
      id: 1,
      type: 'doctor_approved',
      message: 'Dr. Sarah Johnson approved and activated',
      timestamp: '2024-03-19T10:30:00Z'
    },
    {
      id: 2,
      type: 'user_registered',
      message: 'New patient registered: John Doe',
      timestamp: '2024-03-19T09:15:00Z'
    },
    {
      id: 3,
      type: 'appointment_cancelled',
      message: 'Appointment cancelled by patient ID: 1234',
      timestamp: '2024-03-19T08:45:00Z'
    },
    {
      id: 4,
      type: 'doctor_rejected',
      message: 'Dr. Mark Thompson application rejected',
      timestamp: '2024-03-18T16:20:00Z'
    }
  ]

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats(mockStats)
      setPendingDoctors(mockPendingDoctors)
      setRecentActivity(mockActivity)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDoctorAction = (doctorId, action) => {
    setPendingDoctors(prev => prev.filter(doctor => doctor.id !== doctorId))
    // Add to recent activity
    const doctor = pendingDoctors.find(d => d.id === doctorId)
    const newActivity = {
      id: Date.now(),
      type: action === 'approve' ? 'doctor_approved' : 'doctor_rejected',
      message: `Dr. ${doctor.name} ${action === 'approve' ? 'approved and activated' : 'application rejected'}`,
      timestamp: new Date().toISOString()
    }
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)])
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'doctor_approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'doctor_rejected':
        return <X className="h-4 w-4 text-red-600" />
      case 'user_registered':
        return <Users className="h-4 w-4 text-blue-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage and monitor the Med-e-Connect platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers?.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients?.toLocaleString()}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments?.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue?.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Doctor Verifications */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pending Doctor Verifications</h2>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  {pendingDoctors.length} pending
                </span>
              </div>

              {pendingDoctors.length > 0 ? (
                <div className="space-y-6">
                  {pendingDoctors.map(doctor => (
                    <div key={doctor.id} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-gray-600">{doctor.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span>Specialty: {doctor.specialty}</span>
                            <span>Experience: {doctor.experience} years</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          Applied: {new Date(doctor.submittedDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Qualifications:</h4>
                        <p className="text-sm text-gray-600 mb-2">{doctor.qualification}</p>
                        <p className="text-sm text-gray-600">License: {doctor.license}</p>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Submitted Documents:</h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.documents.map((doc, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleDoctorAction(doctor.id, 'approve')}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleDoctorAction(doctor.id, 'reject')}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-gray-600">No pending doctor verifications</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-900">Manage Users</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-900">Doctor Applications</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-900">Appointment Reports</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-gray-900">Revenue Analytics</span>
                </button>
              </div>
            </div>

            {/* System Health */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Server Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment Gateway</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Video Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">Limited</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.slice(0, 5).map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
          