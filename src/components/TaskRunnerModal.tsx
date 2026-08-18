import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { SuperTask } from '../types';
import {
  X,
  Zap,
  Crosshair,
  Disc,
  Star,
  Share2,
  ClipboardList,
  CheckCircle2,
  Clock,
  Play,
  RotateCw,
  Sparkles,
  Trophy,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TaskRunnerModal: React.FC = () => {
  const {
    selectedTaskForRunning,
    setSelectedTaskForRunning,
    completeSuperTask,
    spinWheel,
    user
  } = useApp();

  const task = selectedTaskForRunning;
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  {task.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                  +${task.rewardAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-slate-400">{task.category.toUpperCase()} • {task.timeEstimate}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTaskForRunning(null)}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Task Specific Interactive View */}
        <div className="mt-5">
          {task.type === 'game_tap' && (
            <MatrixReflexGame task={task} onClose={() => setSelectedTaskForRunning(null)} />
          )}

          {task.type === 'game_wheel' && (
            <QuantumWheelGame task={task} onClose={() => setSelectedTaskForRunning(null)} />
          )}

          {task.type === 'partner_review' && (
            <PartnerReviewGame task={task} onClose={() => setSelectedTaskForRunning(null)} />
          )}

          {task.type === 'social_share' && (
            <SocialShareTask task={task} onClose={() => setSelectedTaskForRunning(null)} />
          )}

          {task.type === 'survey' && (
            <SurveyTaskRunner task={task} onClose={() => setSelectedTaskForRunning(null)} />
          )}

          {task.type === 'checkin' && (
            <GenericTaskRunner task={task} onClose={() => setSelectedTaskForRunning(null)} />
          )}
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   1. Matrix Reflex Tap Mini-Game
   ========================================================================= */
const MatrixReflexGame: React.FC<{ task: SuperTask; onClose: () => void }> = ({ task, onClose }) => {
  const { completeSuperTask } = useApp();
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover' | 'won'>('ready');
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [score, setScore] = useState<number>(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [isTrap, setIsTrap] = useState<boolean>(false);

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Check end condition
  useEffect(() => {
    if (gameState === 'playing' && timeLeft === 0) {
      if (score >= 25) {
        setGameState('won');
        completeSuperTask(task.id);
      } else {
        setGameState('gameover');
      }
    }
  }, [timeLeft, gameState, score, task.id, completeSuperTask]);

  // Target spawner
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawner = setInterval(() => {
      const randomTile = Math.floor(Math.random() * 9);
      const isRandomTrap = Math.random() < 0.25; // 25% trap chance
      setActiveTile(randomTile);
      setIsTrap(isRandomTrap);
    }, 600);

    return () => clearInterval(spawner);
  }, [gameState]);

  const handleTileClick = (index: number) => {
    if (gameState !== 'playing') return;
    if (index === activeTile) {
      if (isTrap) {
        setScore(prev => Math.max(0, prev - 3));
      } else {
        setScore(prev => prev + 1);
      }
      setActiveTile(null);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setGameState('playing');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
        <div>
          <span className="text-slate-400">Time Left:</span>
          <span className={`font-mono-num font-bold text-base ml-1.5 ${timeLeft <= 5 ? 'text-rose-400 animate-ping' : 'text-cyan-400'}`}>
            {timeLeft}s
          </span>
        </div>
        <div>
          <span className="text-slate-400">Score Target:</span>
          <span className="font-mono-num font-black text-base ml-1.5 text-amber-400">
            {score} / 25
          </span>
        </div>
      </div>

      {gameState === 'ready' && (
        <div className="py-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <Crosshair className="w-8 h-8 animate-pulse" />
          </div>
          <div className="max-w-xs mx-auto">
            <h4 className="font-bold text-white text-base">Matrix Reflex Sprint</h4>
            <p className="text-xs text-slate-400 mt-1">
              Tap gold nodes (+1 point). Avoid red traps (-3 points). Hit at least 25 nodes in 15 seconds to claim $12.50!
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start 15s Challenge</span>
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto py-2">
          {Array.from({ length: 9 }).map((_, idx) => {
            const isActive = activeTile === idx;
            return (
              <button
                key={idx}
                onClick={() => handleTileClick(idx)}
                className={`h-20 sm:h-24 rounded-2xl border flex items-center justify-center transition-all active:scale-90 ${
                  isActive
                    ? isTrap
                      ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                      : 'bg-gradient-to-br from-amber-400 to-yellow-500 border-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/40 scale-105'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isActive && (
                  isTrap ? (
                    <span className="text-xs font-black">TRAP (-3)</span>
                  ) : (
                    <Crosshair className="w-8 h-8 animate-spin text-slate-950" />
                  )
                )}
              </button>
            );
          })}
        </div>
      )}

      {gameState === 'won' && (
        <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
            <Trophy className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Super Task Completed!</h4>
            <p className="text-xs text-emerald-400 font-mono-num font-bold mt-1">
              Final Score: {score} hits • +$12.50 Added to Available Balance
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase"
          >
            Collect Reward & Close
          </button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base">Time&apos;s Up!</h4>
            <p className="text-xs text-slate-400 mt-1">
              You scored {score} / 25 required hits. Try again to claim the bounty!
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={startGame}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Retry Sprint</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white font-semibold text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. Quantum Multiplier Wheel Mini-Game
   ========================================================================= */
const QuantumWheelGame: React.FC<{ task: SuperTask; onClose: () => void }> = ({ task, onClose }) => {
  const { user, spinWheel, completeSuperTask } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [wonPrize, setWonPrize] = useState<{ label: string; amount: number } | null>(null);

  const wheelPrizes = [
    { label: '$10.00 Bounty', amount: 10.00, color: '#f59e0b' },
    { label: '$25.00 Silver', amount: 25.00, color: '#06b6d4' },
    { label: '$5.00 Mini', amount: 5.00, color: '#10b981' },
    { label: '$50.00 Gold', amount: 50.00, color: '#a855f7' },
    { label: '$15.00 Boost', amount: 15.00, color: '#3b82f6' },
    { label: '$100.00 JACKPOT', amount: 100.00, color: '#f43f5e' },
    { label: '$8.00 Fast', amount: 8.00, color: '#14b8a6' },
    { label: '$20.00 Matrix', amount: 20.00, color: '#8b5cf6' },
  ];

  const handleSpin = () => {
    if (isSpinning || user.freeSpinsAvailable <= 0) return;

    setIsSpinning(true);
    setWonPrize(null);

    const randomIndex = Math.floor(Math.random() * wheelPrizes.length);
    const prize = wheelPrizes[randomIndex];
    const segmentAngle = 360 / wheelPrizes.length;
    // Calculate final rotation (e.g. 5 full spins + target segment offset)
    const totalRotation = spinAngle + 1800 + (360 - randomIndex * segmentAngle - segmentAngle / 2);

    setSpinAngle(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);
      spinWheel(prize.amount, prize.label);
      completeSuperTask(task.id, prize.amount);
    }, 4000);
  };

  return (
    <div className="space-y-5 text-center">
      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
        <span className="text-slate-400">Available Free Spins:</span>
        <span className="font-mono-num font-bold text-purple-400 text-sm">
          {user.freeSpinsAvailable} Spins Ready
        </span>
      </div>

      {/* Wheel Visual Canvas */}
      <div className="relative w-64 h-64 mx-auto my-4">
        {/* Top Pointer Needle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-0 h-0 border-x-8 border-x-transparent border-t-16 border-t-amber-400 drop-shadow-md" />

        {/* Rotating Wheel Body */}
        <div
          className="w-full h-full rounded-full border-4 border-amber-500/50 shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${spinAngle}deg)` }}
        >
          {wheelPrizes.map((p, idx) => {
            const rot = idx * 45;
            return (
              <div
                key={idx}
                className="absolute w-full h-full top-0 left-0 flex items-start justify-center pt-2 font-mono-num font-bold text-[10px] text-white"
                style={{
                  transform: `rotate(${rot}deg)`,
                  clipPath: 'polygon(50% 50%, 20% 0%, 80% 0%)',
                  backgroundColor: p.color
                }}
              >
                <span className="drop-shadow-md text-slate-950 font-black">{p.amount > 0 ? `$${p.amount}` : p.label}</span>
              </div>
            );
          })}
          
          {/* Wheel Center Cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-black text-xs shadow-lg">
            EKW
          </div>
        </div>
      </div>

      {wonPrize && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold animate-in zoom-in-95">
          🎉 Winner! Landed on {wonPrize.label}! +${wonPrize.amount.toFixed(2)} Credited!
        </div>
      )}

      {/* Spin Button */}
      <div className="pt-2">
        <button
          onClick={handleSpin}
          disabled={isSpinning || user.freeSpinsAvailable <= 0}
          className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
            user.freeSpinsAvailable > 0 && !isSpinning
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/30 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Disc className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Quantum Spinning...' : user.freeSpinsAvailable > 0 ? 'Spin Quantum Wheel (1 Free Spin)' : 'No Spins Left (Earn via Streak/Plans)'}</span>
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   3. Partner Review Interactive Task
   ========================================================================= */
const PartnerReviewGame: React.FC<{ task: SuperTask; onClose: () => void }> = ({ task, onClose }) => {
  const { completeSuperTask } = useApp();
  const [graphicsRating, setGraphicsRating] = useState(5);
  const [gameplayRating, setGameplayRating] = useState(5);
  const [feedback, setFeedback] = useState('Excellent frame pacing and smooth responsive UI in the new gameplay sandbox build.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      completeSuperTask(task.id);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span>Target Build:</span>
          <span className="font-mono text-cyan-400 font-bold">EKW-Alpha-GameArena-v2.4</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Please rate the preview build below and submit your feedback to claim your $18.00 bounty.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-400 font-semibold mb-1 block">Graphics & Aesthetic Quality (1-5):</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setGraphicsRating(star)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                  graphicsRating >= star
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{star}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-semibold mb-1 block">Gameplay Responsiveness & Controls (1-5):</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setGameplayRating(star)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                  gameplayRating >= star
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{star}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-semibold mb-1 block">Constructive Review Sentence:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            required
          />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isSubmitting ? 'Verifying...' : 'Submit & Claim $18.00'}</span>
        </button>
      </div>
    </form>
  );
};

/* =========================================================================
   4. Social Share Task
   ========================================================================= */
const SocialShareTask: React.FC<{ task: SuperTask; onClose: () => void }> = ({ task, onClose }) => {
  const { completeSuperTask, user } = useApp();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const shareText = `🎮 Join me on EKWorld Games! Complete super tasks, play interactive mini-games, and earn real-time streaming daily returns. Use my invitation code: ${user.referralCode} — https://ekworld.games/join?ref=${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaim = () => {
    completeSuperTask(task.id);
    onClose();
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">
        Copy your personalized announcement statement and share to any community or social feed.
      </p>

      <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
        <div className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          {shareText}
        </div>
        <button
          onClick={handleCopy}
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Promo Statement'}</span>
        </button>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleClaim}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30"
        >
          <Share2 className="w-4 h-4" />
          <span>Confirm & Claim $10.00</span>
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   5. Survey Task Runner
   ========================================================================= */
const SurveyTaskRunner: React.FC<{ task: SuperTask; onClose: () => void }> = ({ task, onClose }) => {
  const { completeSuperTask } = useApp();
  const [answers, setAnswers] = useState({
    experience: 'Excellent',
    preferredPayout: 'USDT (TRC-20)',
    desiredFeature: 'More Mini-Games',
  });

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    completeSuperTask(task.id);
    onClose();
  };

  return (
    <form onSubmit={handleComplete} className="space-y-4">
      <p className="text-xs text-slate-400">
        Answer 3 brief product questions to help us optimize payout channels and game arenas.
      </p>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-slate-400 font-semibold mb-1 block">1. How is your platform navigation experience?</label>
          <div className="flex items-center gap-2">
            {['Excellent', 'Smooth', 'Standard'].map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => setAnswers(prev => ({ ...prev, experience: opt }))}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                  answers.experience === opt
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-400 font-semibold mb-1 block">2. What is your preferred withdrawal network?</label>
          <div className="flex items-center gap-2">
            {['USDT (TRC-20)', 'Bitcoin (BTC)', 'Bank Wire'].map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => setAnswers(prev => ({ ...prev, preferredPayout: opt }))}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                  answers.preferredPayout === opt
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-slate-400 font-semibold mb-1 block">3. Which features would you like to see expanded?</label>
          <div className="flex items-center gap-2">
            {['More Mini-Games', 'Higher VIP Staking', 'Instant OTC'].map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => setAnswers(prev => ({ ...prev, desiredFeature: opt }))}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                  answers.desiredFeature === opt
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-500/20"
        >
          Submit & Claim $15.00
        </button>
      </div>
    </form>
  );
};

/* =========================================================================
   6. Generic Fallback Runner
   ========================================================================= */
const GenericTaskRunner: React.FC<{ task: SuperTask; onClose: () => void }> = ({ task, onClose }) => {
  const { completeSuperTask } = useApp();

  return (
    <div className="space-y-4 text-center py-4">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
        <Zap className="w-7 h-7" />
      </div>
      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
        {task.description}
      </p>
      <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            completeSuperTask(task.id);
            onClose();
          }}
          className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
        >
          Claim Bounty (+${task.rewardAmount.toFixed(2)})
        </button>
      </div>
    </div>
  );
};
