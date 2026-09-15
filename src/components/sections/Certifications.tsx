"use client";

import { useState, useEffect, useRef } from "react";
import { certifications } from "@/content/certifications";
import { motion, AnimatePresence } from "motion/react";
import { useSectionTracker } from "@/hooks/useSectionTracker";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const featuredCerts = certifications.filter(c => c.featured);

export function Certifications() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useSectionTracker(sectionRef, "certifications");

  // Using overscroll-contain in the modal instead of body scroll locking
  // to prevent mobile scroll-jacking issues and respect the architectural UX.

  return (
    <>
      <section ref={sectionRef} id="certifications" className="py-32 md:py-48 relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32 gap-12 border-t border-accent/10 pt-16">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-tight">
                Certifications.
              </h2>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-6 max-w-sm text-left md:text-right">
              <span className="font-serif text-7xl text-muted/50 leading-none">{String(certifications.length).padStart(2, '0')}</span>
              <button 
                onClick={() => setIsArchiveOpen(true)}
                className="group flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-accent hover:text-foreground transition-colors pb-2 border-b border-accent/30 hover:border-[var(--text-primary)] mt-4"
              >
                View Archive
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>

          {/* Featured Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {featuredCerts.map((cert, index) => (
              <motion.div 
                key={cert.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index * 0.1}
                className="flex flex-col group h-full justify-between p-8 border border-accent/10 hover:border-accent/30 transition-colors bg-background/40 backdrop-blur-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-foreground-secondary font-sans text-[11px] tracking-widest uppercase">{cert.issuer}</span>
                    <span className="text-accent/60 font-sans text-[11px]">{cert.date}</span>
                  </div>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 group-hover:text-accent transition-colors duration-500 leading-tight">
                    {cert.name}
                  </h3>
                </div>
                
                <div className="flex justify-between items-end mt-16">
                  {cert.link !== "#" && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-4"
                    >
                      <span className="w-8 h-px bg-accent/20 group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
                      Verify
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Archive Overlay */}
      <AnimatePresence>
        {isArchiveOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl overflow-y-auto overscroll-contain touch-pan-y"
          >
            <div className="min-h-screen py-24 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
              
              <div className="flex justify-between items-end mb-16 border-b border-accent/10 pb-8 sticky top-0 bg-background/90 backdrop-blur-md pt-8 z-20">
                <div>
                  <span className="text-foreground-secondary font-sans text-[11px] uppercase tracking-[0.4em] block mb-4">
                    Complete Log
                  </span>
                  <h2 className="font-serif text-5xl md:text-6xl text-foreground">All Certifications</h2>
                </div>
                <button 
                  onClick={() => setIsArchiveOpen(false)}
                  className="text-[11px] font-sans uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors pb-2 border-b border-transparent hover:border-[var(--text-primary)]"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-4 py-4 border-b border-accent/10 text-foreground-secondary font-sans text-[11px] uppercase tracking-widest mb-4 hidden md:grid">
                  <div className="col-span-2">Issuer</div>
                  <div className="col-span-5">Credential</div>
                  <div className="col-span-3">ID Number</div>
                  <div className="col-span-1">Year</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>

                {certifications.map((cert) => (
                  <div key={cert.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b border-accent/5 hover:border-accent/20 hover:bg-accent/[0.02] transition-colors group px-4 -mx-4">
                    <div className="md:col-span-2">
                      <span className="text-foreground-secondary font-sans text-[11px] tracking-widest uppercase">{cert.issuer}</span>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">{cert.name}</h3>
                    </div>
                    <div className="md:col-span-3">
                      <span className="text-muted font-mono text-[11px] tracking-widest break-all select-all">{cert.id}</span>
                    </div>
                    <div className="md:col-span-1">
                      <span className="text-foreground-secondary font-sans text-xs">{cert.date}</span>
                    </div>
                    <div className="md:col-span-1 md:text-right mt-4 md:mt-0">
                      {cert.link !== "#" ? (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-sans tracking-widest uppercase text-accent hover:text-foreground transition-colors inline-block border-b border-transparent hover:border-[var(--text-primary)] pb-1"
                        >
                          Verify ↗
                        </a>
                      ) : (
                        <span className="text-[10px] font-sans tracking-widest uppercase text-muted">
                          Internal
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-24 text-center">
                <span className="text-foreground-secondary font-sans text-[11px] tracking-widest uppercase">End of Archive</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
