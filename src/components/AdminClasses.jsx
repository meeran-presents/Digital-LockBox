import React, { useState } from 'react';
import { BookOpen, Clock, UserCheck, Activity, AlertCircle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Database, Users } from 'lucide-react';
import { adminClassStats, classStudentDetails } from '../mockData';

export default function AdminClasses() {
  const [expandedClassId, setExpandedClassId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedClassId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Study Sessions</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Lecture Monitoring</h2>
      </div>

      {/* Overview stats block */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-teal-400 animate-pulse" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Class distraction radar</h3>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          The dashboard logs mobile unlocking activity during study/lecture blocks. Click any class below to expand the **student focus database**.
        </p>
      </div>

      {/* Lectures List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Today's Class Schedule</h3>
        
        {adminClassStats.map((lecture) => {
          const isOngoing = lecture.status === "ongoing";
          const distractionLevel = lecture.unlocks >= 10 
            ? "High" 
            : lecture.unlocks >= 5 
              ? "Moderate" 
              : "Low";

          // Calculate focus percentage
          const focusRate = Math.round((lecture.locked / lecture.enrolled) * 100);
          const isExpanded = expandedClassId === lecture.id;

          return (
            <div 
              key={lecture.id} 
              onClick={() => toggleExpand(lecture.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden cursor-pointer select-none ${
                isOngoing 
                  ? 'border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 shadow-lg' 
                  : 'border-slate-850 glass-card hover:border-slate-700/60'
              }`}
            >
              {isOngoing && (
                <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-purple-500 text-white text-[8px] font-black uppercase tracking-wider rounded-bl-xl flex items-center gap-1 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>Active Lecture</span>
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start gap-2 mb-2.5 pr-12">
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${
                    isOngoing 
                      ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                      : 'bg-slate-800 border-slate-700/40 text-slate-400'
                  }`}>
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{lecture.name}</h4>
                    <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">{lecture.instructor}</span>
                  </div>
                </div>
              </div>

              {/* Expander Chevron Indicator */}
              <div className="absolute right-4 top-4 text-slate-500 hover:text-slate-350 transition-colors">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {/* Time Indicator */}
              <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
                <Clock size={11} className="text-slate-500" />
                <span>{lecture.time}</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950/20 p-2.5 rounded-xl border border-slate-900">
                <div className="text-center border-r border-slate-900">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Focus Rate</span>
                  <span className={`text-xs font-black block mt-1 ${
                    focusRate >= 90 ? 'text-teal-400' : focusRate >= 80 ? 'text-cyan-400' : 'text-orange-400'
                  }`}>
                    {focusRate}%
                  </span>
                  <span className="text-[7px] text-slate-500 mt-0.5 block font-semibold">({lecture.locked}/{lecture.enrolled} locked)</span>
                </div>

                <div className="text-center border-r border-slate-900">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Unlocks</span>
                  <span className={`text-xs font-black block mt-1 ${
                    distractionLevel === 'High' ? 'text-red-400' : distractionLevel === 'Moderate' ? 'text-orange-400' : 'text-teal-400'
                  }`}>
                    {lecture.unlocks} Times
                  </span>
                  <span className="text-[7px] text-slate-550 mt-0.5 block font-bold uppercase">Violation Count</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Alert Level</span>
                  {distractionLevel === "High" ? (
                    <div className="flex items-center gap-0.5 text-red-400 font-black text-[9px] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 uppercase">
                      <AlertCircle size={10} />
                      <span>CRITICAL</span>
                    </div>
                  ) : distractionLevel === "Moderate" ? (
                    <div className="flex items-center gap-0.5 text-orange-400 font-black text-[9px] bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 uppercase">
                      <AlertTriangle size={10} />
                      <span>WARNING</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5 text-teal-400 font-black text-[9px] bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20 uppercase">
                      <CheckCircle2 size={10} />
                      <span>OPTIMAL</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Classroom Student Database Panel (Expanded View) */}
              {isExpanded && (
                <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 animate-fade-in flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded-xl border border-slate-900/60">
                    <div className="flex items-center gap-1.5 text-purple-400">
                      <Database size={11} />
                      <span className="text-[8px] font-black uppercase tracking-wider">Classroom Student Database</span>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-500">
                      <Users size={10} />
                      <span>{(classStudentDetails[lecture.id] || []).length} Students</span>
                    </div>
                  </div>

                  {/* List of Student focus states */}
                  <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-0.5">
                    {(classStudentDetails[lecture.id] || []).map((student, idx) => {
                      const isLocked = student.status === "Locked";
                      return (
                        <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-900/40 border border-slate-850 hover:bg-slate-900/70 transition-all">
                          <span className="text-[10px] font-bold text-slate-350">{student.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase border ${
                              isLocked 
                                ? 'bg-teal-500/10 text-teal-400 border-teal-500/10' 
                                : 'bg-red-500/10 text-red-400 border-red-500/10'
                            }`}>
                              {isLocked ? 'Locked 🔒' : 'Unlocked 📱'}
                            </span>
                            {!isLocked && (
                              <span className="text-[8px] text-slate-400 font-bold bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                                {student.unlocks} {student.unlocks === 1 ? 'unlock' : 'unlocks'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Warning/Recommendation details */}
              {distractionLevel === "High" && !isExpanded && (
                <div className="mt-2.5 p-2 rounded-xl bg-red-950/15 border border-red-900/30 flex gap-2 items-center">
                  <AlertCircle size={12} className="text-red-400 shrink-0" />
                  <p className="text-[9px] font-semibold text-red-300">
                    High unlocking rate detected! Click to inspect the database.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
