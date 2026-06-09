import React, { useState } from 'react';
import PhoneMockup from './components/PhoneMockup';
import DashboardHome from './components/DashboardHome';
import AnalyticsPage from './components/AnalyticsPage';
import Leaderboard from './components/Leaderboard';
import VaultPage from './components/VaultPage';
import { initialDashboardData, initialSchedules, initialSecurityLogs, initialRewards } from './mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [securityLogs, setSecurityLogs] = useState(initialSecurityLogs);
  const [rewards, setRewards] = useState(initialRewards);
  const [points] = useState(420);

  // Dynamically render active tab content
  const renderContent = () => {
    switch (currentTab) {
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
      default:
        return (
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
      currentTab={currentTab} 
      setCurrentTab={setCurrentTab}
      notificationCount={securityLogs.length}
    >
      {renderContent()}
    </PhoneMockup>
  );
}
