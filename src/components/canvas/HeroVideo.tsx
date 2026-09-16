"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { createTimeline } from "animejs";

export function HeroVideo() {
  const { scrollY } = useScroll();
  // Hero section is 100vh. Fade out by 80vh.
  const videoOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded || reduceMotion) return;
    
    // Initial entrance animation
    createTimeline({ defaults: { ease: 'easeOutSine' } })
      .add('.hero-global-video', {
        scale: [1.05, 1],
        duration: 4000,
      }, 0);
  }, [isVideoLoaded, reduceMotion]);

  return (
    <motion.div 
      style={{ scale, opacity: videoOpacity }} 
      className="hero-global-video fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background"
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
  );
}
