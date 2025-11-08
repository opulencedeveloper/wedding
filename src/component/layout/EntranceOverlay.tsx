'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import LoveIcon from "@/assets/home/images/love.svg";

export default function EntranceOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [particlePositions, setParticlePositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    // Mark as mounted (client-side only)
    setIsMounted(true);
    
    // Get window size on client
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Generate particle positions deterministically on client
    // More particles for better visibility
    const positions = Array.from({ length: 25 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticlePositions(positions);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Disable scrolling when overlay is visible
  useEffect(() => {
    if (isVisible) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible(false);
    // Signal that overlay has been dismissed
    try {
      localStorage.setItem('entranceOverlayDismissed', 'true');
      // Dispatch custom event for immediate response
      window.dispatchEvent(new CustomEvent('entranceOverlayDismissed'));
    } catch (e) {
      // localStorage might not be available
    }
  };

  const overlayVariants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
  };

  const overlayTransition = {
    duration: 1.2,
    ease: "easeOut" as const,
  };

  const contentVariants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
    },
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateZ: -15,
    },
  };

  const contentTransition = {
    duration: 0.9,
    ease: "easeOut" as const,
  };

  const particleVariants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
  };

  const particleTransition = {
    duration: 0.5,
    ease: 'easeOut' as const,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="visible"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={overlayTransition}
          onClick={handleClick}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Animated background particles - only render after mount to avoid hydration issues */}
          {isMounted && (
            <motion.div
              variants={particleVariants}
              transition={particleTransition}
              className="absolute inset-0 overflow-hidden"
            >
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: pos.x,
                    y: pos.y,
                  }}
                  animate={{
                    y: [null, Math.random() * windowSize.height],
                    x: [null, Math.random() * windowSize.width],
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: Math.random() * 2,
                  }}
                >
                  {/* Heart-shaped particle */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-pink-400"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(251, 113, 133, 0.6))' }}
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Main content */}
          <motion.div
            variants={contentVariants}
            transition={contentTransition}
            className="text-center px-4 z-10"
          >
            <motion.h1
              className="font-greatvibes-400 text-6xl md:text-8xl text-c136207 mb-4"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Oluwadoyinsolami
            </motion.h1>
            
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16">
                <Image
                  src={LoveIcon}
                  alt="love"
                  width={64}
                  height={64}
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            <motion.h1
              className="font-greatvibes-400 text-6xl md:text-8xl text-c136207 mb-8"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
            >
              & Oluwaseyi
            </motion.h1>

            <motion.p
              className="font-nunito-400 text-lg md:text-xl text-gray-700 mb-8"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Click anywhere to begin
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-2"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                className="w-6 h-6 text-c136207"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
