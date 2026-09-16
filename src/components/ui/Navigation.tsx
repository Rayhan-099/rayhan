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
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-transparent ${
          scrolled ? "py-4" : ""
        }`}
      >
        <div className="font-serif text-xl text-white font-semibold tracking-widest uppercase pointer-events-auto text-shadow-sm">
          RayhanK
        </div>
        
        <div className="hidden md:flex gap-8 items-center pointer-events-auto">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/90 hover:text-[#FACDC5] transition-colors drop-shadow-md"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center pointer-events-auto">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#FACDC5] hover:text-white transition-colors drop-shadow-md">
            [ Download Resume ]
          </a>
        </div>
      </motion.nav>
      

      {/* Scroll Line Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4 pointer-events-none drop-shadow-md"
      >
        <span className="text-[9px] font-sans tracking-widest uppercase text-white/70">
          SCROLL
        </span>
        <motion.div 
          className="w-px h-12 bg-white/20 relative overflow-hidden"
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

