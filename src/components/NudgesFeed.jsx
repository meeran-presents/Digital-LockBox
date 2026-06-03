import React, { useState } from 'react';
import { Bell, Flame, Sparkles, TrendingUp, AlertTriangle, BookOpen, Trash2, CheckCheck } from 'lucide-react';

export default function NudgesFeed({ nudges, setNudges }) {
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
      default:
        return <Sparkles size={16} className="text-teal-400" />;
    }
  };

  const handleDeleteNudge = (id) => {
    setNudges(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all alerts and notifications?")) {
      setNudges([]);
    }
  };

  const filteredNudges = nudges.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'milestones') return n.type === 'milestone';
    if (filter === 'tips') return n.type === 'tip' || n.type === 'predictive';
    if (filter === 'alerts') return n.type === 'alert' || n.type === 'stats';
    return true;
  });

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Feed & Notifications</span>
          <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Nudges Feed</h2>
        </div>
        {nudges.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-red-400 transition-colors uppercase py-1 px-2 rounded-lg hover:bg-red-500/5"
          >
            <CheckCheck size={12} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Categories chips filter */}
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

      {/* Feed list timeline */}
      <div className="flex flex-col gap-3 mt-1.5">
        {filteredNudges.map((nudge) => (
          <div
            key={nudge.id}
            className="p-4 rounded-2xl glass-card flex gap-3.5 relative overflow-hidden group border border-slate-800/80"
          >
            {/* Left accent icon wrap */}
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center shrink-0">
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
              <p className="text-[11px] font-medium text-slate-400 mt-1.5 leading-relaxed">
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
        ))}

        {filteredNudges.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl flex flex-col items-center justify-center gap-3">
            <Bell size={24} className="text-slate-600 animate-bounce" style={{ animationDuration: '4s' }} />
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No notifications</p>
              <p className="text-[10px] text-slate-500 mt-1">Your AI detox lockbox feed is currently clear.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
