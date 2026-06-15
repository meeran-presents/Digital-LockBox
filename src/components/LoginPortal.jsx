import React, { useState } from 'react';
import { LockKeyhole, User, Key, ShieldAlert, Sparkles } from 'lucide-react';

export default function LoginPortal({ onLogin }) {
  const [selectedPortal, setSelectedPortal] = useState('student'); // 'student' or 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (selectedPortal === 'admin') {
      if (username === 'Admin' && password === 'Admin') {
        onLogin('admin');
      } else {
        setError("Invalid Admin credentials! Use 'Admin' / 'Admin'.");
      }
    } else {
      // Allow case-insensitive or exact check
      if (username.trim().toLowerCase() === 'student' && password === 'Student') {
        onLogin('student');
      } else {
        setError("Invalid Student credentials! Use 'Student' / 'Student'.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 pt-8 pb-4 justify-center min-h-[550px] animate-fade-in text-left">
      {/* Brand Header */}
      <div className="text-center flex flex-col items-center gap-1.5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${
          selectedPortal === 'admin' 
            ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
            : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
        }`}>
          <LockKeyhole size={22} className={selectedPortal === 'admin' ? 'text-purple-400' : 'text-teal-400'} />
        </div>
        <h2 className="text-xl font-black font-display text-white mt-1 tracking-tight">CAMPUS DETOX</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Digital Lockbox Portal</p>
      </div>

      {/* Portal Selection Tabs */}
      <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800/80">
        <button
          type="button"
          onClick={() => {
            setSelectedPortal('student');
            setError('');
            setUsername('');
            setPassword('');
          }}
          className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
            selectedPortal === 'student'
              ? 'bg-slate-800 text-teal-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Student Portal
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedPortal('admin');
            setError('');
            setUsername('');
            setPassword('');
          }}
          className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
            selectedPortal === 'admin'
              ? 'bg-slate-800 text-purple-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Admin Console
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2 items-center text-red-400 animate-pulse">
            <ShieldAlert size={14} className="shrink-0" />
            <span className="text-[10px] font-bold leading-relaxed">{error}</span>
          </div>
        )}

        {/* Username */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Username</label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              required
              placeholder={selectedPortal === 'admin' ? "Enter 'Admin'" : "Enter 'Student'"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650 focus:outline-none focus:border-slate-700 focus:bg-slate-900/60"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Password</label>
          <div className="relative">
            <Key size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              required
              placeholder={selectedPortal === 'admin' ? "Enter 'Admin'" : "Enter 'Student'"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-650 focus:outline-none focus:border-slate-700 focus:bg-slate-900/60"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-350 shadow-md cursor-pointer select-none border mt-2 ${
            selectedPortal === 'admin'
              ? 'bg-purple-500 hover:bg-purple-600 text-white border-purple-400/25 hover:shadow-purple-550/20'
              : 'bg-teal-500 hover:bg-teal-650 text-slate-950 border-teal-400/25 hover:shadow-teal-550/20 font-extrabold'
          }`}
        >
          Sign In
        </button>
      </form>

      {/* Info Callout / Demo Credentials Tip */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950/40 border border-slate-850 flex gap-2.5 items-start">
        <Sparkles size={14} className={`shrink-0 mt-0.5 ${selectedPortal === 'admin' ? 'text-purple-400' : 'text-teal-400'}`} />
        <div className="text-[9px]">
          <span className="font-extrabold text-slate-350 uppercase tracking-wider block">Demo Access Codes</span>
          <div className="text-slate-500 mt-1 flex flex-col gap-1">
            <div>🔑 <span className="font-bold text-slate-400">Student:</span> Student / Student</div>
            <div>🔑 <span className="font-bold text-slate-400">Admin:</span> Admin / Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
