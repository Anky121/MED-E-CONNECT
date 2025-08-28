// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
// import { Calendar, Clock, FileText, User, Video, Phone, MapPin, Star } from 'lucide-react'

// const PatientDashboard = () => {
//   const { user } = useAuth()
//   const [appointments, setAppointments] = useState([])
//   const [prescriptions, setPrescriptions] = useState([])
//   const [loading, setLoading] = useState(true)

//   // Mock data - replace with API calls
//   const mockAppointments = [
//     {
//       id: 1,
//       doctor: 'Dr. Alexander Smith',
//       specialty: 'Cardiology',
//       date: '2024-03-20',
//       time: '10:00 AM',
//       status: 'upcoming',
//       type: 'video',
//       avatar: '/api/placeholder/50/50'
//     },
//     {
//       id: 2,
//       doctor: 'Dr. Virginia Soper',
//       specialty: 'Neurology',
//       date: '2024-03-15',
//       time: '2:30 PM',
//       status: 'completed',
//       type: 'in-person',
//       avatar: '/api/placeholder/50/50'
//     },
//     {
//       id: 3,
//       doctor: 'Dr. William Osler',
//       specialty: 'Pediatrics',
//       date: '2024-03-10',
//       time: '11:15 AM',
//       status: 'completed',
//       type: 'video',
//       avatar: '/api/placeholder/50/50'
//     }
//   ]

//   const mockPrescriptions = [
//     {
//       id: 1,
//       doctor: 'Dr. Alexander Smith',
//       date: '2024-03-15',
//       medications: ['Aspirin 75mg', 'Lisinopril 10mg'],
//       downloadUrl: '#'
//     },
//     {
//       id: 2,
//       doctor: 'Dr. Virginia Soper',
//       date: '2024-03-10',
//       medications: ['Gabapentin 300mg', 'Vitamin B12'],
//       downloadUrl: '#'
//     }
//   ]

//   useEffect(() => {
//     // Simulate API calls
//     setTimeout(() => {
//       setAppointments(mockAppointments)
//       setPrescriptions(mockPrescriptions)
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const getStatusBadge = (status) => {
//     const baseClasses = 'px-2 py-1 text-xs rounded-full font-medium'
//     switch (status) {
//       case 'upcoming':
//         return `${baseClasses} bg-blue-100 text-blue-800`
//       case 'completed':
//         return `${baseClasses} bg-green-100 text-green-800`
//       case 'cancelled':
//         return `${baseClasses} bg-red-100 text-red-800`
//       default:
//         return `${baseClasses} bg-gray-100 text-gray-800`
//     }
//   }

//   const getTypeIcon = (type) => {
//     return type === 'video' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />
//   }

//   if (loading) {
//     return (
//       <div className="container-custom py-8">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming')
//   const recentAppointments = appointments.filter(apt => apt.status === 'completed').slice(0, 3)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container-custom py-8">
//         {/* Welcome Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome back, {user?.name}!
//           </h1>
//           <p className="text-gray-600">Here's your health summary and upcoming appointments</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Appointments</p>
//                 <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Calendar className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Upcoming</p>
//                 <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Clock className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Prescriptions</p>
//                 <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <FileText className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>

//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Health Score</p>
//                 <p className="text-2xl font-bold text-gray-900">Good</p>
//               </div>
//               <div className="bg-yellow-100 p-3 rounded-full">
//                 <Star className="h-6 w-6 text-yellow-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Upcoming Appointments */}
//           <div className="lg:col-span-2">
//             <div className="card">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
//                 <Link to="/appointment" className="btn-primary">
//                   Book New
//                 </Link>
//               </div>

//               {upcomingAppointments.length > 0 ? (
//                 <div className="space-y-4">
//                   {upcomingAppointments.map(appointment => (
//                     <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           <img
//                             src={appointment.avatar}
//                             alt={appointment.doctor}
//                             className="w-12 h-12 rounded-full object-cover"
//                           />
//                           <div>
//                             <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
//                             <p className="text-sm text-gray-600">{appointment.specialty}</p>
//                             <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
//                               <div className="flex items-center space-x-1">
//                                 <Calendar className="h-4 w-4" />
//                                 <span>{new Date(appointment.date).toLocaleDateString()}</span>
//                               </div>
//                               <div className="flex items-center space-x-1">
//                                 <Clock className="h-4 w-4" />
//                                 <span>{appointment.time}</span>
//                               </div>
//                               <div className="flex items-center space-x-1">
//                                 {getTypeIcon(appointment.type)}
//                                 <span className="capitalize">{appointment.type}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <span className={getStatusBadge(appointment.status)}>
//                             {appointment.status}
//                           </span>
//                           {appointment.type === 'video' && (
//                             <Link
//                               to={`/consultation/${appointment.id}`}
//                               className="btn-primary text-sm px-3 py-1"
//                             >
//                               Join Call
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
//                   <p className="text-gray-600 mb-4">Book your next consultation with a doctor</p>
//                   <Link to="/doctors" className="btn-primary">
//                     Find Doctors
//                   </Link>
//                 </div>
              