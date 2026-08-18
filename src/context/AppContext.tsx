import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  InvestmentPlan,
  ActiveContract,
  SuperTask,
  Transaction,
  ReferralMember,
  LiveActivityItem,
  NotificationItem,
  NavTab
} from '../types';
import {
  INITIAL_USER,
  INITIAL_PLANS,
  INITIAL_CONTRACTS,
  INITIAL_SUPER_TASKS,
  INITIAL_TRANSACTIONS,
  INITIAL_REFERRALS,
  INITIAL_LIVE_ACTIVITIES
} from '../data/mockInitialData';
import {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut
} from '../lib/firebase';

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isAuthenticated: boolean;
  user: UserProfile;
  plans: InvestmentPlan[];
  activeContracts: ActiveContract[];
  tasks: SuperTask[];
  transactions: Transaction[];
  referrals: ReferralMember[];
  liveActivities: LiveActivityItem[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  
  // Modals state
  isDepositModalOpen: boolean;
  setIsDepositModalOpen: (open: boolean) => void;
  isWithdrawModalOpen: boolean;
  setIsWithdrawModalOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  selectedPlanForSubscribe: InvestmentPlan | null;
  setSelectedPlanForSubscribe: (plan: InvestmentPlan | null) => void;
  selectedTaskForRunning: SuperTask | null;
  setSelectedTaskForRunning: (task: SuperTask | null) => void;

  // Actions
  login: (identifier: string, pinOrPassword?: string) => { success: boolean; message: string };
  register: (formData: { name: string; email: string; phone: string; pinCode: string; password?: string; referralCode?: string }) => { success: boolean; message: string };
  updateProfile: (updatedData: Partial<UserProfile>) => { success: boolean; message: string };
  quickDemoLogin: () => void;
  logout: () => void;
  depositFunds: (amount: number, method: string, reference?: string) => boolean;
  withdrawFunds: (amount: number, method: string, targetAddress: string, pin: string) => { success: boolean; message: string };
  subscribeToPlan: (planId: string, amount: number) => { success: boolean; message: string };
  claimYield: (contractId?: string) => number;
  completeSuperTask: (taskId: string, customReward?: number) => void;
  performDailyCheckIn: () => { success: boolean; reward: number; streak: number; message: string };
  spinWheel: (prizeAmount: number, prizeLabel: string) => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  markNotificationsAsRead: () => void;
  resetDemoWallet: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Authentication State (default to false: user must first sign up or sign in)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const sessionAuth = sessionStorage.getItem('ekw_auth_session_v3');
    if (sessionAuth === 'true') return true;
    const localAuth = localStorage.getItem('ekw_auth_session_v3');
    return localAuth === 'true';
  });

  // Load or fallback to mock data
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ekw_user_v4');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [registeredAccounts, setRegisteredAccounts] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('ekw_registered_accounts_v4');
    return saved ? JSON.parse(saved) : [INITIAL_USER];
  });

  const [plans] = useState<InvestmentPlan[]>(INITIAL_PLANS);

  const [activeContracts, setActiveContracts] = useState<ActiveContract[]>(() => {
    const saved = localStorage.getItem('ekw_contracts_v4');
    return saved ? JSON.parse(saved) : INITIAL_CONTRACTS;
  });

  const [tasks, setTasks] = useState<SuperTask[]>(() => {
    const saved = localStorage.getItem('ekw_tasks_v4');
    return saved ? JSON.parse(saved) : INITIAL_SUPER_TASKS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ekw_tx_v4');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [referrals] = useState<ReferralMember[]>(INITIAL_REFERRALS);
  const [liveActivities, setLiveActivities] = useState<LiveActivityItem[]>(INITIAL_LIVE_ACTIVITIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'Welcome to EKWorld Games',
      message: 'Deposit via Pesapal to fund your wallet and start investing in packages.',
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);

  // Modal States
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [selectedPlanForSubscribe, setSelectedPlanForSubscribe] = useState<InvestmentPlan | null>(null);
  const [selectedTaskForRunning, setSelectedTaskForRunning] = useState<SuperTask | null>(null);

  // Firebase Authentication State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data() as UserProfile;
            setUser(data);
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.warn('Firebase user sync note:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync to localStorage, sessionStorage & Firestore
  useEffect(() => {
    sessionStorage.setItem('ekw_auth_session_v4', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('ekw_auth_session_v4', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('ekw_registered_accounts_v4', JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  useEffect(() => {
    localStorage.setItem('ekw_user_v4', JSON.stringify(user));
    // Also sync to Firestore if user ID exists
    if (user && user.id) {
      try {
        const userDocRef = doc(db, 'users', user.id);
        setDoc(userDocRef, user, { merge: true }).catch(() => {});
      } catch {
        // Fallback gracefully
      }
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ekw_contracts_v4', JSON.stringify(activeContracts));
  }, [activeContracts]);

  useEffect(() => {
    localStorage.setItem('ekw_tasks_v4', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ekw_tx_v4', JSON.stringify(transactions));
  }, [transactions]);

  // Auth: Register new account
  const register = (formData: {
    name: string;
    email: string;
    phone: string;
    pinCode: string;
    password?: string;
    referralCode?: string;
  }) => {
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPhone = formData.phone.trim();
    const cleanPin = (formData.pinCode || '1234').trim();
    const cleanPassword = formData.password || 'EkwPass2026!';

    if (!cleanName) {
      return { success: false, message: 'Please enter your full name.' };
    }
    if (!cleanPhone) {
      return { success: false, message: 'Please enter your mobile money phone number (MTN/Airtel).' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (cleanPin.length !== 4) {
      return { success: false, message: 'Please set a 4-digit security PIN for withdrawals.' };
    }

    // Check if account with email or phone already exists locally
    const existing = registeredAccounts.find(
      acc => acc.email.toLowerCase() === cleanEmail || (acc.phone && acc.phone === cleanPhone)
    );

    if (existing) {
      setUser(existing);
      setIsAuthenticated(true);
      addNotification('Welcome Back', `Logged in to existing account: ${existing.name}`, 'info');
      return { success: true, message: `Account already exists. Welcome back, ${existing.name}!` };
    }

    const newUserId = 'usr_ug_' + Math.floor(100000 + Math.random() * 900000);

    const newUser: UserProfile = {
      id: newUserId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
      vipTier: 'Bronze',
      mainBalance: 0.00, // Starts at 0.00 strictly until Pesapal deposit
      stakedBalance: 0.00,
      claimableYield: 0.00,
      taskEarnings: 0.00,
      totalWithdrawn: 0.00,
      referralCode: 'EKW-' + Math.floor(1000 + Math.random() * 9000),
      referredBy: formData.referralCode || 'EKW-8892',
      kycStatus: 'verified',
      pinCode: cleanPin,
      streakDays: 0,
      lastCheckInDate: '',
      freeSpinsAvailable: 0,
      registeredAt: new Date().toISOString()
    };

    // Firebase Auth & Firestore registration in parallel
    createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword)
      .then(async (userCred) => {
        const uid = userCred.user.uid;
        const profileWithUid = { ...newUser, id: uid };
        await setDoc(doc(db, 'users', uid), profileWithUid);
        setUser(profileWithUid);
      })
      .catch(() => {
        // If email-password fails (e.g. offline or duplicate), store securely in Firestore using generated ID
        try {
          setDoc(doc(db, 'users', newUserId), newUser).catch(() => {});
        } catch {}
      });

    setRegisteredAccounts(prev => [newUser, ...prev]);
    setUser(newUser);
    setIsAuthenticated(true);

    addNotification(
      'Account Created!',
      `Welcome ${cleanName}! Your account has been initialized with UGX 0.00 balance. Deposit via Pesapal to fund your wallet and start investing.`,
      'reward'
    );

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.5 }
    });

    return { success: true, message: 'Account created successfully with UGX 0.00 balance.' };
  };

  // Auth: Login to account
  const login = (identifier: string, pinOrPassword?: string) => {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) {
      return { success: false, message: 'Please enter your Email or Phone Number.' };
    }

    // Try Firebase Email Sign-In if applicable
    if (cleanId.includes('@') && pinOrPassword) {
      signInWithEmailAndPassword(auth, cleanId, pinOrPassword).catch(() => {});
    }

    // Look for matching registered account
    const matched = registeredAccounts.find(
      acc => acc.email.toLowerCase() === cleanId || 
             (acc.phone && acc.phone.replace(/\s+/g, '').includes(cleanId.replace(/\s+/g, ''))) ||
             acc.id.toLowerCase() === cleanId
    );

    if (matched) {
      setUser(matched);
      setIsAuthenticated(true);
      addNotification('Welcome Back', `Successfully logged in as ${matched.name}.`, 'info');
      return { success: true, message: `Welcome back, ${matched.name}!` };
    }

    // Default fallback: allow Alex Vance demo account
    if (cleanId.includes('alex') || cleanId.includes('demo')) {
      setUser(INITIAL_USER);
      setIsAuthenticated(true);
      return { success: true, message: 'Logged in to Alex Vance Demo Account.' };
    }

    return {
      success: false,
      message: 'Account not found. Please click "Sign Up (Register)" below to create your account.'
    };
  };

  // Auth: Quick Demo Login
  const quickDemoLogin = () => {
    setUser(INITIAL_USER);
    setIsAuthenticated(true);
    signInAnonymously(auth).catch(() => {});
    addNotification('Demo Account Activated', 'Logged in to test account with UGX 0.00 balance. Deposit via Pesapal to start investing.', 'info');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Auth: Logout
  const logout = () => {
    signOut(auth).catch(() => {});
    setIsAuthenticated(false);
    addNotification('Signed Out', 'You have been safely signed out of your account.', 'info');
  };

  // Update Profile & Sync to Firebase Firestore
  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return { success: false, message: 'No active user found.' };

    const updatedUser: UserProfile = {
      ...user,
      ...updatedData
    };

    setUser(updatedUser);

    // Update in registered accounts list
    setRegisteredAccounts(prev => 
      prev.map(acc => (acc.id === user.id || (acc.email && acc.email === user.email)) ? updatedUser : acc)
    );

    // Sync to Cloud Firestore
    try {
      const userDocRef = doc(db, 'users', updatedUser.id);
      setDoc(userDocRef, updatedUser, { merge: true }).catch((err) => {
        console.warn('Firestore profile sync fallback:', err);
      });
    } catch (e) {
      console.warn('Firestore update error:', e);
    }

    addNotification(
      'Profile Updated',
      'Your profile details and security settings were successfully saved.',
      'info'
    );

    return { success: true, message: 'Profile updated successfully!' };
  };

  // Notification helper
  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now() + Math.random().toString(36).substring(2, 5),
      title,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Real-time second-by-second yield engine
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeContracts.length === 0) return;

      // Calculate fractional yield per second: (dailyYieldAmount / 86400)
      let secondAccrualTotal = 0;

      setActiveContracts(prevContracts => {
        return prevContracts.map(contract => {
          if (contract.status !== 'active') return contract;
          const perSecond = contract.dailyYieldAmount / 86400;
          secondAccrualTotal += perSecond;
          return {
            ...contract,
            accumulatedYield: contract.accumulatedYield + perSecond,
            unclaimedYield: contract.unclaimedYield + perSecond
          };
        });
      });

      if (secondAccrualTotal > 0) {
        setUser(prev => ({
          ...prev,
          claimableYield: prev.claimableYield + secondAccrualTotal
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeContracts]);

  // Periodic random live global activity generator
  useEffect(() => {
    const actionsPool = [
      { action: 'claimed live staking yield', type: 'yield' as const, baseAmt: 45 },
      { action: 'completed Super Task: Matrix Tap', type: 'task' as const, baseAmt: 12.5 },
      { action: 'subscribed to Gamer Growth (14D)', type: 'stake' as const, baseAmt: 1500 },
      { action: 'deposited via USDT-TRC20', type: 'deposit' as const, baseAmt: 3000 },
      { action: 'withdrew to External Wallet', type: 'withdrawal' as const, baseAmt: 620 },
      { action: 'spun Quantum Multiplier Wheel', type: 'task' as const, baseAmt: 25 },
      { action: 'subscribed to Apex SuperNode (30D)', type: 'stake' as const, baseAmt: 7500 },
    ];

    const interval = setInterval(() => {
      const randomAction = actionsPool[Math.floor(Math.random() * actionsPool.length)];
      const randomUser = `usr_${Math.floor(10 + Math.random() * 89)}***${Math.floor(10 + Math.random() * 89)}`;
      const amountVariation = +(randomAction.baseAmt * (0.6 + Math.random() * 0.8)).toFixed(2);

      const newItem: LiveActivityItem = {
        id: Date.now().toString(),
        userMasked: randomUser,
        action: randomAction.action,
        amount: amountVariation,
        type: randomAction.type,
        timeAgo: 'Just now'
      };

      setLiveActivities(prev => [newItem, ...prev.slice(0, 14)]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // Deposit funds
  const depositFunds = (amount: number, method: string, reference?: string): boolean => {
    if (amount <= 0) return false;

    const txRef = reference || ('0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'deposit',
      title: `Deposit via ${method}`,
      amount: amount,
      status: 'completed',
      timestamp: new Date().toISOString(),
      method: method,
      txHash: txRef,
      details: reference ? `Payment Reference / Tracking ID: ${reference}` : `Direct ${method} Gateway Settlement`
    };

    const newBalance = user.mainBalance + amount;
    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance + amount
    }));

    setTransactions(prev => [newTx, ...prev]);

    // Persistent sync to Cloud Firestore
    try {
      if (user?.id) {
        setDoc(doc(db, 'users', user.id), {
          mainBalance: newBalance
        }, { merge: true }).catch(() => {});
      }
    } catch {}

    addNotification(
      'Deposit Confirmed',
      `UGX ${amount.toLocaleString()} has been credited to your Main Balance via ${method}.`,
      'success'
    );

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    return true;
  };

  // Withdraw funds
  const withdrawFunds = (
    amount: number,
    method: string,
    targetAddress: string,
    pin: string
  ): { success: boolean; message: string } => {
    if (pin !== user.pinCode) {
      return { success: false, message: 'Invalid 4-Digit Security PIN. Please verify your PIN (Default: 7721).' };
    }
    if (amount < 20) {
      return { success: false, message: 'Minimum withdrawal amount is $20.00.' };
    }
    if (amount > user.mainBalance) {
      return { success: false, message: `Insufficient available funds. Your liquid balance is $${user.mainBalance.toFixed(2)}.` };
    }

    const fee = +(amount * 0.015).toFixed(2); // 1.5% network & processing fee
    const netPayout = +(amount - fee).toFixed(2);

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'withdrawal',
      title: `Withdrawal via ${method}`,
      amount: -amount,
      status: 'processing',
      timestamp: new Date().toISOString(),
      method: method,
      txHash: '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6),
      details: `To: ${targetAddress.slice(0, 8)}... (Net Payout: $${netPayout.toFixed(2)}, Fee: $${fee.toFixed(2)})`
    };

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount
    }));

    setTransactions(prev => [newTx, ...prev]);

    addNotification(
      'Withdrawal Request Submitted',
      `Your withdrawal for $${netPayout.toFixed(2)} is being processed via ${method}. Funds will arrive shortly.`,
      'info'
    );

    // Simulate auto-completion after 6 seconds
    setTimeout(() => {
      setTransactions(prev => prev.map(tx => tx.id === newTx.id ? { ...tx, status: 'completed' } : tx));
      addNotification(
        'Withdrawal Confirmed & Paid',
        `$${netPayout.toFixed(2)} has been successfully broadcast to your target address: ${targetAddress.slice(0, 10)}...`,
        'success'
      );
    }, 6000);

    return { success: true, message: `Withdrawal of $${amount.toFixed(2)} submitted successfully.` };
  };

  // Subscribe to Investment Plan
  const subscribeToPlan = (planId: string, amount: number): { success: boolean; message: string } => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return { success: false, message: 'Selected plan was not found.' };

    if (amount < plan.minDeposit) {
      return { success: false, message: `Minimum deposit for ${plan.name} is $${plan.minDeposit.toLocaleString()}.` };
    }
    if (amount > plan.maxDeposit) {
      return { success: false, message: `Maximum deposit for ${plan.name} is $${plan.maxDeposit.toLocaleString()}.` };
    }
    if (amount > user.mainBalance) {
      return {
        success: false,
        message: `Insufficient liquid balance ($${user.mainBalance.toFixed(2)}). Please deposit funds first.`
      };
    }

    const dailyYieldAmt = +(amount * (plan.dailyRoiPercent / 100)).toFixed(2);
    const startDate = new Date();
    const endDate = new Date(Date.now() + plan.durationDays * 86400000);

    const newContract: ActiveContract = {
      id: 'cnt_' + Math.floor(1000 + Math.random() * 9000),
      planId: plan.id,
      planName: `${plan.name} (${plan.durationDays}-Day)`,
      investedAmount: amount,
      dailyRoiPercent: plan.dailyRoiPercent,
      dailyYieldAmount: dailyYieldAmt,
      durationDays: plan.durationDays,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      accumulatedYield: 0,
      claimedYield: 0,
      unclaimedYield: 0,
      status: 'active',
      accentColor: plan.accentColor
    };

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'plan_stake',
      title: `Subscribed to ${plan.name} (${plan.durationDays}D)`,
      amount: -amount,
      status: 'completed',
      timestamp: new Date().toISOString(),
      details: `Staked $${amount.toLocaleString()} at ${plan.dailyRoiPercent}% daily return`
    };

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance - amount,
      stakedBalance: prev.stakedBalance + amount,
      freeSpinsAvailable: prev.freeSpinsAvailable + (plan.durationDays >= 30 ? 3 : 1)
    }));

    setActiveContracts(prev => [newContract, ...prev]);
    setTransactions(prev => [newTx, ...prev]);

    addNotification(
      'Plan Activated!',
      `Successfully subscribed $${amount.toLocaleString()} into ${plan.name}. Real-time yield streaming has begun!`,
      'reward'
    );

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    return {
      success: true,
      message: `Successfully activated ${plan.name}! Live daily returns: $${dailyYieldAmt.toFixed(2)}/day.`
    };
  };

  // Claim Live Yields
  const claimYield = (contractId?: string): number => {
    let amountToClaim = 0;

    if (contractId) {
      const contract = activeContracts.find(c => c.id === contractId);
      if (!contract || contract.unclaimedYield <= 0) return 0;
      amountToClaim = contract.unclaimedYield;

      setActiveContracts(prev =>
        prev.map(c =>
          c.id === contractId
            ? {
                ...c,
                claimedYield: c.claimedYield + amountToClaim,
                unclaimedYield: 0
              }
            : c
        )
      );

      setUser(prev => ({
        ...prev,
        mainBalance: prev.mainBalance + amountToClaim,
        claimableYield: Math.max(0, prev.claimableYield - amountToClaim)
      }));
    } else {
      // Claim ALL
      amountToClaim = user.claimableYield;
      if (amountToClaim <= 0) return 0;

      setActiveContracts(prev =>
        prev.map(c => ({
          ...c,
          claimedYield: c.claimedYield + c.unclaimedYield,
          unclaimedYield: 0
        }))
      );

      setUser(prev => ({
        ...prev,
        mainBalance: prev.mainBalance + amountToClaim,
        claimableYield: 0
      }));
    }

    if (amountToClaim > 0) {
      const newTx: Transaction = {
        id: 'tx_' + Date.now(),
        type: 'yield_claim',
        title: 'Claimed Real-Time Staking Yield',
        amount: +amountToClaim.toFixed(2),
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: 'Harvested directly into Available Main Balance'
      };

      setTransactions(prev => [newTx, ...prev]);

      addNotification(
        'Yields Claimed!',
        `Successfully transferred $${amountToClaim.toFixed(2)} into your available Main Balance.`,
        'reward'
      );

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    return amountToClaim;
  };

  // Complete Super Task
  const completeSuperTask = (taskId: string, customReward?: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const reward = customReward !== undefined ? customReward : task.rewardAmount;

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
          : t
      )
    );

    setUser(prev => ({
      ...prev,
      mainBalance: prev.mainBalance + reward,
      taskEarnings: prev.taskEarnings + reward
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'task_reward',
      title: `Super Task: ${task.title}`,
      amount: reward,
      status: 'completed',
      timestamp: new Date().toISOString(),
      details: `Completed ${task.category.toUpperCase()} task (+${task.xpPoints} XP)`
    };

    setTransactions(prev => [newTx, ...prev]);

    addNotification(
      'Super Task Completed!',
      `You earned $${reward.toFixed(2)} for finishing "${task.title}".`,
      'reward'
    );

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  // Perform Daily Check-in
  const performDailyCheckIn = (): { success: boolean; reward: number; streak: number; message: string } => {
    const today = new Date().toISOString().split('T')[0];
    if (user.lastCheckInDate === today) {
      return {
        success: false,
        reward: 0,
        streak: user.streakDays,
        message: 'You have already checked in today! Come back tomorrow to continue your streak.'
      };
    }

    const nextStreak = (user.streakDays % 7) + 1;
    const baseReward = 5.00;
    // Streak multiplier bonus
    const multiplier = 1 + (nextStreak - 1) * 0.25;
    const totalReward = +(baseReward * multiplier).toFixed(2);

    setUser(prev => ({
      ...prev,
      streakDays: nextStreak,
      lastCheckInDate: today,
      mainBalance: prev.mainBalance + totalReward,
      taskEarnings: prev.taskEarnings + totalReward,
      freeSpinsAvailable: prev.freeSpinsAvailable + (nextStreak === 7 ? 2 : 1)
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'checkin_bonus',
      title: `Day ${nextStreak} Daily Check-In Bonus`,
      amount: totalReward,
      status: 'completed',
      timestamp: new Date().toISOString(),
      details: `Streak Day ${nextStreak}/7 (+${(multiplier * 100 - 100).toFixed(0)}% Multiplier bonus)`
    };

    setTransactions(prev => [newTx, ...prev]);

    addNotification(
      `Day ${nextStreak} Streak Collected!`,
      `You claimed $${totalReward.toFixed(2)} check-in reward plus 1 Free Matrix Spin.`,
      'reward'
    );

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    return {
      success: true,
      reward: totalReward,
      streak: nextStreak,
      message: `Day ${nextStreak} Streak confirmed! +$${totalReward.toFixed(2)} added to Main Balance.`
    };
  };

  // Spin Quantum Wheel
  const spinWheel = (prizeAmount: number, prizeLabel: string) => {
    if (user.freeSpinsAvailable <= 0) return;

    setUser(prev => ({
      ...prev,
      freeSpinsAvailable: Math.max(0, prev.freeSpinsAvailable - 1),
      mainBalance: prev.mainBalance + prizeAmount,
      taskEarnings: prev.taskEarnings + prizeAmount
    }));

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      type: 'task_reward',
      title: `Quantum Wheel: ${prizeLabel}`,
      amount: prizeAmount,
      status: 'completed',
      timestamp: new Date().toISOString(),
      details: `Won $${prizeAmount.toFixed(2)} on Quantum Multiplier Wheel`
    };

    setTransactions(prev => [newTx, ...prev]);

    addNotification(
      'Quantum Spin Winner!',
      `Wheel landed on ${prizeLabel}! +$${prizeAmount.toFixed(2)} credited immediately.`,
      'reward'
    );

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  // Reset Demo Wallet
  const resetDemoWallet = () => {
    localStorage.removeItem('ekw_user_v4');
    localStorage.removeItem('ekw_contracts_v4');
    localStorage.removeItem('ekw_tasks_v4');
    localStorage.removeItem('ekw_tx_v4');
    localStorage.removeItem('ekw_registered_accounts_v4');
    localStorage.removeItem('ekw_user_v2');
    localStorage.removeItem('ekw_contracts_v2');
    localStorage.removeItem('ekw_tasks_v2');
    localStorage.removeItem('ekw_tx_v2');
    setUser(INITIAL_USER);
    setActiveContracts(INITIAL_CONTRACTS);
    setTasks(INITIAL_SUPER_TASKS);
    setTransactions(INITIAL_TRANSACTIONS);
    addNotification('Wallet Reset', 'Your wallet has been reset to UGX 0.00 base balance. Deposit via Pesapal to fund your account.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isAuthenticated,
        user,
        plans,
        activeContracts,
        tasks,
        transactions,
        referrals,
        liveActivities,
        notifications,
        unreadNotificationCount,
        isDepositModalOpen,
        setIsDepositModalOpen,
        isWithdrawModalOpen,
        setIsWithdrawModalOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        selectedPlanForSubscribe,
        setSelectedPlanForSubscribe,
        selectedTaskForRunning,
        setSelectedTaskForRunning,
        login,
        register,
        updateProfile,
        quickDemoLogin,
        logout,
        depositFunds,
        withdrawFunds,
        subscribeToPlan,
        claimYield,
        completeSuperTask,
        performDailyCheckIn,
        spinWheel,
        addNotification,
        markNotificationsAsRead,
        resetDemoWallet
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
