import React, { useState, useEffect } from 'react';
import { Home, BarChart2, Trophy, Calendar, Bell, Wifi, Battery, Signal } from 'lucide-react';

export default function PhoneMockup({ currentTab, setCurrentTab, children, notificationCount }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analytics', label: 'Stats', icon: BarChart2 },
    { id: 'leaderboard', label: 'Rank', icon: Trophy },
    { id: 'schedule', label: 'Lock', icon: Calendar },
    { id: 'nudges', label: 'Alerts', icon: Bell, badge: notificationCount },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030712] relative overflow-hidden flex items-center justify-center py-8 font-sans">
      {/* Decorative blurred background orbs for premium dark-mode feeling */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '6s' }}></div>

      {/* Main Outer Phone Container */}
      <div className="relative w-[375px] h-[812px] rounded-[52px] border-[10px] border-slate-800/90 bg-[#090b11] shadow-[0_0_80px_-10px_rgba(0,0,0,0.8),_inset_0_0_4px_rgba(255,255,255,0.2)] flex flex-col overflow-hidden ring-1 ring-slate-700/50">
        
        {/* Dynamic Island / Notch Mock */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-50 flex items-center justify-center border border-slate-800/30">
          <div className="w-3 h-3 rounded-full bg-slate-950 absolute left-4 border border-slate-900/50"></div>
          <div className="w-8 h-1 rounded-full bg-slate-950 absolute right-4"></div>
        </div>

        {/* Status Bar */}
        <div className="h-12 px-6 pt-3 flex justify-between items-center text-xs font-semibold text-slate-400 select-none z-40 bg-[#090b11]/80 backdrop-blur-md">
          <span className="text-[11px] font-medium tracking-tight mt-1">{time || "11:21 PM"}</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Signal size={12} className="text-slate-400" />
            <Wifi size={12} className="text-slate-400" />
            <Battery size={14} className="text-slate-300" />
          </div>
        </div>

        {/* Main Viewport Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#090b11] pb-24 relative flex flex-col">
          {children}
        </div>

        {/* Premium Glassmorphic Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[84px] bg-[#090b11]/80 backdrop-blur-xl border-t border-slate-800/60 px-4 pt-2 pb-6 flex justify-around items-center z-40">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-teal-400 scale-105' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-teal-500/10 text-teal-400' : 'bg-transparent'
                }`}>
                  <IconComponent size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                <span className="text-[9px] font-medium mt-1 tracking-wider">{item.label}</span>
                
                {/* Notification/Alert Badge */}
                {item.badge > 0 && (
                  <span className="absolute top-1.5 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-4 h-4 flex items-center justify-center shadow-lg border border-[#090b11]">
                    {item.badge}
                  </span>
                )}
                
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute -bottom-1 w-5 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full glow-teal"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Simulated iOS Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-700/60 rounded-full z-50"></div>
      </div>
    </div>
  );
}
