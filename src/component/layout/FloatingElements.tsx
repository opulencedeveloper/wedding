'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementsProps {
  children: ReactNode;
  className?: string;
}

export default function FloatingElements({ 
  children, 
  className = '' 
}: FloatingElementsProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

