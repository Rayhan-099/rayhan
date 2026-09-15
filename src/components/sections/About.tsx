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
  const portraitGrayscale = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <motion.section 
      ref={sectionRef} 
      id="about" 
      className="relative z-10 py-24 md:py-40 overflow-hidden"
    >
      
      {/* Large background typography exiting viewport */}
      <motion.div 
        style={reduceMotion ? {} : { y: watermarkY }}
        className="absolute top-0 left-0 w-full pt-10 flex justify-center text-[15vw] font-serif italic text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0"
      >
        Biography
      </motion.div>

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
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-background-elevated">
              <motion.div 
                style={reduceMotion ? {} : { y: portraitY, filter: `grayscale(${portraitGrayscale})` }} 
                className="absolute inset-[-10%] w-[120%] h-[120%]"
              >
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
              className="text-[#a3959c] font-sans text-base md:text-lg leading-relaxed space-y-6 max-w-prose"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Rayhan Khan is a Software Engineer focused on full-stack development and Machine Learning.
              </p>
              <p>
                He is pursuing a Bachelor of Technology in Computer Science and Engineering at Dr. A.P.J. Abdul Kalam Technical University.
              </p>
              <p>
                His technical work spans Python, React, backend systems, Machine Learning, Generative AI, Computer Vision, and cloud technologies.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
