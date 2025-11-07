'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";

import LoveIcon from "@/assets/home/images/love.svg";
import OurGalleryDesktop from "./OurGalleryPicturesDesktop";
import OurGalleryMobile from "./OurGalleryPicturesMobile";

export default function OurGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const titleInView = useInView(titleRef, { once: true, margin: '-50px' });

  // Parallax effect for gallery content
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

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

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  };

  const iconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
  };

  const galleryVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9,
      filter: 'blur(15px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="gallery" 
      className="px-4 md:px-5 pb-[100px] sm:pb-[292.44px] overflow-hidden relative"
    >
      <motion.div 
        className="max-w-235 w-full mx-auto overflow-visible relative"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Animated Title */}
        <motion.div
          ref={titleRef}
          variants={containerVariants}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
          className="flex items-center mb-5 md:mb-11 justify-between mx-auto text-c136207 text-[50px] md:text-c75 w-max font-greatvibes-400 relative z-10"
        >
          <motion.span 
            className="mr-6"
            variants={wordVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.15, rotateZ: -5, y: -5 }}
          >
            Our
          </motion.span>{" "}
          <motion.div 
            className="h-[57.69px] md:h-[79.36px] w-[61.13px] md:w-[84.08px]"
            variants={iconVariants}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              scale: 1.3, 
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >
            <Image
              src={LoveIcon}
              alt="love"
              className="h-full w-full"
              height={79}
              width={84}
            />
          </motion.div>{" "}
          <motion.span 
            className="ml-3"
            variants={wordVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            whileHover={{ scale: 1.15, rotateZ: 5, y: -5 }}
          >
            Gallery
          </motion.span>{" "}
        </motion.div>

        {/* Animated Gallery Content */}
        <motion.div
          variants={galleryVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        >
          <OurGalleryDesktop />
          <OurGalleryMobile />
        </motion.div>
      </motion.div>
    </section>
  );
}
