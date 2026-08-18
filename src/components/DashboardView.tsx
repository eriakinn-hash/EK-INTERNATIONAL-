import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  ShieldCheck,
  Disc,
  Play,
  Crosshair,
  PlusCircle,
  Bot,
  Bike,
  Bus,
  Plane,
  Train,
  Rocket,
  Activity,
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const CHART_DATA_7D = [
  { day: 'Day 1', balance: 10500, yield: 65, daily: 50 },
  { day: 'Day 2', balance: 11200, yield: 145, daily: 80 },
  { day: 'Day 3', balance: 11900, yield: 228, daily: 83 },
  { day: 'Day 4', balance: 13400, yield: 332, daily: 104 },
  { day: 'Day 5', balance: 14800, yield: 450, daily: 118 },
  { day: 'Day 6', balance: 15600, yield: 590, daily: 140 },
  { day: 'Day 7', balance: 16250, yield: 748, daily: 158 },
];

const CHART_DATA_30D = [
  { day: 'Week 1', balance: 4000, yield: 120, daily: 45 },
  { day: 'Week 2', balance: 7500, yield: 340, daily: 95 },
  { day: 'Week 3', balance: 12000, yield: 890, daily: 160 },
  { day: 'Week 4', balance: 16250, yield: 1850, daily: 258 },
];

export const DashboardView: React.FC = () => {
  const {
    user,
    plans,
    activeContracts,
    tasks,
    transactions,
    setActiveTab,
    setIsDepositModalOpen,
    setIsWithdrawModalOpen,
    setSelectedPlanForSubscribe,
    setSelectedTaskForRunning,
    setIsAiModalOpen,
    claimYield,
    performDailyCheckIn
  } = useApp();

  const [chartTimeframe, setChartTimeframe] = useState<'7D' | '30D'>('7D');
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [checkInResult, setCheckInResult] = useState<string | null>(null);
  const [showcasePlanId, setShowcasePlanId] = useState<string>('plan_bus_100k');

  const handleCheckIn = () => {
    setCheckInLoading(true);
    setTimeout(() => {
      const res = performDailyCheckIn();
      setCheckInResult(res.message);
      setCheckInLoading(false);
      setTimeout(() => setCheckInResult(null), 5000);
    }, 400);
  };

  const chartData = chartTimeframe === '7D' ? CHART_DATA_7D : CHART_DATA_30D;
  const availableTasks = tasks.filter(t => t.status === 'available');

  const today = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = user.lastCheckInDate === today;

  // Calculate totals
  const totalDailyYield = activeContracts.reduce((acc, c) => acc + c.dailyYieldAmount, 0);
  const totalUnclaimedYield = activeContracts.reduce((acc, c) => acc + c.unclaimedYield, user.claimableYield);
  const netPortfolioValue = user.mainBalance + user.stakedBalance + user.claimableYield;

  // Showcase Plan Selection
  const activeShowcasePlan = plans.find(p => p.id === showcasePlanId) || plans[0];
  const showcaseDailyProfit = Math.round(activeShowcasePlan.minDeposit * (activeShowcasePlan.dailyRoiPercent / 100));
  
  const getShowcaseMonthly = (id: string) => {
    switch (id) {
      case 'plan_bus_100k': return 'UGX 3,000,000';
      case 'plan_plane_500k': return 'UGX 4,500,000';
      case 'plan_gold_train_1m': return 'UGX 5,000,000';
      case 'plan_spaceship_4m': return 'UGX 8,000,000';
      default: return 'UGX 3,000,000';
    }
  };

  const getPlanIcon = (name: string) => {
    switch (name) {
      case 'Bus': return <Bus className="w-4 h-4" />;
      case 'Plane': return <Plane className="w-4 h-4" />;
      case 'Train': return <Train className="w-4 h-4" />;
      case 'Rocket': return <Rocket className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* =========================================================================
          1. Top Financial Metrics (Elegant Dark Archetype)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Metric 1: Total Liquid & Portfolio Balance */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono">
              Total Balance
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 font-mono">
              <span>+12.4%</span>
              <span className="text-[10px] text-slate-500 font-normal">24h</span>
            </div>
          </div>

          <div className="my-4">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
              UGX {netPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Wallet className="w-3.5 h-3.5" />
                Liquid: UGX {user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Staked: UGX {user.stakedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-2">
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/10"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Deposit
            </button>
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowDownRight className="w-3.5 h-3.5 text-cyan-400" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Metric 2: Active Plans Summary & Daily Yield Rate */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono">
              Active Plans Summary
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {activeContracts.length} Staked Nodes
            </span>
          </div>

          <div className="my-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-400">
                UGX {totalDailyYield.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">/ Day</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-time continuous streaming</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => claimYield()}
              disabled={user.claimableYield <= 0.01}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                user.claimableYield > 0.01
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/10'
                  : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Harvest +UGX {user.claimableYield.toFixed(2)}
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className="ml-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
              title="Explore all plans"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric 3: Super Task Rewards & Streak Booster */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-white/10 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono">
              Task Earnings & Streak
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Day {user.streakDays}/7
            </span>
          </div>

          <div className="my-4">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-400">
              UGX {user.taskEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Streak Multiplier: <strong className="text-white">{(1 + (user.streakDays - 1) * 0.25).toFixed(2)}x</strong></span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center gap-2">
            <button
              id="dashboard-checkin-btn"
              onClick={handleCheckIn}
              disabled={hasCheckedInToday || checkInLoading}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                hasCheckedInToday
                  ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {hasCheckedInToday ? 'Streak Claimed' : 'Daily Check-In (UGX 5,000)'}
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs uppercase"
            >
              Tasks
            </button>
          </div>
        </div>

      </div>

      {checkInResult && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{checkInResult}</span>
        </div>
      )}

      {/* =========================================================================
          2. EXCLUSIVE: Guaranteed Fleet Investment Nodes Showcase
          ========================================================================= */}
      {activeShowcasePlan && (
        <div className="bg-gradient-to-r from-[#111111] via-[#141814] to-[#0D1510] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Tier Quick Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-white/5 relative z-10">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mr-2">
              Select Package:
            </span>
            {plans.map((p) => {
              const isSelected = p.id === showcasePlanId;
              return (
                <button
                  key={p.id}
                  onClick={() => setShowcasePlanId(p.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                  }`}
                >
                  {getPlanIcon(p.iconName)}
                  <span>{p.name.replace('Package ', 'Pkg ')}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-black/70' : 'text-slate-500'}`}>
                    (UGX {(p.minDeposit >= 1000000 ? `${p.minDeposit / 1000000}M` : `${p.minDeposit / 1000}k`)})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-black uppercase tracking-wider flex items-center gap-1.5">
                  {getPlanIcon(activeShowcasePlan.iconName)}
                  <span>{activeShowcasePlan.tier} Node</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                  30 Days Validity
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-300 font-mono">
                  UGX {showcaseDailyProfit.toLocaleString()}/day Live Stream
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {activeShowcasePlan.name} (UGX {activeShowcasePlan.minDeposit.toLocaleString()})
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Invest in <strong className="text-white font-mono">{activeShowcasePlan.name}</strong> for <strong className="text-emerald-400 font-mono">UGX {activeShowcasePlan.minDeposit.toLocaleString()}</strong>.
                Receive guaranteed daily payouts of <strong className="text-emerald-400 font-mono">UGX {showcaseDailyProfit.toLocaleString()}</strong> streaming live for 30 days,
                with guaranteed monthly payout potential up to <strong className="text-amber-400 font-mono">{getShowcaseMonthly(activeShowcasePlan.id)}</strong>!
              </p>

              {/* Node highlights chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="bg-black/50 border border-white/5 rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Investment Capital</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">
                    UGX {activeShowcasePlan.minDeposit.toLocaleString()}
                  </div>
                </div>
                <div className="bg-black/50 border border-emerald-500/20 rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-emerald-400 uppercase font-mono">Daily Profit</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                    UGX {showcaseDailyProfit.toLocaleString()} / Day
                  </div>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Term Length</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white">
                    {activeShowcasePlan.durationDays} Days
                  </div>
                </div>
                <div className="bg-black/50 border border-amber-500/20 rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-amber-400 uppercase font-mono">Monthly Return</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-amber-400">
                    {getShowcaseMonthly(activeShowcasePlan.id)}
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe Action Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                id="buy-showcase-plan-btn"
                onClick={() => setSelectedPlanForSubscribe(activeShowcasePlan)}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              >
                {getPlanIcon(activeShowcasePlan.iconName)}
                <span>Invest UGX {activeShowcasePlan.minDeposit.toLocaleString()}</span>
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Compare All 5 Plans</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. Analytics Chart & Active Plans Summary Section
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Returns Analytics Chart */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <h3 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Yield Performance & Capital Growth
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time portfolio curve and cumulative daily return stream.
              </p>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setChartTimeframe('7D')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors font-mono ${
                  chartTimeframe === '7D'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setChartTimeframe('30D')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors font-mono ${
                  chartTimeframe === '30D'
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* Area Chart Canvas */}
          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="chartYieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0C0C0C',
                    borderColor: '#262626',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8)'
                  }}
                  formatter={(value: any, name: string) => [
                    `UGX ${Number(value).toLocaleString()}`,
                    name === 'balance' ? 'Portfolio Capital' : 'Cumulative Yield'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#chartBalanceGrad)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#chartYieldGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Capital Growth (UGX)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Harvested Yields</span>
              </div>
            </div>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 text-xs"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Allocation Strategy</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Summary of Active Investment Plans */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h3 className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Active Plans Summary
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeContracts.length} subscribed nodes yielding
                </p>
              </div>
              <button
                onClick={() => setActiveTab('plans')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>+ Stake</span>
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {activeContracts.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                  <p>No active investment plans.</p>
                  <button
                    onClick={() => setActiveTab('plans')}
                    className="mt-3 px-3 py-1.5 bg-emerald-500 text-black font-bold rounded-lg text-xs"
                  >
                    Subscribe to a Plan
                  </button>
                </div>
              ) : (
                activeContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="bg-[#0C0C0C] border border-white/5 hover:border-white/10 rounded-xl p-3.5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full animate-pulse" 
                          style={{ backgroundColor: contract.accentColor || '#10b981' }} 
                        />
                        <span className="font-bold text-xs text-slate-200 truncate max-w-[140px]">
                          {contract.planName}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        +{contract.dailyRoiPercent}%/day
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                      <span>Staked: <strong className="text-white font-mono">UGX {contract.investedAmount.toLocaleString()}</strong></span>
                      <span>Daily: <strong className="text-emerald-400 font-mono">UGX {contract.dailyYieldAmount.toFixed(2)}</strong></span>
                    </div>

                    {/* Progress Bar & Unclaimed Vault */}
                    <div className="mt-2.5 p-2 bg-[#151515] rounded-lg border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 font-mono">Unclaimed Harvest</div>
                        <div className="font-mono font-bold text-amber-400 text-xs">
                          +UGX {contract.unclaimedYield.toFixed(2)}
                        </div>
                      </div>
                      <button
                        onClick={() => claimYield(contract.id)}
                        disabled={contract.unclaimedYield <= 0.01}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                          contract.unclaimedYield > 0.01
                            ? 'bg-amber-500 text-black hover:bg-amber-400 active:scale-95'
                            : 'bg-white/5 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Principal Guaranteed
              </span>
              <button 
                onClick={() => setActiveTab('how-it-works')}
                className="text-emerald-400 hover:underline text-[11px]"
              >
                Contract Rules
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          4. Available Super Tasks Interactive Arena Preview
          ========================================================================= */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-lg text-white">
                Super Tasks & Interactive Arena
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete high-paying reflex challenges, multiplier wheel spins, and partner feedback.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('tasks')}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>All Tasks Arena</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {availableTasks.slice(0, 3).map((task) => (
            <div 
              key={task.id}
              className="bg-[#0C0C0C] border border-white/5 hover:border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {task.category}
                  </span>
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    +${task.rewardAmount.toFixed(2)}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {task.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  ⏱ {task.timeEstimate}
                </span>
                <button
                  onClick={() => setSelectedTaskForRunning(task)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-black" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
