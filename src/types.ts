export type NavTab = 'dashboard' | 'plans' | 'tasks' | 'wallet' | 'affiliate' | 'how-it-works';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  vipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Titan';
  mainBalance: number;         // Available liquid balance
  stakedBalance: number;       // Capital currently locked in plans
  claimableYield: number;      // Accumulated yields ready to collect
  taskEarnings: number;        // Lifetime task earnings
  totalWithdrawn: number;      // Lifetime withdrawals
  referralCode: string;
  referredBy?: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
  pinCode: string;             // 4-digit security PIN for withdrawals
  streakDays: number;
  lastCheckInDate?: string;
  freeSpinsAvailable: number;
  registeredAt?: string;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  tier: string;
  tagline: string;
  minDeposit: number;
  maxDeposit: number;
  dailyRoiPercent: number;     // e.g. 1.8% per day
  durationDays: number;        // e.g. 14 days
  totalRoiPercent: number;     // e.g. 25.2%
  riskGrade: 'Low' | 'Moderate' | 'Balanced' | 'Growth' | 'High Yield';
  principalReturn: boolean;    // Return principal at end
  payoutFrequency: 'Every Second (Live)' | 'Daily' | 'End of Term';
  badgeColor: string;
  accentColor: string;
  iconName: string;
  description: string;
  features: string[];
  activeSubscribers: number;
  featured?: boolean;
}

export interface ActiveContract {
  id: string;
  planId: string;
  planName: string;
  investedAmount: number;
  dailyRoiPercent: number;
  dailyYieldAmount: number;
  durationDays: number;
  startDate: string;           // ISO string
  endDate: string;             // ISO string
  accumulatedYield: number;    // Total generated so far
  claimedYield: number;        // Total claimed to main balance
  unclaimedYield: number;      // Current claimable in this contract
  status: 'active' | 'completed' | 'cancelled';
  accentColor: string;
}

export type TaskCategory = 'daily' | 'gaming' | 'partner' | 'social' | 'survey';
export type TaskDifficulty = 'Easy' | 'Medium' | 'Super';

export interface SuperTask {
  id: string;
  title: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  rewardAmount: number;
  xpPoints: number;
  timeEstimate: string;
  iconName: string;
  description: string;
  requirements: string[];
  type: 'checkin' | 'game_tap' | 'game_wheel' | 'partner_review' | 'social_share' | 'survey' | 'security_quiz';
  status: 'available' | 'in_progress' | 'completed';
  cooldownHours?: number;
  completedAt?: string;
  bannerGradient: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'plan_stake' | 'yield_claim' | 'task_reward' | 'referral_bonus' | 'checkin_bonus';
  title: string;
  amount: number;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  timestamp: string;
  method?: string;
  txHash?: string;
  details?: string;
}

export interface ReferralMember {
  id: string;
  username: string;
  level: 1 | 2 | 3;
  joinedDate: string;
  totalDeposited: number;
  commissionEarned: number;
  status: 'active' | 'inactive';
}

export interface LiveActivityItem {
  id: string;
  userMasked: string;
  action: string;
  amount: number;
  type: 'task' | 'yield' | 'deposit' | 'withdrawal' | 'stake';
  timeAgo: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'reward';
  timestamp: string;
  read: boolean;
}
