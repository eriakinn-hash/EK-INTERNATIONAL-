import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InvestmentPlan } from '../types';
import {
  TrendingUp,
  Zap,
  Gamepad2,
  Cpu,
  Sparkles,
  Crown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calculator,
  ArrowUpRight,
  Info,
  DollarSign,
  AlertCircle,
  ChevronRight,
  Bike,
  Bus,
  Plane,
  Train,
  Rocket
} from 'lucide-react';

export const PlansView: React.FC = () => {
  const {
    plans,
    activeContracts,
    user,
    setSelectedPlanForSubscribe,
    setIsDepositModalOpen,
    claimYield
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pkg1_2' | 'pkg3_4'>('all');
  
  // Interactive Profitability Calculator State
  const [calcPlanId, setCalcPlanId] = useState<string>(plans[0]?.id || 'plan_bus_100k');
  const [calcAmount, setCalcAmount] = useState<number>(100000);

  const selectedCalcPlan = plans.find(p => p.id === calcPlanId) || plans[0];
  const calculatedDailyProfit = +(calcAmount * (selectedCalcPlan.dailyRoiPercent / 100)).toFixed(0);
  const calculatedTotalProfit = +(calculatedDailyProfit * selectedCalcPlan.durationDays).toFixed(0);
  const calculatedTotalPayout = +(calcAmount + calculatedTotalProfit).toFixed(0);

  const getPlanIcon = (name: string) => {
    switch (name) {
      case 'Bus': return <Bus className="w-5 h-5 text-cyan-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-blue-400" />;
      case 'Train': return <Train className="w-5 h-5 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-purple-400" />;
      default: return <TrendingUp className="w-5 h-5 text-amber-400" />;
    }
  };

  const getMonthlyMaxYield = (planId: string) => {
    switch (planId) {
      case 'plan_bus_100k': return 'UGX 3,000,000';
      case 'plan_plane_500k': return 'UGX 4,500,000';
      case 'plan_gold_train_1m': return 'UGX 5,000,000';
      case 'plan_spaceship_4m': return 'UGX 8,000,000';
      default: return 'High Yield Potential';
    }
  };

  const filteredPlans = plans.filter(p => {
    if (activeFilter === 'pkg1_2') return p.id === 'plan_bus_100k' || p.id === 'plan_plane_500k';
    if (activeFilter === 'pkg3_4') return p.id === 'plan_gold_train_1m' || p.id === 'plan_spaceship_4m';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Yield & Staking Protocols
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Principal Returned Upon Maturity
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            Choose Your Participation Plan
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Review the available plans and select one that suits your goals and budget. Each plan clearly explains its duration, minimum requirements, daily rate, and applicable rewards in UGX (Uganda Shillings).
          </p>
        </div>

        {/* Quick Staking Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-500">Available Liquid:</span>
            <div className="font-mono-num font-bold text-slate-200 text-sm mt-0.5">
              UGX {user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <span className="text-slate-500">Currently Staked:</span>
            <div className="font-mono-num font-bold text-cyan-400 text-sm mt-0.5">
              UGX {user.stakedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <span className="text-slate-500">Active Contracts:</span>
            <div className="font-mono-num font-bold text-amber-400 text-sm mt-0.5">
              {activeContracts.length} Nodes Running
            </div>
          </div>
          <div>
            <span className="text-slate-500">Payout Frequency:</span>
            <div className="font-semibold text-emerald-400 text-sm mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Streaming (Second-by-Second)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Plan Profitability Calculator */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Interactive Profitability Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Simulate potential yields and calculate returns based on your chosen participation plan in UGX.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Formula: Net Yield = Capital × Daily Rate × Term Days
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
          
          {/* Left Inputs */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                1. Select Target Plan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCalcPlanId(p.id);
                      if (calcAmount < p.minDeposit) setCalcAmount(p.minDeposit);
                      if (calcAmount > p.maxDeposit) setCalcAmount(p.maxDeposit);
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                      calcPlanId === p.id
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-slate-200">{p.name}</div>
                    <div className="text-[11px] text-emerald-400 font-mono-num mt-0.5">
                      {p.dailyRoiPercent}%/day • {p.durationDays}D
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Participation Deposit Capital (UGX):
                </label>
                <span className="font-mono-num font-bold text-sm text-amber-400">
                  UGX {calcAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={selectedCalcPlan.minDeposit}
                max={Math.min(5000000, selectedCalcPlan.maxDeposit)}
                step={selectedCalcPlan.minDeposit >= 50000 ? 10000 : 5000}
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono-num mt-1">
                <span>Min: UGX {selectedCalcPlan.minDeposit.toLocaleString()}</span>
                <span>Max Allowed: UGX {selectedCalcPlan.maxDeposit.toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Amount Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Quick Presets:</span>
              {[50000, 100000, 500000, 1000000, 4000000].map((preset) => {
                if (preset < selectedCalcPlan.minDeposit || preset > selectedCalcPlan.maxDeposit) return null;
                return (
                  <button
                    key={preset}
                    onClick={() => setCalcAmount(preset)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-num transition-colors"
                  >
                    UGX {preset.toLocaleString()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Projection Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-950 to-amber-950/30 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold">Yield Projection Summary</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                +{selectedCalcPlan.totalRoiPercent}% ROI
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Selected Node:</span>
                <span className="font-bold text-slate-200">{selectedCalcPlan.name} ({selectedCalcPlan.durationDays} Days)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Daily Return Rate:</span>
                <span className="font-bold text-emerald-400 font-mono-num">
                  +{selectedCalcPlan.dailyRoiPercent}% / day (UGX {calculatedDailyProfit.toLocaleString()}/day)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Net Yield Profit:</span>
                <span className="font-bold text-amber-400 font-mono-num text-sm">
                  +UGX {calculatedTotalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-300 font-bold">Total Capital + Returns:</span>
                <span className="font-bold text-white font-mono-num text-base">
                  UGX {calculatedTotalPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlanForSubscribe(selectedCalcPlan)}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <span>Subscribe to {selectedCalcPlan.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 4 Packages ({plans.length})
          </button>
          <button
            onClick={() => setActiveFilter('pkg1_2')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'pkg1_2'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Package 1 & 2 (Bus & Plane)
          </button>
          <button
            onClick={() => setActiveFilter('pkg3_4')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'pkg3_4'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Package 3 & 4 (Gold Train & Space Ship)
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredPlans.length} verified packages
        </span>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredPlans.map((plan) => {
          const isFeatured = plan.featured;
          const dailyProfitAmount = Math.round(plan.minDeposit * (plan.dailyRoiPercent / 100));
          const monthlyPotential = getMonthlyMaxYield(plan.id);

          return (
            <div
              key={plan.id}
              className={`bg-slate-900/90 border rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 relative group ${
                isFeatured
                  ? 'border-amber-500/50 shadow-xl shadow-amber-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {isFeatured && (
                <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                  Active Fleet Tier
                </span>
              )}

              <div>
                {/* Tier & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner"
                      style={{ 
                        backgroundColor: `${plan.accentColor}18`, 
                        borderColor: `${plan.accentColor}40` 
                      }}
                    >
                      {getPlanIcon(plan.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {plan.tier}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {plan.name}
                      </h3>
                    </div>
                  </div>
                  
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${plan.badgeColor}`}>
                    {plan.durationDays} Days Term
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {plan.description}
                </p>

                {/* Returns Highlights Box */}
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 mt-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="border-r border-slate-800/80 pr-2">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Daily Profit</div>
                      <div className="text-base sm:text-lg font-extrabold font-mono-num text-emerald-400 mt-0.5">
                        UGX {dailyProfitAmount.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-500">+{plan.dailyRoiPercent}% / day</span>
                    </div>
                    <div className="pl-2">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Monthly Return</div>
                      <div className="text-base sm:text-lg font-extrabold font-mono-num text-amber-400 mt-0.5">
                        {monthlyPotential}
                      </div>
                      <span className="text-[10px] text-slate-500">30-Day Stream</span>
                    </div>
                  </div>
                </div>

                {/* Range & Risk specs */}
                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Deposit Capital:</span>
                    <span className="font-mono-num font-bold text-white">
                      UGX {plan.minDeposit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Payout Frequency:</span>
                    <span className="font-semibold text-emerald-400">Every Second (Live)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Active Participants:</span>
                    <span className="font-mono-num text-slate-300">{plan.activeSubscribers.toLocaleString()} Members</span>
                  </div>
                </div>

                {/* Bullet Features */}
                <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  id={`subscribe-plan-btn-${plan.id}`}
                  onClick={() => setSelectedPlanForSubscribe(plan)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                    isFeatured
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Invest UGX {plan.minDeposit.toLocaleString()}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Staked Nodes Management Section */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h2 className="font-display font-bold text-xl text-white">
                My Active Staking Contracts ({activeContracts.length})
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live second-by-second returns generated by your subscribed participation nodes in UGX.
            </p>
          </div>
          
          <button
            onClick={() => claimYield()}
            disabled={user.claimableYield <= 0.01}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              user.claimableYield > 0.01
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Harvest All Live Yields (+UGX {user.claimableYield.toFixed(2)})</span>
          </button>
        </div>

        <div className="space-y-4 mt-6">
          {activeContracts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <p>No active staking contracts yet. Select a plan above to start generating live yields.</p>
            </div>
          ) : (
            activeContracts.map((contract) => {
              const startDate = new Date(contract.startDate);
              const endDate = new Date(contract.endDate);
              const totalDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 86400000));
              const daysPassed = Math.min(totalDays, Math.max(0, Math.round((Date.now() - startDate.getTime()) / 86400000)));
              const progressPercent = Math.min(100, Math.round((daysPassed / totalDays) * 100));

              return (
                <div
                  key={contract.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: contract.accentColor }}
                        />
                        <h4 className="font-bold text-base text-white">
                          {contract.planName}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                          Live Yielding
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                        <span>Contract ID: <strong className="text-slate-300 font-mono-num">{contract.id}</strong></span>
                        <span>•</span>
                        <span>Staked Capital: <strong className="text-white font-mono-num">UGX {contract.investedAmount.toLocaleString()}</strong></span>
                        <span>•</span>
                        <span>Daily Rate: <strong className="text-emerald-400 font-mono-num">+{contract.dailyRoiPercent}%/day (UGX {contract.dailyYieldAmount.toFixed(2)})</strong></span>
                      </div>
                    </div>

                    {/* Harvest Button & Accumulated */}
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Unclaimed Live Yield</div>
                        <div className="text-lg font-black font-mono-num text-amber-400">
                          +UGX {contract.unclaimedYield.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => claimYield(contract.id)}
                        disabled={contract.unclaimedYield <= 0.01}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          contract.unclaimedYield > 0.01
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-400 hover:to-yellow-400 active:scale-95 shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Harvest</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & Contract Dates */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span>Term Progress: {daysPassed} of {totalDays} Days ({progressPercent}%)</span>
                      <span>Maturity Date: {endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: contract.accentColor
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Crucial Risk & Transparency Disclosure Callout */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed space-y-1">
          <strong className="text-slate-200 block text-sm">Important Information & Risk Transparency</strong>
          <p>
            EKWorld Games encourages every user to carefully review the terms, conditions, eligibility requirements, fees, risks, and expected outcomes of any plan before depositing or participating. Returns or rewards should never be presented as guaranteed unless they genuinely are guaranteed under the applicable program.
          </p>
        </div>
      </div>

    </div>
  );
};
