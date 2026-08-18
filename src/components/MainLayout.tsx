import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';
import { EK_LOGO_SRC, BRAND_NAME, BRAND_TAGLINE } from '../constants/branding';
import {
  LayoutDashboard,
  Zap,
  TrendingUp,
  Wallet,
  Users,
  HelpCircle,
  PlusCircle,
  ArrowDownRight,
  Bot,
  Bell,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Bike,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Award
} from 'lucide-react';
import { LiveTicker } from './LiveTicker';

interface MainLayoutProps {
  children: React.ReactNode;
  onOpenProfile: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onOpenProfile }) => {
  const {
    activeTab,
    setActiveTab,
    user,
    setIsDepositModalOpen,
    setIsWithdrawModalOpen,
    setIsAiModalOpen,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    resetDemoWallet
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'plans',
      label: 'Investment Plans',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: '50K Bike Node',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    },
    {
      id: 'tasks',
      label: 'Super Tasks',
      icon: <Zap className="w-4 h-4" />,
      badge: 'Bounties',
      badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    },
    {
      id: 'wallet',
      label: 'Wallet & Ledger',
      icon: <Wallet className="w-4 h-4" />
    },
    {
      id: 'affiliate',
      label: 'Referral Team',
      icon: <Users className="w-4 h-4" />,
      badge: '13%',
      badgeColor: 'bg-purple-500/10 text-purple-400'
    },
    {
      id: 'how-it-works',
      label: 'How It Works',
      icon: <HelpCircle className="w-4 h-4" />
    }
  ];

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Live Market & Yield Ticker Bar at Very Top */}
      <LiveTicker />

      <div className="flex-1 flex w-full">
        
        {/* =========================================================================
            1. Desktop Navigation Sidebar (Elegant Dark Theme)
            ========================================================================= */}
        <aside className="hidden lg:flex w-64 border-r border-white/10 flex-col bg-[#0C0C0C] sticky top-0 h-screen shrink-0 overflow-y-auto">
          
          {/* Brand Header */}
          <div className="p-5 border-b border-white/5">
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="cursor-pointer group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 p-0.5 overflow-hidden group-hover:border-amber-400 group-hover:scale-105 transition-all shadow-md shadow-amber-500/10 shrink-0">
                <img
                  src={EK_LOGO_SRC}
                  alt="EK International Logo"
                  className="w-full h-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
                  EK INTERNATIONAL
                </h1>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  TRADE THE BEST
                </p>
              </div>
            </div>
          </div>

          {/* Nav Section Label */}
          <div className="px-5 pt-5 pb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              Main Console
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white/5 text-white border border-white/10 font-semibold shadow-inner shadow-white/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-emerald-400' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.badgeColor || 'bg-white/5 text-slate-400'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Bike Plan Highlight Card */}
          <div className="p-3 mx-3 mb-3 bg-[#111] border border-emerald-500/20 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Bike className="w-3.5 h-3.5" />
                Cyber Bike Node
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                30D Plan
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              $50,000 Node • <strong className="text-white">$20,000/Day</strong>
            </p>
            <p className="text-[10px] text-emerald-400/90 font-mono mt-0.5">
              Monthly: $1,590,000 max yield
            </p>
            <button
              onClick={() => setActiveTab('plans')}
              className="mt-2 w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold rounded-lg uppercase tracking-wider transition-colors"
            >
              Inspect Fleet
            </button>
          </div>

          {/* Elite Membership Bottom Banner */}
          <div className="p-4 border-t border-white/5 bg-[#0A0A0A]">
            <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-xl p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {user.vipTier} Membership
                </p>
                <span className="text-[10px] text-slate-500 font-mono">Tier 2</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-tight">
                Daily streak multiplier & 2x task rewards active.
              </p>
              <button
                onClick={onOpenProfile}
                className="mt-2.5 text-[10px] text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1"
              >
                <span>Security & KYC</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </aside>

        {/* =========================================================================
            2. Main Content Wrapper & Header
            ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header */}
          <header className="sticky top-0 z-30 h-16 sm:h-20 border-b border-white/10 bg-[#0C0C0C]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
            
            {/* Left Header Info */}
            <div className="flex items-center gap-3 sm:gap-6">
              
              {/* Mobile hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-3">
                <h2 className="text-base sm:text-lg font-medium text-white tracking-tight hidden sm:block">
                  Terminal Overview
                </h2>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-300 font-semibold">Node Active</span>
                  <span className="text-slate-600 hidden md:inline">• 256-Bit SSL</span>
                </div>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              
              {/* Wallet ID badge */}
              <div 
                onClick={onOpenProfile}
                className="hidden md:flex flex-col items-end cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                  Wallet ID
                </span>
                <span className="text-xs text-slate-300 font-mono font-bold">
                  {user.id}
                </span>
              </div>

              {/* Quick AI Strategy button */}
              <button
                id="header-ai-advisor-btn"
                onClick={() => setIsAiModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Open EK-AI Strategy Advisor"
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">AI Advisor</span>
              </button>

              {/* Quick Deposit Button */}
              <button
                id="header-quick-deposit-btn"
                onClick={() => setIsDepositModalOpen(true)}
                className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Deposit</span>
              </button>

              {/* Quick Withdraw Button */}
              <button
                id="header-quick-withdraw-btn"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="hidden sm:flex px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:bg-white/5 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider items-center gap-1.5 transition-colors"
              >
                <ArrowDownRight className="w-3.5 h-3.5 text-cyan-400" />
                <span>Withdraw</span>
              </button>

              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (unreadNotificationCount > 0) markNotificationsAsRead();
                  }}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white relative transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black font-bold text-[9px] flex items-center justify-center">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Protocol Alerts
                      </span>
                      <button
                        onClick={markNotificationsAsRead}
                        className="text-[10px] text-emerald-400 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2 rounded-xl bg-[#181818] border border-white/5 text-xs">
                          <div className="font-semibold text-white">{n.title}</div>
                          <div className="text-slate-400 text-[11px] mt-0.5 leading-tight">{n.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar / Profile */}
              <div 
                id="header-user-avatar-btn"
                onClick={onOpenProfile}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 border border-white/10 group-hover:border-emerald-400 transition-colors">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
              </div>

            </div>
          </header>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#0C0C0C] border-b border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Navigation Menu
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  ${user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${
                      activeTab === item.id
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-white/5 border border-white/5 text-slate-300'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Workspace Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Global Footer in Elegant Dark theme */}
          <footer className="border-t border-white/5 bg-[#090909] py-6 px-4 sm:px-8 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md overflow-hidden bg-slate-900 border border-amber-500/30 flex items-center justify-center p-0.5">
                  <img
                    src={EK_LOGO_SRC}
                    alt="EK Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold text-white tracking-wider">EK INTERNATIONAL • EKWORLD GAMES</span>
                <span className="text-slate-600">|</span>
                <span className="text-amber-400 font-medium">TRADE THE BEST</span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-slate-300">
                  Terms & Transparency
                </button>
                <button onClick={() => setActiveTab('plans')} className="hover:text-emerald-400">
                  Investment Fleet
                </button>
                <button onClick={resetDemoWallet} className="hover:text-amber-400 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Reset Demo
                </button>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};
