import { InvestmentPlan, SuperTask, UserProfile, ActiveContract, Transaction, ReferralMember, LiveActivityItem } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_ek_99214',
  name: 'Alex Vance',
  email: 'alex.vance@ekworld.net',
  phone: '+256 772 108 492',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  vipTier: 'Bronze',
  mainBalance: 0.00,
  stakedBalance: 0.00,
  claimableYield: 0.00,
  taskEarnings: 0.00,
  totalWithdrawn: 0.00,
  referralCode: 'EKW-8892',
  kycStatus: 'verified',
  pinCode: '7721',
  streakDays: 0,
  lastCheckInDate: '',
  freeSpinsAvailable: 0,
  registeredAt: new Date().toISOString(),
};

export const INITIAL_PLANS: InvestmentPlan[] = [
  {
    id: 'plan_bus_100k',
    name: 'Package 1 • A BUS INVEST',
    tier: 'Package 1 • Heavy Transit',
    tagline: 'Invest UGX 100,000 • Daily UGX 28,000 • Monthly UGX 3,000,000',
    minDeposit: 100000,
    maxDeposit: 100000,
    dailyRoiPercent: 28.00,
    durationDays: 30,
    totalRoiPercent: 840.00,
    riskGrade: 'Growth',
    principalReturn: true,
    payoutFrequency: 'Every Second (Live)',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    accentColor: '#06b6d4',
    iconName: 'Bus',
    description: 'Invest in Package 1 (A BUS INVEST) for UGX 100,000. Receive guaranteed daily profits of UGX 28,000 streaming live for 30 days, achieving UGX 840,000 base return and up to UGX 3,000,000 total monthly return potential.',
    features: [
      'Package 1: Invest UGX 100,000 capital',
      'Daily profit: UGX 28,000 streaming live (28% daily)',
      'Monthly return potential: UGX 3,000,000',
      'Validity: 30 Days continuous yield stream',
      'Supported channels: MTN Mobile Money & Airtel Money',
      'Principal returned at 30-day contract maturity'
    ],
    activeSubscribers: 3680,
    featured: true
  },
  {
    id: 'plan_plane_500k',
    name: 'Package 2 • PLANE INVEST',
    tier: 'Package 2 • Aero Flight',
    tagline: 'Invest UGX 500,000 • Daily UGX 42,000 • Monthly UGX 4,500,000',
    minDeposit: 500000,
    maxDeposit: 500000,
    dailyRoiPercent: 8.40,
    durationDays: 30,
    totalRoiPercent: 252.00,
    riskGrade: 'Growth',
    principalReturn: true,
    payoutFrequency: 'Every Second (Live)',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    accentColor: '#3b82f6',
    iconName: 'Plane',
    description: 'Invest in Package 2 (PLANE INVEST) for UGX 500,000. Earn daily profits of UGX 42,000 streaming second-by-second for 30 days, achieving UGX 1,260,000 base return and up to UGX 4,500,000 monthly total returns.',
    features: [
      'Package 2: Invest UGX 500,000 capital',
      'Daily profit: UGX 42,000 streaming live (8.4% daily)',
      'Monthly return potential: UGX 4,500,000',
      'Validity: 30 Days continuous yield stream',
      '+5 Free Daily Matrix Wheel Spins',
      'Priority VIP fast-track cashout channel'
    ],
    activeSubscribers: 2840,
    featured: true
  },
  {
    id: 'plan_gold_train_1m',
    name: 'Package 3 • GOLD TRAIN INVEST',
    tier: 'Package 3 • Gold Rail Sovereign',
    tagline: 'Invest UGX 1,000,000 • Daily UGX 60,000 • Monthly UGX 5,000,000',
    minDeposit: 1000000,
    maxDeposit: 1000000,
    dailyRoiPercent: 6.00,
    durationDays: 30,
    totalRoiPercent: 180.00,
    riskGrade: 'High Yield',
    principalReturn: true,
    payoutFrequency: 'Every Second (Live)',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    accentColor: '#f59e0b',
    iconName: 'Train',
    description: 'Invest in Package 3 (GOLD TRAIN INVEST) for UGX 1,000,000. Harvest daily profits of UGX 60,000 every day for 30 days, delivering UGX 1,800,000 base return and up to UGX 5,000,000 monthly total returns.',
    features: [
      'Package 3: Invest UGX 1,000,000 capital',
      'Daily profit: UGX 60,000 streaming live (6% daily)',
      'Monthly return potential: UGX 5,000,000',
      'Validity: 30 Days continuous yield stream',
      'VIP Gold Tier status upgrade unlocked',
      'Zero-fee instant MTN / Airtel cashouts'
    ],
    activeSubscribers: 1950,
    featured: true
  },
  {
    id: 'plan_spaceship_4m',
    name: 'Package 4 • SPACE SHIP INVEST',
    tier: 'Package 4 • Apex Cosmic Vault',
    tagline: 'Invest UGX 4,000,000 • Daily UGX 210,000 • Monthly UGX 8,000,000',
    minDeposit: 4000000,
    maxDeposit: 4000000,
    dailyRoiPercent: 5.25,
    durationDays: 30,
    totalRoiPercent: 157.50,
    riskGrade: 'High Yield',
    principalReturn: true,
    payoutFrequency: 'Every Second (Live)',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    accentColor: '#a855f7',
    iconName: 'Rocket',
    description: 'Invest in Package 4 (SPACE SHIP INVEST) for UGX 4,000,000. Enjoy high-velocity daily profits of UGX 210,000 streaming live for 30 days, yielding UGX 6,300,000 base return and up to UGX 8,000,000 monthly total returns.',
    features: [
      'Package 4: Invest UGX 4,000,000 sovereign capital',
      'Daily profit: UGX 210,000 streaming live (5.25% daily)',
      'Monthly return potential: UGX 8,000,000',
      'Validity: 30 Days continuous yield stream',
      'VIP Titan Sovereign Status & Concierge',
      '100% Capital Principal Assurance policy'
    ],
    activeSubscribers: 890,
    featured: true
  }
];

export const INITIAL_CONTRACTS: ActiveContract[] = [];

export const INITIAL_SUPER_TASKS: SuperTask[] = [
  {
    id: 'task_daily_checkin',
    title: 'Daily Protocol Check-In',
    category: 'daily',
    difficulty: 'Easy',
    rewardAmount: 5.00,
    xpPoints: 50,
    timeEstimate: 'Instant',
    iconName: 'CalendarCheck',
    description: 'Maintain your daily check-in streak to earn direct cash bounties and upgrade your weekly streak multiplier.',
    requirements: [
      'Login to EKWorld Games daily',
      'Confirm daily presence to unlock today’s bounty',
      'Consecutive 7-day streak grants $35.00 mega bonus'
    ],
    type: 'checkin',
    status: 'available',
    bannerGradient: 'from-emerald-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'task_matrix_tap',
    title: 'Matrix Reflex Tap Sprint',
    category: 'gaming',
    difficulty: 'Medium',
    rewardAmount: 12.50,
    xpPoints: 120,
    timeEstimate: '15 Seconds',
    iconName: 'Crosshair',
    description: 'Test your reaction speed in an intense 15-second visual reflex game. Score at least 25 target hits to secure the bounty.',
    requirements: [
      'Tap golden glowing targets before they disappear',
      'Avoid red penalty traps (-3 score)',
      'Reach target threshold (25+ hits) to claim cash reward'
    ],
    type: 'game_tap',
    status: 'available',
    bannerGradient: 'from-cyan-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'task_quantum_wheel',
    title: 'Quantum Multiplier Wheel',
    category: 'gaming',
    difficulty: 'Easy',
    rewardAmount: 25.00,
    xpPoints: 100,
    timeEstimate: 'Instant',
    iconName: 'Disc',
    description: 'Spin the Quantum Wheel using your available free spins to win instant USDT cash bounties up to $100.00 or bonus task multipliers.',
    requirements: [
      'Use 1 Free Spin from your daily quota',
      'Watch the physical physics needle land on your prize',
      'Prizes are automatically credited to your Main Balance'
    ],
    type: 'game_wheel',
    status: 'available',
    bannerGradient: 'from-purple-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'task_game_review',
    title: 'Partner Game Feedback & UX Rating',
    category: 'partner',
    difficulty: 'Medium',
    rewardAmount: 18.00,
    xpPoints: 180,
    timeEstimate: '2 Mins',
    iconName: 'Star',
    description: 'Evaluate our ecosystem partner’s latest interactive game build. Provide 3 quick ratings and brief gameplay feedback.',
    requirements: [
      'Inspect the embedded preview or teaser snippet',
      'Rate graphics, responsiveness, and excitement (1-5 Stars)',
      'Submit short constructive sentence to verify completion'
    ],
    type: 'partner_review',
    status: 'available',
    bannerGradient: 'from-amber-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'task_social_broadcast',
    title: 'Community Social Broadcast',
    category: 'social',
    difficulty: 'Easy',
    rewardAmount: 10.00,
    xpPoints: 80,
    timeEstimate: '1 Min',
    iconName: 'Share2',
    description: 'Share your EKWorld Games referral link or performance milestone to Twitter/X, Telegram, or Discord community channels.',
    requirements: [
      'Copy your personalized promo statement with referral link',
      'Simulate broadcast to community channels',
      'Confirm link delivery to claim instant $10.00 bounty'
    ],
    type: 'social_share',
    status: 'available',
    bannerGradient: 'from-blue-900/40 via-slate-900 to-slate-950'
  },
  {
    id: 'task_market_survey',
    title: 'Digital Asset & Platform Feedback Survey',
    category: 'survey',
    difficulty: 'Medium',
    rewardAmount: 15.00,
    xpPoints: 150,
    timeEstimate: '3 Mins',
    iconName: 'ClipboardList',
    description: 'Help the EKWorld product engineering team refine future staking plans, withdrawal channels, and game integrations.',
    requirements: [
      'Answer 4 brief multiple-choice industry questions',
      'Select preferred payout networks (TRC20, BEP20, Lightning)',
      'Complete submission to receive your direct survey bounty'
    ],
    type: 'survey',
    status: 'available',
    bannerGradient: 'from-rose-900/40 via-slate-900 to-slate-950'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [];

export const INITIAL_REFERRALS: ReferralMember[] = [
  {
    id: 'ref_1',
    username: 'Marcus_Crypto',
    level: 1,
    joinedDate: '2026-08-02',
    totalDeposited: 12500,
    commissionEarned: 1000.00, // 8%
    status: 'active'
  },
  {
    id: 'ref_2',
    username: 'Elena_V',
    level: 1,
    joinedDate: '2026-08-05',
    totalDeposited: 6000,
    commissionEarned: 480.00, // 8%
    status: 'active'
  },
  {
    id: 'ref_3',
    username: 'Kenji_Sato',
    level: 2,
    joinedDate: '2026-08-09',
    totalDeposited: 4500,
    commissionEarned: 180.00, // 4%
    status: 'active'
  },
  {
    id: 'ref_4',
    username: 'Sarah_Trader',
    level: 3,
    joinedDate: '2026-08-11',
    totalDeposited: 8000,
    commissionEarned: 80.00, // 1%
    status: 'active'
  }
];

export const INITIAL_LIVE_ACTIVITIES: LiveActivityItem[] = [
  { id: '1', userMasked: 'usr_88***91', action: 'completed Super Task: Matrix Tap', amount: 12.50, type: 'task', timeAgo: '4s ago' },
  { id: '2', userMasked: 'usr_42***04', action: 'subscribed to Apex SuperNode (30D)', amount: 5000.00, type: 'stake', timeAgo: '18s ago' },
  { id: '3', userMasked: 'usr_99***12', action: 'claimed live yield', amount: 142.30, type: 'yield', timeAgo: '32s ago' },
  { id: '4', userMasked: 'usr_13***87', action: 'withdrew funds to USDT-TRC20', amount: 850.00, type: 'withdrawal', timeAgo: '1m ago' },
  { id: '5', userMasked: 'usr_77***66', action: 'deposited via Crypto Instant', amount: 2000.00, type: 'deposit', timeAgo: '2m ago' },
  { id: '6', userMasked: 'usr_21***45', action: 'spun Quantum Wheel (Jackpot Tier)', amount: 50.00, type: 'task', timeAgo: '3m ago' },
  { id: '7', userMasked: 'usr_64***89', action: 'subscribed to Titan VIP Vault (90D)', amount: 20000.00, type: 'stake', timeAgo: '4m ago' },
];
