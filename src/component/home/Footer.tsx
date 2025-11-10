'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FooterProps {
  token?: string;
}

export default function Footer({ token = 'guest' }: FooterProps) {
  const router = useRouter();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };
  
  return (
    <footer ref={footerRef} className="px-5 py-[117px] md:py-[59px] overflow-hidden bg-c1c1c1e">
      {/* Schedule Card with Glassmorphism - matching image exactly */}
      <motion.div 
        className="max-w-[1197px] w-full mx-auto rounded-3xl pt-[75px] pb-[61px] md:px-[65px] text-center relative overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Very subtle glassmorphism background - almost imperceptible */}
        <div className="absolute inset-0 bg-c1e1e1e/95 backdrop-blur-[2px] rounded-3xl"></div>

        {/* Border overlay - curves with container, only top and bottom visible */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            borderTop: "1px solid rgba(209, 213, 219, 0.6)",
            borderBottom: "1px solid rgba(209, 213, 219, 0.6)",
            borderLeft: "none",
            borderRight: "none",
          }}
        ></div>

        {/* Gradient overlay to fade border at curved edges */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(30, 30, 30, 0.95) 0%, transparent 22px, transparent calc(100% - 22px), rgba(30, 30, 30, 0.95) 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 1px, transparent calc(100% - 1px), black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 1px, transparent calc(100% - 1px), black 100%)",
          }}
        ></div>

        {/* Light stops almost at top - concentrated at very top, fades quickly */}
        <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-white/6 via-white/[0.01] to-transparent pointer-events-none rounded-t-3xl"></div>

        {/* Soft glow/shadow - very faint, concentrated at very top only */}
        <div className="absolute -top-[2px] left-0 right-0 h-[10%] rounded-t-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent blur-[8px] opacity-50 pointer-events-none"></div>
        <div className="absolute inset-0 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none"></div>

        <motion.div 
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Schedule Title - largest, very prominent */}
          <motion.h3 
            className="hidden md:block text-white font-greatvibes-400 text-[65px] mb-[26px] leading-none"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Schedule
          </motion.h3>

          {/* Horizontal Separator Line - thin, light gray, with padding */}
          <motion.div 
            className="w-full mx-auto h-px bg-gray-300/60 mb-5.5"
            variants={itemVariants}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          ></motion.div>

          {/* Date and Location */}
          <motion.p 
            className="text-white font-nunito-400 text-xl leading-4"
            variants={itemVariants}
            whileHover={{ x: 5, scale: 1.02 }}
          >
            Friday
          </motion.p>
          <motion.p 
            className="text-white font-greatvibes-400 text-[40px] md:text-[54.84px] mb-8 md:mb-2 leading-tight"
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotateZ: 1 }}
          >
            March 27. 2026
          </motion.p>
          <motion.p 
            className="text-white font-greatvibes-400 text-[32.26px] mb-10 leading-5"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -3 }}
          >
            Toronto, Canada
          </motion.p>

          {/* RSVP Button - slightly darker than card, thin white border */}
          <motion.button 
            onClick={() => {
              const date = 'March 27 2026';
              const day = 'Friday';
              router.push(`/registration/${token}?date=${encodeURIComponent(date)}&day=${encodeURIComponent(day)}`);
            }}
            className="px-[46px] mx-auto h-[49px] md:h-[60px] rounded-[50px] border border-white/90 bg-black/10 hover:bg-black/50 transition-all duration-300"
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-nunito-700 text-lg md:text-[25px] uppercase tracking-wide">
              RSVP
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
