import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  PlusCircle,
  Bike,
  Bus,
  Plane,
  Train,
  Rocket
} from 'lucide-react';

export const SubscribeModal: React.FC = () => {
  const {
    selectedPlanForSubscribe,
    setSelectedPlanForSubscribe,
    user,
    subscribeToPlan,
    setIsDepositModalOpen
  } = useApp();

  const plan = selectedPlanForSubscribe;
  const [stakeAmount, setStakeAmount] = useState<number>(() => (plan ? plan.minDeposit : 100000));
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!plan) return null;

  const hasEnoughFunds = user.mainBalance >= stakeAmount;
  const dailyYield = +(stakeAmount * (plan.dailyRoiPercent / 100)).toFixed(0);
  const totalNetProfit = +(dailyYield * plan.durationDays).toFixed(0);
  const totalMaturityReturn = +(stakeAmount + totalNetProfit).toFixed(0);

  const getMonthlyMax = (id: string) => {
    switch (id) {
      case 'plan_bus_100k': return 'UGX 3,000,000';
      case 'plan_plane_500k': return 'UGX 4,500,000';
      case 'plan_gold_train_1m': return 'UGX 5,000,000';
      case 'plan_spaceship_4m': return 'UGX 8,000,000';
      default: return `UGX ${totalMaturityReturn.toLocaleString()}`;
    }
  };

  const getPlanIcon = (name: string) => {
    switch (name) {
      case 'Bus': return <Bus className="w-5 h-5 text-cyan-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-blue-400" />;
      case 'Train': return <Train className="w-5 h-5 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-purple-400" />;
      default: return <TrendingUp className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setErrorMsg('Please review and accept the plan terms and risk disclosures.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    setTimeout(() => {
      const res = subscribeToPlan(plan.id, stakeAmount);
      setIsProcessing(false);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSelectedPlanForSubscribe(null);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner"
              style={{
                backgroundColor: `${plan.accentColor}18`,
                borderColor: `${plan.accentColor}40`
              }}
            >
              {getPlanIcon(plan.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  {plan.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400">
                  {plan.tier}
                </span>
              </div>
              <p className="text-xs text-slate-400">{plan.durationDays}-Day Contract • Live Streaming Yields</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedPlanForSubscribe(null)}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Banner */}
        <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/10 border border-emerald-500/30 rounded-2xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Guaranteed Fleet Protocol Return</span>
          </div>
          <p className="text-xs text-slate-200 mt-1">
            Invest <strong className="text-emerald-400">UGX {plan.minDeposit.toLocaleString()}</strong> & get <strong className="text-emerald-400">UGX {dailyYield.toLocaleString()} Daily Profit</strong> streaming live for <strong>30 Days</strong> (Monthly payout potential <strong className="text-amber-400">{getMonthlyMax(plan.id)}</strong>).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Plan Highlights */}
          <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/90 text-center">
            <div className="border-r border-slate-800/80 pr-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Daily Payout Profit</span>
              <div className="text-base sm:text-lg font-black font-mono-num text-emerald-400 mt-0.5">
                UGX {dailyYield.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500">Live second-by-second</span>
            </div>
            <div className="pl-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Term Validity</span>
              <div className="text-base sm:text-lg font-black font-mono-num text-amber-400 mt-0.5">
                {plan.durationDays} Days
              </div>
              <span className="text-[10px] text-slate-500">Principal returned</span>
            </div>
          </div>

          {/* Liquid balance reminder */}
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-slate-400">Your Available Balance:</span>
            <span className="font-mono-num font-bold text-slate-200">
              UGX {user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Amount input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Participation Capital (UGX):
              </label>
              <span className="text-[11px] text-slate-500 font-mono-num">
                {plan.minDeposit === plan.maxDeposit
                  ? `Fixed: UGX ${plan.minDeposit.toLocaleString()}`
                  : `Range: UGX ${plan.minDeposit.toLocaleString()} - UGX ${plan.maxDeposit.toLocaleString()}`}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">UGX</span>
              <input
                type="number"
                min={plan.minDeposit}
                max={plan.maxDeposit}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-14 pr-4 py-2.5 text-sm text-white font-mono-num font-bold focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          {/* Live Projection Box */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Daily Streamed Profit:</span>
              <span className="font-mono-num font-bold text-emerald-400">
                +UGX {dailyYield.toLocaleString()} / day
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Total 30-Day Base Yield:</span>
              <span className="font-mono-num font-bold text-amber-400">
                +UGX {totalNetProfit.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Monthly Max Potential:</span>
              <span className="font-mono-num font-bold text-cyan-400">
                {getMonthlyMax(plan.id)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300 font-bold pt-2 border-t border-slate-800">
              <span>Total Capital Returned + Base Return:</span>
              <span className="font-mono-num text-white text-sm">
                UGX {totalMaturityReturn.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="plan-terms-check"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="accent-amber-500 mt-1 cursor-pointer"
            />
            <label htmlFor="plan-terms-check" className="text-xs text-slate-400 leading-tight cursor-pointer">
              I have reviewed the plan requirements (Invest UGX {plan.minDeposit.toLocaleString()}, UGX {dailyYield.toLocaleString()} daily profit, 30 days validity) for <strong className="text-slate-300">{plan.name}</strong>.
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!hasEnoughFunds && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>Insufficient liquid balance (Need UGX {stakeAmount.toLocaleString()}).</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://store.pesapal.com/ekworldcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                >
                  <span>Pay on Pesapal</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanForSubscribe(null);
                    setIsDepositModalOpen(true);
                  }}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[11px] transition-colors"
                >
                  Deposit
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedPlanForSubscribe(null)}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-plan-stake-btn"
              disabled={isProcessing || !hasEnoughFunds || stakeAmount < plan.minDeposit || stakeAmount > plan.maxDeposit}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all ${
                hasEnoughFunds
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Activating Node...'
                  : `Invest (UGX ${stakeAmount.toLocaleString()})`}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
