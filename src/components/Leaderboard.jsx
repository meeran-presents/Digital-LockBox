import React, { useState } from 'react';
import { Trophy, Medal, Award, Flame, Search } from 'lucide-react';
import { leaderboardUsers } from '../mockData';

export default function Leaderboard() {
  const [filter, setFilter] = useState('hostel'); // 'hostel' or 'campus'
  const [searchQuery, setSearchQuery] = useState('');

  // Find current user stats
  const currentUser = leaderboardUsers.find(u => u.isCurrentUser);
  
  // Filter/Search users
  const filteredUsers = leaderboardUsers.filter(user => {
    // If filtering by hostel, keep all Ramanujan Hall residents or just display hostel rankings (mocked)
    if (filter === 'hostel') {
      // In this mock, we can display Ramanujan Hall & Bhabha Hall (A) which are similar.
      // Let's just show everyone but filter names based on search.
    }
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy size={12} strokeWidth={2.5} />
          </div>
        );
      case 2:
        return (
          <div className="w-6 h-6 rounded-full bg-slate-300/20 border border-slate-300/30 flex items-center justify-center text-slate-300">
            <Medal size={12} strokeWidth={2.5} />
          </div>
        );
      case 3:
        return (
          <div className="w-6 h-6 rounded-full bg-amber-700/20 border border-amber-700/30 flex items-center justify-center text-amber-600">
            <Award size={12} strokeWidth={2.5} />
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-400 text-[10px] font-bold">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ramanujan Hall Ranking</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Leaderboard</h2>
      </div>

      {/* User Rank Summary Widget */}
      <div className="p-4 rounded-2xl glass-panel-glow border-teal-500/25 flex justify-between items-center relative overflow-hidden">
        <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-teal-500/5 rounded-full blur-xl"></div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl border border-teal-500/20">
            {currentUser.avatar}
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Your Position</span>
            <span className="text-sm font-bold text-white block mt-0.5">{currentUser.name}</span>
            <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20 mt-1 inline-block uppercase">
              {currentUser.hostel}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Weekly Lock</span>
          <span className="text-base font-extrabold text-teal-400 block mt-0.5 glow-text-teal">{currentUser.hours} hrs</span>
          <span className="text-[9px] font-semibold text-slate-500 block mt-0.5">Rank #3 of 150</span>
        </div>
      </div>

      {/* Filter Toggle Controls */}
      <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setFilter('hostel')}
          className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
            filter === 'hostel'
              ? 'bg-slate-800 text-teal-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          My Hostel
        </button>
        <button
          onClick={() => setFilter('campus')}
          className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
            filter === 'campus'
              ? 'bg-slate-800 text-teal-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          All Campus
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search student rank..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/40"
        />
      </div>

      {/* Leaderboard Rankings List */}
      <div className="flex flex-col gap-2">
        {filteredUsers.map((user) => (
          <div
            key={user.rank}
            className={`p-3 rounded-xl flex justify-between items-center transition-all ${
              user.isCurrentUser
                ? 'bg-gradient-to-r from-teal-500/15 via-teal-500/5 to-transparent border border-teal-500/20 shadow-md glow-teal/5'
                : 'glass-card'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Rank Position Badge */}
              {getRankBadge(user.rank)}

              {/* Avatar Icon */}
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/20 flex items-center justify-center text-base">
                {user.avatar}
              </div>

              {/* Name and Hall */}
              <div>
                <span className={`text-xs font-semibold block ${user.isCurrentUser ? 'text-teal-400 font-bold' : 'text-slate-200'}`}>
                  {user.name} {user.isCurrentUser && <span className="text-[9px] text-teal-500/80 font-medium">(You)</span>}
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">{user.hostel}</span>
              </div>
            </div>

            {/* Locked Hours Score */}
            <div className="flex items-center gap-1.5 text-right">
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${user.isCurrentUser ? 'text-teal-400' : 'text-slate-200'}`}>
                  {user.hours}h
                </span>
                <span className="text-[8px] text-slate-500 font-semibold uppercase tracking-wider block">Lock Time</span>
              </div>
              <Flame size={12} className={user.rank <= 3 ? 'text-amber-500 animate-pulse' : 'text-slate-600'} />
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-500 font-medium">
            No students found matching "{searchQuery}"
          </div>
        )}
      </div>

    </div>
  );
}
