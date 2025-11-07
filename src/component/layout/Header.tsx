'use client';

import { useState } from 'react';
import Image from "next/image";
import MobileNav from "./MobileNav";

import MenuIcon from "@/assets/home/icon/jam_menu.svg";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#our-story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Accommodation", href: "#accommodation" },
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="text-white w-full pt-24.5 flex items-center justify-center">
        <button 
          onClick={toggleMenu}
          className="h-[55px] w-[55px] absolute top-12 left-4 block md:hidden z-50"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Image src={MenuIcon} alt="menu icon" className="h-full w-full" />
        </button>
 
        <nav className="hidden md:flex space-x-8 font-merriweather-400 ">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(item.href);
              }}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <MobileNav isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
