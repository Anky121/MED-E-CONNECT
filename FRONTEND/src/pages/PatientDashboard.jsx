import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, FileText, User, Video, Phone, MapPin, Star } from 'lucide-react'
import StatsCards from '../components/common/StatsCards'
import AppointmentCard from '../components/common/AppointmentCard'
import PrescriptionCard from '../components/common/PrescriptionCard'

const PatientDashboard = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API calls
  const mockAppointments = [
    {
      id: 1,
      doctor: 'Dr. Alexander Smith',
      specialty: 'Cardiology',
      date: '2024-03-20',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'video',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: 2,
      doctor: 'Dr. Virginia Soper',
      specialty: 'Neurology',
      date: '2024-03-15',
      time: '2:30 PM',
      status: 'completed',
      type: 'in-person',
      avatar: '/api/placeholder/50/50'
    },
    {
      id: 3,
      doctor: 'Dr. William Osler',
      specialty: 'Pediatrics',
      date: '2024-03-10',
      time: '11:15 AM',
      status: 'completed',
      type: 'video',
      avatar: '/api/placeholder/50/50'
    }
  ]

  const mockPrescriptions = [
    {
      id: 1,
      doctor: 'Dr. Alexander Smith',
      date: '2024-03-15',
      medications: ['Aspirin 75mg', 'Lisinopril 10mg'],
      downloadUrl: '#'
    },
    {
      id: 2,
      doctor: 'Dr. Virginia Soper',
      date: '2024-03-10',
      medications: ['Gabapentin 300mg', 'Vitamin B12'],
      downloadUrl: '#'
    }
  ]

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setAppointments(mockAppointments)
      setPrescriptions(mockPrescriptions)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming')
  const recentAppointments = appointments.filter(apt => apt.status === 'completed').slice(0, 3)

  const statsData = [
    {
      title: 'Total Appointments',
      value: appointments.length,
      icon: Calendar,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Upcoming',
      value: upcomingAppointments.length,
      icon: Clock,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Prescriptions',
      value: prescriptions.length,
      icon: FileText,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Health Score',
      value: 'Good',
      icon: Star,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your health summary and upcoming appointments</p>
        </div>

        {/* Stats Cards */}
        <StatsCards data={statsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <Link to="/appointment" className="btn-primary">
                  Book New
                </Link>
              </div>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-600 mb-4">Book your next consultation with a doctor</p>
                  <Link to="/doctors" className="btn-primary">
                    Find Doctors
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity & Prescriptions */}
          <div className="space-y-6">
            {/* Recent Appointments */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
              {recentAppointments.length > 0 ? (
                <div className="space-y-3">
                  {recentAppointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={appointment.avatar}
                        alt={appointment.doctor}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{appointment.doctor}</p>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent appointments</p>
              )}
            </div>

            {/* Prescriptions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h3>
              {prescriptions.length > 0 ? (
                <div className="space-y-4">
                  {prescriptions.map(prescription => (
                    <PrescriptionCard key={prescription.id} prescription={prescription} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No prescriptions available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
