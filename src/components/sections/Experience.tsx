"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="experience" className="py-24 md:py-40 relative z-10 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        {/* Section header */}
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col items-start gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-4xl md:text-6xl text-text-primary leading-[1] tracking-tight italic">
            Experience
          </h2>
          <p className="font-sans text-sm md:text-base text-text-secondary max-w-sm">
            A chronological overview of systems built and teams collaborated with over the past few years.
          </p>
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
                <div className="flex flex-col gap-2 relative z-10 pt-2 md:pt-4">
                  <span className="font-sans text-xs uppercase tracking-widest text-text-secondary">
                    {item.date}
                  </span>
                  <span className="font-serif italic text-sm text-text-muted">
                    {item.location}
                  </span>
                </div>
                
                {/* Content side */}
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-text-primary leading-tight group-hover:text-primary transition-colors duration-500">
                      {item.company}
                    </h3>
                    <span className="text-text-secondary font-sans text-sm md:text-base">
                      {item.role}
                    </span>
                  </div>
                  
                  <div className="relative mt-2">
                    <ul className="flex flex-col gap-3 text-text-secondary font-sans text-[14px] md:text-[15px] leading-relaxed max-w-2xl">
                      {item.description.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary/50 text-[10px] mt-1.5 flex-shrink-0">✦</span>
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
    </section>
  );
}
