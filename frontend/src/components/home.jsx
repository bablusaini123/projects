import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { ChevronDown, ChevronUp, Star, Users, Shield, Clock, Calculator, CheckCircle, Instagram, Youtube, Twitter, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { COURSES, TESTIMONIALS, FAQS, INFLUENCERS } from './constants';
import { createOrder, purchaseCourse } from './api';
import { isAuthenticated, getCurrentUser } from './auth';
import '../App.css';
import { Button } from './ui/button';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

        // Random color
        const colorClass = this.colors[Math.floor(Math.random() * this.colors.length)];
        dot.classList.add(colorClass);

        // Random size
        const sizeClass = this.sizes[Math.floor(Math.random() * this.sizes.length)];
        dot.classList.add(sizeClass);

        // Random movement type
        const movementType = this.movements[Math.floor(Math.random() * this.movements.length)];
        if (movementType !== 'floatDiagonal') {
          dot.classList.add(movementType);
        }

        // Random special effects
        if (Math.random() > 0.7) {
          dot.classList.add('glow');
        }

        if (Math.random() > 0.8) {
          dot.classList.add('pulse');
        }

        // Random starting position based on movement type
        if (movementType === 'horizontal-dot') {
          dot.style.left = '-10px';
          dot.style.top = Math.random() * window.innerHeight + 'px';
        } else if (movementType === 'vertical-dot') {
          dot.style.left = Math.random() * window.innerWidth + 'px';
          dot.style.bottom = '-10px';
        } else {
          // Diagonal and zigzag start from bottom-left area
          dot.style.left = Math.random() * (window.innerWidth * 0.3) + 'px';
          dot.style.bottom = '-10px';
        }

        // Random animation duration
        const duration = Math.random() * 4 + 6; // 6-10 seconds for faster animations
        dot.style.animationDuration = duration + 's';

        // Random delay
        dot.style.animationDelay = Math.random() * 1.5 + 's';

        // Add unique ID
        dot.id = 'dot-' + (++this.dotCount);

        this.container.appendChild(dot);

        // Remove dot after animation
        setTimeout(() => {
          if (dot && dot.parentNode) {
            dot.remove();
          }
        }, (duration + 1.5) * 1000);
      }

      createMultipleDots() {
        const count = Math.random() * 5 + 4; // 4-9 dots at once to increase quantity
        for (let i = 0; i < count; i++) {
          setTimeout(() => this.createDot(), i * 80); // Faster spawning
        }
      }

      startAnimation() {
        // Create initial burst of dots
        for (let i = 0; i < 20; i++) { // Increased initial burst
          setTimeout(() => this.createDot(), i * 150);
        }

        // Continue creating dots
        this.animationInterval = setInterval(() => {
          this.createMultipleDots();
        }, 600); // New batch every 0.6 seconds for more dots
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

      createDotBurst(count = 20) { // Increased burst count
        for (let i = 0; i < count; i++) {
          setTimeout(() => this.createDot(), i * 40);
        }
      }
    }

    const dotsAnimation = new DotsAnimation();
    window.dotsAnimation = dotsAnimation;

    // Create dot burst on click
    const handleClick = (e) => {
      dotsAnimation.createDotBurst(12); // Increased burst on click
    };
    document.body.addEventListener('click', handleClick);

    // Performance monitoring
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

    requestAnimationFrame(monitorPerformance);

    // Cleanup
    return () => {
      document.body.removeEventListener('click', handleClick);
      if (window.dotsAnimation) {
        window.dotsAnimation.stopAnimation();
      }
    };
  }, []);

  return (
    <div className="dots-container" id="dotsContainer" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }} />
  );
};

// Floating Dollar Coins Component
const FloatingCoins = ({ count = 20 }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  const coinCount = isMobile ? 10 : count;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {[...Array(coinCount)].map((_, i) => {
        const size = isMobile ? 12 + Math.random() * 8 : 16 + Math.random() * 12;
        const opacity = 0.7 + Math.random() * 0.2;
        return (
          <motion.div
            key={i}
            className="dollar-coin"
            style={{
              '--size': `${size}px`,
              '--opacity': opacity,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, -150 - Math.random() * 100, -300],
              rotate: [0, Math.random() * 60 - 30, 0],
              scale: [1, 0.9 + Math.random() * 0.3, 1],
              opacity: [0.7, 0.9, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          >
            $
          </motion.div>
        );
      })}
    </div>
  );
};

// Floating Dollar Particles Component
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

// Particle Burst Component
const ParticleBurst = ({ trigger, children }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  const handleTrigger = (e) => {
    setIsTriggered(true);
    setTimeout(() => setIsTriggered(false), 1000);
    trigger(e);
  };

  return (
    <div className="relative inline-block">
      {isTriggered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="dollar-coin w-2 h-2 sm:w-3 sm:h-3"
              style={{
                '--tx': `${Math.cos((i * Math.PI) / 4) * 50}px`,
                '--ty': `${Math.sin((i * Math.PI) / 4) * 50}px`,
                '--size': `${8 + Math.random() * 4}px`,
                '--opacity': 0.8,
              }}
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, x: 'var(--tx)', y: 'var(--ty)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              $
            </motion.div>
          ))}
        </div>
      )}
      {React.cloneElement(children, {
        onClick: handleTrigger,
        className: `${children.props.className} pulse`,
      })}
    </div>
  );
};

const EarnscopLanding = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [referrals, setReferrals] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isloggin, setIsloggin] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const navigate = useNavigate();
  const hasFetchedData = useRef(false);
  const abortControllerRef = useRef(null);

  const toggleFaq = useCallback((index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  const fetchDashboardInfo = useCallback(async (userId, referCode) => {
    if (!userId || !referCode) {
      throw new Error('Missing userId or referCode');
    }
    try {
      const response = await fetch(`${API_BASE_URL}/dashBoardInfo?userId=${userId}&referCode=${referCode}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard info');
      }

      // const data = await response.json();
      // localStorage.setItem('landingDashboardData', JSON.stringify({
      //   data,
      //   timestamp: new Date().toISOString(),
      // }));
      // return data;
    } catch (error) {
      if (!abortControllerRef.current?.signal.aborted) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
      }
      throw error;
    }
  }, []);

  // Fetch dashboard info with caching
  useEffect(() => {
    if (!isAuthenticated()) {
      return; // Skip API call if user is not authenticated
    }

    const fetchData = async () => {
      if (hasFetchedData.current) return;

      const cachedData = localStorage.getItem('dashboardData');
      setIsloggin(cachedData);
      if (cachedData) {
        try {
          const { data, timestamp } = JSON.parse(cachedData);
          const cacheAge = new Date().getTime() - new Date(timestamp).getTime();
          const cacheValidDuration = 60 * 60 * 1000; // 1 hour
          if (cacheAge < cacheValidDuration) {
            hasFetchedData.current = true;
            setPurchaseHistory(data.purchaseHistory || []);
            return;
          }
        } catch (error) {
          console.error('Error parsing cached data:', error);
          localStorage.removeItem('landingDashboardData');
        }
      }

      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      hasFetchedData.current = true;

      try {
        const currentUser = getCurrentUser();
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
          setPurchaseHistory(data.purchaseHistory || []);
        }
      } catch (error) {
        if (!abortControllerRef.current?.signal.aborted) {
          console.error('Fetch Data Error:', error.message);
          // toast.error(`Error fetching dashboard info: ${error.message}`, {
          //   style: { background: '#fee2e2', color: '#b91c1c', border: '1px solid #b91c1c' },
          // });
          setPurchaseHistory([]);
        }
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      hasFetchedData.current = false;
    };
  }, [fetchDashboardInfo]);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });
  }, []);

  const handlePayment = useCallback(
    async (course) => {
      if (!isAuthenticated()) {
        navigate('/login', { state: { from: { pathname: '/', course } } });
        return;
      }

      setIsLoading(true);
      try {
        console.log('Initiating payment for course:', course);
        await loadRazorpayScript();

        const amountInPaise = parseInt(course.price);
        console.log('Amount in paise:', amountInPaise);
        if (!Number.isInteger(amountInPaise) || amountInPaise <= 0) {
          throw new Error('Invalid course price');
        }

        const orderResponse = await createOrder(amountInPaise);
        console.log('Order response:', orderResponse);
        const { id: orderId, amount, currency } = orderResponse.order;

        const currentUser = getCurrentUser();
        const options = {
          key: 'rzp_test_yGCAXsBibCoK0y',
          amount,
          currency,
          name: 'Earnscop',
          description: `Purchase: ${course.title}`,
          order_id: orderId,
          handler: async (response) => {
            try {
              const purchaseResponse = await purchaseCourse({
                course,
                buyerId: currentUser._id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });
              toast.success('Payment successful!');
              // Update purchase history after successful purchase
              setPurchaseHistory((prev) => [
                ...prev,
                { courseTitle: course.title, price: course.price, date: new Date().toISOString().split('T')[0] },
              ]);
              // Update local storage with new purchase history
              const cachedData = localStorage.getItem('dashboardData');
              if (cachedData) {
                try {
                  const { data, timestamp } = JSON.parse(cachedData);
                  localStorage.setItem('dashboardData', JSON.stringify({
                    data: {
                      ...data,
                      purchaseHistory: [
                        ...(data.purchaseHistory || []),
                        { courseTitle: course.title, price: course.price, date: new Date().toISOString().split('T')[0] },
                      ],
                    },
                    timestamp,
                  }));
                } catch (error) {
                  console.error('Error updating cached data:', error);
                }
              }
              navigate('/success', {
                state: {
                  course,
                  amount: amount / 100, // Convert paise to rupees
                },
              });
            } catch (error) {
              toast.error(`Payment successful but error in processing: ${error.message}. Contact support.`, {
                duration: 5000,
                style: { background: '#fee2e2', color: '#b91c1c', border: '1px solid #b91c1c' },
              });
              console.error('Purchase error:', error);
            }
          },
          prefill: {
            name: currentUser.name || 'Earnscop User',
            email: currentUser.email || 'user@example.com',
            contact: currentUser.contact || '9999999999',
          },
          theme: { color: '#3399cc' },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', () => {
          toast.error('Payment failed. Please try again.', {
            style: { background: '#fee2e2', color: '#b91c1c', border: '1px solid #b91c1c' },
          });
        });
        rzp.open();
      } catch (error) {
        toast.error(`Payment error: ${error.message}`, {
          style: { background: '#fee2e2', color: '#b91c1c', border: '1px solid #b91c1c' },
        });
        console.error('Payment error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, loadRazorpayScript]
  );

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />;
      case 'YouTube':
        return <Youtube className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />;
      default:
        return <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram':
        return 'bg-gradient-to-r from-pink-500 to-purple-600';
      case 'YouTube':
        return 'bg-red-600';
      case 'Twitter':
        return 'bg-blue-400';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSocialClick = (platform, handle) => {
    toast.success(`Check out ${handle} on ${platform}!`, {
      duration: 3000,
      position: 'top-right',
      style: { background: '#d1fae5', color: '#065f46', border: '1px solid #065f46' },
    });
  };

  // Check if a course is purchased
  const isCoursePurchased = (courseTitle) => {
    return purchaseHistory.some((purchase) => purchase.courseTitle === courseTitle);
  };

  return (
    <div className="min-h-screen font-['Outfit'] overflow-x-hidden relative">
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

          /* Adjusted colors for white/light background */
          .color-1 { background: linear-gradient(45deg, #e53e3e, #f56565); } /* Red */
          .color-2 { background: linear-gradient(45deg, #38a169, #68d391); } /* Green */
          .color-3 { background: linear-gradient(45deg, #3182ce, #63b3ed); } /* Blue */
          .color-4 { background: linear-gradient(45deg, #d53f8c, #ed64a6); } /* Pink */
          .color-5 { background: linear-gradient(45deg, #dd6b20, #f6ad55); } /* Orange */
          .color-6 { background: linear-gradient(45deg, #805ad5, #9f7aea); } /* Purple */
          .color-7 { background: linear-gradient(45deg, #319795, #4fd1c5); } /* Teal */
          .color-8 { background: linear-gradient(45deg, #d69e2e, #ecc94b); } /* Yellow */
          .color-9 { background: linear-gradient(45deg, #ed64a6, #f687b3); } /* Light Pink */
          .color-10 { background: linear-gradient(45deg, #4a5568, #718096); } /* Gray */

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
      <FloatingCoins />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
                    Learn & Earn
                  </span>
                  <br />
                  From Anywhere
                </motion.h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Master new skills with premium courses and earn up to ₹2800 per referral.
                  Your learning journey starts here!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <button
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
                    aria-label={`Join Earnscop ${isloggin ? 'hidden' : ''}`}
                  >
                    Join Now
                  </button>
                </Link>
                <motion.a
                  href="#courses"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className="w-full sm:w-auto border-2 border-red-500 text-red-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gradient-to-r from-blue-600 to-red-500 hover:text-white transition-all duration-300"
                    aria-label="Browse Courses"
                  >
                    Browse Courses
                  </button>
                </motion.a>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-6 text-sm text-gray-600 justify-center lg:justify-start">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" aria-hidden="true" />
                  <span>10,000+ Active Learners</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 fill-current" aria-hidden="true" />
                  <span>4.8/5 Rating</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="lg:text-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <section className="py-6 sm:py-10 bg-gradient-to-br from-blue-600 to-red-500 text-white rounded-lg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">How Much Can You Earn?</h2>
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8"
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4 sm:mb-6">
                      <label htmlFor="referrals" className="block text-base sm:text-lg mb-3 sm:mb-4">
                        Number of Referrals per Month
                      </label>
                      <input
                        id="referrals"
                        type="range"
                        min="1"
                        max="1000"
                        value={referrals}
                        onChange={(e) => setReferrals(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        aria-label="Select number of referrals"
                      />
                      <div className="flex justify-between text-xs sm:text-sm mt-2">
                        <span>1</span>
                        <span className="font-bold text-lg sm:text-xl">{referrals}</span>
                        <span>1000+</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold shimmer">
                          ₹<CountUp end={referrals * 1679} duration={1} separator="," />
                        </div>
                        <div className="text-white/80 text-sm">Monthly Earnings</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold shimmer">
                          ₹<CountUp end={referrals * 1679 * 12} duration={1.5} separator="," />
                        </div>
                        <div className="text-white/80 text-sm">Yearly Earnings</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold">80%</div>
                        <div className="text-white/80 text-sm">Max Commission Rate</div>
                      </div>
                    </div>
                  </motion.div>
                  <p className="text-white sm:text-xl opacity-90">
                    Based on average course price of ₹2399 with up to 80% commission
                  </p>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-6 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Start earning in just 3 simple steps
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Buy a Course',
                description: 'Choose from our premium course collection and unlock your earning potential',
                icon: '🎓',
              },
              {
                step: '02',
                title: 'Share Your Link',
                description: 'Get your unique referral link and share it with friends, family, or on social media',
                icon: '🔗',
              },
              {
                step: '03',
                title: 'Earn Money',
                description: 'Earn up to ₹2800 for every successful course purchase through your link',
                icon: '💰',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 100 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.div
                    className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-xs sm:text-sm font-bold text-blue-600 mb-2">STEP {item.step}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Trending Courses */}
      <section id="courses" className="py-6 sm:py-10 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Top Trending Courses</h2>
            <p className="text-lg sm:text-xl text-gray-600">Start your learning journey with our most popular courses</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 sm:h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {course.commisionPercent}% Cash
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-current" aria-hidden="true" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 sm:w-4 h-3 sm:h-4" aria-hidden="true" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-black ">
                        ₹{course.price}
                      </div>
                      <div className="text-xs sm:text-sm text-green-600 font-semibold">
                        Earn ₹ <span className="text-black">{Math.floor((parseInt(course.price) * parseInt(course.commisionPercent)) / 100)}</span>
                      </div>
                    </div>
                    {isCoursePurchased(course.title) ? (
                      <button
                        disabled
                        className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold cursor-not-allowed"
                        aria-label={`${course.title} Purchased`}
                      >
                        Purchased
                      </button>
                    ) : (
                      <button
                        disabled={isLoading}
                        onClick={() => handlePayment(course)}
                        className={`bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        aria-label={`Purchase ${course.title}`}
                      >
                        {isLoading ? 'Processing...' : 'Buy Now'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-6 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Success Stories</h2>
            <p className="text-lg sm:text-xl text-gray-600">See how our community is earning while learning</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">{testimonial.name}</h4>
                    <p className="text-green-600 font-semibold text-sm sm:text-base shimmer">
                      Earned {testimonial.earning}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-sm sm:text-base">"{testimonial.review}"</p>
                <div className="flex text-yellow-500 mt-3 sm:mt-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="w-3 sm:w-4 h-3 sm:h-4 fill-current" aria-hidden="true" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-6 sm:py-10 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Why Choose Earnscop?</h2>
            <p className="text-lg sm:text-xl text-gray-600">Join thousands of successful learners and earners</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />,
                title: 'Lifetime Access',
                description: 'Once purchased, access your courses forever with free updates',
              },
              {
                icon: <Calculator className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />,
                title: 'Earn Up to 80% Per Referral!',
                description: 'Get the highest cashback in the industry – ₹600 to ₹2800 per course sale.',
              },
              {
                icon: <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />,
                title: '24x7 Support',
                description: 'Get help anytime with our dedicated support team',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 100 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
                  <motion.div
                    className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full shadow-lg mb-4 sm:mb-6"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsored Influencers */}
      <section id="sponsored-influencers" className="py-6 sm:py-10 bg-white font-['Outfit']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Meet Our Influencers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover the creators promoting Earnscop and inspiring thousands!
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {INFLUENCERS.map((influencer, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <motion.img
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">{influencer.name}</h4>
                    <p className="text-gray-600 text-sm sm:text-base flex items-center">
                      <motion.span
                        whileHover={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {getPlatformIcon(influencer.platform)}
                      </motion.span>
                      <span className="ml-1">{influencer.handle}</span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{influencer.bio}</p>
                <p className="text-blue-600 font-semibold text-sm sm:text-base mb-4">{influencer.reach}</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={influencer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center ${getPlatformColor(influencer.platform)} text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition-all duration-300`}
                    aria-label={`Follow ${influencer.name} on ${influencer.platform}`}
                  >
                    {getPlatformIcon(influencer.platform)}
                    <span className="ml-2">Follow</span>
                  </a>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300"
                    aria-label="Join Earnscop Now"
                  >
                    Join Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-6 sm:py-10 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Frequently Asked Questions</h2>
            <p className="text-lg sm:text-xl text-gray-600">Everything you need to know about Earnscop</p>
          </motion.div>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openFaq === index ? (
                      <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" aria-hidden="true" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <Link to='/frequently-asked-questions'>
            <Button className='text-center text-lg bg-gradient-to-r from-blue-600 to-red-500 text-white mt-4 hover:text-primary w-full' size='lg'>Know More</Button>
          </Link>
        </div>
      </section>

      {/* Founders Section */}
      <section className="relative py-6 sm:py-10 bg-gradient-to-r from-blue-600 to-red-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Founders
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The visionaries behind EarnScop, driving innovation and empowerment
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {[
              {
                name: 'Anirban Bhattacharjee',
                role: 'Founder & CEO',
                bio: 'Entrepreneur & digital strategist with expertise in SEO, cybersecurity, and web development. Focused on building scalable systems for learner success.',
              },
              {
                name: 'Bablu Saini',
                role: 'Founder & COO',
                bio: 'Operations & growth specialist passionate about scaling communities and optimizing user experiences. Oversees platform operations and affiliate networks.',
              },
              {
                name: 'Aman Gouri',
                role: 'Founder & CPO',
                bio: 'Product innovator focused on curriculum strategy and learning experience design. Drives creation of market-aligned, engaging courses.',
              },
            ].map((founder, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-sm sm:text-base text-white/80 mb-3">{founder.role}</p>
                <p className="text-xs sm:text-sm text-white/70">{founder.bio}</p>
              </motion.div>
            ))}
          </div>
          <Link to="/signup">
          
          </Link>
          <motion.div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center sm:space-x-6 text-xs sm:text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
              <span>No Setup Fee</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
              <span>Instant Access</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
              <span>24/7 Support</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

EarnscopLanding.propTypes = {};

export default EarnscopLanding;