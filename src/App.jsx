import React, { useState } from 'react';
import PhoneMockup from './components/PhoneMockup';
import DashboardHome from './components/DashboardHome';
import AnalyticsPage from './components/AnalyticsPage';
import Leaderboard from './components/Leaderboard';
import LockSchedulePage from './components/LockSchedulePage';
import NudgesFeed from './components/NudgesFeed';
import RewardsPage from './components/RewardsPage';
import { initialDashboardData, initialSchedules, initialNudges, initialRewards } from './mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [nudges, setNudges] = useState(initialNudges);
  const [rewards, setRewards] = useState(initialRewards);
  const [points, setPoints] = useState(420);

  // Dynamically render active tab content
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <DashboardHome 
            data={dashboardData} 
            setData={setDashboardData} 
            onNavigate={setCurrentTab} 
          />
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'schedule':
        return (
          <LockSchedulePage 
            schedules={schedules} 
            setSchedules={setSchedules} 
          />
        );
      case 'rewards':
        return (
          <RewardsPage 
            rewards={rewards} 
            setRewards={setRewards} 
            points={points} 
          />
        );
      case 'nudges':
        return (
          <NudgesFeed 
            nudges={nudges} 
            setNudges={setNudges} 
          />
        );
      default:
        return (
          <DashboardHome 
            data={dashboardData} 
            setData={setDashboardData} 
            onNavigate={setCurrentTab} 
          />
        );
    }
  };

  return (
    <PhoneMockup 
      currentTab={currentTab} 
      setCurrentTab={setCurrentTab}
      notificationCount={nudges.length}
    >
      {renderContent()}
    </PhoneMockup>
  );
}
