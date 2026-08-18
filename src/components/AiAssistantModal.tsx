import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bot,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const AiAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, plans, setSelectedPlanForSubscribe, user } = useApp();

  const [budget, setBudget] = useState<number>(2500);
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'balanced' | 'high'>('balanced');
  const [taskTime, setTaskTime] = useState<'5min' | '15min' | '30min'>('15min');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  if (!isAiModalOpen) return null;

  const handleGenerateStrategy = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let targetPlan = plans[1]; // Gamer Growth
      if (riskTolerance === 'low' || budget <= 500) {
        targetPlan = plans[0]; // Starter Spark 7D
      } else if (riskTolerance === 'high' && budget >= 5000) {
        targetPlan = plans[3]; // Quantum 60D
      } else if (budget >= 1000) {
        targetPlan = plans[2]; // Apex 30D
      }

      const dailyRoiAmt = +(budget * (targetPlan.dailyRoiPercent / 100)).toFixed(2);
      const totalContractRoi = +(dailyRoiAmt * targetPlan.durationDays).toFixed(2);
      const estimatedDailyTasks = taskTime === '5min' ? 15.00 : taskTime === '15min' ? 35.00 : 65.00;
      const combinedMonthly = +(dailyRoiAmt * 30 + estimatedDailyTasks * 30).toFixed(2);

      setRecommendation({
        plan: targetPlan,
        dailyRoiAmt,
        totalContractRoi,
        estimatedDailyTasks,
        combinedMonthly,
        insights: [
          `Allocating $${budget.toLocaleString()} to ${targetPlan.name} yields an estimated +$${dailyRoiAmt}/day from automated staking alone.`,
          `Combining with ${taskTime} daily Super Tasks adds an additional ~$${estimatedDailyTasks}/day in direct liquid bounties.`,
          `Total estimated 30-day return potential: ~$${combinedMonthly.toLocaleString()} USD.`
        ]
      });

      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-lg text-white">
                  EK-AI Strategy Advisor
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-purple-500 text-white">
                  Smart
                </span>
              </div>
              <p className="text-xs text-slate-400">Personalized plan allocation & Super Task optimizer</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="mt-5 space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold uppercase tracking-wider text-slate-400">
                1. Target Budget Allocation:
              </label>
              <span className="font-mono-num font-bold text-purple-400 text-sm">
                ${budget.toLocaleString()} USD
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="25000"
              step="50"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-purple-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              2. Risk Tolerance:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Conservative', desc: '7-Day Cycles' },
                { id: 'balanced', label: 'Balanced', desc: '14-30D Nodes' },
                { id: 'high', label: 'Max Growth', desc: '60-90D Vaults' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRiskTolerance(r.id as any)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    riskTolerance === r.id
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white">{r.label}</div>
                  <div className="text-[10px] opacity-75">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              3. Daily Active Time for Super Tasks:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '5min', label: '5 Mins', desc: 'Daily Check-in & Spin' },
                { id: '15min', label: '15 Mins', desc: 'Reflex Tap + Reviews' },
                { id: '30min', label: '30+ Mins', desc: 'All Daily Arena Tasks' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTaskTime(t.id as any)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    taskTime === t.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-white">{t.label}</div>
                  <div className="text-[10px] opacity-75">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateStrategy}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-purple-900/30 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Analyzing Portfolio...' : 'Generate EK-AI Strategy'}</span>
          </button>
        </div>

        {/* Strategy Output */}
        {recommendation && (
          <div className="mt-5 p-4 bg-slate-950 rounded-2xl border border-purple-500/40 space-y-3 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 font-semibold">Recommended Target Node:</span>
              <span className="font-bold text-amber-400 text-sm">{recommendation.plan.name}</span>
            </div>

            <div className="space-y-1.5">
              {recommendation.insights.map((ins: string, idx: number) => (
                <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ins}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedPlanForSubscribe(recommendation.plan);
                  setIsAiModalOpen(false);
                }}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <span>Subscribe to {recommendation.plan.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
