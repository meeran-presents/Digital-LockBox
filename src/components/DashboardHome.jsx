import React, { useState, useEffect } from 'react';
import { Flame, Lock, Unlock, Zap, ChevronRight, Play, X, Battery, Wifi, Calendar, Plus, Trash2, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

export default function DashboardHome({ data, setData, schedules, setSchedules }) {
  // Quick Lock box state
  const [isLocking, setIsLocking] = useState(false);
  const [lockMinutes, setLockMinutes] = useState(30);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Add Lock Schedule form state
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [schedTitle, setSchedTitle] = useState('');
  const [schedStartHour, setSchedStartHour] = useState(9);
  const [schedStartMinute, setSchedStartMinute] = useState(0);
  const [schedEndHour, setSchedEndHour] = useState(9);
  const [schedEndMinute, setSchedEndMinute] = useState(30);
  const [schedDays, setSchedDays] = useState([1, 3]); // Mon/Wed default
  const [schedColor, setSchedColor] = useState('teal');
  const [schedValidationError, setSchedValidationError] = useState('');

  const daysOfWeek = [
    { label: 'S', value: 0, fullName: 'Sunday' },
    { label: 'M', value: 1, fullName: 'Monday' },
    { label: 'T', value: 2, fullName: 'Tuesday' },
    { label: 'W', value: 3, fullName: 'Wednesday' },
    { label: 'T', value: 4, fullName: 'Thursday' },
    { label: 'F', value: 5, fullName: 'Friday' },
    { label: 'S', value: 6, fullName: 'Saturday' },
  ];

  // Calculate percentages
  const progressPercent = Math.min(100, Math.round((data.todayStreak / data.dailyGoal) * 100));
  const hours = Math.floor(data.todayStreak / 60);
  const minutes = data.todayStreak % 60;
  const streakString = `${hours}h ${minutes}min`;

  const targetHours = data.dailyGoal / 60;

  // Active lockbox countdown timer simulation
  useEffect(() => {
    let interval = null;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer finished
            clearInterval(interval);
            setActiveTimer(null);
            // Increment detox time in state
            setData(prevData => ({
              ...prevData,
              todayStreak: prevData.todayStreak + lockMinutes,
              nudgeMessage: `Fantastic detox! Added ${lockMinutes}m to your streak. 🎉`
            }));
            alert(`🔓 Lockbox Opened! You completed your ${lockMinutes}-minute detox!`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer, lockMinutes, setData]);

  const handleStartLock = () => {
    if (lockMinutes < 30) {
      return; // Enforce minimum 30 min duration
    }
    setIsLocking(false);
    setActiveTimer(true);
    setTimeRemaining(lockMinutes * 60);
  };

  const handleCancelLock = () => {
    if (window.confirm("Are you sure you want to emergency unlock? This increments your unlock count!")) {
      setActiveTimer(false);
      setTimeRemaining(0);
      setData(prevData => ({
        ...prevData,
        totalUnlocks: prevData.totalUnlocks + 1,
        nudgeMessage: "Lockbox unlocked early. Try to stay focused on your next session! 💪"
      }));
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatTime12h = (h, m) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${ampm}`;
  };

  // Schedule Grid Operations
  const handleToggleSchedule = (id) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, active: !s.active };
      }
      return s;
    }));
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm("Delete this scheduled lock period?")) {
      setSchedules(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDaySelect = (dayVal) => {
    if (schedDays.includes(dayVal)) {
      setSchedDays(prev => prev.filter(d => d !== dayVal));
    } else {
      setSchedDays(prev => [...prev, dayVal]);
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!schedTitle.trim()) return alert("Please enter a title");
    if (schedDays.length === 0) return alert("Select at least one day");

    // Calculate duration in minutes
    const startTotal = parseInt(schedStartHour) * 60 + parseInt(schedStartMinute);
    const endTotal = parseInt(schedEndHour) * 60 + parseInt(schedEndMinute);
    let duration = endTotal - startTotal;
    if (duration <= 0) {
      duration += 24 * 60; // Spans overnight
    }

    if (duration < 30) {
      setSchedValidationError("Minimum lock duration is 30 minutes.");
      return;
    }

    setSchedValidationError("");

    const newSchedule = {
      id: Date.now(),
      title: schedTitle,
      days: schedDays,
      startHour: parseInt(schedStartHour),
      startMinute: parseInt(schedStartMinute),
      endHour: parseInt(schedEndHour),
      endMinute: parseInt(schedEndMinute),
      color: schedColor,
      active: true,
    };

    setSchedules(prev => [...prev, newSchedule]);
    
    // Reset Form
    setSchedTitle('');
    setSchedDays([1, 3]);
    setSchedStartHour(9);
    setSchedStartMinute(0);
    setSchedEndHour(9);
    setSchedEndMinute(30);
    setIsAddingSchedule(false);
  };

  // SVG parameters for Circular Progress Ring
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col gap-5 px-5 pt-4 animate-fade-in text-left">
      
      {/* App Header Status */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Detox Box</span>
          <h1 className="text-xl font-extrabold font-display bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none mt-1">
            DetoxBox Pro
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/40 rounded-full border border-slate-700/30 text-[10px] font-semibold text-teal-400">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse glow-teal"></span>
          <span>CONNECTED</span>
        </div>
      </div>

      {/* Hero Widget: AI Motivational Nudge */}
      <div className="relative p-4 rounded-2xl glass-panel-glow overflow-hidden group select-none">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-xl transition-all group-hover:scale-125"></div>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Zap size={18} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detox Coach</h4>
            <p className="text-sm font-medium text-slate-100 mt-1 leading-relaxed">
              "{data.nudgeMessage}"
            </p>
          </div>
        </div>
      </div>

      {/* Main Goal Circular Progress Card */}
      <div className="p-5 rounded-3xl glass-panel flex flex-col items-center relative overflow-hidden">
        
        {/* Background glow behind circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-teal-500/5 rounded-full blur-2xl"></div>
        
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Daily Goal Progress</h3>
        
        {/* SVG Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Track Ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-slate-800/60"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Ring with Gradient */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-teal-400 transition-all duration-1000 ease-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          
          {/* Centered Value */}
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-2xl font-bold font-display text-white tracking-tight glow-text-teal">{progressPercent}%</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{hours}h {minutes}m</span>
          </div>
        </div>

        {/* Goal Indicator Labels */}
        <div className="flex gap-8 mt-5 w-full justify-center border-t border-slate-800/40 pt-4 text-center">
          <div>
            <span className="text-xs text-slate-500 font-medium">Daily Target</span>
            <p className="text-sm font-bold text-slate-200 mt-0.5">{targetHours} hrs</p>
          </div>
          <div className="w-[1px] bg-slate-800/60 self-stretch"></div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Locked Today</span>
            <p className="text-sm font-bold text-teal-400 mt-0.5">{streakString}</p>
          </div>
        </div>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Unlocks Card */}
        <div className="p-4 rounded-2xl glass-card flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Unlock size={16} />
            </div>
            <span className="text-[9px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase">Today</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Unlocks</span>
            <span className="text-xl font-bold text-white font-display mt-0.5 block">{data.totalUnlocks}</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="p-4 rounded-2xl glass-card flex flex-col justify-between h-28">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Flame size={16} className="animate-pulse" />
            </div>
            <span className="text-[9px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full uppercase">Active</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lock Streak</span>
            <span className="text-xl font-bold text-white font-display mt-0.5 block">3 Days</span>
          </div>
        </div>

      </div>

      {/* Lock Control Action Panel */}
      {!activeTimer ? (
        <button
          onClick={() => setIsLocking(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-2 group transition-all duration-300 shadow-lg glow-teal border border-teal-300/20 cursor-pointer"
        >
          <Lock size={16} className="transition-transform group-hover:rotate-6" />
          <span>Lock Phone in Box</span>
          <ChevronRight size={14} className="opacity-60 transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">BOX LOCKED ACTIVE</span>
            </div>
            <button 
              onClick={handleCancelLock}
              className="p-1 rounded-md hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Remaining</span>
              <span className="text-3xl font-bold font-display text-white mt-1 block tracking-wider tabular-nums glow-text-blue">
                {formatTimer(timeRemaining)}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium text-right max-w-[150px]">
              Phone is sealed. Stay focused to build your GPA and rank.
            </div>
          </div>
        </div>
      )}

      {/* Lock Schedules Merged Section */}
      <div className="flex flex-col gap-3.5 mt-1 pb-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calendar size={14} className="text-teal-400" />
            <span>Lock Schedules</span>
          </h3>
          <button
            onClick={() => setIsAddingSchedule(true)}
            className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-all flex items-center justify-center gap-1 text-[10px] font-extrabold uppercase cursor-pointer"
          >
            <Plus size={12} />
            <span>Add</span>
          </button>
        </div>

        {/* List of Schedules */}
        <div className="flex flex-col gap-2.5">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`p-3.5 rounded-2xl flex justify-between items-center transition-all ${
                schedule.active 
                  ? 'border-l-4 border-l-teal-400 bg-slate-900/40 border-slate-800/80 shadow-md' 
                  : 'opacity-60 border-l-4 border-l-slate-700 bg-slate-900/20 border-slate-900/60'
              } border`}
            >
              <div className="flex flex-col gap-0.5 pr-2 max-w-[210px] truncate text-left">
                <span className="text-xs font-bold text-slate-200 block truncate">{schedule.title}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium mt-1">
                  <Clock size={11} className="text-slate-500" />
                  <span>
                    {formatTime12h(schedule.startHour, schedule.startMinute)} - {formatTime12h(schedule.endHour, schedule.endMinute)}
                  </span>
                </span>
                <span className="text-[8px] text-slate-500 font-extrabold uppercase tracking-wider block mt-1.5">
                  {schedule.days.length === 7 
                    ? 'Daily' 
                    : schedule.days.map(d => daysOfWeek.find(day => day.value === d).label).join(', ')
                  }
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleToggleSchedule(schedule.id)}
                  className="text-slate-450 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {schedule.active ? (
                    <ToggleRight size={26} className="text-teal-400" />
                  ) : (
                    <ToggleLeft size={26} className="text-slate-600" />
                  )}
                </button>
                <button 
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          
          {schedules.length === 0 && (
            <div className="text-center py-8 border border-dashed border-slate-800/60 rounded-2xl text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              No schedules active.
            </div>
          )}
        </div>
      </div>

      {/* Lock Duration Selector Overlay (Modal Drawer) */}
      {isLocking && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col justify-end p-5 animate-fade-in rounded-[42px]">
          <div className="bg-[#0f121e] rounded-3xl p-5 border border-slate-800/80 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-display text-white">Detox Lock Duration</h3>
              <button 
                onClick={() => setIsLocking(false)}
                className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Select the lock time. The lockbox physical door will latch closed and cannot be opened without emergency unlock penalization.
            </p>

            {/* Lock Grid Options */}
            <div className="grid grid-cols-4 gap-2.5 my-2">
              {[15, 30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setLockMinutes(m)}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                    lockMinutes === m
                      ? 'border-teal-400 bg-teal-500/10 text-teal-400 shadow-md'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>

            {/* Custom Range Slider */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Custom Duration</span>
                <span className="text-teal-400">{lockMinutes} Minutes</span>
              </div>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={lockMinutes}
                onChange={(e) => setLockMinutes(parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer h-1.5 rounded-lg bg-slate-800"
              />
            </div>

            {/* Validation Error Alert */}
            {lockMinutes < 30 && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10.5px] font-bold uppercase tracking-wider text-center animate-pulse">
                ⚠️ Minimum lock duration is 30 minutes.
              </div>
            )}

            <button
              onClick={handleStartLock}
              disabled={lockMinutes < 30}
              className={`w-full py-3.5 mt-1.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                lockMinutes < 30
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 hover:shadow-teal-500/20'
              }`}
            >
              <Play size={14} fill="currentColor" className={lockMinutes < 30 ? 'opacity-30' : ''} />
              <span>Lock Now for {lockMinutes} Min</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Schedule Form Drawer Modal */}
      {isAddingSchedule && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col justify-end p-5 animate-fade-in rounded-[42px]">
          <form onSubmit={handleAddSchedule} className="bg-[#0f121e] rounded-3xl p-5 border border-slate-800/80 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-display text-white">Add Lock Period</h3>
              <button 
                type="button"
                onClick={() => setIsAddingSchedule(false)}
                className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Event Name</label>
              <input
                type="text"
                placeholder="e.g. Study Hall, Lecture"
                value={schedTitle}
                onChange={(e) => setSchedTitle(e.target.value)}
                required
                className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/40"
              />
            </div>

            {/* Time Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
                <div className="flex gap-1">
                  <select 
                    value={schedStartHour} 
                    onChange={(e) => {
                      setSchedStartHour(parseInt(e.target.value));
                      setSchedValidationError("");
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-slate-350 w-1/2 focus:outline-none"
                  >
                    {Array.from({ length: 24 }).map((_, h) => (
                      <option key={h} value={h}>{h < 10 ? `0${h}` : h}</option>
                    ))}
                  </select>
                  <select 
                    value={schedStartMinute} 
                    onChange={(e) => {
                      setSchedStartMinute(parseInt(e.target.value));
                      setSchedValidationError("");
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-slate-350 w-1/2 focus:outline-none"
                  >
                    {[0, 15, 30, 45].map((m) => (
                      <option key={m} value={m}>{m < 10 ? `0${m}` : m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">End Time</label>
                <div className="flex gap-1">
                  <select 
                    value={schedEndHour} 
                    onChange={(e) => {
                      setSchedEndHour(parseInt(e.target.value));
                      setSchedValidationError("");
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-slate-350 w-1/2 focus:outline-none"
                  >
                    {Array.from({ length: 24 }).map((_, h) => (
                      <option key={h} value={h}>{h < 10 ? `0${h}` : h}</option>
                    ))}
                  </select>
                  <select 
                    value={schedEndMinute} 
                    onChange={(e) => {
                      setSchedEndMinute(parseInt(e.target.value));
                      setSchedValidationError("");
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-slate-350 w-1/2 focus:outline-none"
                  >
                    {[0, 15, 30, 45].map((m) => (
                      <option key={m} value={m}>{m < 10 ? `0${m}` : m}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Days selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Repeat Days</label>
              <div className="flex gap-1 justify-between">
                {daysOfWeek.map((day) => {
                  const selected = schedDays.includes(day.value);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => handleDaySelect(day.value)}
                      className={`w-8 h-8 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        selected 
                          ? 'border-teal-400 bg-teal-500/10 text-teal-400' 
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Color Accent</label>
              <div className="flex gap-3">
                {['teal', 'blue', 'purple'].map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setSchedColor(theme)}
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                      theme === 'teal' ? 'bg-teal-500' : theme === 'blue' ? 'bg-cyan-500' : 'bg-indigo-500'
                    } ${
                      schedColor === theme 
                        ? 'border-white scale-110 shadow-lg' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Validation Error Banner */}
            {schedValidationError && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider text-center animate-pulse">
                ⚠️ {schedValidationError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-lg hover:shadow-teal-500/20 cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Schedule</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
