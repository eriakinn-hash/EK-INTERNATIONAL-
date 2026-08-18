import React, { useState, useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import {
  Users,
  Copy,
  Check,
  Share2,
  Gift,
  Award,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  DollarSign,
  QrCode,
  Download,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Send,
  Palette
} from 'lucide-react';

export const AffiliateView: React.FC = () => {
  const { user, referrals } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [qrColorTheme, setQrColorTheme] = useState<'gold' | 'cyan' | 'emerald' | 'white'>('gold');
  const [qrSize, setQrSize] = useState<number>(180);
  const [isDownloading, setIsDownloading] = useState(false);

  const qrCanvasRef = useRef<HTMLDivElement | null>(null);

  const referralLink = `https://ekworld.games/join?ref=${user.referralCode}`;

  const copyToClipboard = (text: string, type: 'link' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join EKWorld Games - Earn Daily Digital Yields',
          text: `Join EKWorld Games using my invitation code ${user.referralCode} to claim an instant UGX 20,000 bonus and start earning daily streaming profits!`,
          url: referralLink,
        });
      } catch (err) {
        // Fallback to copying link
        copyToClipboard(referralLink, 'link');
      }
    } else {
      copyToClipboard(referralLink, 'link');
    }
  };

  const handleDownloadQR = () => {
    try {
      setIsDownloading(true);
      const canvas = document.getElementById('affiliate-qr-canvas') as HTMLCanvasElement;
      if (canvas) {
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `EKWorld-Referral-QR-${user.referralCode}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (e) {
      console.error('Error downloading QR code:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  const totalCommissions = referrals.reduce((sum, r) => sum + r.commissionEarned, 0);
  const totalTeamVolume = referrals.reduce((sum, r) => sum + r.totalDeposited, 0);

  // QR Color mapping
  const getQrFgColor = () => {
    switch (qrColorTheme) {
      case 'gold': return '#f59e0b';
      case 'cyan': return '#06b6d4';
      case 'emerald': return '#10b981';
      case 'white': return '#ffffff';
    }
  };

  const shareText = encodeURIComponent(
    `🚀 Join me on EKWorld Games! Claim an instant UGX 20,000 welcome bonus + 3 Free Spins and earn daily streaming yields. Join here: ${referralLink}`
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Affiliate & Partnership Program
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Multi-Tier Commission Structure
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            Invite Partners & Earn Up to 13%
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Expand the EKWorld Games community. Share your unique QR code or personal link and earn recurring direct referral commissions on every participation plan subscribed by your invited network.
          </p>
        </div>

        {/* 3-Tier Multi-Level Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-base">
              L1
            </div>
            <div>
              <div className="text-xs text-slate-400">Direct Referrals</div>
              <div className="text-lg font-black font-mono-num text-amber-400">8.0% Commission</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-base">
              L2
            </div>
            <div>
              <div className="text-xs text-slate-400">Secondary Network</div>
              <div className="text-lg font-black font-mono-num text-cyan-400">4.0% Commission</div>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-base">
              L3
            </div>
            <div>
              <div className="text-xs text-slate-400">Extended Network</div>
              <div className="text-lg font-black font-mono-num text-purple-400">1.0% Commission</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Referral & QR Code Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: QR Code Generator Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base text-white">
                    Instant QR Share Code
                  </h2>
                  <p className="text-[11px] text-slate-400">Scan to register & claim UGX 20k</p>
                </div>
              </div>

              {/* QR Color Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  type="button"
                  title="Amber Gold"
                  onClick={() => setQrColorTheme('gold')}
                  className={`w-5 h-5 rounded-lg bg-amber-500 transition-transform ${qrColorTheme === 'gold' ? 'scale-110 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'}`}
                />
                <button
                  type="button"
                  title="Cyber Cyan"
                  onClick={() => setQrColorTheme('cyan')}
                  className={`w-5 h-5 rounded-lg bg-cyan-500 transition-transform ${qrColorTheme === 'cyan' ? 'scale-110 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'}`}
                />
                <button
                  type="button"
                  title="Emerald Green"
                  onClick={() => setQrColorTheme('emerald')}
                  className={`w-5 h-5 rounded-lg bg-emerald-500 transition-transform ${qrColorTheme === 'emerald' ? 'scale-110 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'}`}
                />
                <button
                  type="button"
                  title="High Contrast White"
                  onClick={() => setQrColorTheme('white')}
                  className={`w-5 h-5 rounded-lg bg-white transition-transform ${qrColorTheme === 'white' ? 'scale-110 ring-2 ring-slate-950' : 'opacity-60 hover:opacity-100'}`}
                />
              </div>
            </div>

            {/* QR Code Display Frame */}
            <div className="mt-5 flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-inner relative group">
              
              {/* Visible Canvas for download & display */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shadow-2xl">
                <QRCodeCanvas
                  id="affiliate-qr-canvas"
                  value={referralLink}
                  size={qrSize}
                  level="H"
                  bgColor="#020617"
                  fgColor={getQrFgColor()}
                  includeMargin={true}
                />
              </div>

              {/* Referral Code Badge under QR */}
              <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs">
                <span className="text-slate-400">Code:</span>
                <span className="font-mono font-bold text-amber-400 tracking-wider">
                  {user.referralCode}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 mt-2 text-center">
                Point any smartphone camera to scan & join instantly
              </div>
            </div>
          </div>

          {/* QR Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex gap-2.5">
            <button
              id="download-qr-btn"
              onClick={handleDownloadQR}
              disabled={isDownloading}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download QR</span>
            </button>

            <button
              id="native-share-btn"
              onClick={handleNativeShare}
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
            >
              <Share2 className="w-4 h-4" />
              <span>Share QR</span>
            </button>
          </div>
        </div>

        {/* Right Column: Invite Link & Quick Share Channels */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Your Invitation Link & Quick Channels
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Share directly across social networks or copy your invitation URL.
              </p>
            </div>

            {/* Link Box */}
            <div>
              <label className="text-xs text-slate-400 font-semibold mb-1.5 block">
                Exclusive Referral URL:
              </label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-2 focus-within:border-amber-500 transition-colors">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="bg-transparent text-xs text-amber-400 font-mono flex-1 outline-none px-2 select-all"
                />
                <button
                  id="affiliate-copy-link-btn"
                  onClick={() => copyToClipboard(referralLink, 'link')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Your Unique Referral Code:</span>
                <div className="font-mono font-bold text-xl text-white tracking-widest mt-0.5">
                  {user.referralCode}
                </div>
              </div>
              <button
                id="affiliate-copy-code-btn"
                onClick={() => copyToClipboard(user.referralCode, 'code')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied Code' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Social Share Shortcuts */}
            <div>
              <label className="text-xs text-slate-400 font-semibold mb-2 block">
                Instant Social Sharing:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </a>

                <button
                  onClick={handleNativeShare}
                  className="p-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors col-span-2 sm:col-span-1"
                >
                  <Share2 className="w-4 h-4" />
                  <span>More Apps</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary Box */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="text-center">
              <div className="text-[11px] text-slate-400">Team Volume</div>
              <div className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">
                UGX {totalTeamVolume >= 1000000 ? `${(totalTeamVolume / 1000000).toFixed(1)}M` : totalTeamVolume.toLocaleString()}
              </div>
            </div>
            <div className="text-center border-x border-slate-800">
              <div className="text-[11px] text-slate-400">Total Earned</div>
              <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-0.5">
                +UGX {totalCommissions >= 1000000 ? `${(totalCommissions / 1000000).toFixed(1)}M` : totalCommissions.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[11px] text-slate-400">Invited Team</div>
              <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5">
                {referrals.length} Members
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Referral Members Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
        <h3 className="font-display font-bold text-lg text-white mb-4">
          My Active Referral Team ({referrals.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="pb-3 pl-2">Username</th>
                <th className="pb-3">Network Level</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Capital Deposited</th>
                <th className="pb-3">Commission Generated</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {referrals.map((member) => (
                <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pl-2 font-semibold text-slate-200">{member.username}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      member.level === 1 ? 'bg-amber-500/20 text-amber-400' :
                      member.level === 2 ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      Level {member.level} ({member.level === 1 ? '8%' : member.level === 2 ? '4%' : '1%'})
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-400">{member.joinedDate}</td>
                  <td className="py-3.5 font-mono-num text-slate-300">
                    UGX {member.totalDeposited.toLocaleString()}
                  </td>
                  <td className="py-3.5 font-mono-num font-bold text-emerald-400">
                    +UGX {member.commissionEarned.toLocaleString()}
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <span className="text-emerald-400 font-semibold flex items-center justify-end gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
