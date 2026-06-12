import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL)

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Validate form: both fields filled
  const isFormValid = () => {
    return loginForm.email.trim() && loginForm.password.trim();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error('Please fill both email and password fields.', {
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
      const response = await fetch(`${API_BASE_URL}/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      const data = await response.json();
      // console.log("======", data)
      if (data.message !== 'Login successful') {
        throw new Error(data.message);
      } else {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user)); // Assuming API returns user object in data.user
        // Reset form
        setLoginForm({ email: '', password: '' });
        toast.success(data.message, {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#dcfce7',
            color: '#15803d',
            border: '1px solid #15803d',
          },
        });
        // Navigate to dashboard
        navigate('/dashboard');
        window.location.reload()
      }

    } catch (error) {
      toast.error(error.message || 'An error occurred during login.', {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
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
              EarningPay
            </h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-8">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Sign In
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup">
                  <span className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Sign up here
                  </span>
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;