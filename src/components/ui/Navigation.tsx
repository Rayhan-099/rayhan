"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

import { useTheme } from "@/context/ThemeContext";

export function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      {/* Top Edge Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 pointer-events-none mix-blend-difference ${
          scrolled ? "py-4" : ""
        }`}
      >
        <div className="font-serif text-xl text-white font-semibold tracking-widest uppercase pointer-events-auto">
          RAYHAN
        </div>
        
        <div className="hidden md:flex gap-8 items-center pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#a3959c] hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center pointer-events-auto">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#d6a3b6] hover:text-white transition-colors">
            [ Download Resume ]
          </a>
        </div>
      </motion.nav>
      
      {/* Theme Toggle (Bottom Right or Top Right) */}
      <ThemeToggle />
      
      {/* Scroll Line Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 mix-blend-difference pointer-events-none"
      >
        <span className="text-[9px] font-sans tracking-widest uppercase text-[#a3959c]">
          SCROLL
        </span>
        <motion.div 
          className="w-px h-12 bg-white/10 relative overflow-hidden"
        >
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-white"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDawn = theme === "dawn";

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex items-center justify-center w-12 h-12 rounded-full mix-blend-difference group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white border border-white/20 hover:border-white/50 transition-all duration-500 pointer-events-auto bg-transparent backdrop-blur-md overflow-hidden"
      aria-label={isDawn ? "Switch to Dusk" : "Switch to Dawn"}
      title={isDawn ? "Switch to Dusk" : "Switch to Dawn"}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon (Dawn) */}
        <motion.div
          initial={false}
          animate={{ 
            scale: isDawn ? 1 : 0, 
            rotate: isDawn ? 0 : -90,
            opacity: isDawn ? 1 : 0 
          }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </motion.div>

        {/* Moon Icon (Dusk) */}
        <motion.div
          initial={false}
          animate={{ 
            scale: !isDawn ? 1 : 0, 
            rotate: !isDawn ? 0 : 90,
            opacity: !isDawn ? 1 : 0 
          }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}
