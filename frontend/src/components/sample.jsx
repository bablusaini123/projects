import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Award, User, DollarSign, LogOut, Link as LinkIcon, Wallet, History, Users } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { getCurrentUser, logout } from './auth';
import axios from 'axios';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from './ui/button';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
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

    // Get current time and calculate expiration to the start of the next minute
    const now = new Date();
    const nextMinute = new Date(now);
    nextMinute.setSeconds(0, 0); // Reset seconds and milliseconds
    nextMinute.setMinutes(nextMinute.getMinutes() + 1); // Set to next minute
    const expirationTime = nextMinute.getTime(); // Expiration timestamp

    localStorage.setItem('dashboardData', JSON.stringify({
      data: response.data,
      timestamp: now.toISOString(),
      expiresAt:expirationTime,
    }));

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


const BonusCard = ({ bonusLevel, amount, invitees, rechargePerPerson, inviteesProgress, depositProgress }) => {
  const isCompleted = inviteesProgress === invitees && depositProgress === invitees;

  return (
    <div className="bg-white rounded-lg p-4 mb-0 text-black">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="bg-green-600 text-white rounded-full px-2 py-1 text-xs font-semibold mr-2">Bonus {bonusLevel}</span>
          {isCompleted && <span className="text-green-600 text-md">✓</span>}
        </div>
        <span className="text-lg font-bold">₹{amount.toLocaleString()}</span>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span>Number of invitees</span>
          <span>{inviteesProgress}/{invitees}</span>
        </div>
        <div className="flex justify-between">
          <span>Recharge per person</span>
          <span>₹{rechargePerPerson.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Number of invites</span>
          <span>{inviteesProgress}/{invitees}</span>
        </div>
        <div className="flex justify-between">
          <span>Deposit number</span>
          <span>{depositProgress}/{invitees}</span>
        </div>
      </div>
      <button
        className="w-full bg-gray-700 text-white py-2 rounded-lg mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={!isCompleted}
      >
        Received
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
};

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [dashboardState, setDashboardState] = useState({
    walletBalance: { balance: 0, lastUpdated: null },
    paymentHistory: [],
    referrals: { level1: [], level1Count: 0, level2Count: 0 },
    dashboardData: null,
    isLoading: true,
  });

  const { walletBalance, paymentHistory, referrals, dashboardData } = dashboardState;
  const hasFetchedData = useRef(false);
  const abortControllerRef = useRef(null);
  const autoLogoutTimerRef = useRef(null);

  // Auto logout functionality - triggers every minute
  const setupAutoLogout = useCallback(() => {
    // Clear any existing timer
    if (autoLogoutTimerRef.current) {
      clearInterval(autoLogoutTimerRef.current);
    }

    // Set up new timer to run every minute (60000ms)
    autoLogoutTimerRef.current = setInterval(() => {
      console.log('🔄 Auto logout triggered - clearing session...');
      
      // Clear localStorage
      localStorage.clear();
      
      // Call logout function
      logout();
      
      // Show toast message
      toast.success('Session expired - logged out automatically!');
      
      // Navigate to login
      navigate('/login');
    }, 180000); // 60000ms = 1 minute

    console.log('⏰ Auto logout timer set for every 1 minute');
  }, [navigate]);

  // Clean up auto logout timer
  const cleanupAutoLogout = useCallback(() => {
    if (autoLogoutTimerRef.current) {
      clearInterval(autoLogoutTimerRef.current);
      autoLogoutTimerRef.current = null;
      console.log('🛑 Auto logout timer cleared');
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (hasFetchedData.current || !currentUser) return;

   const cachedData = localStorage.getItem('dashboardData');
if (cachedData) {
  try {
    const { data, timestamp, expiresAt } = JSON.parse(cachedData);
    const now = Date.now();

    if (now < expiresAt) {
      const timeLeft = expiresAt - now;

      // 🔥 Console log how much time left till midnight in HH:MM:SS
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      console.log(`⏳ Cache expires in: ${hours}h ${minutes}m ${seconds}s`);

      hasFetchedData.current = true;

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

    // If expired
    console.log('🗑️ Cache expired. Removing from localStorage.');
    const reloadBtn = document.getElementById("myButtonId");
    if (reloadBtn) reloadBtn.click();

  } catch (err) {
    console.error('Error parsing cache:', err);

  }
}

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    hasFetchedData.current = true;

    try {
      const timeoutPromise = (promise, ms) =>
        Promise.race([
          promise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms)),
        ]);

      const data = await timeoutPromise(
        fetchDashboardInfo(currentUser._id, currentUser.referCode),
        5000
      );

      if (!abortControllerRef.current?.signal.aborted) {
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
      }
    } catch (error) {
      if (!abortControllerRef.current?.signal.aborted) {
        console.error('Fetch Data Error:', error.message);
        toast.error(`Failed to load data: ${error.message}`);
        setDashboardState({
          walletBalance: { balance: 0, lastUpdated: null },
          paymentHistory: [],
          referrals: { level1: [], level1Count: 0, level2Count: 0 },
          dashboardData: null,
          isLoading: false,
        });
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchData();
    setupAutoLogout(); // Setup auto logout when component mounts

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      cleanupAutoLogout(); // Cleanup auto logout when component unmounts
      hasFetchedData.current = false;
    };
  }, [currentUser, navigate, fetchData, setupAutoLogout, cleanupAutoLogout]);

  const handleLogout = useCallback(() => {
    cleanupAutoLogout(); // Clear auto logout timer
    logout();
    localStorage.removeItem('dashboardData');
    localStorage.removeItem('landingDashboardData');
    navigate('/login');
    toast.success('Logged out successfully!');
  }, [navigate, cleanupAutoLogout]);

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
  const referralCode = currentUser?.referCode || `https://earningpay.cc/ref/${currentUser?.email || 'user'}`;

  const copyReferralLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast.success('Referral code copied!');
    } catch (err) {
      console.error('Clipboard API error:', err);
      const textArea = document.createElement('textarea');
      textArea.value = referralCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Referral code copied!');
      } catch (fallbackErr) {
        console.error('Fallback copy error:', fallbackErr);
        toast.error('Failed to copy referral code. Please copy manually.');
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [referralCode]);

  const handleWithdraw = useCallback(() => {
    toast.success('Withdrawal request submitted! Check your email for details.');
  }, []);

}