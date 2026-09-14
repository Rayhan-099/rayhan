"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/content/profile";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} id="about" className="relative z-10 py-32 md:py-48 bg-[#07090e]">
      <div className="absolute inset-0 bg-[url('/media/atmosphere/dust.webp')] bg-repeat opacity-10 mix-blend-screen pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Magazine Spread: asymmetric portrait + editorial text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Large Portrait */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm border border-white/5 bg-[#0b0f19]">
              <motion.div style={reduceMotion ? {} : { y: portraitY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="/rayhan-headshot.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-80 hover:opacity-100"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </motion.div>
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80 pointer-events-none" />
              {/* Corner ticks */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/30" />
            </div>
            
            {/* Caption line */}
            <div className="mt-6 border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-widest uppercase text-primary">ID: RAYHAN-099</span>
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-secondary-foreground">Engineer</span>
            </div>
          </motion.div>

          {/* RIGHT: Statement & Biography */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pt-16 lg:pl-12">
            
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary">
                Origin / Identity
              </span>
            </div>

            <motion.h2 
              className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1] tracking-tight mb-12"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              System<br/>Profile.
            </motion.h2>

            <div className="flex flex-col gap-6 max-w-2xl relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent" />
              <motion.p 
                className="text-secondary-foreground font-sans text-lg md:text-xl font-light leading-relaxed whitespace-pre-wrap"
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {profile.about}
              </motion.p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
