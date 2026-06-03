import React, { useState } from 'react';
import { Calendar, Plus, Trash2, X, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

export default function LockSchedulePage({ schedules, setSchedules }) {
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(10);
  const [endMinute, setEndMinute] = useState(30);
  const [selectedDays, setSelectedDays] = useState([1, 3]); // Mon, Wed default
  const [colorTheme, setColorTheme] = useState('teal');

  const daysOfWeek = [
    { label: 'S', value: 0, fullName: 'Sunday' },
    { label: 'M', value: 1, fullName: 'Monday' },
    { label: 'T', value: 2, fullName: 'Tuesday' },
    { label: 'W', value: 3, fullName: 'Wednesday' },
    { label: 'T', value: 4, fullName: 'Thursday' },
    { label: 'F', value: 5, fullName: 'Friday' },
    { label: 'S', value: 6, fullName: 'Saturday' },
  ];

  // Grid Time blocks for visual mockup
  const timeBlocks = [
    { label: 'Sleep (22:00-06:00)', start: 22, end: 6 },
    { label: 'Morning (08:00-12:00)', start: 8, end: 12 },
    { label: 'Mid-day (12:00-15:00)', start: 12, end: 15 },
    { label: 'Afternoon (15:00-18:00)', start: 15, end: 18 },
    { label: 'Evening (18:00-22:00)', start: 18, end: 22 },
  ];

  const handleToggleActive = (id) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, active: !s.active };
      }
      return s;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this scheduled lock period?")) {
      setSchedules(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDaySelect = (dayVal) => {
    if (selectedDays.includes(dayVal)) {
      setSelectedDays(prev => prev.filter(d => d !== dayVal));
    } else {
      setSelectedDays(prev => [...prev, dayVal]);
    }
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title");
    if (selectedDays.length === 0) return alert("Select at least one day");

    const newSchedule = {
      id: Date.now(),
      title,
      days: selectedDays,
      startHour: parseInt(startHour),
      startMinute: parseInt(startMinute),
      endHour: parseInt(endHour),
      endMinute: parseInt(endMinute),
      color: colorTheme,
      active: true,
    };

    setSchedules(prev => [...prev, newSchedule]);
    
    // Reset Form
    setTitle('');
    setSelectedDays([1, 3]);
    setIsAdding(false);
  };

  // Check if a time block on a specific day is scheduled locked
  const isCellLocked = (dayValue, block) => {
    return schedules.some(s => {
      if (!s.active) return false;
      if (!s.days.includes(dayValue)) return false;

      // Handle overnight schedules (like Sleep Lock: 22:00 to 06:00)
      if (s.startHour > s.endHour) {
        // Sleep block checks: overlaps block if block is sleep or matches times
        if (block.start === 22) return true;
        return false;
      }

      // Regular daytime schedules (e.g. 10:00 - 11:30)
      // Check overlap with block range
      const sStart = s.startHour + s.startMinute / 60;
      const sEnd = s.endHour + s.endMinute / 60;
      const bStart = block.start;
      const bEnd = block.end;

      return (sStart < bEnd && sEnd > bStart);
    });
  };

  // Helper to format 24h to 12h
  const formatTime = (h, m) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${ampm}`;
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Offline Scheduling</span>
          <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Lock Schedule</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-all flex items-center justify-center gap-1 text-[11px] font-bold"
        >
          <Plus size={14} />
          <span>Add</span>
        </button>
      </div>

      {/* Visual Weekly Grid Map */}
      <div className="p-4 rounded-2xl glass-panel flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Weekly Timetable Map</h3>
        
        <div className="grid grid-cols-8 gap-1 pt-1">
          {/* Empty corner cell */}
          <div className="text-[8px] font-bold text-slate-600 self-center uppercase text-right pr-1">Time</div>
          
          {/* Days Headers */}
          {daysOfWeek.map((day) => (
            <div key={day.value} className="text-center text-[10px] font-extrabold text-slate-400 py-1 uppercase bg-slate-900/40 rounded border border-slate-800/10">
              {day.label}
            </div>
          ))}

          {/* Grid Rows for Time Blocks */}
          {timeBlocks.map((block, idx) => (
            <React.Fragment key={idx}>
              {/* Row Label */}
              <div className="text-[8px] font-semibold text-slate-500 self-center truncate pr-1" title={block.label}>
                {block.label.split(' ')[0]}
              </div>

              {/* Day cells for this row */}
              {daysOfWeek.map((day) => {
                const locked = isCellLocked(day.value, block);
                return (
                  <div
                    key={day.value}
                    className={`h-7 rounded transition-all duration-300 flex items-center justify-center border ${
                      locked
                        ? 'bg-gradient-to-br from-teal-500/25 to-blue-500/10 border-teal-400/40 glow-teal/5 shadow-inner'
                        : 'bg-slate-950/20 border-slate-900/30'
                    }`}
                  >
                    {locked && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="flex gap-4 items-center mt-1.5 text-[9px] font-medium text-slate-500 justify-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-gradient-to-br from-teal-500/25 to-blue-500/10 border border-teal-400/40"></span>
            <span>Offline Lock Block</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-950/20 border border-slate-900/30"></span>
            <span>Available Screen Time</span>
          </div>
        </div>
      </div>

      {/* Schedules List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Schedule Blocks</h3>

        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className={`p-4 rounded-2xl glass-card flex justify-between items-center transition-all ${
              schedule.active ? 'border-l-4 border-l-teal-400' : 'opacity-65 border-l-4 border-l-slate-700'
            }`}
          >
            <div className="flex flex-col gap-1 pr-4 max-w-[200px]">
              <span className="text-xs font-bold text-slate-200 block truncate">{schedule.title}</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock size={11} />
                <span>
                  {formatTime(schedule.startHour, schedule.startMinute)} - {formatTime(schedule.endHour, schedule.endMinute)}
                </span>
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-semibold tracking-wider block">
                {schedule.days.length === 7 
                  ? 'Every Day' 
                  : schedule.days.map(d => daysOfWeek.find(day => day.value === d).label).join(', ')
                }
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle switch */}
              <button 
                onClick={() => handleToggleActive(schedule.id)}
                className="text-slate-400 hover:text-teal-400 transition-colors"
              >
                {schedule.active ? (
                  <ToggleRight size={28} className="text-teal-400" />
                ) : (
                  <ToggleLeft size={28} className="text-slate-600" />
                )}
              </button>
              
              {/* Trash/Delete */}
              <button 
                onClick={() => handleDelete(schedule.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {schedules.length === 0 && (
          <div className="text-center py-8 glass-panel rounded-2xl text-xs text-slate-500 font-semibold uppercase tracking-wider">
            No scheduled locks configured.
          </div>
        )}
      </div>

      {/* Add Schedule Form Drawer Modal */}
      {isAdding && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col justify-end p-5 animate-fade-in rounded-[42px]">
          <form onSubmit={handleAddSchedule} className="bg-[#0f121e] rounded-3xl p-5 border border-slate-800/80 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold font-display text-white">Add Lock Period</h3>
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Event Name</label>
              <input
                type="text"
                placeholder="e.g. Study Hall, Morning Lecture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/40"
              />
            </div>

            {/* Time Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
                <div className="flex gap-1.5">
                  <select 
                    value={startHour} 
                    onChange={(e) => setStartHour(parseInt(e.target.value))}
                    className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-slate-300 w-full"
                  >
                    {Array.from({ length: 24 }).map((_, h) => (
                      <option key={h} value={h}>{h < 10 ? `0${h}` : h}:00</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">End Time</label>
                <select 
                  value={endHour} 
                  onChange={(e) => setEndHour(parseInt(e.target.value))}
                  className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-2 text-xs text-slate-300 w-full"
                >
                  {Array.from({ length: 24 }).map((_, h) => (
                    <option key={h} value={h}>{h < 10 ? `0${h}` : h}:00</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Days selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Repeat Days</label>
              <div className="flex gap-1 justify-between">
                {daysOfWeek.map((day) => {
                  const selected = selectedDays.includes(day.value);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => handleDaySelect(day.value)}
                      className={`w-8 h-8 rounded-lg text-[10px] font-bold border transition-all ${
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
                    onClick={() => setColorTheme(theme)}
                    className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                      theme === 'teal' ? 'bg-teal-500' : theme === 'blue' ? 'bg-cyan-500' : 'bg-indigo-500'
                    } ${
                      colorTheme === theme 
                        ? 'border-white scale-110 shadow-lg' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-lg hover:shadow-teal-500/20"
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
