import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DoctorList from './pages/DoctorList'
// import DoctorDashboard from './pages/DoctorDashboard'
// import PatientDashboard from './pages/PatientDashboard'
// import AdminDashboard from './pages/AdminDashboard'
import Consultation from './pages/Consultation'
import Appointment from './pages/Appointment'

import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctors" element={<DoctorList />} />

            {/* <Route 
              path="/patientdashboard" 
              element={
                <ProtectedRoute role="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            /> */}

            {/* <Route 
              path="/doctordashboard" 
              element={
                <ProtectedRoute role="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            /> */}

            {/* <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            /> */}

            <Route 
              path="/appointment" 
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/consultation/:appointmentId" 
              element={
                <ProtectedRoute>
                  <Consultation />
                </ProtectedRoute>
              } 
            />

          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App