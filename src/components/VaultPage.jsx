import React, { useState } from 'react';
import { Trophy, Lock, Unlock, Copy, Check, Sparkles, Gift, AlertTriangle, Trash2, CheckCheck, ShieldAlert } from 'lucide-react';

export default function VaultPage({ rewards, setRewards, points, securityLogs, setSecurityLogs }) {
  const [subTab, setSubTab] = useState('rewards'); // 'rewards' or 'security'
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

  const handleDeleteLog = (id) => {
    setSecurityLogs(prev => prev.filter(log => log.id !== id));
  };

  const handleClearLogs = () => {
    if (window.confirm("Clear all security alert logs?")) {
      setSecurityLogs([]);
    }
  };

  // Simulate live hardware security alerts
  const handleSimulateAlert = (alertType) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let title = "";
    let message = "";
    let badge = "";
    let badgeColor = "";

    if (alertType === 'tamper') {
      title = "Tamper Detected";
      message = `⚠️ Tamper Detected: Box forced open at ${timeNow}`;
      badge = "Tamper";
      badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
    } else if (alertType === 'emergency') {
      title = "Emergency Override";
      message = `🚨 Emergency Button Pressed - physical release bypass at ${timeNow}`;
      badge = "Emergency";
      badgeColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
    } else {
      title = "Unauthorized Access";
      message = `📱 Device accessed without lockbox approval at ${timeNow}`;
      badge = "Security";
      badgeColor = "bg-red-500/10 text-red-400 border-red-500/20";
    }

    const newLog = {
      id: Date.now(),
      type: "security",
      title,
      message,
      time: "Just now",
      badge,
      badgeColor
    };

    setSecurityLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 animate-fade-in text-left">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Vault & Logs</span>
        <h2 className="text-xl font-extrabold font-display text-white mt-0.5">Vault</h2>
      </div>

      {/* Points Counter Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 border border-teal-300/20 flex justify-between items-center shadow-lg relative overflow-hidden select-none glow-teal">
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
        <div className="bg-slate-950/20 px-2 py-0.5 rounded text-[8px] font-extrabold text-slate-900 border border-white/10">
          PRO STATUS
        </div>
      </div>

      {/* Sub Tab Switcher */}
      <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => setSubTab('rewards')}
          className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            subTab === 'rewards'
              ? 'bg-slate-800 text-teal-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Gift size={12} />
          <span>Redeem Rewards</span>
        </button>
        <button
          onClick={() => setSubTab('security')}
          className={`flex-1 py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            subTab === 'security'
              ? 'bg-slate-800 text-red-400 border border-slate-700/30 shadow-md'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <AlertTriangle size={12} />
          <span>Security Logs</span>
        </button>
      </div>

      {/* Content Render */}
      {subTab === 'rewards' ? (
        /* Redeem Rewards view */
        <div className="flex flex-col gap-3">
          {rewards.map((reward) => {
            const isLocked = reward.status === 'locked';
            const isScratching = scratchingId === reward.id;
            const isScratched = reward.scratched;

            return (
              <div
                key={reward.id}
                className={`p-4 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300 border flex flex-col ${
                  isLocked 
                    ? 'border-slate-800/85 opacity-60' 
                    : isScratched 
                      ? 'border-teal-500/20 bg-teal-500/5'
                      : 'border-cyan-500/20'
                }`}
              >
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

                {isLocked ? (
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
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800/40 flex justify-between items-center gap-2 animate-fade-in">
                    <div>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Redeem Code</span>
                      <code className="text-sm font-black tracking-widest text-teal-400 font-mono mt-0.5 block glow-text-teal">
                        {reward.code}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopy(reward.id, reward.code)}
                      className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 text-teal-400 transition-all flex items-center gap-1 text-[9px] font-bold uppercase cursor-pointer"
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
                  <div className="absolute inset-0 z-30 bg-[#0f121e] flex flex-col items-center justify-center p-4">
                    <div 
                      className="absolute inset-0 bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-800 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all select-none border border-slate-700/50 rounded-2xl"
                      onClick={() => handleScratch(reward.id)}
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                      {isScratching ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin"></div>
                          <span className="text-[9px] font-extrabold text-teal-400 uppercase tracking-widest animate-pulse">
                            Scratching...
                          </span>
                        </div>
                      ) : (
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
      ) : (
        /* Security Log view */
        <div className="flex flex-col gap-3.5">
          {/* Simulator Actions */}
          <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-850 flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">Tamper Simulation Console</span>
              {securityLogs.length > 0 && (
                <button
                  onClick={handleClearLogs}
                  className="flex items-center gap-1 text-[9px] font-bold text-slate-500 hover:text-red-400 transition-colors uppercase py-0.5 px-1.5 rounded hover:bg-red-500/5 cursor-pointer"
                >
                  <CheckCheck size={11} />
                  <span>Clear All</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handleSimulateAlert('tamper')}
                className="py-1.5 px-1.5 rounded-xl bg-red-550/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-[8px] font-extrabold uppercase tracking-tight cursor-pointer"
              >
                Tamper Open
              </button>
              <button
                onClick={() => handleSimulateAlert('emergency')}
                className="py-1.5 px-1.5 rounded-xl bg-orange-550/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 transition-all text-[8px] font-extrabold uppercase tracking-tight cursor-pointer"
              >
                Emergency
              </button>
              <button
                onClick={() => handleSimulateAlert('breach')}
                className="py-1.5 px-1.5 rounded-xl bg-red-550/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-[8px] font-extrabold uppercase tracking-tight cursor-pointer"
              >
                Device Access
              </button>
            </div>
          </div>

          {/* Security alerts list */}
          <div className="flex flex-col gap-3">
            {securityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-red-950/10 border border-red-900/40 relative overflow-hidden group flex gap-3 animate-fade-in"
              >
                <div className="w-8 h-8 rounded-xl bg-red-950/40 border border-red-900/50 flex items-center justify-center shrink-0">
                  <ShieldAlert size={15} className="text-red-400 animate-pulse" />
                </div>
                <div className="flex-1 pr-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{log.title}</span>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${log.badgeColor}`}>
                      {log.badge}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-red-300/90 mt-1.5 leading-relaxed">
                    {log.message}
                  </p>
                  <span className="text-[9px] text-slate-500 font-bold block mt-2">
                    {log.time}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="absolute right-3.5 top-3.5 p-1 rounded-md bg-slate-900/40 hover:bg-red-500/10 text-slate-600 hover:text-red-400 border border-slate-800/60 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}

            {securityLogs.length === 0 && (
              <div className="text-center py-12 glass-panel rounded-2xl flex flex-col items-center justify-center gap-3">
                <ShieldAlert size={24} className="text-slate-655" />
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logs Clear</p>
                  <p className="text-[10px] text-slate-500 mt-1">No tamper alerts or overrides detected.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
