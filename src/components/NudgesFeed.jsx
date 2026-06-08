import React, { useState } from 'react';
import { Bell, Flame, Sparkles, TrendingUp, AlertTriangle, BookOpen, Trash2, CheckCheck, ShieldAlert, Zap } from 'lucide-react';

export default function NudgesFeed({ nudges, setNudges }) {
  const [feedTab, setFeedTab] = useState('motivational'); // 'motivational' or 'security'
  const [filter, setFilter] = useState('all');

  const getIcon = (type) => {
    switch (type) {
      case 'milestone':
        return <Flame size={16} className="text-orange-400" />;
      case 'predictive':
        return <TrendingUp size={16} className="text-indigo-400 animate-bounce" style={{ animationDuration: '3s' }} />;
      case 'alert':
        return <AlertTriangle size={16} className="text-amber-400" />;
      case 'tip':
        return <BookOpen size={16} className="text-pink-400" />;
      case 'security':
        return <AlertTriangle size={16} className="text-red-400 animate-pulse" />;
      default:
        return <Sparkles size={16} className="text-teal-400" />;
    }
  };

  const handleDeleteNudge = (id) => {
    setNudges(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    const confirmMsg = feedTab === 'security' 
      ? "Clear all security logs?" 
      : "Clear all motivational notifications?";
    if (window.confirm(confirmMsg)) {
      setNudges(prev => prev.filter(n => feedTab === 'security' ? n.type !== 'security' : n.type === 'security'));
    }
  };

  // Simulate dynamic physical security alerts
  const handleSimulateSecurity = (alertName) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let title = "";
    let message = "";
    let badge = "";
    let badgeColor = "";

    if (alertName === 'tamper') {
      title = "Tamper Detected";
      message = `⚠️ Tamper Detected: Box forced open at ${timeNow}`;
      badge = "Tamper";
      badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
    } else if (alertName === 'emergency') {
      title = "Emergency Override";
      message = `🚨 Emergency Button Pressed - early release override at ${timeNow}`;
      badge = "Emergency";
      badgeColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
    } else {
      title = "Unauthorized Access";
      message = `📱 Device accessed without lockbox scheduled release approval at ${timeNow}`;
      badge = "Security";
      badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
    }

    const newAlert = {
      id: Date.now(),
      type: "security",
      title,
      message,
      time: "Just now",
      badge,
      badgeColor
    };

    setNudges(prev => [newAlert, ...prev]);
  };

  // Filter logic based on feedTab and sub-chips
  const displayedNudges = nudges.filter(n => {
    if (feedTab === 'security') {
      return n.type === 'security';
    } else {
      // Motivational feed: exclude 'security' and check sub-chips
      if (n.type === 'security') return false;
      if (filter === 'all') return true;
      if (filter === 'milestones') return n.type === 'milestone';
      if (filter === 'tips') return n.type === 'tip' || n.type === 'predictive';
      if (filter === 'alerts') return n.type === 'alert' || n.type === 'stats';
      return true;
    }
  });

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Feed & Notifications</span>
          <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Nudges Feed</h2>
        </div>
        {displayedNudges.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-red-400 transition-colors uppercase py-1 px-2 rounded-lg hover:bg-red-500/5"
          >
            <CheckCheck size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Top Level Feed Switch Tab */}
      <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setFeedTab('motivational')}
          className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
            feedTab === 'motivational'
              ? 'bg-slate-800 text-teal-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Zap size={11} />
          <span>Motivational</span>
        </button>
        <button
          onClick={() => setFeedTab('security')}
          className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
            feedTab === 'security'
              ? 'bg-slate-800 text-red-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <AlertTriangle size={11} />
          <span>Security Alerts</span>
        </button>
      </div>

      {/* Categories chips filter - Display only for motivational */}
      {feedTab === 'motivational' && (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { label: 'All', value: 'all' },
            { label: 'Milestones', value: 'milestones' },
            { label: 'Tips & Insights', value: 'tips' },
            { label: 'Alerts', value: 'alerts' },
          ].map((chip) => (
            <button
              key={chip.value}
              onClick={() => setFilter(chip.value)}
              className={`py-1.5 px-3 text-[9px] font-bold rounded-full uppercase tracking-wider transition-all shrink-0 border ${
                filter === chip.value
                  ? 'bg-teal-500/10 border-teal-400/30 text-teal-400'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Security Simulator Buttons - Display only for security alerts */}
      {feedTab === 'security' && (
        <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col gap-2">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Tamper Simulation Console</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleSimulateSecurity('tamper')}
              className="py-1 px-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-[8px] font-bold uppercase tracking-tight"
            >
              Tamper Open
            </button>
            <button
              onClick={() => handleSimulateSecurity('emergency')}
              className="py-1 px-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 transition-all text-[8px] font-bold uppercase tracking-tight"
            >
              Emergency
            </button>
            <button
              onClick={() => handleSimulateSecurity('breach')}
              className="py-1 px-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-[8px] font-bold uppercase tracking-tight"
            >
              Device Access
            </button>
          </div>
        </div>
      )}

      {/* Feed list timeline */}
      <div className="flex flex-col gap-3 mt-1.5">
        {displayedNudges.map((nudge) => {
          const isSecurity = nudge.type === 'security';
          return (
            <div
              key={nudge.id}
              className={`p-4 rounded-2xl flex gap-3.5 relative overflow-hidden group border transition-all duration-300 ${
                isSecurity
                  ? 'bg-red-950/10 border-red-900/40 glow-red/5'
                  : 'glass-card border-slate-800/80'
              }`}
            >
              {/* Left accent icon wrap */}
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                isSecurity 
                  ? 'bg-red-950/40 border-red-900/50' 
                  : 'bg-slate-900 border-slate-850'
              }`}>
                {getIcon(nudge.type)}
              </div>

              {/* Content text */}
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{nudge.title}</span>
                  <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${nudge.badgeColor}`}>
                    {nudge.badge}
                  </span>
                </div>
                <p className={`text-[11px] font-medium mt-1.5 leading-relaxed ${
                  isSecurity ? 'text-red-300/95 font-semibold' : 'text-slate-400'
                }`}>
                  {nudge.message}
                </p>
                <span className="text-[9px] text-slate-500 font-semibold block mt-2">
                  {nudge.time}
                </span>
              </div>

              {/* Quick delete button absolute overlay */}
              <button
                onClick={() => handleDeleteNudge(nudge.id)}
                className="absolute right-3.5 top-3.5 p-1 rounded-md bg-slate-900/40 hover:bg-red-500/10 text-slate-600 hover:text-red-400 border border-slate-800/60 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <Trash2 size={11} />
              </button>
            </div>
          );
        })}

        {displayedNudges.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl flex flex-col items-center justify-center gap-3">
            <Bell size={24} className="text-slate-600 animate-bounce" style={{ animationDuration: '4s' }} />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No alerts</p>
              <p className="text-[10px] text-slate-500 mt-1">
                {feedTab === 'security' 
                  ? "Security logs are currently clear. No tamper events reported."
                  : "Your AI detox lockbox feed is currently clear."}
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
