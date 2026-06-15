import React, { useState } from 'react';
import PhoneMockup from './components/PhoneMockup';
import DashboardHome from './components/DashboardHome';
import AnalyticsPage from './components/AnalyticsPage';
import Leaderboard from './components/Leaderboard';
import VaultPage from './components/VaultPage';
import AdminOverview from './components/AdminOverview';
import AdminClasses from './components/AdminClasses';
import AdminHalls from './components/AdminHalls';
import LoginPortal from './components/LoginPortal';
import { initialDashboardData, initialSchedules, initialSecurityLogs, initialRewards } from './mockData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [currentTab, setCurrentTab] = useState('home');
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [securityLogs, setSecurityLogs] = useState(initialSecurityLogs);
  const [rewards, setRewards] = useState(initialRewards);
  const [points] = useState(420);

  // Dynamically render active tab content
  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <LoginPortal 
          onLogin={(userRole) => {
            setRole(userRole);
            setIsLoggedIn(true);
            setCurrentTab(userRole === 'admin' ? 'admin_overview' : 'home');
          }} 
        />
      );
    }

    switch (currentTab) {
      // Student Tabs
      case 'home':
        return (
          <DashboardHome 
            data={dashboardData} 
            setData={setDashboardData} 
            schedules={schedules}
            setSchedules={setSchedules}
          />
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'vault':
        return (
          <VaultPage 
            rewards={rewards} 
            setRewards={setRewards} 
            points={points} 
            securityLogs={securityLogs}
            setSecurityLogs={setSecurityLogs}
          />
        );
      
      // Admin Tabs
      case 'admin_overview':
        return <AdminOverview />;
      case 'admin_classes':
        return <AdminClasses />;
      case 'admin_halls':
        return <AdminHalls />;

      default:
        return role === 'admin' ? <AdminOverview /> : (
          <DashboardHome 
            data={dashboardData} 
            setData={setDashboardData} 
            schedules={schedules}
            setSchedules={setSchedules}
          />
        );
    }
  };

  return (
    <PhoneMockup 
      role={role}
      setRole={setRole}
      isLoggedIn={isLoggedIn}
      onLogout={() => {
        setIsLoggedIn(false);
        setCurrentTab('home');
      }}
      currentTab={currentTab} 
      setCurrentTab={setCurrentTab}
      notificationCount={securityLogs.length}
    >
      {renderContent()}
    </PhoneMockup>
  );
}
