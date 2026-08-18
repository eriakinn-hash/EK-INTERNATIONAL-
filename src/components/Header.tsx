import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';
import { EK_LOGO_SRC } from '../constants/branding';
import {
  Gamepad2,
  LayoutDashboard,
  TrendingUp,
  Zap,
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
  ChevronDown,
  ExternalLink,
  Lock,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
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
    resetDemoWallet,
    logout
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'plans', label: 'Participation Plans', icon: <TrendingUp className="w-4 h-4" />, badge: '4 Packages' },
    { id: 'tasks', label: 'Super Tasks', icon: <Zap className="w-4 h-4" />, badge: 'Active' },
    { id: 'wallet', label: 'Wallet & Ledger', icon: <Wallet className="w-4 h-4" /> },
    { id: 'affiliate', label: 'Referral Team', icon: <Users className="w-4 h-4" /> },
    { id: 'how-it-works', label: 'How It Works', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo-button"
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900/90 overflow-hidden shadow-lg shadow-amber-500/10 border border-amber-500/30 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-200 p-0.5 flex items-center justify-center">
              <img
                src={EK_LOGO_SRC}
                alt="EK International Logo"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-400 bg-clip-text text-transparent">
                  EK INTERNATIONAL
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500 text-slate-950 tracking-wider">
                  GAMES
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium tracking-wide hidden sm:block">
                TRADE THE BEST • Digital Yield & Super Tasks
              </p>
            </div>
          </div>

          {/* Quick Balance Pills & Fast Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Real-time Available Balance */}
            <div 
              id="header-balance-pill"
              onClick={() => setActiveTab('wallet')}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl px-3 sm:px-4 py-1.5 flex items-center gap-2 sm:gap-3 cursor-pointer transition-colors"
              title="Click to view Wallet"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Available Balance
                </div>
                <div className="text-sm sm:text-base font-bold font-mono-num text-emerald-400">
                  UGX {user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Claimable Yield Vault Pill (Live Ticker) */}
            <div 
              id="header-yield-pill"
              onClick={() => setActiveTab('dashboard')}
              className="hidden md:flex bg-amber-950/30 border border-amber-500/30 hover:border-amber-500/50 rounded-xl px-3.5 py-1.5 items-center gap-2.5 cursor-pointer transition-colors"
              title="Click to harvest live yields"
            >
              <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-amber-300/80 font-semibold uppercase tracking-wider">
                  Live Yields
                </div>
                <div className="text-sm font-bold font-mono-num text-amber-400">
                  +UGX {user.claimableYield.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Fast Action: Deposit */}
            <button
              id="header-deposit-btn"
              onClick={() => setIsDepositModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-emerald-900/30 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Deposit</span>
            </button>

            {/* Fast Action: Withdraw */}
            <button
              id="header-withdraw-btn"
              onClick={() => setIsWithdrawModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <ArrowDownRight className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Withdraw</span>
            </button>

            {/* AI Strategy Advisor Button */}
            <button
              id="header-ai-advisor-btn"
              onClick={() => setIsAiModalOpen(true)}
              className="bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/40 text-purple-300 font-semibold text-xs px-2.5 sm:px-3 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
              title="EK-AI Plan & Task Advisor"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="hidden lg:inline">EK-AI Advisor</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                id="header-notifications-btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markNotificationsAsRead();
                }}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div 
                  id="notifications-dropdown-menu"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <h4 className="font-semibold text-sm text-slate-200">Notifications</h4>
                    </div>
                    <button 
                      onClick={markNotificationsAsRead}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto mt-2 space-y-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No notifications yet.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="py-2.5 px-2 hover:bg-slate-800/40 rounded-lg transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs text-slate-200">{n.title}</span>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar / Dropdown */}
            <div className="relative">
              <button
                id="header-user-profile-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover border border-amber-500/40"
                />
                <div className="text-left hidden xl:block pr-1">
                  <div className="text-xs font-semibold text-slate-200 leading-none flex items-center gap-1">
                    {user.name}
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{user.vipTier} VIP</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div 
                  id="user-profile-dropdown"
                  className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs"
                >
                  <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Account ID:</span>
                      <span className="font-mono-num font-semibold text-slate-200">{user.id}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-slate-400">Security PIN:</span>
                      <span className="font-mono-num font-bold text-amber-400">{user.pinCode} (Default)</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-slate-400">KYC Status:</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                        Verified
                      </span>
                    </div>
                  </div>

                  <button
                    id="header-edit-profile-btn"
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenProfile();
                    }}
                    className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Edit Profile & Security
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      setActiveTab('affiliate');
                    }}
                    className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <Users className="w-4 h-4 text-cyan-400" />
                    My Referral Network
                  </button>

                  <div className="my-1 border-t border-slate-800" />

                  <button
                    id="header-logout-btn"
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-amber-400 hover:bg-amber-950/30 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out / Switch Account
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      resetDemoWallet();
                    }}
                    className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg flex items-center gap-2 font-medium"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Demo State
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                      isActive
                        ? 'bg-slate-950 text-amber-400'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
