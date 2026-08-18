import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EK_LOGO_SRC, BRAND_NAME, BRAND_TAGLINE } from '../constants/branding';
import {
  Gamepad2,
  ShieldCheck,
  Zap,
  Lock,
  Mail,
  User,
  Phone,
  Key,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Bus,
  Plane,
  Train,
  Rocket,
  Gift,
  Coins,
  ChevronRight
} from 'lucide-react';

export const AuthView: React.FC = () => {
  const { register, login, quickDemoLogin, plans } = useApp();
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regReferral, setRegReferral] = useState('EKW-8892');
  const [regAgreed, setRegAgreed] = useState(true);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regAgreed) {
      setErrorMessage('You must confirm you are 18+ and agree to platform terms.');
      return;
    }

    if (regPin.length !== 4 || !/^\d{4}$/.test(regPin)) {
      setErrorMessage('Security PIN must be exactly 4 numeric digits.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        pinCode: regPin,
        password: regPassword,
        referralCode: regReferral
      });

      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginIdentifier.trim()) {
      setErrorMessage('Please enter your Phone Number or Email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(loginIdentifier, loginPassword);
      setIsSubmitting(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 300);
  };

  const getPackageIcon = (name: string) => {
    switch (name) {
      case 'Bus': return <Bus className="w-4 h-4 text-cyan-400" />;
      case 'Plane': return <Plane className="w-4 h-4 text-blue-400" />;
      case 'Train': return <Train className="w-4 h-4 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-4 h-4 text-purple-400" />;
      default: return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Background Ambience & Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Simple Brand Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900 overflow-hidden shadow-lg shadow-amber-500/10 border border-amber-500/30 p-0.5 flex items-center justify-center shrink-0">
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
              <p className="text-[11px] text-amber-300/80 hidden sm:block font-medium">
                TRADE THE BEST • Digital Yield & Super Task Protocol (UGX)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={quickDemoLogin}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Explore</span> Demo Mode
            </button>
          </div>
        </div>
      </header>

      {/* Main Authentication Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Value Proposition & 4 Packages Preview */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Official Pesapal Gateway Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Official Pesapal Payment Gateway Verified</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight tracking-tight">
                Sign Up or Sign In to Access Your <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">Dashboard</span> & Super Tasks
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Join thousands of verified Ugandan members earning real-time daily streaming profits with instant automated withdrawals to <strong>MTN Mobile Money</strong> & <strong>Airtel Money</strong>.
              </p>
            </div>

            {/* 4 Packages Highlight Pill Grid */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider font-mono">
                  4 Guaranteed Investment Packages
                </span>
                <span className="text-emerald-400 font-bold font-mono">30-Day Stream</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {plans.map((p, idx) => {
                  const dailyProfit = Math.round(p.minDeposit * (p.dailyRoiPercent / 100));
                  return (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                        {getPackageIcon(p.iconName)}
                        <span className="truncate">{p.name.replace('Package ', 'Pkg ')}</span>
                      </div>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-400 font-mono">
                          UGX {p.minDeposit >= 1000000 ? `${p.minDeposit / 1000000}M` : `${p.minDeposit / 1000}k`}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          +UGX {dailyProfit.toLocaleString()}/d
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-[11px] font-bold text-slate-200">Firebase Security</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Active & Encrypted</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 text-center">
                <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <div className="text-[11px] font-bold text-slate-200">MTN & Airtel</div>
                <div className="text-[10px] text-slate-500">Instant Cashout</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60 text-center">
                <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <div className="text-[11px] font-bold text-slate-200">24/7 Streaming</div>
                <div className="text-[10px] text-slate-500">Second-by-Second</div>
              </div>
            </div>

          </div>

          {/* Right Column: Register & Login Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              
              {/* Subtle ambient corner light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Form Card Brand Emblem */}
              <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-800/80">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-amber-500/30 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
                  <img
                    src={EK_LOGO_SRC}
                    alt="EK International Logo"
                    className="w-full h-full object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span>EK INTERNATIONAL</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                      Official Portal
                    </span>
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    TRADE THE BEST • Secure Member Gateway
                  </p>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
                <button
                  id="tab-sign-up"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMessage(null);
                  }}
                  className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Sign Up (Register)</span>
                </button>
                <button
                  id="tab-sign-in"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage(null);
                  }}
                  className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In (Login)</span>
                </button>
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* =========================================================================
                  REGISTER FORM
                  ========================================================================= */}
              {authMode === 'register' ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Legal Name <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="reg-input-name"
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Mugisha Ronald"
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Mobile Money Phone Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Mobile Money Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[10px] text-emerald-400 font-mono">MTN / Airtel UG</span>
                    </div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="reg-input-phone"
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +256 772 123 456 or 0701..."
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="reg-input-email"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@domain.com"
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password & 4-Digit PIN in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Password */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Password <span className="text-amber-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="reg-input-password"
                          type={showPassword ? 'text' : 'password'}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* 4-Digit PIN */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-300">
                          Withdrawal PIN <span className="text-amber-400">*</span>
                        </label>
                        <span className="text-[10px] text-slate-500">4 Digits</span>
                      </div>
                      <div className="relative">
                        <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="reg-input-pin"
                          type="password"
                          maxLength={4}
                          value={regPin}
                          onChange={(e) => setRegPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="7721"
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-amber-400 placeholder-slate-500 outline-none transition-colors font-mono tracking-widest font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referral Code (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Referral Code (Optional)
                    </label>
                    <input
                      id="reg-input-referral"
                      type="text"
                      value={regReferral}
                      onChange={(e) => setRegReferral(e.target.value)}
                      placeholder="EKW-8892"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-cyan-400 placeholder-slate-500 outline-none transition-colors font-mono"
                    />
                  </div>

                  {/* Agreement checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="reg-terms-check"
                      type="checkbox"
                      checked={regAgreed}
                      onChange={(e) => setRegAgreed(e.target.checked)}
                      className="accent-amber-500 mt-1 cursor-pointer"
                    />
                    <label htmlFor="reg-terms-check" className="text-xs text-slate-400 cursor-pointer leading-tight">
                      I confirm I am 18+ years of age and agree to the EKWorld Games terms of service and yield agreement.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-create-account-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Activating Account...</span>
                    ) : (
                      <>
                        <span>Create Account & Start Earning</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* =========================================================================
                   LOGIN FORM
                   ========================================================================= */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email or Mobile Money Phone Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="login-input-identifier"
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. alex.vance@ekworld.net or +256 772..."
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">
                        Password or 4-Digit Security PIN
                      </label>
                      <span className="text-[10px] text-amber-400">Default Demo PIN: 7721</span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="login-input-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    id="submit-login-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Signing In...</span>
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-400">
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('register');
                          setErrorMessage(null);
                        }}
                        className="text-amber-400 font-bold hover:underline"
                      >
                        Create Account in 10 seconds
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* Fast One-Click Demo Button */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="text-center mb-3">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">
                    Or explore with pre-loaded demo balances
                  </span>
                </div>
                <button
                  id="quick-demo-access-btn"
                  type="button"
                  onClick={quickDemoLogin}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/40 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Instant Demo Access (Alex Vance • UGX 150,000 Wallet)</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-500">
        <p>© 2026 EKWorld Games. All Rights Reserved. Fully Licensed High-Yield Digital Tasks & Fleet Staking.</p>
      </footer>
    </div>
  );
};
