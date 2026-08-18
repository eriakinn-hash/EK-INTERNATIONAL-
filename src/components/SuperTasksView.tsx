import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SuperTask } from '../types';
import {
  Zap,
  Flame,
  CalendarCheck,
  Crosshair,
  Disc,
  Star,
  Share2,
  ClipboardList,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Play,
  RotateCw,
  Gift,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const SuperTasksView: React.FC = () => {
  const {
    tasks,
    user,
    setSelectedTaskForRunning,
    performDailyCheckIn,
    completeSuperTask
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [checkInMsg, setCheckInMsg] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = user.lastCheckInDate === today;

  const handleCheckInClick = () => {
    const res = performDailyCheckIn();
    setCheckInMsg(res.message);
    setTimeout(() => setCheckInMsg(null), 5000);
  };

  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5 text-emerald-400" />;
      case 'Crosshair': return <Crosshair className="w-5 h-5 text-cyan-400" />;
      case 'Disc': return <Disc className="w-5 h-5 text-purple-400" />;
      case 'Star': return <Star className="w-5 h-5 text-amber-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-blue-400" />;
      case 'ClipboardList': return <ClipboardList className="w-5 h-5 text-rose-400" />;
      default: return <Zap className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (categoryFilter === 'all') return true;
    return t.category === categoryFilter;
  });

  const streakRewards = [
    { day: 1, reward: '$5.00', multiplier: '1.0x' },
    { day: 2, reward: '$6.25', multiplier: '1.25x' },
    { day: 3, reward: '$7.50', multiplier: '1.50x' },
    { day: 4, reward: '$8.75', multiplier: '1.75x' },
    { day: 5, reward: '$10.00', multiplier: '2.0x' },
    { day: 6, reward: '$11.25', multiplier: '2.25x' },
    { day: 7, reward: '$35.00', multiplier: 'MEGA + 2 Free Spins' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Interactive Bounties & Challenges
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Instant Balance Settlements
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            Super Tasks & Interactive Arena
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Take part in available super tasks, test your reflexes in skill mini-games, spin the Quantum Multiplier Wheel, and earn guaranteed rewards directly into your available balance.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-500">Lifetime Task Earnings:</span>
            <div className="font-mono-num font-bold text-emerald-400 text-sm mt-0.5">
              ${user.taskEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <span className="text-slate-500">Current Login Streak:</span>
            <div className="font-mono-num font-bold text-amber-400 text-sm mt-0.5">
              Day {user.streakDays} of 7
            </div>
          </div>
          <div>
            <span className="text-slate-500">Free Matrix Wheel Spins:</span>
            <div className="font-mono-num font-bold text-purple-400 text-sm mt-0.5">
              {user.freeSpinsAvailable} Available
            </div>
          </div>
          <div>
            <span className="text-slate-500">Tasks Completed Today:</span>
            <div className="font-mono-num font-bold text-cyan-400 text-sm mt-0.5">
              {tasks.filter(t => t.status === 'completed').length} / {tasks.length}
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Streak Hub */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Daily Check-In & Streak Multiplier
              </h2>
              <p className="text-xs text-slate-400">
                Log in every day to claim direct bounties and scale your earnings up to the Day 7 Mega Reward.
              </p>
            </div>
          </div>

          <button
            id="streak-hub-claim-btn"
            onClick={handleCheckInClick}
            disabled={hasCheckedInToday}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
              hasCheckedInToday
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{hasCheckedInToday ? 'Today’s Streak Claimed' : 'Claim Today’s Bonus'}</span>
          </button>
        </div>

        {checkInMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{checkInMsg}</span>
          </div>
        )}

        {/* 7 Day Visual Path */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
          {streakRewards.map((item) => {
            const isCompleted = item.day <= user.streakDays;
            const isCurrent = item.day === user.streakDays + 1 && !hasCheckedInToday;
            const isMega = item.day === 7;

            return (
              <div
                key={item.day}
                className={`rounded-2xl p-4 border text-center relative overflow-hidden transition-all ${
                  isMega
                    ? 'bg-gradient-to-b from-amber-950/40 to-slate-950 border-amber-500/50 shadow-md shadow-amber-500/10'
                    : isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold">Day {item.day}</span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>

                <div className="font-mono-num font-black text-base sm:text-lg text-white">
                  {item.reward}
                </div>

                <div className="text-[10px] text-amber-400 font-semibold mt-1">
                  {item.multiplier}
                </div>

                {isCurrent && (
                  <span className="block mt-2 text-[9px] font-bold uppercase bg-amber-500 text-slate-950 px-1 py-0.5 rounded">
                    Next Ready
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Super Tasks Categories & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {['all', 'gaming', 'daily', 'partner', 'social', 'survey'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Tasks' : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {filteredTasks.filter(t => t.status === 'completed').length} of {filteredTasks.length} Completed
        </span>
      </div>

      {/* Super Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const isDone = task.status === 'completed';
          const isGame = task.category === 'gaming';

          return (
            <div
              key={task.id}
              className={`bg-slate-900/90 border rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 relative group ${
                isDone
                  ? 'border-emerald-500/30 opacity-90'
                  : isGame
                  ? 'border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Task Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    {task.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono-num font-black text-base">
                    <span>+${task.rewardAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {getTaskIcon(task.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>Est: {task.timeEstimate}</span>
                      <span>•</span>
                      <span className="text-purple-400 font-medium">+{task.xpPoints} XP</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {task.description}
                </p>

                {/* Requirements checklist */}
                <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Requirements:
                  </div>
                  {task.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                {isDone ? (
                  <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed & Rewarded</span>
                  </div>
                ) : (
                  <button
                    id={`start-task-btn-${task.id}`}
                    onClick={() => setSelectedTaskForRunning(task)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                      isGame
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/30'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    }`}
                  >
                    {isGame ? <Play className="w-3.5 h-3.5 fill-current" /> : <Zap className="w-3.5 h-3.5" />}
                    <span>{isGame ? 'Launch Mini-Game' : 'Start Super Task'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Information Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 text-xs text-slate-400 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200 block text-sm mb-1">Fair Play & Verification Transparency</strong>
          <p>
            All super tasks, interactive games, and partner bounties are processed and verified automatically on the platform. Completed tasks are credited instantaneously to your Available Cash balance without withdrawal lockups.
          </p>
        </div>
      </div>

    </div>
  );
};
