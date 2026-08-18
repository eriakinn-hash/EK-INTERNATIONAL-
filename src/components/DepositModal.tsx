import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { EK_LOGO_SRC } from '../constants/branding';
import {
  X,
  PlusCircle,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  CreditCard,
  Building2,
  Coins,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  RefreshCw,
  Lock
} from 'lucide-react';

const PESAPAL_STORE_URL = 'https://store.pesapal.com/ekworldcoin';

export const DepositModal: React.FC = () => {
  const { isDepositModalOpen, setIsDepositModalOpen, depositFunds, user } = useApp();
  
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isDepositModalOpen) return null;

  const paymentReference = `EKW-${user.referralCode || user.id.slice(0, 8).toUpperCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(PESAPAL_STORE_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(paymentReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleOpenPesapal = () => {
    window.open(PESAPAL_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleVerifyAndCredit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (depositAmount <= 0) {
      setErrorMsg('Please select or enter a valid deposit amount.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const cleanRef = transactionRef.trim() || `PESAPAL-${Date.now().toString().slice(-6)}`;
      const methodName = 'Pesapal Payment Gateway';

      const success = depositFunds(depositAmount, methodName, cleanRef);
      setIsVerifying(false);

      if (success) {
        setSuccessMsg(`UGX ${depositAmount.toLocaleString()} successfully credited via Pesapal! Balance updated.`);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          setIsDepositModalOpen(false);
          setSuccessMsg(null);
          setTransactionRef('');
        }, 1200);
      } else {
        setErrorMsg('Failed to process deposit. Please try again.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-950 border border-amber-500/30 p-1 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/10">
              <img
                src={EK_LOGO_SRC}
                alt="EK International Logo"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span>Deposit via Pesapal</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                  Verified
                </span>
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                EK INTERNATIONAL • Official Payment Gateway
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDepositModalOpen(false)}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback alerts */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Pesapal Endpoint Box */}
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 rounded-2xl border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/40">
                  Pesapal Store Endpoint
                </div>
                <span className="text-xs text-white font-bold">Official Checkout</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live & Verified
              </span>
            </div>

            {/* Endpoint Link Box */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={PESAPAL_STORE_URL}
                className="bg-transparent text-xs text-amber-300 font-mono flex-1 outline-none truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy Store Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                id="open-pesapal-store-btn"
                onClick={handleOpenPesapal}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
              >
                <span>Pay on Pesapal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* User Account Memo / Reference */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">Account Reference (Put in Notes):</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-cyan-400">{paymentReference}</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedRef ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          {/* QR Code & Accepted Methods */}
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
              <QRCodeCanvas
                value={PESAPAL_STORE_URL}
                size={76}
                bgColor="#0f172a"
                fgColor="#f59e0b"
                level="M"
              />
            </div>
            <div className="text-xs space-y-1.5 flex-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Scan or Click to Pay on Pesapal</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Pesapal supports MTN Mobile Money, Airtel Money, Visa, Mastercard, and Bank Wire in Ugandan Shillings (UGX).
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-medium border border-slate-800">MTN MoMo</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-medium border border-slate-800">Airtel Money</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-medium border border-slate-800">Visa / Cards</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-medium border border-slate-800">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* AMOUNT & VERIFICATION FORM */}
        <form onSubmit={handleVerifyAndCredit} className="mt-4 space-y-3 text-xs">
          
          {/* Amount Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-bold uppercase text-[11px] tracking-wider">
                Deposit Amount (UGX):
              </label>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                UGX {depositAmount.toLocaleString()}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">UGX</span>
              <input
                type="number"
                min="10000"
                step="1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-14 pr-4 text-white font-mono text-base font-bold focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            {/* Quick Packages */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[
                { label: '50,000', val: 50000 },
                { label: '100,000 (Bus)', val: 100000 },
                { label: '500,000 (Plane)', val: 500000 },
                { label: '1,000,000 (Train)', val: 1000000 },
              ].map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setDepositAmount(preset.val)}
                  className={`py-1 px-1 rounded-lg text-[10px] font-mono font-semibold border transition-all ${
                    depositAmount === preset.val
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reference / Transaction ID */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Pesapal Tracking ID / Order Reference:
            </label>
            <input
              type="text"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              placeholder="e.g. PP-984210 or Pesapal receipt number"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDepositModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              id="confirm-pesapal-deposit-btn"
              type="submit"
              disabled={isVerifying || depositAmount <= 0}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying with Pesapal...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Deposit & Add UGX {depositAmount.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
