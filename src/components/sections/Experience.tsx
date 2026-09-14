"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/experience";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="experience" className="py-32 md:py-48 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section header */}
        <motion.div 
          className="mb-24 md:mb-40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            variants={fadeUp} custom={0}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-[0.85] tracking-tight"
          >
            Experience.
          </motion.h2>
        </motion.div>

        {/* Chronology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Main timeline */}
          <div className="lg:col-span-12 flex flex-col gap-32 md:gap-40">
            {experience.map((item, index) => {
              const year = item.date.match(/\d{4}/)?.[0] || "";
              return (
                <motion.div 
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative"
                >
                  {/* Giant background year */}
                  <div className="absolute -top-8 md:-top-16 -left-2 md:-left-6 select-none pointer-events-none z-0">
                    <span className="font-display text-[10rem] md:text-[16rem] lg:text-[20rem] leading-none text-foreground/[0.03] tracking-tighter">
                      {year}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div variants={fadeUp} custom={0} className="flex flex-col gap-2 mb-6">
                      <span className="text-accent font-sans text-[11px] tracking-[0.3em] uppercase">
                        {item.date}{item.location ? ` — ${item.location}` : ''}
                      </span>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground leading-[0.95]">
                        {item.company}
                      </h3>
                      <span className="text-foreground-secondary font-sans font-light text-lg tracking-wide mt-1">
                        {item.role}
                      </span>
                    </motion.div>
                    
                    <motion.div variants={fadeUp} custom={0.15} className="mt-6 border-l-2 border-accent/10 pl-6">
                      <ul className="flex flex-col gap-4 text-muted font-sans font-light text-[15px] leading-relaxed max-w-xl">
                        {item.description.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-accent/30 mt-2.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
