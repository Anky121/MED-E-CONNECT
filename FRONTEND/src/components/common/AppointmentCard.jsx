import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Video, MapPin } from 'lucide-react'

const AppointmentCard = ({ appointment }) => {
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
    return type === 'video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={appointment.avatar}
            alt={appointment.doctor}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
            <p className="text-sm text-gray-600">{appointment.specialty}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
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
          {appointment.type === 'video' && appointment.status === 'upcoming' && (
            <Link
              to={`/consultation/${appointment.id}`}
              className="btn-primary text-sm px-3 py-1"
            >
              Join Call
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
