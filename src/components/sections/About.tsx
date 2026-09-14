"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/content/profile";

const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} id="about" className="relative z-10 py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Magazine Spread: asymmetric portrait + editorial text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Large Portrait with clip-path reveal */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={clipReveal}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <motion.div style={{ y: portraitY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="/rayhan-headshot.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </motion.div>
              {/* Cinematic treatment — subtle desaturation on rest, full color on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-surface/20 mix-blend-color hover:opacity-0 transition-opacity duration-1000" />
            </div>
            {/* Thin caption line */}
            <div className="mt-4 border-t border-accent/10 pt-3 flex justify-between">
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-foreground-secondary">Rayhan Khan</span>
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-muted">Engineer</span>
            </div>
          </motion.div>

          {/* RIGHT: Statement & Biography */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pt-16 lg:pl-8">
            
            <motion.h2 
              className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1] tracking-tight mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              custom={0}
            >
              About.
            </motion.h2>

            <div className="flex flex-col gap-6 max-w-2xl">
              <motion.p 
                className="text-foreground font-sans text-lg md:text-xl leading-relaxed whitespace-pre-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                custom={1}
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
