"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { skills } from "@/content/skills";

export function Skills() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const listY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.section 
      ref={sectionRef} 
      id="skills" 
      className="relative z-10 py-24 md:py-40 border-t border-border overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col items-start"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-foreground-secondary mb-4">
            Skills
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-foreground leading-[1] tracking-tight italic">
            Capabilities
          </h2>
        </motion.div>

        <motion.div 
          style={reduceMotion ? {} : { y: listY }}
          className="flex flex-col border-t border-border"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {skills.map((skillGroup, idx) => {
            const isHovered = hoveredIdx === idx;
            const isSomethingHovered = hoveredIdx !== null;
            const opacityClass = isSomethingHovered 
              ? isHovered ? "opacity-100" : "opacity-30" 
              : "opacity-100";
            
            return (
              <motion.div 
                key={skillGroup.category}
                className={`group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-border transition-all duration-500 cursor-default ${opacityClass}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Category Title */}
                <h3 className="font-serif text-3xl md:text-5xl text-foreground transition-transform duration-500 origin-left group-hover:translate-x-4 italic mb-6 md:mb-0 md:w-5/12">
                  {skillGroup.category}
                </h3>

                {/* Items List */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 md:w-7/12 md:justify-end transition-all duration-500 md:opacity-40 md:group-hover:opacity-100">
                  {skillGroup.items.map((item) => (
                    <span 
                      key={item} 
                      className="font-sans text-sm md:text-base text-foreground-secondary tracking-wide group-hover:text-foreground transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
