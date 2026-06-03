import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { Trophy, Clock, Calendar, TrendingUp } from 'lucide-react';
import { sevenDaysData, weeklyTrendData, analyticsStats } from '../mockData';

export default function AnalyticsPage() {
  
  // Custom Tooltip component for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f121e]/95 border border-slate-800 p-2.5 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-sm font-extrabold text-teal-400 mt-0.5">
            {payload[0].value.toFixed(1)} hrs
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 animate-fade-in text-left">
      
      {/* Page Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Performance & Insights</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Analytics</h2>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        
        {/* Longest Streak */}
        <div className="p-3 rounded-xl glass-card flex flex-col justify-between h-20 text-center">
          <div className="flex justify-center text-orange-400">
            <Trophy size={14} />
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Best Streak</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{analyticsStats.longestStreak}</span>
          </div>
        </div>

        {/* Avg Lock Time */}
        <div className="p-3 rounded-xl glass-card flex flex-col justify-between h-20 text-center">
          <div className="flex justify-center text-teal-400">
            <Clock size={14} />
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Avg Daily</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{analyticsStats.avgDailyLockTime}</span>
          </div>
        </div>

        {/* Total Days */}
        <div className="p-3 rounded-xl glass-card flex flex-col justify-between h-20 text-center">
          <div className="flex justify-center text-blue-400">
            <Calendar size={14} />
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Days Used</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{analyticsStats.totalDaysUsed} Days</span>
          </div>
        </div>

      </div>

      {/* Chart 1: Daily Detox Hours (Past 7 Days) */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Past 7 Days</h3>
            <p className="text-[9px] text-slate-500 mt-0.5">Phone-free hours completed vs goal</p>
          </div>
          <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-full">
            Goal: 8.0h
          </span>
        </div>

        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sevenDaysData}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
                domain={[0, 10]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
              <Bar 
                dataKey="hours" 
                fill="url(#barGradient)" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Weekly Trend (Past 4 Weeks) */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Weekly Detox Trend</h3>
            <p className="text-[9px] text-slate-500 mt-0.5">Total hours locked per week</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-teal-400">
            <TrendingUp size={12} />
            <span>+15% Growth</span>
          </div>
        </div>

        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyTrendData}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="lineAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.03)" />
              <XAxis 
                dataKey="week" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10 }}
                domain={[0, 60]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="hours" 
                stroke="#06b6d4" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#lineAreaGradient)" 
                dot={{ stroke: '#06b6d4', strokeWidth: 1, fill: '#090b11', r: 3 }}
                activeDot={{ r: 5, stroke: '#14b8a6', strokeWidth: 2, fill: '#14b8a6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dynamic Summary/Motivation Nudge card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border border-teal-500/10 flex gap-3.5 items-center">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20 shrink-0">
          <TrendingUp size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-300">Detox Box Pro-Tip</h4>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
            Your screen lock time is up 5.2 hours from last week. This concentration gain directly correlates with high grades during exam season!
          </p>
        </div>
      </div>

    </div>
  );
}
