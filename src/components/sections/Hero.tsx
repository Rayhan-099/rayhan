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
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  useEffect(() => {
    // Only run animation after video loads or after a short delay
    const timer = setTimeout(() => setIsVideoLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded) return;

    const tl = createTimeline({
      defaults: { ease: 'outExpo' }
    });

    tl.add('.hero-env-mask', {
      opacity: [1, 0],
      duration: 3000,
      ease: 'linear',
    }, 0)
    .add('.hero-name-word', {
      translateY: [80, 0],
      opacity: [0, 1],
      rotateZ: [1, 0],
      duration: 2000,
      delay: utils.stagger(120, { start: 500 }),
    }, 0)
    .add('.hero-role', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1600,
    }, 1000)
    .add('.hero-statement', {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 1600,
    }, 1200)
    .add('.hero-cta', {
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: utils.stagger(150)
    }, 1400);
    
  }, [isVideoLoaded]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden"
    >
      {/* Cinematic Environment Video */}
      <motion.div 
        style={{ scale, opacity: videoOpacity }} 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/media/atmosphere/hero-poster.png"
          className="object-cover w-full h-full scale-[1.02] transform-gpu"
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source src="/media/atmosphere/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Soft atmospheric gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        
        {/* Environmental Depth Planes */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-background to-transparent mix-blend-multiply opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[80vh] bg-gradient-to-t from-primary/10 to-transparent mix-blend-overlay opacity-30" />
        
        {/* Color grading tint */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-color" />
      </motion.div>

      <div className="hero-env-mask absolute inset-0 z-10 bg-background pointer-events-none" />

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
