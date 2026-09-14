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
    <section ref={sectionRef} id="about" className="relative z-10 py-24 md:py-40 bg-[#110e12] border-t border-line">
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Magazine Spread: asymmetric portrait + editorial text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Portrait */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-[#161217]">
              <motion.div style={reduceMotion ? {} : { y: portraitY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="/rayhan-headshot.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-1000 opacity-90"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </motion.div>
              {/* Soft color grade overlay */}
              <div className="absolute inset-0 bg-[#d6a3b6]/5 mix-blend-color pointer-events-none" />
            </div>
            
            <div className="mt-4 flex justify-between items-center text-text-secondary">
              <span className="font-sans text-xs tracking-wider uppercase">Rayhan Khan</span>
              <span className="font-serif italic text-sm">Engineer</span>
            </div>
          </motion.div>

          {/* RIGHT: Statement & Biography */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8">
            
            <span className="font-sans text-xs tracking-widest uppercase text-text-muted mb-4">
              Biography
            </span>

            <motion.h2 
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.1] tracking-tight mb-8"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Building digital <span className="italic text-primary">environments</span> and intelligent <span className="italic text-primary">systems</span>.
            </motion.h2>

            <motion.div 
              className="text-text-secondary font-sans text-base md:text-lg leading-relaxed space-y-6"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                I am a Software Engineer who merges technical rigor with aesthetic sensitivity. My work spans full-stack development, artificial intelligence, and interactive frontend experiences.
              </p>
              <p>
                Rather than treating software as merely functional, I approach it as an environment—a space where architecture, data, and design coexist to create something memorable. Whether optimizing machine learning pipelines or refining UI micro-interactions, the goal is always a seamless, cohesive experience.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
