'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../layout/Header";
import FloatingElements from "../layout/FloatingElements";
import TextReveal from "../layout/TextReveal";

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

  return (
    <motion.section 
      ref={sectionRef}
      id="home" 
      className="px-5 h-[954px] md:h-240 w-full hero-bg text-white relative overflow-hidden"
      style={{ y, opacity, scale }}
    >
      <Header />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[383px] md:max-w-232 w-full mx-auto pt-84 md:pt-56"
      >
        <FloatingElements>
          <motion.div 
            className="w-full font-greatvibes-400 text-[40px] md:text-[113.06px]"
            variants={nameVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotateZ: 1 }}
          >
            <TextReveal delay={0}>
              <h1 className="leading-none"> Oluwadoyinsolami</h1>
            </TextReveal>
          </motion.div>
        </FloatingElements>
        
        <FloatingElements>
          <motion.div 
            className="flex justify-end mt-0.5 md:-mt-2.5"
            variants={nameVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05, rotateZ: -1 }}
          >
            <TextReveal delay={0.1}>
              <p className="text-white font-nunito-400 text-xl md:text-[37.69px] leading-none mt-1.5 md:mt-0 mr-2 md:mr-0">
                And
              </p>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h2 className="font-greatvibes-400 text-[40px] md:text-[113.06px] leading-none">
                Oluwaseyi
              </h2>
            </TextReveal>
          </motion.div>
        </FloatingElements>
      </motion.div>

      <motion.div 
        className="flex flex-col justify-center mt-[53px] md:mt-3 items-center max-w-[361px] w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <TextReveal delay={0.3}>
          <motion.p 
            className="text-xl md:text-xl font-nunito-400 leading-none"
            variants={dateVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            Saturday
          </motion.p>
        </TextReveal>
        
        <TextReveal delay={0.4}>
          <motion.p 
            className="font-greatvibes-400 text-[54.84px] md:text-[54.84px] leading-none mt-0.5"
            variants={dateVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotateZ: 2 }}
          >
           March 26. 2026
          </motion.p>
        </TextReveal>
        
        <TextReveal delay={0.5}>
          <motion.p 
            className="font-greatvibes-400 text-[32.26px] md:text-[32.26px]"
            variants={dateVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            Toronnto, Canada
          </motion.p>
        </TextReveal>

        <TextReveal delay={0.6}>
          <motion.button 
            onClick={() => router.push(`/registration/${token}`)}
            className="mt-6.5 flex items-center justify-center h-[59px] w-57 rounded-[50px] border border-white hover:bg-white/10 transition-colors duration-300"
            variants={buttonVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
        </TextReveal>
      </motion.div>
    </motion.section>
  );
}
