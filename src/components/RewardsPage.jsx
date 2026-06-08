import React, { useState } from 'react';
import { Trophy, Lock, Unlock, Copy, Check, Sparkles, Gift, Flame } from 'lucide-react';

export default function RewardsPage({ rewards, setRewards, points }) {
  const [scratchingId, setScratchingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleScratch = (id) => {
    setScratchingId(id);
    
    // Simulate scratching action
    setTimeout(() => {
      setRewards(prev => prev.map(reward => {
        if (reward.id === id) {
          return { ...reward, scratched: true };
        }
        return reward;
      }));
      setScratchingId(null);
    }, 1200);
  };

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Achieve Goals & Redeem</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Rewards</h2>
      </div>

      {/* Points Counter Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 border border-teal-300/20 flex justify-between items-center shadow-lg relative overflow-hidden select-none glow-teal">
        {/* Glow orb */}
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center text-xl shadow-inner">
            🏆
          </div>
          <div>
            <span className="text-[9px] font-bold text-teal-950 uppercase tracking-wider block">Wallet Balance</span>
            <span className="text-lg font-black text-slate-950 font-display block leading-none mt-1">
              {points} Detox Points
            </span>
          </div>
        </div>
        
        <div className="bg-slate-950/20 px-2.5 py-1 rounded-lg text-[9px] font-bold text-slate-900 border border-white/10">
          PRO STUDENT
        </div>
      </div>

      {/* Rewards List */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available Coupons</span>

        {rewards.map((reward) => {
          const isLocked = reward.status === 'locked';
          const isScratching = scratchingId === reward.id;
          const isScratched = reward.scratched;

          return (
            <div
              key={reward.id}
              className={`p-4 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300 border flex flex-col ${
                isLocked 
                  ? 'border-slate-800/80 opacity-60' 
                  : isScratched 
                    ? 'border-teal-500/20 bg-teal-500/5'
                    : 'border-cyan-500/20'
              }`}
            >
              
              {/* Locked/Unlocked status top corner */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{reward.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{reward.title}</h4>
                    <p className="text-[9px] text-slate-500 font-semibold">{reward.condition}</p>
                  </div>
                </div>
                {isLocked ? (
                  <span className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-500 flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider">
                    <Lock size={10} />
                    <span>Locked</span>
                  </span>
                ) : (
                  <span className="p-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider">
                    <Unlock size={10} />
                    <span>Unlocked</span>
                  </span>
                )}
              </div>

              {/* Card Footer Details */}
              {isLocked ? (
                /* Locked State: Progress indicators */
                <div className="mt-2.5 pt-2.5 border-t border-slate-900/60 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[8px] font-bold uppercase text-slate-500 tracking-wider">
                    <span>Task Progress</span>
                    <span>40% Completed</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full w-[40%]"></div>
                  </div>
                </div>
              ) : isScratched ? (
                /* Scratched/Claimed Coupon Code Display */
                <div className="mt-2.5 pt-2.5 border-t border-slate-800/40 flex justify-between items-center gap-2 animate-fade-in">
                  <div>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Redeem Code</span>
                    <code className="text-sm font-black tracking-widest text-teal-400 font-mono mt-0.5 block glow-text-teal">
                      {reward.code}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopy(reward.id, reward.code)}
                    className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 text-teal-400 transition-all flex items-center gap-1 text-[9px] font-bold uppercase"
                  >
                    {copiedId === reward.id ? (
                      <>
                        <Check size={12} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Unlocked & Unscratched: Scratch Foil Layer overlay */
                <div className="absolute inset-0 z-30 bg-[#0f121e] flex flex-col items-center justify-center p-4">
                  
                  {/* Metal Foil effect overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all select-none border border-slate-700/50 rounded-2xl"
                    onClick={() => handleScratch(reward.id)}
                  >
                    
                    {/* Shimmer line */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>

                    {isScratching ? (
                      /* Scratching simulation effect */
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin"></div>
                        <span className="text-[9px] font-extrabold text-teal-400 uppercase tracking-widest animate-pulse">
                          Scratching card...
                        </span>
                      </div>
                    ) : (
                      /* Static tap-to-scratch display */
                      <>
                        <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400 shadow-md">
                          <Gift size={16} className="animate-bounce" />
                        </div>
                        <span className="text-[10px] font-black text-slate-100 tracking-widest uppercase">
                          Scratch & Win
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          Tap card to reveal code
                        </span>
                      </>
                    )}

                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
