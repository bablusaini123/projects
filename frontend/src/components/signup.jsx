import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

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

    requestAnimationFrame(monitorPerformance);

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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    joinCode: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Extract referCode from URL query string
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referCode = searchParams.get('referCode');
    if (referCode) {
      setSignupForm((prev) => ({ ...prev, joinCode: referCode }));
    }
  }, [location.search]);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
    if (name === 'confirmPassword') {
      setIsConfirmPasswordTouched(true);
    }
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const isFormValid = () => {
    return (
      signupForm.firstName.trim() &&
      signupForm.lastName.trim() &&
      signupForm.email.trim() &&
      signupForm.phone.trim() &&
      signupForm.password.trim() &&
      signupForm.confirmPassword.trim() &&
      signupForm.joinCode.trim() &&
      signupForm.password === signupForm.confirmPassword &&
      termsAccepted
    );
  };

  const passwordsMatch = () => {
    return signupForm.password === signupForm.confirmPassword;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill all fields correctly.', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          border: '1px solid #b91c1c',
        },
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/userRegisteration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: signupForm.firstName,
          lastName: signupForm.lastName,
          email: signupForm.email,
          phoneNo: signupForm.phone,
          password: signupForm.password,
          joinCode: signupForm.joinCode
        }),
      });

      const data = await response.json();
      if (data.message !== 'User registered successfully') {
        toast.error(data.message || 'Something went wrong!', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#fee2e2',
            color: '#b91c1c',
            border: '1px solid #b91c1c',
          },
        });
      } else {
        toast.success(data.message, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#d1fae5',
            color: '#065f46',
            border: '1px solid #065f46',
          },
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Server not reachable.', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#fee2e2',
          color: '#b91c1c',
          border: '1px solid #b91c1c',
        },
      });
    }
  };

  // Check if referCode exists in the URL query string
  const searchParams = new URLSearchParams(location.search);
  const referCode = searchParams.get('referCode');
  const isJoinCodeDisabled = !!referCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
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
      <Toaster />
      <div className="max-w-md w-full space-y-8 z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <Link to="/">
              <span className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </span>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent mb-2">
              earnscop
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600 mb-8">Start your learning and earning journey today</p>
          </div>

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={signupForm.firstName}
                    onChange={handleSignupChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2 text-gray-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={signupForm.lastName}
                    onChange={handleSignupChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={signupForm.phone}
                  onChange={handleSignupChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2"
                >
                  {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              {isConfirmPasswordTouched && !passwordsMatch() && (
                <p id="confirmPasswordError" className="text-red-500 text-sm mb-2">
                  Passwords do not match
                </p>
              )}
              <div className="relative">
                <Lock className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={signupForm.confirmPassword}
                  onChange={handleSignupChange}
                  className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    isConfirmPasswordTouched && !passwordsMatch()
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  aria-describedby={isConfirmPasswordTouched && !passwordsMatch() ? 'confirmPasswordError' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2"
                >
                  {showConfirmPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="joinCode" className="block text-sm font-medium text-gray-700 mb-2">
                Join Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 text-gray-400" />
                <input
                  id="joinCode"
                  name="joinCode"
                  type="text"
                  required
                  value={signupForm.joinCode}
                  onChange={handleSignupChange}
                  disabled={isJoinCodeDisabled}
                  className={`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    isJoinCodeDisabled ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                  }`}
                  placeholder="Join Code"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the <Link to="/terms&condition" className="text-blue-600">Terms</Link> and{' '}
                <Link to="/privacy" className="text-blue-600">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;