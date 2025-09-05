// /frontend/src/pages/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layout Components
import DashboardLayout from '../components/patient/layout/DashboardLayout';

// Dashboard Components
import DashboardStats from '../components/patient/dashboard/DashboardStats';
import QuickActions from '../components/patient/dashboard/QuickActions';
import UpcomingAppointments from '../components/patient/dashboard/UpcomingAppointments';
import RecentPrescriptions from '../components/patient/dashboard/RecentPrescriptions';

// Feature Components
import DoctorSearch from '../components/patient/doctors/DoctorSearch';
import AppointmentBooking from '../components/patient/appointments/AppointmentBooking';
import PrescriptionManager from '../components/patient/prescriptions/PrescriptionManager';
import ProfileManager from '../components/patient/profile/ProfileManager';
import ConsultationRoom from '../components/patient/consultation/ConsultationRoom';

// Styles
import '../styles/patient/Dashboard.css';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'patient') {
      navigate('/login');
      return;
    }
    fetchPatientData();
    fetchNotifications();
  }, [user, navigate]);

  const fetchPatientData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patient/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
      } else if (response.status === 401) {
        logout();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patient/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <DashboardStats patientData={patientData} />
            <QuickActions onTabChange={handleTabChange} />
            <div className="dashboard-grid">
              <UpcomingAppointments patientId={patientData?.id} />
              <RecentPrescriptions patientId={patientData?.id} />
            </div>
          </div>
        );
      
      case 'find-doctors':
        return (
          <DoctorSearch 
            onBookAppointment={() => setActiveTab('book-appointment')} 
          />
        );
      
      case 'book-appointment':
        return (
          <AppointmentBooking 
            patientData={patientData}
            onSuccess={() => {
              setActiveTab('appointments');
              fetchNotifications();
            }}
          />
        );
      
      case 'appointments':
        return (
          <UpcomingAppointments 
            patientId={patientData?.id} 
            detailed={true}
            onUpdate={fetchNotifications}
          />
        );
      
      case 'prescriptions':
        return (
          <PrescriptionManager 
            patientId={patientData?.id} 
          />
        );
      
      case 'consultation':
        return (
          <ConsultationRoom 
            patientData={patientData}
            onConsultationEnd={() => setActiveTab('dashboard')}
          />
        );
      
      case 'profile':
        return (
          <ProfileManager 
            patientData={patientData} 
            onUpdate={fetchPatientData} 
          />
        );
      
      default:
        return (
          <div className="error-content">
            <h3>Page not found</h3>
            <button onClick={() => setActiveTab('dashboard')}>
              Go to Dashboard
            </button>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      patientData={patientData}
      notifications={notifications}
      onRefresh={fetchNotifications}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default PatientDashboard;
