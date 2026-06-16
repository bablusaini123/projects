import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Award, User, DollarSign, LogOut, Link as LinkIcon, Wallet, History, Users, X, Check, IndianRupee } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { getCurrentUser, getWithdrawHistory, logout } from './auth';
import axios from 'axios';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

const FloatingDollarParticles = ({ count = 40 }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  const particleCount = isMobile ? 20 : count;

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {[...Array(particleCount)].map((_, i) => {
        const size = isMobile ? 6 + Math.random() * 4 : 8 + Math.random() * 6;
        const opacity = 0.5 + Math.random() * 0.3;
        return (
          <motion.div
            key={`particle-${i}`}
            className="dollar-particle"
            style={{
              '--size': `${size}px`,
              '--opacity': opacity,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 90 - 45,
            }}
            animate={{
              x: [0, Math.random() * 80 - 40, 0],
              y: [0, -100 - Math.random() * 150, -250],
              rotate: [0, Math.random() * 90 - 45, 0],
              scale: [1, 0.8 + Math.random() * 0.2, 1],
              opacity: [0.5, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          >
            $
          </motion.div>
        );
      })}
    </div>
  );
};

const DotsAnimation = () => {
  useEffect(() => {
    class DotsAnimation {
      constructor() {
        this.container = document.getElementById('dotsContainer');
        this.colors = [
          'color-1', 'color-2', 'color-3', 'color-4', 'color-5',
          'color-6', 'color-7', 'color-8', 'color-9', 'color-10'
        ];
        this.sizes = ['size-xs', 'size-sm', 'size-md', 'size-lg'];
        this.movements = ['vertical-dot', 'horizontal-dot', 'zigzag-dot', 'floatDiagonal'];
        this.isRunning = true;
        this.dotCount = 0;

        this.init();
      }

      init() {
        this.startAnimation();
        this.handleVisibilityChange();
      }

      createDot() {
        if (!this.isRunning) return;

        const dot = document.createElement('div');
        dot.className = 'floating-dot';

        const colorClass = this.colors[Math.floor(Math.random() * this.colors.length)];
        dot.classList.add(colorClass);

        const sizeClass = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        dot.classList.add(sizeClass);

        const movementType = this.movements[Math.floor(Math.random() * this.movements.length)];
        if (movementType !== 'floatDiagonal') {
          dot.classList.add(movementType);
        }

        if (Math.random() > 0.7) {
          dot.classList.add('glow');
        }

        if (Math.random() > 0.8) {
          dot.classList.add('pulse');
        }

        if (movementType === 'horizontal-dot') {
          dot.style.left = '-10px';
          dot.style.top = Math.random() * window.innerHeight + 'px';
        } else if (movementType === 'vertical-dot') {
          dot.style.left = Math.random() * window.innerWidth + 'px';
          dot.style.bottom = '-10px';
        } else {
          dot.style.left = Math.random() * (window.innerWidth * 0.3) + 'px';
          dot.style.bottom = '-10px';
        }

        const duration = Math.random() * 4 + 6;
        dot.style.animationDuration = duration + 's';
        dot.style.animationDelay = Math.random() * 1.5 + 's';
        dot.id = 'dot-' + (++this.dotCount);

        this.container.appendChild(dot);

        setTimeout(() => {
          if (dot && dot.parentNode) {
            dot.remove();
          }
        }, (duration + 1.5) * 1000);
      }

      createMultipleDots() {
        const count = Math.random() * 5 + 4;
        for (let i = 0; i < count; i++) {
          setTimeout(() => this.createDot(), i * 80);
        }
      }

      startAnimation() {
        for (let i = 0; i < 20; i++) {
          setTimeout(() => this.createDot(), i * 150);
        }

        this.animationInterval = setInterval(() => {
          this.createMultipleDots();
        }, 600);
      }

      stopAnimation() {
        this.isRunning = false;
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }
      }

      resumeAnimation() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.startAnimation();
        }
      }

      handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            this.stopAnimation();
          } else {
            this.resumeAnimation();
          }
        });
      }

      createDotBurst(count = 20) {
        for (let i = 0; i < count; i++) {
          setTimeout(() => this.createDot(), i * 40);
        }
      }
    }

    const dotsAnimation = new DotsAnimation();
    window.dotsAnimation = dotsAnimation;

    const handleClick = (e) => {
      dotsAnimation.createDotBurst(12);
    };
    document.body.addEventListener('click', handleClick);

    let frameCount = 0;
    let lastTime = performance.now();

    function monitorPerformance() {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        if (fps < 30 && window.dotsAnimation) {
          const dots = document.querySelectorAll('.floating-dot');
          if (dots.length > 30) {
            for (let i = 0; i < 10; i++) {
              if (dots[i]) dots[i].remove();
            }
          }
        }
      }

      requestAnimationFrame(monitorPerformance);
    }

    const animationFrameId = requestAnimationFrame(monitorPerformance);

    return () => {
      document.body.removeEventListener('click', handleClick);
      if (window.dotsAnimation) {
        window.dotsAnimation.stopAnimation();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="dots-container" id="dotsContainer" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }} />
  );
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Authorization Token:', token); // Debug token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const fetchDashboardInfo = async (userId, referCode) => {
  if (!userId || !referCode) {
    throw new Error('Missing userId or referCode');
  }

  try {
    const response = await api.get('/dashBoardInfo', {
      params: { userId, referCode },
    });

    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const expirationTime = nextMidnight.getTime();

    localStorage.setItem('dashboardData', JSON.stringify({
      data: response.data,
      timestamp: now.toISOString(),
      expiresAt: expirationTime,
    }));

    if (response.data.withdrawalHistory) {
      localStorage.setItem('withdrawalHistory', JSON.stringify(response.data.withdrawalHistory));
    }

    return response.data;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
  }
};

const submitWithdrawalRequest = async (userId, amount, paymentMethod, paymentDetails, password) => {
  try {
    const response = await api.post('/withdrawFunds', {
      userId,
      amount,
      paymentMethod,
      paymentDetails,
      password,
    });

    if (response.data.withdrawalHistory) {
      localStorage.setItem('withdrawalHistory', JSON.stringify(response.data.withdrawalHistory));
    }

    return response.data;
  } catch (error) {
    console.error('Withdrawal API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.message || 'Failed to submit withdrawal request');
  }
};

const receivedBonus = async (userId, amount, level) => {
  console.log('Calling /invitationBonus with:', { userId, amount, level }); // Debug input
  try {
    const response = await api.post('/invitationBonus', {
      userId,
      bonusAmount: amount,
      bonusId: level
    });
    if (response.data.message === "Bonus received") {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      const bonusHistoryResponse = await api.post('/bonusHistory', {
        userId,
        bonusAmount: amount,
        bonusType: "Invitation Bonus"
      });
      if (bonusHistoryResponse.data.message === 'Bonus history saved') {
        localStorage.setItem('bonusHistory', JSON.stringify(bonusHistoryResponse.data.bonusHistory));
        window.location.reload();
      }
    }
    return response.data;
  } catch (error) {
    console.error('Bonus API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    const errorMessage = error.response?.status === 400
      ? error.response.data.message || 'Invalid bonus claim request'
      : error.response?.status === 401
        ? 'Authentication failed. Please log in again.'
        : error.response?.status === 403
          ? 'You are not eligible to claim this bonus.'
          : 'Failed to claim bonus. Please try again later.';
    throw new Error(errorMessage);
  }
};

const BonusCard = ({ bonusLevel, amount, invitees, rechargePerPerson, inviteesProgress, depositProgress, userId, onClaimSuccess }) => {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(currentUser?.bonusesReceived?.includes(bonusLevel) || false); // Check if bonus is already claimed
  const isCompleted = inviteesProgress >= invitees && depositProgress >= invitees;

  const handleClaimBonus = useCallback(async () => {
    if (!isCompleted || isClaiming || isClaimed || !userId) {
      if (!userId) {
        toast.error('User ID not found. Please log in again.');
      }
      return;
    }

    setIsClaiming(true);
    try {
      const response = await receivedBonus(userId, amount, bonusLevel);
      toast.success(`Successfully claimed Bonus Level ${bonusLevel}!`);
      setIsClaimed(true);
      onClaimSuccess(); // Trigger dashboard data refresh
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsClaiming(false);
    }
  }, [userId, amount, bonusLevel, isCompleted, isClaiming, isClaimed, onClaimSuccess]);

  return (
    <div className={`rounded-lg p-4 mb-4 text-black ${isClaimed ? "bg-green-100" : "bg-red-100"}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center bg-green-600 px-3 py-2 rounded-tl-2xl rounded-br-2xl">
          <span className="bg-green-600 text-white rounded-full px-2 py-1 text-xs font-semibold mr-2">Bonus {bonusLevel}</span>
          {isClaimed ? (
            <span className="text-green-600 text-md rounded-[50%] p-1 bg-white"><Check size={14} /></span>
          ) : isCompleted ? (
            <span className="text-green-600 text-md rounded-[50%] p-1 bg-white"><Check size={14} /></span>
          ) : (
            <span className="text-red-600 text-md rounded-[50%] p-1 bg-white"><X size={14} /></span>
          )}
        </div>
        <span className="text-lg font-bold flex items-center"><IndianRupee size={20} className='font-semibold' />{amount.toLocaleString()}</span>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span>Number of invites</span>
          <span>{inviteesProgress}/{invitees}</span>
        </div>
        <div className="flex justify-between">
          <span>Number Course Purchased</span>
          <span>{depositProgress}/{invitees}</span>
        </div>
      </div>
      <button
        className={`w-full ${isClaimed
          ? 'bg-green-500'
          : isCompleted
            ? 'bg-gradient-to-r from-blue-600 to-red-500'
            : 'bg-gradient-to-r from-blue-200 to-red-300'
          } text-white py-2 rounded-lg mt-4 hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`}
        disabled={!isCompleted || isClaiming || isClaimed}
        onClick={handleClaimBonus}
      >
        {isClaiming ? 'Claiming...' : isClaimed ? 'Received' : isCompleted ? 'Claim Bonus' : 'Unfinished'}
      </button>
    </div>
  );
};

BonusCard.propTypes = {
  bonusLevel: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  invitees: PropTypes.number.isRequired,
  rechargePerPerson: PropTypes.number.isRequired,
  inviteesProgress: PropTypes.number.isRequired,
  depositProgress: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  onClaimSuccess: PropTypes.func.isRequired,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const withdrawalHistory = useMemo(() => getWithdrawHistory() || [], []);
  const bonusHistory = useMemo(() => JSON.parse(localStorage.getItem('bonusHistory')) || [], []);

  const [dashboardState, setDashboardState] = useState({
    walletBalance: { balance: 0, lastUpdated: null },
    paymentHistory: [],
    referrals: { level1: [], level1Count: 0, level2Count: 0 },
    dashboardData: null,
    isLoading: true,
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [password, setPassword] = useState('');

  const { walletBalance, paymentHistory, referrals, dashboardData } = dashboardState;
  const abortControllerRef = useRef(new AbortController());
  const logoutTimerRef = useRef(null);

  const setupMidnightLogout = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      console.log('⏰ Cleared previous logout timer');
    }

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const nowIST = new Date(now.getTime() + istOffset);

    // Set target to 12:00 AM IST today
    let target = new Date(nowIST);
    target.setHours(0, 0, 0, 0); // Set to 12:00 AM today

    // If current time is past 12:00 AM IST, move to next day
    if (nowIST >= target) {
      target.setDate(target.getDate() + 1);
      console.log('⏰ Current time is past 12:00 AM IST, scheduling logout for next day');
    }

    const timeUntilLogout = target.getTime() - nowIST.getTime();
    console.log(`⏰ Setting logout timer for ${target.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (in ${Math.round(timeUntilLogout / 1000)} seconds)`);

    // Ensure timer is only set if timeUntilLogout is positive
    if (timeUntilLogout > 0) {
      logoutTimerRef.current = setTimeout(() => {
        console.log('⏰ Midnight 12:00 AM IST logout triggered - clearing session...');
        localStorage.clear();
        logout();
        toast.success('Session expired - logged out at 12:00 AM IST!');
        navigate('/login');
        // Reset timer for next day
        setupMidnightLogout();
      }, timeUntilLogout);
    } else {
      console.error('⏰ Error: timeUntilLogout is negative or zero, scheduling for next day');
      target.setDate(target.getDate() + 1);
      const newTimeUntilLogout = target.getTime() - nowIST.getTime();
      logoutTimerRef.current = setTimeout(() => {
        console.log('⏰ Midnight 12:00 AM IST logout triggered - clearing session...');
        localStorage.clear();
        logout();
        toast.success('Session expired - logged out at 12:00 AM IST!');
        navigate('/login');
        setupMidnightLogout();
      }, newTimeUntilLogout);
      console.log(`⏰ Fallback: Set logout timer for ${target.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (in ${Math.round(newTimeUntilLogout / 1000)} seconds)`);
    }
  }, [navigate]);

  const cleanupMidnightLogout = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
      console.log('⏰ Cleanup: Logout timer cleared');
    }
  }, []);

  const fetchData = useCallback(async () => {
    const user = getCurrentUser();
    if (!user?._id || !user?.referCode) {
      setDashboardState((prev) => ({ ...prev, isLoading: false }));
      toast.error('User data not found. Please log in again.');
      navigate('/login');
      return;
    }

    const cachedData = localStorage.getItem('dashboardData');
    if (cachedData) {
      try {
        const { data, expiresAt } = JSON.parse(cachedData);
        if (Date.now() < expiresAt) {
          setDashboardState({
            walletBalance: { balance: data.totalEarning || 0, lastUpdated: new Date().toISOString() },
            paymentHistory: data.commissionHistory?.map((entry) => ({
              id: `${entry.date}-${entry.buyerName}`,
              date: entry.date,
              buyerName: entry.buyerName,
              courseTitle: entry.courseTitle,
              amount: entry.commission,
              commission: entry.commission,
            })) || [],
            referrals: {
              level1: data.directSubnets?.map((name, index) => ({
                id: `subnet-${index}`,
                email: name,
                referrals: 0,
              })) || [],
              level1Count: data.directSubnets?.length || 0,
              level2Count: data.teamSubnetCount || 0,
            },
            dashboardData: data,
            isLoading: false,
          });
          return;
        }
        localStorage.removeItem('dashboardData');
      } catch (err) {
        console.error('Error parsing cache:', err);
        localStorage.removeItem('dashboardData');
      }
    }

    try {
      const data = await fetchDashboardInfo(user._id, user.referCode);
      setDashboardState({
        walletBalance: { balance: data.totalEarning || 0, lastUpdated: new Date().toISOString() },
        paymentHistory: data.commissionHistory?.map((entry) => ({
          id: `${entry.date}-${entry.buyerName}`,
          date: entry.date,
          buyerName: entry.buyerName,
          courseTitle: entry.courseTitle,
          amount: entry.commission,
          commission: entry.commission,
        })) || [],
        referrals: {
          level1: data.directSubnets?.map((name, index) => ({
            id: `subnet-${index}`,
            email: name,
            referrals: 0,
          })) || [],
          level1Count: data.directSubnets?.length || 0,
          level2Count: data.teamSubnetCount || 0,
        },
        dashboardData: data,
        isLoading: false,
      });
    } catch (error) {
      if (!abortControllerRef.current.signal.aborted) {
        toast.error(`Failed to load data: ${error.message}`);
        setDashboardState((prev) => ({ ...prev, isLoading: false }));
      }
    }
  }, [navigate]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }

    fetchData();
    setupMidnightLogout();

    return () => {
      abortControllerRef.current.abort();
      cleanupMidnightLogout();
    };
  }, [navigate, fetchData, setupMidnightLogout, cleanupMidnightLogout]);

  const handleLogout = useCallback(() => {
    cleanupMidnightLogout();
    localStorage.clear();
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
  }, [navigate, cleanupMidnightLogout]);

  const handleWithdraw = useCallback(async () => {
    const user = getCurrentUser();
    if (!user?._id) {
      toast.error('User not found. Please log in again.');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    if (!password) {
      toast.error('Please enter your password.');
      return;
    }

    let paymentDetails = {};
    if (paymentMethod === 'upi') {
      if (!upiId) {
        toast.error('Please enter your UPI ID.');
        return;
      }
      paymentDetails = { upiId };
    } else if (paymentMethod === 'bank') {
      if (!accountHolderName || !accountNumber || !ifscCode) {
        toast.error('Please fill in all bank details.');
        return;
      }
      paymentDetails = { accountHolderName, accountNumber, ifscCode };
    }

    try {
      await submitWithdrawalRequest(user._id, amount, paymentMethod, paymentDetails, password);
      toast.success('Withdrawal request submitted! Check your email for details.');
      setWithdrawAmount('');
      setUpiId('');
      setAccountHolderName('');
      setAccountNumber('');
      setIfscCode('');
      setPassword('');
      handleLogout();
    } catch (error) {
      toast.error(error.message);
    }
  }, [withdrawAmount, paymentMethod, upiId, accountHolderName, accountNumber, ifscCode, password, handleLogout]);

  const getBadge = useCallback((level) => {
    const profileLevel = parseInt(level, 10) || 1;
    switch (profileLevel) {
      case 6: return { level: 6, name: 'Platinum Pro', color: 'from-purple-600 to-purple-800', icon: '🏆' };
      case 5: return { level: 5, name: 'Platinum', color: 'from-teal-500 to-teal-700', icon: '🌟' };
      case 4: return { level: 4, name: 'Diamond', color: 'from-blue-600 to-blue-800', icon: '💎' };
      case 3: return { level: 3, name: 'Gold', color: 'from-yellow-500 to-yellow-700', icon: '🥇' };
      case 2: return { level: 2, name: 'Silver', color: 'from-gray-400 to-gray-600', icon: '🥈' };
      default: return { level: 1, name: 'Bronze', color: 'from-orange-500 to-orange-700', icon: '🥉' };
    }
  }, []);

  const badge = getBadge(currentUser?.profileLevel);
  const referralCode = `https://earningpay.cc/signup?referCode=${currentUser?.referCode} `;

  const copyReferralLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast.success('Referral code copied!');
    } catch (err) {
      console.error('Clipboard API error:', err);
      toast.error('Failed to copy referral code. Please copy manually.');
    }
  }, [referralCode]);

  const initialBonusData = [
    { level: 1, amount: 155, invitees: 2, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 2, amount: 555, invitees: 10, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 3, amount: 1555, invitees: 30, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 4, amount: 3555, invitees: 70, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 5, amount: 10955, invitees: 200, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 6, amount: 25555, invitees: 500, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 7, amount: 48555, invitees: 1000, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 8, amount: 355555, invitees: 5000, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 9, amount: 755555, invitees: 10000, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
    { level: 10, amount: 1555555, invitees: 20000, rechargePerPerson: 500, inviteesProgress: 0, depositProgress: 0 },
  ];
  const bonusData = useMemo(() => {
    if (!dashboardData) return initialBonusData;

    const { directSubnets = [], directSubnetsPurchaseCount = 0 } = dashboardData;
    const totalInvites = directSubnets.length || 0;
    const totalPurchases = directSubnetsPurchaseCount || 0;

    return initialBonusData.map((bonus) => ({
      ...bonus,
      inviteesProgress: Math.min(totalInvites, bonus.invitees),
      depositProgress: Math.min(totalPurchases, bonus.invitees),
    }));
  }, [dashboardData]);

  if (dashboardState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-red-50 overflow-x-hidden">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r from-blue-600 to-red-500 rounded-full animate-spin flex items-center justify-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full"></div>
          </div>
          <p className="mt-4 text-lg sm:text-xl font-semibold text-gray-600 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-red-50 font-['Outfit'] py-6 overflow-x-hidden">
      <style>
        {`
          .dots-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
          }

          .floating-dot {
            position: absolute;
            border-radius: 50%;
            opacity: 0;
            animation: floatDiagonal linear infinite;
          }

          @keyframes floatDiagonal {
            0% {
              transform: translate(0, 100vh) scale(0.5);
              opacity: 0;
            }
            10% {
              opacity: 0.9;
            }
            50% {
              opacity: 0.7;
              transform: translate(50vw, 50vh) scale(1);
            }
            90% {
              opacity: 0.5;
              transform: translate(80vw, 20vh) scale(0.8);
            }
            100% {
              transform: translate(100vw, -10vh) scale(0.3);
              opacity: 0;
            }
          }

          .vertical-dot {
            animation: floatVertical linear infinite;
          }

          @keyframes floatVertical {
            0% {
              transform: translateY(100vh) scale(0.5);
              opacity: 0;
            }
            15% {
              opacity: 0.9;
            }
            85% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-10vh) scale(0.6);
              opacity: 0;
            }
          }

          .horizontal-dot {
            animation: floatHorizontal linear infinite;
          }

          @keyframes floatHorizontal {
            0% {
              transform: translateX(-10vw) scale(0.5);
              opacity: 0;
            }
            15% {
              opacity: 0.9;
            }
            85% {
              opacity: 0.7;
            }
            100% {
              transform: translateX(100vw) scale(0.6);
              opacity: 0;
            }
          }

          .zigzag-dot {
            animation: floatZigzag linear infinite;
          }

          @keyframes floatZigzag {
            0% {
              transform: translate(0, 100vh) scale(0.5);
              opacity: 0;
            }
            25% {
              transform: translate(25vw, 75vh) scale(0.8);
              opacity: 0.9;
            }
            50% {
              transform: translate(10vw, 50vh) scale(1);
              opacity: 0.8;
            }
            75% {
              transform: translate(35vw, 25vh) scale(0.9);
              opacity: 0.6;
            }
            100% {
              transform: translate(20vw, -10vh) scale(0.4);
              opacity: 0;
            }
          }

          .color-1 { background: linear-gradient(45deg, #e53e3e, #f56565); }
          .color-2 { background: linear-gradient(45deg, #38a169, #68d391); }
          .color-3 { background: linear-gradient(45deg, #3182ce, #63b3ed); }
          .color-4 { background: linear-gradient(45deg, #d53f8c, #ed64a6); }
          .color-5 { background: linear-gradient(45deg, #dd6b20, #f6ad55); }
          .color-6 { background: linear-gradient(45deg, #805ad5, #9f7aea); }
          .color-7 { background: linear-gradient(45deg, #319795, #4fd1c5); }
          .color-8 { background: linear-gradient(45deg, #d69e2e, #ecc94b); }
          .color-9 { background: linear-gradient(45deg, #ed64a6, #f687b3); }
          .color-10 { background: linear-gradient(45deg, #4a5568, #718096); }

          .size-xs { width: 4px; height: 4px; }
          .size-sm { width: 6px; height: 6px; }
          .size-md { width: 9px; height: 9px; }
          .size-lg { width: 13px; height: 13px; }

          .pulse {
            animation: floatVertical linear infinite, pulse 1.8s ease-in-out infinite alternate;
          }

          @keyframes pulse {
            0% { transform: scale(0.7); }
            100% { transform: scale(1.3); }
          }

          @media (max-width: 768px) {
            .floating-dot {
              max-width: 9px !important;
              max-height: 9px !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .floating-dot {
              animation-duration: 12s !important;
            }
          }
        `}
      </style>
      <DotsAnimation />
      <FloatingDollarParticles />
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div id="wallet" className="sm:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 w-full">
              <div className="flex items-center mb-4 gap-2">
                <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 -mr-1 sm:mr-3" aria-hidden="true" />
                <h2 className="text-xl sm:text-2xl font-bold">Wallet</h2>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg mb-4 flex flex-col items-center">
                <div className="text-[23px] sm:text-4xl text-blue-600 font-semibold flex items-center">
                  <span><IndianRupee size={20} className='!font-bold' /></span>
                  {( currentUser?.totalPurchaseAmount  || 0).toLocaleString()}
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-1 !font-semibold">Total Deposit</div>
                 <div className="text-[23px] sm:text-4xl text-blue-600 font-semibold flex items-center">
                  <span><IndianRupee size={20} className='!font-bold' /></span>
                  {(dashboardData?.userWallet || currentUser?.userWallet || 0).toLocaleString()}
                </div>Wallet              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                This wallet shows your earnings from referrals. Withdraw funds after reaching the minimum limit.
              </p>
              <div className='flex gap-2'>
                <Drawer>
                  <DrawerTrigger asChild>
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 sm:px-6 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                      aria-label="Withdraw Funds"
                    >
                      Withdraw Funds
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="overflow-y-scroll max-h-[50px] bg-gradient-to-br from-blue-50 to-red-50 text-white p-0">
                    <DrawerHeader>
                      <DrawerTitle className="text-xl font-bold text-black">Withdraw Funds</DrawerTitle>
                      <DrawerDescription className="text-gray-600">Enter your withdrawal details below</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-black">Amount</label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black">Payment Method</label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Method</option>
                          <option value="upi">UPI</option>
                          <option value="bank">Bank Transfer</option>
                        </select>
                      </div>
                      {paymentMethod === 'upi' && (
                        <div>
                          <label className="block text-sm font-medium text-black">Enter your UPI ID</label>
                          <input
                            type="text"
                            placeholder="e.g. yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                      {paymentMethod === 'bank' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-black">Account Holder Name</label>
                            <input
                              type="text"
                              placeholder="Full name"
                              value={accountHolderName}
                              onChange={(e) => setAccountHolderName(e.target.value)}
                              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black">Account Number</label>
                            <input
                              type="text"
                              placeholder="1234567890"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black">IFSC Code</label>
                            <input
                              type="text"
                              placeholder="SBIN0001234"
                              value={ifscCode}
                              onChange={(e) => setIfscCode(e.target.value)}
                              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-black">Your Account's password</label>
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <button
                          onClick={handleWithdraw}
                          className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white py-2 px-4 rounded-md font-semibold transition"
                        >
                          Submit Withdrawal Request
                        </button>
                      </div>
                    </div>
                    <DrawerFooter className="">
                      <DrawerClose asChild>
                        <Button variant="outline" className="w-full bg-[#000] hover:bg-black hover:text-white text-white">
                          Cancel
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <Drawer>
                  <DrawerTrigger asChild>
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                      aria-label="Invitation Bonus"
                    >
                      Invitation Bonus
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-gradient-to-br from-blue-50 to-red-50 text-white p-0">
                    <DrawerHeader>
                      <div className='flex justify-between items-center'>
                        <DrawerTitle className="text-md sm:text-xl font-bold text-black text-start">Invitation Bonus
                          <DrawerDescription className="text-gray-600 text-xs sm:text-md">View your invitation bonus progress</DrawerDescription>
                        </DrawerTitle>
                        <div className='flex justify-end'>
                          <div>
                            <Dialog className=''>
                              <DialogTrigger asChild>
                                <Button className='bg-gradient-to-r from-blue-600 to-red-500'>View Bonus History</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogDescription className='text-[#000] text-lg'>
                                    Your Received Bonus History.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 bonusHistory max-h-[99%] overflow-y-scroll">
                                  {bonusHistory.length > 0 ? (
                                    <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
                                      <tbody>
                                        {bonusHistory.map((entry, index) => (
                                          <tr key={`bonus-${index}`} className="border-t hover:bg-gray-50 flex justify-between">
                                            <td className="p-2 sm:p-3 text-green-700 font-bold">+<IndianRupee size={25} className='font-semibold' />{(entry.bonusAmount || 0).toLocaleString()}</td>
                                            <td className="p-2 sm:p-3 text-[#000] font-semibold">{entry.bonusType || 'N/A'}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  ) : (
                                    <p className="text-center text-gray-600">No bonus history available.</p>
                                  )}
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline" className="w-full bg-gradient-to-r from-blue-600 to-red-500 hover:bg-black hover:text-white text-white">
                                      Close
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </DrawerHeader>
                    <div className="mt-0 overflow-y-scroll max-h-[99%]">
                      {bonusData.map((bonus) => (
                        <BonusCard
                          key={bonus.level}
                          bonusLevel={bonus.level}
                          amount={bonus.amount}
                          invitees={bonus.invitees}
                          rechargePerPerson={bonus.rechargePerPerson}
                          inviteesProgress={bonus.inviteesProgress}
                          depositProgress={bonus.depositProgress}
                          userId={currentUser?._id || ''}
                          onClaimSuccess={fetchData}
                        />
                      ))}
                    </div>
                    <DrawerFooter className="mt-4">
                      <DrawerClose asChild>
                        <Button variant="outline" className="w-full bg-[#000] hover:bg-black hover:text-white text-white">
                          Cancel
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sm:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 w-full">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" aria-hidden="true" />
                <h2 className="text-xl !font-medium">Earnings Overview</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                  <div className="text-lg sm:text-lg font-normal text-blue-600 flex items-center justify-center">
                    <span><IndianRupee size={15} className='font-semibold' /></span>{(walletBalance.balance || 0).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Earnings</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                  <div className="text-lg sm:text-lg font-normal text-red-600 flex items-center justify-center">
                    <IndianRupee size={15} className='font-semibold' />{(dashboardData?.monthlyEarning || 0).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Monthly Earnings</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                  <div className="text-lg sm:text-lg font-normal text-red-600 flex items-center justify-center">
                    <IndianRupee size={15} className='font-semibold' />{(dashboardData?.yesterdayEarning || 0).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Yesterday Earnings</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                  <div className="text-lg sm:text-lg font-normal text-red-600 flex items-center justify-center">
                    <IndianRupee size={15} className='font-semibold' />{(dashboardData?.todayEarning || 0).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Today Earnings</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div id='affiliate' className="sm:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" aria-hidden="true" />
                <h2 className="text-xl !font-medium">Referral Network</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                  <div className="text-[17px] sm:text-3xl font-normal text-blue-600">{referrals.level1Count}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Direct Referrals</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg">
                  <div className="text-[17px] sm:text-3xl font-normal text-red-600">{referrals.level2Count}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Indirect Referrals</div>
                </div>
              </div>
              <div className="overflow-x-auto overflow-y-scroll max-h-[170px]">
                <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-100 flex justify-between px-3">
                      <th className="p-2 sm:p-3 text-gray-700 font-semibold">Name</th>
                      <th className="p-2 sm:p-3 text-gray-700 font-semibold">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.level1.slice(0, 5).map((ref) => (
                      <tr key={ref.id} className="border-t hover:bg-gray-50 flex justify-between px-3">
                        <td className="p-2 sm:p-3 text-gray-600 truncate max-w-[120px] sm:max-w-[200px] text-sm font-semibold">{ref.email}</td>
                        <td className="p-2 sm:p-3 text-gray-600 truncate max-w-[120px] sm:max-w-[200px] text-sm font-semibold">Level 1</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {referrals.level1.length > 5 && (
                  <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">
                    Showing 5 of {referrals.level1.length} referrals. Contact support for full list.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
                    <History className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-0" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 ml-3 sm:ml-4">Purchase History</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto max-h-[170px]">
                    <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                          <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Course Name</th>
                          <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData?.purchaseHistory?.map((data, index) => (
                          <tr key={`${data.courseTitle}-${index}`} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 group">
                            <td className="p-3 sm:p-4 text-gray-700 font-medium text-sm">
                              <div className="truncate max-w-[120px] sm:max-w-[180px]" title={data.courseTitle}>
                                {data.courseTitle || 'N/A'}
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 text-right">
                              <div className="inline-flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                <span className="mr-1">-</span>
                                <IndianRupee size={14} className='font-bold' />
                                <span>{(data.price || 0).toLocaleString()}</span>
                              </div>
                            </td>
                          </tr>
                        )) || (
                            <tr>
                              <td colSpan="2" className="p-2 sm:p-12 text-center">
                                <div className="flex flex-col items-center">
                                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                    <History className="w-8 h-8 text-gray-400" />
                                  </div>
                                  <span className="text-gray-600 text-sm font-medium">No purchase history available.</span>
                                </div>
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
                  <History className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-0" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 ml-3 sm:ml-4">Commission History</h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto max-h-[200px]">
                  <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Date</th>
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Name</th>
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Course</th>
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide text-right">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((entry, index) => (
                        <tr key={entry.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 group">
                          <td className="p-1 sm:p-4 text-gray-700 font-medium text-sm">
                            <div className="flex flex-col">
                              <span>{new Date(entry.date).toLocaleDateString() || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-gray-700 font-medium text-sm">
                            <div className="flex items-center">
                              <span>{entry.buyerName || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="p-1 sm:p-4 text-gray-700 font-medium text-sm">
                            <div className="truncate max-w-[120px] sm:max-w-[180px]" title={entry.courseTitle}>
                              {entry.courseTitle || 'N/A'}
                            </div>
                          </td>
                          <td className="p-1 sm:p-4 text-right">
                            <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              <span className="mr-1">+</span>
                              <IndianRupee size={14} className='font-bold' />
                              <span>{(entry.commission || 0).toLocaleString()}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {paymentHistory.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-2 sm:p-12 text-center">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <History className="w-8 h-8 text-gray-400" />
                              </div>
                              <span className="text-gray-600 text-sm font-medium">No transactions yet.</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
                  <History className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-0" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 ml-3 sm:ml-4">Withdrawal History</h2>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto max-h-[200px]">
                  <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Date</th>
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Payment Method</th>
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide text-right">Amount</th>
                        <th className="p-3 sm:p-4 text-gray-700 font-semibold text-sm tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawalHistory.map((entry, index) => (
                        <tr key={`${entry.id || index}`} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 group">
                          <td className="p-1 sm:p-4 text-gray-700 font-medium text-sm">
                            <div className="flex flex-col">
                              <span>{new Date(entry.requestedAt).toLocaleDateString() || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-gray-700 font-medium text-sm">
                            <span>{entry.paymentMethod || 'N/A'}</span>
                          </td>
                          <td className="p-1 sm:p-4 text-right">
                            <div className="inline-flex items-center bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                              <span className="mr-1">-</span>
                              <IndianRupee size={14} className='font-bold' />
                              <span>{(entry.amount || 0).toLocaleString()}</span>
                            </div>
                          </td>
                          <td className={`p-3 sm:p-4 font-semibold text-sm ${entry.status === 'success' ? 'text-green-800' : 'text-yellow-500'}`}>
                            {entry.status || 'N/A'}
                          </td>
                        </tr>
                      ))}
                      {withdrawalHistory.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-2 sm:p-12 text-center">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <History className="w-8 h-8 text-gray-400" />
                              </div>
                              <span className="text-gray-600 text-sm font-medium">No withdrawal history available.</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div id="reffer" className="sm:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex gap-10 flex-wrap">
              <div className="flex flex-col w-full lg:w-[50%] justify-start p-0">
                <div className="flex flex-col items-center mb-4">
                  <LinkIcon className="w-7 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" aria-hidden="true" />
                  <h2 className="text-[12px] whitespace-break-spaces sm:text-2xl font-semibold">Your Referral Code</h2>
                </div>
                <div className="w-full gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                    aria-label="Referral Code"
                  />
                  <div className="w-full flex justify-center items-center mt-2 rounded-md bg-gradient-to-r from-blue-600 to-red-500">
                    <button
                      onClick={copyReferralLink}
                      className="w-full sm:w-auto text-white px-2 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm sm:text-base whitespace-break-spaces"
                      aria-label="Copy Referral Code"
                    >
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" aria-hidden="true" />
                      Copy Code
                    </button>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
                  Share this code to earn up to <span><IndianRupee size={16} className='font-semibold inline-block' /></span>600 per successful course purchase!
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 w-full flex flex-col lg:w-[40%]">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mr-2 sm:mr-3" aria-hidden="true" />
                  <h2 className="text-sm whitespace-break-spaces sm:text-2xl font-bold">Profile Summary</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-gray-600 font-semibold text-sm sm:text-base">Name</p>
                    <p className="text-base sm:text-lg">{currentUser?.name || currentUser?.firstName || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold text-sm sm:text-base">Email</p>
                    <p className="text-base sm:text-lg truncate">{currentUser?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold text-sm sm:text-base">Level</p>
                    <div className={`inline-flex items-center bg-gradient-to-r ${badge.color} text-white px-3 py-1 rounded-full text-xs sm:text-sm`}>
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" aria-hidden="true" />
                      {badge.name} (Level {badge.level})
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    id="myButtonId"
                    className="w-full bg-gradient-to-r from-blue-600 to-red-500 text-white p-2 sm:p-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 text-sm sm:text-base"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;