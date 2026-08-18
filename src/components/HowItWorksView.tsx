import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  UserPlus,
  ArrowDownToLine,
  TrendingUp,
  Zap,
  Gift,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  Headphones,
  Gamepad2,
  Lock,
  ChevronRight
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setActiveTab, setIsDepositModalOpen } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      icon: <UserPlus className="w-6 h-6 text-amber-400" />,
      description: 'Register and set up your personal EKWorld Games account with instant access to your multi-currency wallet and security configuration.',
      highlight: 'Instant registration & demo ready'
    },
    {
      step: '02',
      title: 'Deposit Funds',
      icon: <ArrowDownToLine className="w-6 h-6 text-emerald-400" />,
      description: 'Add funds easily using the wide variety of payment methods supported by the platform, including USDT (TRC20/ERC20), BTC, ETH, debit/credit cards, and bank wire.',
      highlight: 'Fast settlement with 0% gateway deposit fees'
    },
    {
      step: '03',
      title: 'Choose a Package',
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      description: 'Review the 4 available packages (A BUS, PLANE, GOLD TRAIN, SPACE SHIP) and select one that suits your budget. Each package clearly presents its 30-day term, daily profits, and monthly returns in UGX.',
      highlight: 'Daily profits from UGX 28,000 up to UGX 210,000/day'
    },
    {
      step: '04',
      title: 'Participate in Super Tasks',
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      description: 'Users can take part in available super tasks, interactive reflex games, the Quantum Multiplier Wheel, and partner review activities offered through the platform.',
      highlight: 'Instant cash rewards & multiplier streaks'
    },
    {
      step: '05',
      title: 'Earn Rewards',
      icon: <Gift className="w-6 h-6 text-rose-400" />,
      description: 'Eligible users receive returns or rewards based on their applicable plan, completed activities, and published terms, streaming in real-time second by second.',
      highlight: 'Live real-time yield harvesting anytime'
    },
    {
      step: '06',
      title: 'Withdraw',
      icon: <ArrowUpRight className="w-6 h-6 text-yellow-400" />,
      description: 'Once a withdrawal becomes eligible under the relevant plan or activity terms, users can request their available funds seamlessly through supported withdrawal channels.',
      highlight: 'Fast automated processing with 4-digit PIN security'
    }
  ];

  const whyChooseReasons = [
    { title: 'Easy account registration', desc: 'Get set up in seconds without complicated verification hurdles.' },
    { title: 'Simple and user-friendly platform', desc: 'Modern high-performance interface with clear dashboards.' },
    { title: 'Multiple participation opportunities', desc: 'Tailored plans for every budget and duration horizon.' },
    { title: 'Super tasks & interactive activities', desc: 'Skill mini-games, streak multipliers, and ecosystem bounties.' },
    { title: 'Clearly defined plans and terms', desc: 'Total transparency on return rates, duration, and conditions.' },
    { title: 'Convenient deposit & withdrawal options', desc: 'Crypto, cards, and wire with rapid automated settlement.' },
    { title: 'Secure account management', desc: 'Protected by 256-bit encryption and personal 4-digit PINs.' },
    { title: 'Dedicated user support', desc: '24/7 assistance and interactive EK-AI advisor support.' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Platform Architecture & Guide
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            How EKWorld Games Works
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            EKWorld Games is a digital platform designed to bring together entertainment, interactive activities, super tasks, and financial participation in one convenient online experience.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('plans')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-500/20"
          >
            <span>Explore Plans</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider"
          >
            Play Super Tasks
          </button>
        </div>
      </div>

      {/* 6-Step Visual Journey */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            6 Simple Steps to Get Started
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Follow the clear pathway from registration to harvesting and withdrawal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative group hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="font-mono-num font-black text-3xl text-slate-800 group-hover:text-amber-500/30 transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white mt-4 group-hover:text-amber-400 transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {s.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">Our Mission</h3>
            <span className="text-xs text-amber-400 font-semibold uppercase">Building Transparent Digital Ecosystems</span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Our mission is to build a simple, accessible, and engaging digital platform where users can participate in online activities and programs while having a clear understanding of the terms and conditions that apply to them.
        </p>
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
          We aim to provide a user-friendly experience, transparent information, secure account management, and reliable support for our community.
        </p>
      </div>

      {/* Why Choose EKWorld Games? */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Why Choose EKWorld Games?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered for reliability, transparent terms, and engaging digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {whyChooseReasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 hover:border-slate-700 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs mb-3">
                ✓
              </div>
              <h4 className="font-bold text-sm text-white mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Important Information & Legal Transparency */}
      <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-white">
              Important Information & Transparency Notice
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              EKWorld Games encourages every user to carefully review the terms, conditions, eligibility requirements, fees, risks, and expected outcomes of any plan before depositing or participating.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Returns or rewards should never be presented as guaranteed unless they genuinely are guaranteed under the applicable program. Availability of plans, tasks, rewards, deposits, and withdrawals may vary according to the platform&apos;s rules and applicable laws.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
