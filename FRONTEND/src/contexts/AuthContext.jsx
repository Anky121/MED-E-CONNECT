import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('med-e-connect-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      const mockUsers = [
        { id: 1, email: 'patient@demo.com', password: 'password', role: 'patient', name: 'John Doe' },
        { id: 2, email: 'doctor@demo.com', password: 'password', role: 'doctor', name: 'Dr. Smith' },
        { id: 3, email: 'admin@demo.com', password: 'password', role: 'admin', name: 'Admin User' }
      ]

      const foundUser = mockUsers.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('med-e-connect-user', JSON.stringify(userWithoutPassword))
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      // Simulate API call - replace with actual registration
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: userData.role || 'patient'
      }
      
      setUser(newUser)
      localStorage.setItem('med-e-connect-user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('med-e-connect-user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}