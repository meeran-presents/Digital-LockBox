import React, { useState } from 'react';
import { ShieldCheck, Users, Lock, Clock, Search, ShieldAlert, Award } from 'lucide-react';
import { adminStudentLockStats } from '../mockData';

export default function AdminOverview() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = adminStudentLockStats.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.hostel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Campus Control Panel</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Admin Overview</h2>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 rounded-xl glass-card flex flex-col justify-between h-20 text-center">
          <div className="flex justify-center text-teal-400">
            <Clock size={14} />
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Avg Lock Time</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">7.0 Hours</span>
          </div>
        </div>

        <div className="p-3 rounded-xl glass-card flex flex-col justify-between h-20 text-center">
          <div className="flex justify-center text-cyan-400">
            <Users size={14} />
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Live Focus</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">84% Students</span>
          </div>
        </div>

        <div className="p-3 rounded-xl glass-card flex flex-col justify-between h-20 text-center">
          <div className="flex justify-center text-red-400">
            <ShieldAlert size={14} />
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Unlocks Today</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">26 Events</span>
          </div>
        </div>
      </div>

      {/* Privacy Guard Callout Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-transparent border border-teal-500/25 flex gap-3.5 items-start relative overflow-hidden select-none glow-teal/5">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20 shrink-0">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-teal-400 uppercase tracking-wide">Privacy Shield Enabled</h4>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            In compliance with campus privacy standards, the system restricts visibility of active student screen content or unlock details. You can view **daily cumulative lock times** and aggregate distraction rates only.
          </p>
        </div>
      </div>

      {/* Student Lock Durations Directory */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Student Lock Directory</h3>
          <span className="text-[9px] font-bold text-slate-500 uppercase">Today's Data</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search student or hostel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/40"
          />
        </div>

        {/* Directory List */}
        <div className="flex flex-col gap-2">
          {filteredStudents.map((student) => {
            const isLockedNow = student.status === "Locked Now";
            return (
              <div key={student.id} className="p-3.5 rounded-xl glass-card flex flex-col gap-2 border border-slate-850">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs border border-slate-700/30">
                      👤
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">{student.name}</span>
                      <span className="text-[9px] text-slate-500 block">{student.hostel}</span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                    isLockedNow 
                      ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' 
                      : student.status.includes('Distracted')
                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {student.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-1.5 pt-2 border-t border-slate-900/50 text-[10px]">
                  <div>
                    <span className="text-slate-500 block text-[8px] font-bold uppercase tracking-wider">Locked Duration</span>
                    <span className="text-slate-300 font-extrabold mt-0.5 block">{student.lockTimeToday}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[8px] font-bold uppercase tracking-wider">Unlock Activity Details</span>
                    <span className="text-slate-400/60 font-semibold mt-0.5 block flex items-center gap-1">
                      <Lock size={10} className="inline text-teal-400/80" /> 
                      <span className="text-[9px] italic font-medium">Anonymized</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredStudents.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-500 font-medium">
              No student records found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
