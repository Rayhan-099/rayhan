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
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex items-center gap-3 mix-blend-difference group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full px-4 py-2 border border-white/20 hover:border-white/50 transition-colors pointer-events-auto bg-transparent backdrop-blur-md"
      aria-label="Toggle theme"
      title={`Switch to ${isDawn ? 'Dusk' : 'Dawn'}`}
    >
      <div className="relative w-4 h-4 rounded-full border border-white flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ x: isDawn ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 bg-white" 
        />
      </div>
      <div className="flex gap-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-white">
        <span className={`transition-opacity duration-300 ${!isDawn ? 'opacity-100' : 'opacity-40'}`}>Dusk</span>
        <span className="opacity-30">/</span>
        <span className={`transition-opacity duration-300 ${isDawn ? 'opacity-100 font-medium' : 'opacity-40'}`}>Dawn</span>
      </div>
    </motion.button>
  );
}
