"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { createTimeline, utils } from "animejs";
import { profile } from "@/content/profile";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
      translateY: [120, 0],
      opacity: [0, 1],
      rotateZ: [4, 0],
      duration: 1600,
      delay: utils.stagger(180, { start: 800 }),
    }, 0)
    .add('.hero-role', {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 1200,
    }, 1400)
    .add('.hero-statement', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1000,
    }, 1800);
    
  }, []);

  const [firstName, lastName] = profile.name.split(' ');

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-background"
    >
      
      {/* Full-bleed cinematic background media */}
      <motion.div 
        style={{ scale: bgScale, y: bgY }} 
        className="absolute inset-0 z-0"
      >
        <video 
          src="/media/atmosphere/hero-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-background/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(4,6,10,0.8)_70%,rgba(4,6,10,1)_100%)]" />
      </motion.div>

      <div className="hero-env-mask absolute inset-0 z-30 bg-background pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20 pb-16 md:pb-24 flex flex-col justify-end h-full"
      >
        <div className="flex flex-col mt-auto gap-8 md:gap-12 relative">
          
          {/* Top Label */}
          <div className="hero-role opacity-0 flex items-center gap-4">
            <span className="w-12 h-px bg-accent/40" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground-secondary">
              PORTFOLIO.2026
            </span>
          </div>

          {/* Giant Name Lockup */}
          <h1 className="font-display text-[clamp(6rem,18vw,24rem)] leading-[0.75] tracking-tighter text-foreground uppercase flex flex-col items-start -ml-2">
            <div className="overflow-hidden pb-4">
              <span className="hero-name-word inline-block origin-bottom-left opacity-0">{firstName}</span>
            </div>
            <div className="overflow-hidden pb-4 md:ml-[15%] flex items-end gap-6">
              <span className="hero-name-word inline-block origin-bottom-left italic text-accent opacity-0">{lastName}</span>
            </div>
          </h1>

          {/* Role & Statement */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-accent/10 pt-8 mt-4">
            <div className="flex flex-col gap-4">
              <h2 className="hero-role font-sans text-xl md:text-2xl text-foreground tracking-wide opacity-0">
                AI & Full Stack Engineer
              </h2>
              <p className="hero-statement font-sans text-sm md:text-base text-muted font-light leading-relaxed max-w-md opacity-0">
                {profile.tagline}
              </p>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col gap-4 hero-statement opacity-0 min-w-[200px]">
              <a 
                href="#projects" 
                className="group flex justify-between items-center px-6 py-4 bg-[var(--text-primary)] text-[var(--background)] font-sans font-medium text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-accent"
              >
                <span>View Projects</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex justify-between items-center px-6 py-4 border border-[var(--text-primary)]/10 text-foreground font-sans font-medium text-[11px] uppercase tracking-[0.2em] transition-all hover:border-[var(--text-primary)]/40"
              >
                <span>Resume</span>
                <span className="text-accent">↓</span>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
