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
      className="relative min-h-[100dvh] flex flex-col justify-between py-16 md:py-24 overflow-hidden z-10"
    >
      {/* Cinematic Final Environment */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        
        {/* Soft horizon glow */}
        <motion.div 
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-[90vh] bg-gradient-to-t from-primary/30 via-primary/10 to-transparent mix-blend-overlay" 
        />
        
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="object-cover w-full h-full scale-[1.05] transform-gpu opacity-20 mix-blend-screen"
        >
          <source src="/media/atmosphere/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-1 flex flex-col justify-center relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-foreground-secondary">
              Get in touch
            </span>
          </div>
          
          <motion.h2 
            variants={fadeUp} custom={0}
            className="font-serif text-[clamp(4rem,12vw,15rem)] text-foreground leading-[0.85] tracking-tight mb-12 italic"
          >
            Connect.
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
            className="group relative font-sans text-sm tracking-[0.2em] uppercase text-foreground py-2 transition-colors"
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
              className="group relative font-sans text-sm tracking-[0.2em] uppercase text-foreground-secondary hover:text-foreground py-2 transition-colors"
            >
              <span className="relative z-10">GitHub</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.a>
          )}
          
          {profile.social.linkedin && (
            <motion.a
              variants={fadeUp} custom={0.5}
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative font-sans text-sm tracking-[0.2em] uppercase text-foreground-secondary hover:text-foreground py-2 transition-colors"
            >
              <span className="relative z-10">LinkedIn</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.a>
          )}

          <motion.a
            variants={fadeUp} custom={0.6}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans text-sm tracking-[0.2em] uppercase text-foreground-secondary hover:text-foreground py-2 transition-colors"
          >
            <span className="relative z-10">Resume</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-muted font-mono uppercase tracking-[0.2em] gap-8 relative z-10"
      >
        <span>© RAYHAN KHAN</span>
        <div className="flex gap-8 items-center flex-wrap justify-center">
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors text-primary">Email</a>
          <a href={profile.social.github} target="_blank" className="hover:text-foreground transition-colors">GitHub</a>
          <a href={profile.social.linkedin} target="_blank" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" className="hover:text-foreground transition-colors">Resume</a>
        </div>
      </motion.div>
    </section>
  );
}
