'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoveIcon from "@/assets/home/images/love.svg";
import WhiteWeddingImage from "@/assets/home/images/white-wedding.png";
import TraditionalMarriageImage from "@/assets/home/images/traditional-marriage.png";
import ThanksgivingImage from "@/assets/home/images/thanks-giving.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
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

interface EventOverlayProps {
  token?: string;
}

interface EventImageContainerProps {
  image: any;
  alt: string;
  token?: string;
}

function EventImageContainer({ image, alt, token }: EventImageContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleMouseEnter = () => {
    if (isDesktop) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={image}
        alt={alt}
        className={`h-full w-full object-cover transition-all duration-300 ${isHovered && isDesktop ? 'grayscale' : ''}`}
      />
      <EventOverlay token={token} isHovered={isHovered && isDesktop} />
    </div>
  );
}

function EventOverlay({ token = 'guest', isHovered }: EventOverlayProps & { isHovered: boolean }) {
  const router = useRouter();
  
  return (
    <div className="absolute bottom-0 left-0 right-0 hidden md:flex flex-col justify-center items-center pb-8 md:pb-6 pointer-events-none">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <motion.div 
              className="flex flex-col justify-center items-center max-w-[361px] w-full mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="text-xl md:text-xl font-nunito-400 leading-none text-white"
                variants={itemVariants}
              >
                Saturday
              </motion.p>
              <motion.p 
                className="font-greatvibes-400 text-[54.84px] md:text-[54.84px] leading-none mt-0.5 text-white"
                variants={itemVariants}
              >
                March 26. 2026
              </motion.p>
              <motion.p 
                className="font-greatvibes-400 text-[32.26px] md:text-[32.26px] text-white"
                variants={itemVariants}
              >
                Toronnto, Canada
              </motion.p>
              <motion.button 
                onClick={() => router.push(`/registration/${token}`)}
                className="mt-6.5 flex items-center justify-center h-[59px] w-57 rounded-[50px] border border-white"
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-nunito-400 text-xl">RSVP</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface WeddingEventProps {
  token?: string;
}

export default function WeddingEvent({ token = 'guest' }: WeddingEventProps) {
  return (
    <section id="event" className="px-5 pb-[66.57px] md:pb-[292.44px] overflow-hidden">
      <div className="max-w-[1233px] w-full mx-auto relative">
        <div className="flex items-center mb-[46.4px] text-c136207 text-c75 w-max font-greatvibes-400 relative z-10 mx-auto md:ml-0">
          <span className="text-[50px] md:text-c75 mr-6">Event</span>{" "}
          <div className="h-[54.68px] md:h-[79.36px] w-[57.94px] md:w-[84.08px]">
            <Image
              src={LoveIcon}
              alt="love"
              className="h-full w-full"
              height={79}
              width={84}
            />
          </div>{" "}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-[21px]">
          <EventImageContainer 
            image={WhiteWeddingImage}
            alt="White wedding"
            token={token}
          />
          <EventImageContainer 
            image={TraditionalMarriageImage}
            alt="Traditional marriage"
            token={token}
          />
          <EventImageContainer 
            image={ThanksgivingImage}
            alt="Thanks giving"
            token={token}
          />
        </div>
      </div>
    </section>
  );
}
