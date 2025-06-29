import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen } from 'lucide-react';
import '../App.css';
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
const SuccessPage = () => {
  const { state } = useLocation();
  const course = state?.course || null;
  const amount = state?.amount || 0;
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
  return (
    <div className="min-h-screen font-['Outfit'] bg-gradient-to-br from-blue-50 to-red-50 py-6 sm:py-10 overflow-x-hidden">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Congratulations on your purchase! You're ready to start learning.
          </p>
        </motion.div>

        {course ? (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
              <motion.img
                src={course.image}
                alt={course.title}
                className="w-full sm:w-48 h-32 sm:h-36 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  You've successfully purchased this course for{' '}
                  <span className="font-semibold text-blue-600">₹{amount.toLocaleString()}</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                  <Link to="/dashboard">
                    <button
                      className="bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                      aria-label="Go to Dashboard"
                    >
                      Go to Dashboard
                    </button>
                  </Link>
                  <Link to="/">
                    <button
                      className="border-2 border-blue-600 text-blue-600 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
                      aria-label="Back to Home"
                    >
                      Back to Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Purchase Confirmed!</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Your payment was successful, but course details are unavailable. Check your dashboard for access.
            </p>
            <Link to="/dashboard">
              <button
                className="bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                aria-label="Go to Dashboard"
              >
                Go to Dashboard
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;