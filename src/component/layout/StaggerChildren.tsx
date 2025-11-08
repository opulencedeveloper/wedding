'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
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

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div 
              key={index} 
              variants={item}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div 
            variants={item}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.div>
      }
    </motion.div>
  );
}

