"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { createTimeline, utils } from "animejs";
import { useSectionTracker } from "@/hooks/useSectionTracker";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  useSectionTracker(containerRef, "hero");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    // Run animation immediately (simulating video load delay)
    const timer = setTimeout(() => setIsVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      createTimeline()
        .add('.hero-env-mask', { opacity: 0, duration: 500, ease: 'linear' }, 0)
        .add('.hero-name-word', { opacity: 1, duration: 500, ease: 'linear' }, 0)
        .add('.hero-role', { opacity: 1, duration: 500, ease: 'linear' }, 0)
        .add('.hero-cta', { opacity: 1, duration: 500, ease: 'linear' }, 0);
      return;
    }

    const tl = createTimeline({
      defaults: { ease: 'easeOutExpo' }
    });

    tl.add('.hero-env-mask', {
      opacity: [1, 0],
      duration: 2500,
      ease: 'linear',
    }, 0)
    // Cinematic environment scale pull
    .add('.hero-video-wrap', {
      scale: [1.05, 1],
      duration: 4000,
      ease: 'easeOutSine',
    }, 0)
    .add('.hero-name-word', {
      translateY: [100, 0],
      opacity: [0, 1],
      rotateZ: [2, 0],
      duration: 2200,
      delay: utils.stagger(150, { start: 600 }),
    }, 0)
    .add('.hero-role', {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1800,
      ease: 'easeOutQuart'
    }, 1200)
    .add('.hero-cta', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: utils.stagger(120),
      ease: 'easeOutQuart'
    }, 1600);
    
  }, [isVideoLoaded]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* 
        The global Three.js AtmosphericScene lives behind this component. 
        We use a mask that fades out on load for a cinematic entrance.
      */}
      <div className="hero-env-mask absolute inset-0 z-20 bg-background pointer-events-none" />

      {/* Editorial Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pb-20 md:pb-32 flex flex-col justify-end h-full"
      >
        <div className="flex flex-col relative">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-8 md:mb-12">
            <h1 className="font-serif text-[clamp(4rem,10vw,12rem)] font-light leading-[0.85] tracking-tight text-foreground flex flex-col items-start -ml-2 select-none">
              <div className="overflow-hidden pb-4">
                <span className="hero-name-word inline-block origin-bottom-left opacity-0 text-foreground">Rayhan</span>
              </div>
              <div className="overflow-hidden pb-4 md:ml-24">
                <span className="hero-name-word inline-block origin-bottom-left opacity-0 text-foreground-secondary italic">Khan.</span>
              </div>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 relative pt-8 md:pt-12 border-t border-line">
            <div className="flex flex-col gap-6 max-w-xl relative">
              {/* Subtle text glow / haze */}
              <div className="absolute -inset-10 bg-background/50 blur-3xl rounded-full z-0 pointer-events-none" />
              <h2 className="hero-role font-sans text-xl md:text-2xl text-foreground font-medium tracking-wide opacity-0 uppercase relative z-10">
                AI & Full Stack Engineer
              </h2>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-row flex-wrap gap-8 items-center pt-2">
              <a 
                href="#projects" 
                className="hero-cta opacity-0 group relative overflow-hidden flex justify-between items-center px-8 py-3.5 bg-transparent border border-white/20 text-white font-sans text-xs uppercase tracking-widest transition-all hover:border-white hover:bg-white/5 rounded-full"
              >
                <span className="relative z-10">View Projects</span>
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-cta opacity-0 group flex justify-between items-center text-[#a3959c] font-sans text-xs uppercase tracking-widest transition-colors hover:text-white"
              >
                Resume
              </a>
              <a 
                href="https://github.com/Rayhan-099" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-cta opacity-0 group flex justify-between items-center text-[#a3959c] font-sans text-xs uppercase tracking-widest transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/rayhan-khan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-cta opacity-0 group flex justify-between items-center text-[#a3959c] font-sans text-xs uppercase tracking-widest transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
