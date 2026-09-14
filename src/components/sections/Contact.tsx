"use client";

import { motion } from "motion/react";
import { profile } from "@/content/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Contact() {
  return (
    <section 
      id="contact" 
      className="relative min-h-[100dvh] flex flex-col justify-between py-16 md:py-24 overflow-hidden z-10 bg-background"
    >
      {/* Abyssal environment background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e] via-[#0b0f19] to-[#07090e]" />
        {/* Cold luminescent glow from bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-primary/[0.03] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-1 flex flex-col justify-center relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
              Get in touch
            </span>
          </div>
          
          <motion.h2 
            variants={fadeUp} custom={0}
            className="font-serif text-[clamp(3.5rem,12vw,14rem)] text-foreground leading-[0.85] tracking-tight mb-12"
          >
            Contact.
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 mt-12"
        >
          <motion.a
            variants={fadeUp} custom={0.3}
            href={`mailto:${profile.email}`}
            className="group relative font-sans text-sm tracking-[0.2em] uppercase text-foreground hover:text-primary py-2 transition-colors"
          >
            <span className="relative z-10">Email</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </motion.a>
          
          {profile.social.github && (
            <motion.a
              variants={fadeUp} custom={0.4}
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-sans text-sm tracking-[0.2em] uppercase text-secondary-foreground hover:text-foreground py-2 transition-colors"
            >
              <span className="relative z-10">GitHub</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.a>
          )}
          
          {profile.social.linkedin && (
            <motion.a
              variants={fadeUp} custom={0.5}
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-sans text-sm tracking-[0.2em] uppercase text-secondary-foreground hover:text-foreground py-2 transition-colors"
            >
              <span className="relative z-10">LinkedIn</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.a>
          )}

          <motion.a
            variants={fadeUp} custom={0.6}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans text-sm tracking-[0.2em] uppercase text-secondary-foreground hover:text-foreground py-2 transition-colors"
          >
            <span className="relative z-10">Resume</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-muted font-mono uppercase tracking-[0.2em] gap-4 relative z-10"
      >
        <span>© RAYHAN KHAN</span>
        <div className="flex gap-8">
          <a href="/resume.pdf" target="_blank" className="hover:text-foreground transition-colors">Resume</a>
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </motion.div>
    </section>
  );
}
