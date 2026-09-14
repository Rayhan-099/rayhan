"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="experience" className="py-32 md:py-48 relative z-10 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        {/* Section header */}
        <motion.div 
          className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary">
                Career Progression
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-tight">
              Experience.
            </h2>
          </div>
          <p className="font-sans text-sm text-secondary-foreground font-light max-w-xs md:text-right">
            A chronological trace of systems built and teams collaborated with.
          </p>
        </motion.div>

        {/* Chronology List */}
        <div className="flex flex-col">
          {experience.map((item, index) => {
            const year = item.date.match(/\d{4}/)?.[0] || "";
            return (
              <motion.div 
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 py-16 border-b border-white/5 hover:border-primary/30 transition-colors duration-500"
              >
                {/* Year / Metadata side */}
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-mono text-xs tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                    {item.date}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-muted">
                    {item.location}
                  </span>
                  <span className="font-display text-7xl md:text-8xl lg:text-9xl font-bold text-white/[0.02] absolute -top-8 -left-4 pointer-events-none group-hover:text-white/[0.05] transition-colors duration-700">
                    {year}
                  </span>
                </div>
                
                {/* Content side */}
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground leading-[1] group-hover:text-primary transition-colors duration-500">
                      {item.company}
                    </h3>
                    <span className="text-secondary-foreground font-sans font-light text-lg tracking-wide mt-2">
                      {item.role}
                    </span>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover:bg-primary/40 transition-colors duration-500" />
                    <ul className="flex flex-col gap-4 text-secondary-foreground font-sans font-light text-[15px] leading-relaxed max-w-2xl">
                      {item.description.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="font-mono text-primary/50 text-[10px] mt-1.5 flex-shrink-0">›</span>
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
