import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';
import {
  Wallet,
  ArrowDownRight,
  PlusCircle,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Building2,
  Coins,
  ArrowUpRight,
  Info,
  RefreshCw
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const {
    user,
    transactions,
    setIsDepositModalOpen,
    setIsWithdrawModalOpen,
    claimYield
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const totalNetWorth = user.mainBalance + user.stakedBalance + user.claimableYield;

  const filteredTransactions = transactions.filter(tx => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = tx.title.toLowerCase().includes(q);
      const matchHash = tx.txHash?.toLowerCase().includes(q) || false;
      const matchMethod = tx.method?.toLowerCase().includes(q) || false;
      return matchTitle || matchHash || matchMethod;
    }
    return true;
  });

  const getTxTypeBadge = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Deposit</span>;
      case 'withdrawal':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Withdrawal</span>;
      case 'plan_stake':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">Staking Node</span>;
      case 'yield_claim':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">Yield Harvest</span>;
      case 'task_reward':
      case 'checkin_bonus':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-500/20 text-teal-400 border border-teal-500/30">Super Task</span>;
      case 'referral_bonus':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">Commission</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-400">Transfer</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Financial Gateway & Ledger
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Instant Settlement Protocol
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
              My Wallet & Financial Overview
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Manage your deposits, initiate secure withdrawals, review real-time yield harvests, and inspect the verified immutable transaction ledger.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="wallet-deposit-action-btn"
              onClick={() => setIsDepositModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Deposit Funds</span>
            </button>
            <button
              id="wallet-withdraw-action-btn"
              onClick={() => setIsWithdrawModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <ArrowDownRight className="w-4 h-4 text-cyan-400" />
              <span>Request Withdrawal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Asset Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Total Net Worth */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Total Account Equity
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono-num text-white mt-2">
            UGX {totalNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-400 mt-1 block">
            Combined Liquid + Staked + Yields
          </span>
        </div>

        {/* Liquid Main Balance */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Available Liquid Cash
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono-num text-emerald-400 mt-2">
            UGX {user.mainBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Ready for instant payout or staking
          </span>
        </div>

        {/* Staked Active Capital */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Active Staked Capital
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono-num text-cyan-400 mt-2">
            UGX {user.stakedBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-cyan-300 mt-1 block">
            Locked in high-yield contract nodes
          </span>
        </div>

        {/* Total Withdrawn to Date */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Lifetime Withdrawn
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono-num text-slate-200 mt-2">
            UGX {user.totalWithdrawn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-400 mt-1 block">
            Successfully paid to external addresses
          </span>
        </div>

      </div>

      {/* Pesapal Official Payment Gateway Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40">
                Official Payment Endpoint
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Pesapal Store Gateway
              </span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              Pay Directly via Pesapal (Cards, MoMo, Bank)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use our official Pesapal checkout endpoint: <code className="px-1.5 py-0.5 rounded bg-slate-950 font-mono text-amber-300 font-bold">https://store.pesapal.com/ekworldcoin</code>. Securely top up your account with instant settlement.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <a
              href="https://store.pesapal.com/ekworldcoin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
            >
              <span>Visit Pesapal Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verify / Add Funds</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Channels Grid Preview */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            Pesapal Payment Channels (UGX)
          </h3>
          <span className="text-xs text-amber-400/90 font-mono">
            Gateway: store.pesapal.com/ekworldcoin
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold font-mono">
              MTN
            </div>
            <div>
              <div className="font-bold text-xs text-slate-200">MTN Mobile Money</div>
              <div className="text-[11px] text-emerald-400 font-medium">Via Pesapal Store</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold font-mono">
              AIR
            </div>
            <div>
              <div className="font-bold text-xs text-slate-200">Airtel Money</div>
              <div className="text-[11px] text-emerald-400 font-medium">Via Pesapal Store</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-200">Visa / Mastercard</div>
              <div className="text-[11px] text-cyan-400">Debit & Credit Cards</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-200">Bank Transfer</div>
              <div className="text-[11px] text-purple-400">Direct Bank EFT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h2 className="font-display font-bold text-xl text-white">
              Transaction History & Audit Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified record of all deposits, plan activations, yield harvests, super task bounties, and withdrawals.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search TxHash, Method..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['all', 'deposit', 'withdrawal', 'plan_stake', 'yield_claim', 'task_reward'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg capitalize transition-colors ${
                    filterType === type
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All' : type.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="pb-3 pl-2">Type</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3 pr-2 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-400">No transaction records found yet.</p>
                      <button
                        onClick={() => setIsDepositModalOpen(true)}
                        className="mt-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Make First Deposit via Pesapal</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pl-2">{getTxTypeBadge(tx.type)}</td>
                      <td className="py-3.5">
                        <div className="font-semibold text-slate-200">{tx.title}</div>
                        {tx.details && <div className="text-[11px] text-slate-400 mt-0.5">{tx.details}</div>}
                      </td>
                      <td className="py-3.5 font-mono-num font-bold text-sm">
                        <span className={isPositive ? 'text-emerald-400' : 'text-slate-200'}>
                          {isPositive ? '+' : '-'}UGX {Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          tx.status === 'completed' ? 'text-emerald-400' :
                          tx.status === 'processing' ? 'text-cyan-400 animate-pulse' :
                          'text-amber-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            tx.status === 'completed' ? 'bg-emerald-400' :
                            tx.status === 'processing' ? 'bg-cyan-400' : 'bg-amber-400'
                          }`} />
                          {tx.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-400 whitespace-nowrap">
                        {new Date(tx.timestamp).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <button
                          onClick={() => setSelectedTx(tx)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-display font-bold text-base text-white">
                Transaction Receipt
              </h3>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono-num text-slate-200 font-bold">{selectedTx.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Type:</span>
                <div>{getTxTypeBadge(selectedTx.type)}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Net Amount:</span>
                <span className="font-mono-num font-black text-sm text-emerald-400">
                  UGX {Math.abs(selectedTx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400 uppercase">{selectedTx.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-200">{new Date(selectedTx.timestamp).toLocaleString()}</span>
              </div>
              {selectedTx.txHash && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">TxHash:</span>
                  <span className="font-mono-num text-cyan-400">{selectedTx.txHash}</span>
                </div>
              )}
              {selectedTx.details && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-300">
                  <span className="text-slate-500 block mb-0.5">Details / Memo:</span>
                  {selectedTx.details}
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Immutable Platform Hash
              </span>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
