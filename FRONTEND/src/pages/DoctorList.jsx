import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, MapPin, Clock, Calendar } from 'lucide-react'

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data - replace with API call
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Alexander Smith',
      specialty: 'Cardiology',
      image: '/api/placeholder/150/150',
      rating: 4.7,
      reviews: 120,
      location: 'New York, NY',
      experience: 15,
      fee: 150,
      nextAvailable: '2024-03-20',
      about: 'Specialist in heart diseases with over 15 years of experience',
      qualifications: ['MBBS', 'MD Cardiology', 'FACC']
    },
    {
      id: 2,
      name: 'Dr. Virginia Soper',
      specialty: 'Neurology',
      image: '/api/placeholder/150/150',
      rating: 4.8,
      reviews: 95,
      location: 'Los Angeles, CA',
      experience: 12,
      fee: 180,
      nextAvailable: '2024-03-21',
      about: 'Expert in neurological disorders and brain health',
      qualifications: ['MBBS', 'MD Neurology', 'DNB']
    },
    {
      id: 3,
      name: 'Dr. William Osler',
      specialty: 'Pediatrics',
      image: '/api/placeholder/150/150',
      rating: 4.9,
      reviews: 150,
      location: 'Chicago, IL',
      experience: 20,
      fee: 120,
      nextAvailable: '2024-03-19',
      about: 'Pediatrician with extensive experience in child healthcare',
      qualifications: ['MBBS', 'MD Pediatrics', 'IAP']
    },
    {
      id: 4,
      name: 'Dr. Harvey Cushing',
      specialty: 'Surgery',
      image: '/api/placeholder/150/150',
      rating: 4.6,
      reviews: 80,
      location: 'Boston, MA',
      experience: 18,
      fee: 250,
      nextAvailable: '2024-03-22',
      about: 'Experienced surgeon specializing in complex procedures',
      qualifications: ['MBBS', 'MS Surgery', 'FACS']
    },
    {
      id: 5,
      name: 'Dr. Charles Drew',
      specialty: 'Orthopedics',
      image: '/api/placeholder/150/150',
      rating: 4.5,
      reviews: 110,
      location: 'Miami, FL',
      experience: 14,
      fee: 200,
      nextAvailable: '2024-03-23',
      about: 'Orthopedic specialist for bone and joint disorders',
      qualifications: ['MBBS', 'MS Orthopedics', 'FAAOS']
    },
    {
      id: 6,
      name: 'Dr. Jonas Salk',
      specialty: 'Internal Medicine',
      image: '/api/placeholder/150/150',
      rating: 4.7,
      reviews: 90,
      location: 'Seattle, WA',
      experience: 16,
      fee: 160,
      nextAvailable: '2024-03-20',
      about: 'Internal medicine physician with focus on preventive care',
      qualifications: ['MBBS', 'MD Internal Medicine', 'ACP']
    }
  ]

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Surgery', 'Orthopedics', 'Internal Medicine']
  const locations = ['All', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'Miami, FL', 'Seattle, WA']

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDoctors(mockDoctors)
      setFilteredDoctors(mockDoctors)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedSpecialty && selectedSpecialty !== 'All') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty)
    }

    if (selectedLocation && selectedLocation !== 'All') {
      filtered = filtered.filter(doctor => doctor.location === selectedLocation)
    }

    setFilteredDoctors(filtered)
  }, [searchTerm, selectedSpecialty, selectedLocation, doctors])

  const DoctorCard = ({ doctor }) => (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-primary-600 font-medium">{doctor.specialty}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{doctor.experience} years exp.</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{doctor.rating}</span>
                <span className="text-sm text-gray-500">({doctor.reviews})</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">${doctor.fee}</p>
              <p className="text-sm text-gray-500">per consultation</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">{doctor.about}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {doctor.qualifications.map((qual, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {qual}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Next available: {new Date(doctor.nextAvailable).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <Link
                  to={`/doctor/${doctor.id}`}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  View Profile
                </Link>
                <Link
                  to={`/appointment?doctorId=${doctor.id}`}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find the Right Doctor</h1>
          <p className="text-gray-600">Browse through our network of qualified healthcare professionals</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="card sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Doctor
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or specialty"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Specialty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="input-field"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input-field"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSpecialty('')
                  setSelectedLocation('')
                }}
                className="w-full btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Doctor List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
              </p>
              
              <select className="input-field w-auto">
                <option>Sort by Rating</option>
                <option>Sort by Experience</option>
                <option>Sort by Fee (Low to High)</option>
                <option>Sort by Fee (High to Low)</option>
              </select>
            </div>

            <div className="space-y-6">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorList