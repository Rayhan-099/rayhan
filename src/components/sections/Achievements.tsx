"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { achievements } from "@/content/achievements";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={sectionRef} id="achievements" className="py-24 md:py-32 relative z-10">
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
            Achievements.
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-16">
          {achievements.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index * 0.15}
              className="flex flex-col lg:flex-row gap-8 lg:gap-16 border-t border-accent/10 pt-8"
            >
              <div className="w-full lg:w-1/3 flex flex-col gap-2">
                <span className="text-foreground-secondary font-sans text-[11px] tracking-[0.2em] uppercase">
                  {item.role}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                  {item.title}
                </h3>
              </div>
              <div className="w-full lg:w-2/3">
                <ul className="flex flex-col gap-4 text-foreground-secondary font-sans font-light text-[15px] leading-relaxed max-w-xl">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-primary/50 mt-2.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
