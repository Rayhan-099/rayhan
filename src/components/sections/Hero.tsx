"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { createTimeline, utils } from "animejs";
import { profile } from "@/content/profile";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 100, mass: 1.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Parallax layers driven by mouse
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], ["-1%", "1%"]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], ["-1%", "1%"]);
  
  const midX = useTransform(smoothMouseX, [-0.5, 0.5], ["-2%", "2%"]);
  const midY = useTransform(smoothMouseY, [-0.5, 0.5], ["-2%", "2%"]);
  
  const foreX = useTransform(smoothMouseX, [-0.5, 0.5], ["-3%", "3%"]);
  const foreY = useTransform(smoothMouseY, [-0.5, 0.5], ["-3%", "3%"]);

  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: 'outExpo' }
    });

    tl.add('.hero-env-mask', {
      opacity: [1, 0],
      duration: 2200,
      ease: 'linear',
    }, 0)
    .add('.hero-name-word', {
      translateY: [100, 0],
      opacity: [0, 1],
      rotateZ: [2, 0],
      duration: 1800,
      delay: utils.stagger(150, { start: 600 }),
    }, 0)
    .add('.hero-role', {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1200,
    }, 1200)
    .add('.hero-statement', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
    }, 1500)
    .add('.hero-cta', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: utils.stagger(100)
    }, 1700);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background"
    >
      
      {/* Base Void + Glows */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.04)_0%,transparent_60%)]" />
      </motion.div>

      {/* Particles/Dust Layer */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen">
         <div className="absolute inset-0 bg-[url('/media/atmosphere/dust.webp')] bg-repeat opacity-30 animate-drift" />
      </motion.div>

      <div className="hero-env-mask absolute inset-0 z-30 bg-background pointer-events-none" />

      {/* Main Content Monolith */}
      <motion.div 
        style={{ opacity, y: foreY, x: foreX }}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 h-full flex flex-col justify-center"
      >
        <div className="flex flex-col mt-24 md:mt-32 relative">
          
          {/* Top Label (Obsidian Filigree style) */}
          <div className="hero-role opacity-0 flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">SYS:READY</span>
            </div>
            <span className="w-12 h-px bg-white/10" />
            <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-secondary-foreground">PORTFOLIO.26</span>
          </div>

          {/* Crystalline Name Lockup */}
          <h1 className="font-display text-[clamp(4rem,14vw,14rem)] leading-[0.8] tracking-tighter text-foreground uppercase flex flex-col items-start -ml-2 select-none">
            <div className="overflow-hidden pb-4 md:pb-8">
              <span className="hero-name-word inline-block origin-bottom-left opacity-0 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">RAYHAN</span>
            </div>
          </h1>

          {/* Role & Statement Box */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mt-12 md:mt-16 pt-8 relative">
            {/* 1px Connector line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
            
            <div className="flex flex-col gap-6 max-w-xl">
              <h2 className="hero-role font-sans text-xl md:text-3xl text-foreground tracking-tight opacity-0">
                AI &amp; Full Stack Engineer
              </h2>
              <p className="hero-statement font-sans text-sm md:text-lg text-secondary-foreground font-light leading-relaxed opacity-0">
                I build software with the curiosity of an engineer and the eye of a storyteller. Engineering digital experiences where systems, interaction, and atmosphere meet.
              </p>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-row flex-wrap gap-4 min-w-[200px]">
              <a 
                href="#projects" 
                className="hero-cta opacity-0 group relative overflow-hidden flex justify-between items-center px-6 py-4 bg-primary/10 border border-primary text-foreground font-sans font-medium text-[11px] uppercase tracking-[0.15em] transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] rounded-sm"
              >
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/50" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/50" />
                <span className="relative z-10 mr-4">View Architecture</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1 text-primary">→</span>
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-cta opacity-0 group flex justify-between items-center px-6 py-4 bg-[#0d1322] border border-white/10 text-secondary-foreground font-sans font-medium text-[11px] uppercase tracking-[0.15em] transition-all hover:border-[#d4af37]/50 hover:text-foreground rounded-sm"
              >
                <span className="mr-4">Initialize Resume</span>
                <span className="text-[#d4af37] transition-transform group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
