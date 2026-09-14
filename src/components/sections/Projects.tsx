"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { projects } from "@/content/projects";

const imageReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function ProjectMeta({ project, index, total }: { project: typeof projects[0]; index: number; total: number }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#8DEBFF]/60">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map(tech => (
          <span key={tech} className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#778294] px-2.5 py-1 border border-[#8DEBFF]/10">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-6 mt-3">
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#F0EEE7] hover:text-[#8DEBFF] transition-colors border-b border-[#8DEBFF]/20 hover:border-[#8DEBFF] pb-0.5">
          Live ↗
        </a>
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#778294] hover:text-[#F0EEE7] transition-colors border-b border-[#8DEBFF]/10 hover:border-[#F0EEE7] pb-0.5">
          Source ↗
        </a>
      </div>
    </div>
  );
}

export function Projects() {
  const total = projects.length;
  const lumine = projects[0];
  const currentCapital = projects[1];
  const healthAssistant = projects[2];
  const handTracking = projects[3];

  return (
    <section id="projects" className="relative z-10 py-24 md:py-40">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* ═══════════════════════════════════════════════════════════
            PROJECT 01: LUMINE — Full-width cinematic hero
           ═══════════════════════════════════════════════════════════ */}
        {lumine && (
          <motion.div 
            className="mb-40 md:mb-56"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Giant image — 90vw+ */}
            <motion.div 
              variants={imageReveal}
              className="relative w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)] -ml-6 md:-ml-12 lg:-ml-20 aspect-[16/9] overflow-hidden group"
            >
              <Image 
                src="/media/projects/lumine.png" 
                alt={lumine.title} 
                fill 
                className="object-cover object-top transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/80 to-[#080A0F]/20" />
              
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                <motion.h3 
                  variants={fadeUp} custom={0.2}
                  className="font-display text-5xl md:text-7xl lg:text-9xl text-[#F0EEE7] leading-[0.85] tracking-tight"
                >
                  Lumine
                </motion.h3>
                <motion.span 
                  variants={fadeUp} custom={0.35}
                  className="font-sans text-lg md:text-2xl text-[#8DEBFF] italic block mt-3"
                >
                  AI-Powered Skin Intelligence
                </motion.span>
              </div>
            </motion.div>

            {/* Description row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 md:mt-16">
              <motion.p 
                variants={fadeUp} custom={0.4}
                className="font-sans text-base md:text-lg text-[#778294] font-light leading-relaxed max-w-xl"
              >
                {lumine.description}
              </motion.p>
              <motion.div variants={fadeUp} custom={0.5} className="md:flex md:justify-end">
                <ProjectMeta project={lumine} index={0} total={total} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            PROJECT 02: CURRENT CAPITAL — Asymmetric 50/50 split
           ═══════════════════════════════════════════════════════════ */}
        {currentCapital && (
          <motion.div 
            className="mb-40 md:mb-56 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Text side */}
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <motion.h3 
                variants={fadeUp} custom={0}
                className="font-display text-5xl md:text-7xl text-[#F0EEE7] leading-[0.9] tracking-tight"
              >
                Current <br/>
                <span className="text-[#778294]">Capital</span>
              </motion.h3>
              <motion.span variants={fadeUp} custom={0.1} className="font-sans text-lg text-[#8DEBFF] italic">
                Finance Manager
              </motion.span>
              <motion.p 
                variants={fadeUp} custom={0.2}
                className="font-sans text-base text-[#778294] font-light leading-relaxed max-w-md"
              >
                {currentCapital.description}
              </motion.p>
              <motion.div variants={fadeUp} custom={0.3}>
                <ProjectMeta project={currentCapital} index={1} total={total} />
              </motion.div>
            </div>

            {/* Image side — square crop */}
            <motion.div 
              variants={imageReveal}
              className="order-1 lg:order-2 relative aspect-square overflow-hidden group"
            >
              <Image 
                src="/media/projects/current-capital.png" 
                alt={currentCapital.title} 
                fill 
                className="object-cover object-left-top transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            PROJECT 03: HEALTH ASSISTANT — Reverse split, vertical image
           ═══════════════════════════════════════════════════════════ */}
        {healthAssistant && (
          <motion.div 
            className="mb-40 md:mb-56 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Tall editorial image */}
            <motion.div 
              variants={imageReveal}
              className="lg:col-span-7 relative aspect-[3/4] overflow-hidden group"
            >
              <Image 
                src="/media/projects/health-assistant.png" 
                alt={healthAssistant.title} 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/40 to-transparent" />
            </motion.div>

            {/* Text — offset down for asymmetry */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-32">
              <motion.h3 
                variants={fadeUp} custom={0}
                className="font-display text-4xl md:text-6xl text-[#F0EEE7] leading-[0.95] tracking-tight"
              >
                Health <br/>
                <span className="text-[#778294]">Assistant</span>
              </motion.h3>
              <motion.p 
                variants={fadeUp} custom={0.15}
                className="font-sans text-base text-[#778294] font-light leading-relaxed border-l-2 border-[#8DEBFF]/10 pl-5"
              >
                {healthAssistant.description}
              </motion.p>
              <motion.div variants={fadeUp} custom={0.25}>
                <ProjectMeta project={healthAssistant} index={2} total={total} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            PROJECT 04: HAND TRACKING — Cinematic ultra-wide
           ═══════════════════════════════════════════════════════════ */}
        {handTracking && (
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} custom={0} className="text-center mb-10 md:mb-16">
              <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#8DEBFF]/60 block mb-4">04 / {String(total).padStart(2, "0")}</span>
              <h3 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#F0EEE7] tracking-tight">
                Real-Time Hand <br className="hidden md:block" />
                <span className="text-[#778294]">Tracking Visualizer</span>
              </h3>
            </motion.div>
            
            {/* Ultra-wide image */}
            <motion.div 
              variants={imageReveal}
              className="relative w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] lg:w-[calc(100%+10rem)] -ml-6 md:-ml-12 lg:-ml-20 aspect-[21/9] overflow-hidden group"
            >
              <Image 
                src="/media/projects/hand-tracking.png" 
                alt={handTracking.title} 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/70 to-[#080A0F]/10" />
            </motion.div>

            {/* Description */}
            <div className="mt-10 md:mt-16 max-w-2xl text-center flex flex-col items-center gap-6">
              <motion.p variants={fadeUp} custom={0.2} className="font-sans text-base md:text-lg text-[#778294] font-light leading-relaxed">
                {handTracking.description} {handTracking.details[0]}
              </motion.p>
              <motion.div variants={fadeUp} custom={0.3} className="flex gap-6">
                <a href={handTracking.links.live} target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#F0EEE7] hover:text-[#8DEBFF] transition-colors border-b border-[#8DEBFF]/20 hover:border-[#8DEBFF] pb-0.5">
                  Live Demo ↗
                </a>
                <a href={handTracking.links.github} target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#778294] hover:text-[#F0EEE7] transition-colors border-b border-[#8DEBFF]/10 hover:border-[#F0EEE7] pb-0.5">
                  Source ↗
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
