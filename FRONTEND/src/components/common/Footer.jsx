import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Med-e-Connect</span>
            </div>
            <p className="text-gray-300 mb-4">
              Easily find and book appointments with top doctors near you. 
              Your path to better health begins with a simple click.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+880 1234 567 890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@medeconnect.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-white transition-colors">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="text-gray-300 hover:text-white transition-colors">
                  Consultation
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Specialties</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctors?specialty=cardiology" className="text-gray-300 hover:text-white transition-colors">
                  Cardiology
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=neurology" className="text-gray-300 hover:text-white transition-colors">
                  Neurology
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=pediatrics" className="text-gray-300 hover:text-white transition-colors">
                  Pediatrics
                </Link>
              </li>
              <li>
                <Link to="/doctors?specialty=orthopedics" className="text-gray-300 hover:text-white transition-colors">
                  Orthopedics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Med-e-Connect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer