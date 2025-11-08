'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

function EventOverlay({ token = 'guest' }: EventOverlayProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(overlayRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      ref={overlayRef}
      className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center pb-8 md:pb-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="flex flex-col justify-center items-center max-w-[361px] w-full mx-auto">
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
      </div>
    </motion.div>
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
          <div className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative">
            <Image
              src={WhiteWeddingImage}
              alt="White weding"
              className="h-full w-full object-cover"
            />
            <EventOverlay token={token} />
          </div>
          <div className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative">
            <Image
              src={TraditionalMarriageImage}
              alt="Traditional marriage"
              className="h-full w-full object-cover"
            />
            <EventOverlay token={token} />
          </div>
          <div className="w-full h-[583.53] md:h-[572px] rounded-[10px] overflow-hidden relative">
            <Image
              src={ThanksgivingImage}
              alt="Thanks giving"
              className="h-full w-full object-cover"
            />
            <EventOverlay token={token} />
          </div>
        </div>
      </div>
    </section>
  );
}
