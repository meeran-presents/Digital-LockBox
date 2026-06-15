import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid } from 'recharts';
import { Building2, Award, Info, AlertTriangle } from 'lucide-react';
import { adminHallsStats } from '../mockData';

export default function AdminHalls() {
  
  // Colors for Pie Chart segments
  const COLORS = ['#14b8a6', '#06b6d4', '#6366f1', '#a855f7'];

  // Custom Tooltip for Bar and Area Charts
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f121e]/95 border border-slate-800 p-2.5 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-xs font-black text-teal-400 mt-0.5">
            Avg Lock: {payload[0].value.toFixed(1)} hrs
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-[#0f121e]/95 border border-slate-800 p-2.5 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{name}</p>
          <p className="text-xs font-black text-cyan-400 mt-0.5">
            Focused: {value} Students
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDistractionTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f121e]/95 border border-slate-800 p-2.5 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-xs font-black text-red-400 mt-0.5">
            Distraction: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Residence Statistics</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Hostel Analytics</h2>
      </div>

      {/* Chart 1: Average Lock Duration (Bar Chart) */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col gap-3">
        <div>
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Focus Duration by Hall</h3>
          <p className="text-[9px] text-slate-500 mt-0.5">Average cumulative lock hours per student today</p>
        </div>

        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={adminHallsStats}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="hallBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="hall" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 8, fontWeight: 600 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 9 }}
                domain={[0, 10]}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
              <Bar 
                dataKey="avgLockHours" 
                fill="url(#hallBarGradient)" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: High-Focus Students Distribution (Pie Chart) */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col gap-3">
        <div>
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top Focused Students</h3>
          <p className="text-[9px] text-slate-500 mt-0.5">Distribution of students achieving 8h+ streak today</p>
        </div>

        <div className="w-full h-44 flex items-center justify-center relative">
          <div className="w-2/3 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomPieTooltip />} />
                <Pie
                  data={adminHallsStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={55}
                  paddingAngle={5}
                  dataKey="focusedStudents"
                  nameKey="hall"
                >
                  {adminHallsStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom legend */}
          <div className="w-1/3 flex flex-col gap-1.5 justify-center">
            {adminHallsStats.map((entry, index) => (
              <div key={entry.hall} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-[8px] font-bold text-slate-400 truncate tracking-wide">
                  {entry.hall.split(" ")[0]} ({entry.focusedStudents})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 3: Distraction Rate Trend (Area Chart) */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col gap-3">
        <div>
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Distraction Rates</h3>
          <p className="text-[9px] text-slate-500 mt-0.5">Avg mobile unlocks per active session by hall (%)</p>
        </div>

        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={adminHallsStats}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="distractionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.03)" />
              <XAxis 
                dataKey="hall" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 8, fontWeight: 600 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 9 }}
                domain={[0, 30]}
              />
              <Tooltip content={<CustomDistractionTooltip />} />
              <Area 
                type="monotone" 
                dataKey="distractionRate" 
                stroke="#ef4444" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#distractionGradient)" 
                dot={{ stroke: '#ef4444', strokeWidth: 1, fill: '#090b11', r: 3 }}
                activeDot={{ r: 5, stroke: '#ef4444', strokeWidth: 2, fill: '#ef4444' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Focus Champions Callout Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 flex gap-3.5 items-center">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
          <Award size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-300">Focus Champions</h4>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
            **Curie Hall (C)** is leading the campus leaderboard this week with an average lock duration of **8.1 hours** per student and the lowest distraction rate!
          </p>
        </div>
      </div>

    </div>
  );
}
