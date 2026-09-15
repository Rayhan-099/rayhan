"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { education } from "@/content/education";
import { useSectionTracker } from "@/hooks/useSectionTracker";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionTracker(sectionRef, "education");
  
  return (
    <section ref={sectionRef} id="education" className="py-24 md:py-32 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <motion.div 
          className="mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            variants={fadeUp} custom={0}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.85] tracking-tight italic"
          >
            Education.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {education.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index * 0.1}
              className="flex flex-col gap-3 group border-t border-accent/10 pt-8 hover:border-accent/30 transition-colors"
            >
              <span className="text-foreground-secondary font-sans text-[11px] tracking-[0.2em] uppercase">
                {item.dates}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-foreground transition-colors duration-500 leading-tight">
                {item.institution}
              </h3>
              <p className="text-foreground-secondary font-sans text-sm font-light leading-relaxed">
                {item.degree}
              </p>
              <span className="text-foreground-secondary/50 font-sans text-[11px] uppercase tracking-widest mt-2">
                {item.location}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
