"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface InterludeProps {
  text?: string;
  subtitle?: string;
}

export function Interlude({ text, subtitle }: InterludeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return (
    <section 
      ref={ref} 
      className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden pointer-events-none z-10"
    >
       {text && (
         <motion.div style={{ y, opacity }} className="relative z-20 text-center px-6">
           {subtitle && (
             <span className="font-sans text-xs uppercase tracking-[0.4em] text-accent block mb-8">
               {subtitle}
             </span>
           )}
           <h2 className="font-serif text-[clamp(3rem,6vw,6rem)] text-foreground/90 leading-tight whitespace-pre-line mix-blend-screen max-w-5xl mx-auto">
             {text}
           </h2>
         </motion.div>
       )}
    </section>
  );
}
