import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Video, FileText, Star, Users, CheckCircle, ArrowRight } from 'lucide-react'

const Home = () => {
  const stats = [
    { number: '20K+', label: 'Happy Patients', icon: Users },
    { number: '99%', label: 'Patient Satisfaction', icon: Star },
    { number: '3K+', label: 'Certified Doctors', icon: CheckCircle }
  ]

  const features = [
    {
      icon: Search,
      title: 'Find hospitals near you',
      description: 'Easily find and book appointments with top doctors near you'
    },
    {
      icon: Calendar,
      title: 'Book an appointment',
      description: 'Schedule your consultation at your convenience'
    },
    {
      icon: Video,
      title: 'Start appointment with top doctors',
      description: 'Begin your journey to better health'
    }
  ]

  const specialists = [
    {
      name: 'Dr. Alexander',
      specialty: 'Cardiologist',
      image: '/api/placeholder/200/200',
      rating: 4.7,
      reviews: 120
    },
    {
      name: 'Dr. Virginia Soper',
      specialty: 'Neurologist',
      image: '/api/placeholder/200/200',
      rating: 4.8,
      reviews: 95
    },
    {
      name: 'Dr. William Osler',
      specialty: 'Pediatrician',
      image: '/api/placeholder/200/200',
      rating: 4.9,
      reviews: 150
    },
    {
      name: 'Dr. Harvey Cushing',
      specialty: 'Surgeon',
      image: '/api/placeholder/200/200',
      rating: 4.6,
      reviews: 80
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Feeling Better Starts Here. 
                <span className="text-primary-600"> Find and Book Your Doctor.</span>
              </h1>
              <p className="text-xl text-gray-600">
                Easily find and book appointments with top doctors near you. 
                Your path to better health begins with a simple click.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Book Consultation
                </Link>
                <Link to="/doctors" className="btn-secondary text-lg px-8 py-4">
                  Learn More
                </Link>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free consultations available</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <img 
                  src="/api/placeholder/500/400" 
                  alt="Doctor consultation" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary-100 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More than a clinic, it's a caring place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare services with a focus on personalized care 
              and the latest medical technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-6">
                    <div className="bg-primary-600 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Doctor Search Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/api/placeholder/600/500" 
                alt="Find the right doctor" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Find the right doctor right at your fingertips
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Search className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Find hospitals near you</h3>
                    <p className="text-gray-600">Locate top-rated hospitals and clinics in your area</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Find doctors near you</h3>
                    <p className="text-gray-600">Browse through our extensive network of qualified doctors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Video className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Start appointments with top doctors</h3>
                    <p className="text-gray-600">Begin video consultations with certified healthcare professionals</p>
                  </div>
                </div>
              </div>
              
              <Link to="/doctors" className="btn-primary inline-flex items-center">
                Find Doctors <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specialists */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Featured Specialists</h2>
            <p className="text-xl text-gray-600">Experienced doctors ready to provide you with the best care</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialists.map((doctor, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-primary-600 mb-3">{doctor.specialty}</p>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews} Reviews)</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/doctors" className="btn-primary">
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Read stories from our happy patients</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Ahmed</h4>
                  <p className="text-sm text-gray-600">Patient</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The service made it easy to find a doctor and book an appointment. I 
                highly recommend it to anyone looking for convenient healthcare."
              </p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Marcus Rashid</h4>
                  <p className="text-sm text-gray-600">Patient</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The website made it easy to find a doctor and book an appointment. I highly 
                recommend it to anyone looking for convenient healthcare."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">How do I find a doctor near me?</h3>
              <p className="text-gray-600">
                Use our search feature to find doctors by specialty, location, or availability. 
                You can filter results based on your specific needs.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">How do I book an appointment?</h3>
              <p className="text-gray-600">
                Simply select your preferred doctor, choose an available time slot, and confirm 
                your booking. You'll receive a confirmation via email or SMS.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">What specialties do you offer?</h3>
              <p className="text-gray-600">
                We offer a wide range of specialties including cardiology, neurology, 
                pediatrics, orthopedics, and many more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust Med-e-Connect for their healthcare needs.
          </p>
          <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center">
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home