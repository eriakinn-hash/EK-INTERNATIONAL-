import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';

export const LiveTicker: React.FC = () => {
  const { liveActivities } = useApp();

  return (
    <div id="live-ticker-bar" className="w-full bg-slate-900/90 border-y border-slate-800/80 px-4 py-2 overflow-hidden flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-semibold tracking-wide uppercase text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        Live Network Feed
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-8 items-center animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {liveActivities.map((act) => (
            <div key={act.id} className="inline-flex items-center gap-2 text-slate-300">
              <span className="font-mono-num text-slate-400 font-medium">{act.userMasked}</span>
              <span className="text-slate-400">{act.action}</span>
              <span className={`font-mono-num font-bold flex items-center ${
                act.type === 'withdrawal' ? 'text-cyan-400' :
                act.type === 'deposit' ? 'text-emerald-400' :
                act.type === 'stake' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                +${act.amount.toFixed(2)}
              </span>
              <span className="text-slate-600 text-[10px]">({act.timeAgo})</span>
              <span className="text-slate-700">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
