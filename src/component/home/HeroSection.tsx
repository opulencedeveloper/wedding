'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from "../layout/Header";
import FloatingElements from "../layout/FloatingElements";

import HeroImageOne from "@/assets/home/images/hero-one.png";
import HeroImageTwo from "@/assets/home/images/hero-two.png";
import HeroImageThree from "@/assets/home/images/hero-three.png";
import HeroImageFour from "@/assets/home/images/hero-four.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const nameVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const dateVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
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
  },
};

interface HeroSectionProps {
  token?: string;
}

export default function HeroSection({ token = 'guest' }: HeroSectionProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Background image carousel state
  const heroImages = [HeroImageOne, HeroImageTwo, HeroImageThree, HeroImageFour];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [overlayDismissed, setOverlayDismissed] = useState(false);

  // Check if overlay was already dismissed
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('entranceOverlayDismissed');
      if (dismissed === 'true') {
        setOverlayDismissed(true);
      }
    } catch (e) {
      // localStorage might not be available
    }

    // Listen for overlay dismissal event
    const handleDismissed = () => {
      setOverlayDismissed(true);
    };

    window.addEventListener('entranceOverlayDismissed', handleDismissed);
    return () => window.removeEventListener('entranceOverlayDismissed', handleDismissed);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <motion.section 
      ref={sectionRef}
      id="home" 
      className="px-5 h-[954px] md:h-240 w-full text-white relative overflow-hidden"
      style={{ y, opacity, scale, position: 'relative' }}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt={`Hero image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer - appears on top */}
      <div className="relative z-10">
        <Header />

      <AnimatePresence>
      {overlayDismissed && (
      <motion.div
        key="names-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="max-w-[383px] md:max-w-232 w-full mx-auto pt-84 md:pt-56"
      >
        <FloatingElements>
          <motion.div 
            className="w-full font-greatvibes-400 text-[40px] md:text-[113.06px]"
            variants={nameVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotateZ: 1 }}
          >
            <h1 className="leading-none"> Oluwadoyinsolami</h1>
          </motion.div>
        </FloatingElements>
        
        <FloatingElements>
          <motion.div 
            className="flex justify-end mt-0.5 md:-mt-2.5"
            variants={nameVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05, rotateZ: -1 }}
          >
            <p className="text-white font-nunito-400 text-xl md:text-[37.69px] leading-none mt-1.5 md:mt-0 mr-2 md:mr-0">
              And
            </p>
            <h2 className="font-greatvibes-400 text-[40px] md:text-[113.06px] leading-none">
              Oluwaseyi
            </h2>
          </motion.div>
        </FloatingElements>
      </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {overlayDismissed && (
      <motion.div 
        key="date-section"
        className="flex flex-col justify-center mt-[53px] md:mt-3 items-center max-w-[361px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.p 
          className="text-xl md:text-xl font-nunito-400 leading-none"
          variants={dateVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          whileHover={{ scale: 1.1, y: -5 }}
        >
          Friday 
        </motion.p>
        
        <motion.p 
          className="font-greatvibes-400 text-[54.84px] md:text-[54.84px] leading-none mt-0.5"
          variants={dateVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.1, rotateZ: 2 }}
        >
          March 27 2026
        </motion.p>
        
        <motion.p 
          className="font-greatvibes-400 text-[32.26px] md:text-[32.26px]"
          variants={dateVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          whileHover={{ scale: 1.1, y: -5 }}
        >
          Toronnto, Canada
        </motion.p>

        <motion.button 
          onClick={() => router.push(`/registration/${token}`)}
          className="mt-6.5 flex items-center justify-center h-[59px] w-57 rounded-[50px] border border-white hover:bg-white/10 transition-colors duration-300"
          variants={buttonVariants}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          whileHover={{ 
            scale: 1.1, 
            rotateZ: 2,
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95, rotateZ: -2 }}
        >
          <motion.span 
            className="text-white font-nunito-400 text-xl"
            whileHover={{ x: 5 }}
          >
            RSVP
          </motion.span>
        </motion.button>
      </motion.div>
      )}
      </AnimatePresence>
      </div>
    </motion.section>
  );
}
