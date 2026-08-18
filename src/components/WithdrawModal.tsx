import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ArrowDownRight,
  ShieldCheck,
  Lock,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

export const WithdrawModal: React.FC = () => {
  const { isWithdrawModalOpen, setIsWithdrawModalOpen, user, withdrawFunds } = useApp();

  const [withdrawAmount, setWithdrawAmount] = useState<number>(20000);
  const [method, setMethod] = useState<string>('MTN-MoMo-UGX');
  const [targetAddress, setTargetAddress] = useState<string>('+256 772 123456');
  const [pin, setPin] = useState<string>('7721');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isWithdrawModalOpen) return null;

  const fee = +(withdrawAmount * 0.015).toFixed(0);
  const netPayout = Math.max(0, +(withdrawAmount - fee).toFixed(0));

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsProcessing(true);

    setTimeout(() => {
      const res = withdrawFunds(withdrawAmount, method, targetAddress, pin);
      setIsProcessing(false);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setIsWithdrawModalOpen(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ArrowDownRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Request Fund Withdrawal
              </h3>
              <p className="text-xs text-slate-400">
                Direct instant payout to Mobile Money (MTN/Airtel UGX) or Crypto
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWithdrawModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleWithdrawSubmit} className="mt-5 space-y-4">
          
          {/* Available Liquid Info */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Available Liquid Cash:</span>
            <span className="font-mono-num font-bold text-emerald-400 text-sm">
              UGX {user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Amount input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Withdrawal Amount (UGX):
              </label>
              <button
                type="button"
                onClick={() => setWithdrawAmount(Math.floor(user.mainBalance))}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
              >
                Max Available
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">UGX</span>
              <input
                type="number"
                min="5000"
                max={user.mainBalance}
                step="1000"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-14 pr-4 py-2.5 text-sm text-white font-mono-num font-bold focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          {/* Method selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Payout Channel:
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="MTN-MoMo-UGX">MTN Mobile Money (Uganda UGX) — Instant Payout</option>
              <option value="Airtel-Money-UGX">Airtel Money (Uganda UGX) — Instant Payout</option>
              <option value="USDT-TRC20">USDT (TRC-20) — Automated Fast Sync</option>
              <option value="USDT-ERC20">USDT (ERC-20) — Ethereum Mainnet</option>
              <option value="Bitcoin">Bitcoin (BTC) — On-Chain</option>
              <option value="BankWire">Direct Bank Transfer / Wire</option>
            </select>
          </div>

          {/* Target Address / Mobile Number */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
              Recipient Phone Number (MoMo) or Wallet Address:
            </label>
            <input
              type="text"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
              placeholder="e.g. +256 77X XXX XXX or Wallet Address"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          {/* Security PIN verification */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                4-Digit Security PIN:
              </label>
              <span className="text-[11px] text-amber-400/90 font-mono">
                (Default: {user.pinCode})
              </span>
            </div>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="4-digit PIN"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-center text-amber-400 font-mono tracking-widest font-bold focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          {/* Breakdown summary */}
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Gross Withdrawal:</span>
              <span className="font-mono-num text-slate-200">UGX {withdrawAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Gateway & Network Fee (1.5%):</span>
              <span className="font-mono-num text-slate-400">UGX {fee.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-slate-200 font-bold pt-1 border-t border-slate-800">
              <span>Net Payout to Recipient:</span>
              <span className="font-mono-num text-cyan-400 text-sm">UGX {netPayout.toLocaleString()}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsWithdrawModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-withdrawal-submit-btn"
              disabled={isProcessing || withdrawAmount <= 0}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/30 active:scale-95 transition-all"
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>{isProcessing ? 'Verifying PIN...' : `Confirm & Payout (UGX ${netPayout.toLocaleString()})`}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
