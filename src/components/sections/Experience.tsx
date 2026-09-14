"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(scrollYProgress, [0.1, 0.5, 0.8], ["#161214", "#1a1618", "#121013"]);

  return (
    <motion.section 
      style={{ backgroundColor }}
      ref={sectionRef} 
      id="experience" 
      className="py-24 md:py-40 relative z-10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        {/* Section header */}
        <motion.div 
          className="mb-24 flex flex-col items-start gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#a3959c] mb-2">
            Chronology
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-white leading-[1] tracking-tight italic">
            Experience
          </h2>
        </motion.div>

        {/* Chronology List */}
        <div className="flex flex-col">
          {experience.map((item, index) => {
            return (
              <motion.div 
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-10 md:py-16 border-t border-line transition-colors duration-500"
              >
                {/* Year / Metadata side */}
                <div className="flex flex-col gap-2 relative z-10 pt-2 md:pt-6">
                  <span className="font-sans text-xs uppercase tracking-widest text-[#a3959c]">
                    {item.date}
                  </span>
                  <span className="font-serif italic text-sm text-[#a3959c]/50">
                    {item.location}
                  </span>
                </div>
                
                {/* Content side */}
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                    <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight group-hover:text-[#f2ebe8] transition-colors duration-500">
                      {item.company}
                    </h3>
                    <span className="text-[#d6a3b6] font-sans text-sm md:text-base uppercase tracking-wider">
                      {item.role}
                    </span>
                  </div>
                  
                  <div className="relative mt-2">
                    <ul className="flex flex-col gap-4 text-[#a3959c] font-sans text-[15px] md:text-base leading-relaxed max-w-2xl">
                      {item.description.map((detail, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="text-white/20 text-[10px] mt-2 flex-shrink-0">✦</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
