'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Accommodation', href: '#accommodation' },
  { label: 'Event', href: '#event' },
];

const smoothScrollTo = (elementId: string) => {
  const element = document.querySelector(elementId);
  if (element) {
    const headerOffset = 100; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Close menu on route change
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  if (typeof window === 'undefined') {
    return null;
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const menuVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
    },
    exit: {
      x: '-100%',
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Menu */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeOut',
            }}
            className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 md:hidden shadow-2xl"
          >
            <div className="pt-24 px-6">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item, index) => {
                  const isActive = item.href === '#home' && pathname === '/';
                  
                  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    if (item.href.startsWith('#')) {
                      smoothScrollTo(item.href);
                    }
                    onClose();
                  };
                  
                  return (
                    <motion.div
                      key={item.label}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <a
                        href={item.href}
                        onClick={handleClick}
                        className={`block cursor-pointer ${
                          isActive || item.label === 'Home'
                            ? 'text-c136207 font-greatvibes-400 text-2xl'
                            : 'text-cb0b0b0 font-nunito-400 text-lg'
                        } hover:text-c136207 transition-colors duration-200`}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

