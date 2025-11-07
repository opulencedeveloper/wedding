'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 80, opacity: 0 };
      case 'down':
        return { y: -80, opacity: 0 };
      case 'left':
        return { x: 80, opacity: 0 };
      case 'right':
        return { x: -80, opacity: 0 };
      case 'scale':
        return { scale: 0.8, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: 80, opacity: 0 };
    }
  };

  const variants = {
    hidden: getInitialPosition(),
    visible: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

