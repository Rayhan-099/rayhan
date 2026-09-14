"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { projects } from "@/content/projects";

function ProjectMeta({ project }: { project: typeof projects[0] }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map(tech => (
          <span key={tech} className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary px-3 py-1 bg-[#0b0f19] border border-white/5 rounded-sm">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-6 mt-4">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors">
            <span>Launch Sequence</span>
            <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-secondary-foreground hover:text-foreground transition-colors">
            <span>Source Code</span>
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, total }: { project: typeof projects[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  // Calculate the scale and opacity of THIS card as the NEXT card scrolls over it.
  // Wait, native sticky handles the pinning, we just fade out slightly when scrolling past.
  const { scrollYProgress: exitProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(exitProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(exitProgress, [0, 1], [1, 0.4]);
  const yOffset = useTransform(exitProgress, [0, 1], ["0%", "5%"]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={!reduceMotion && index < total - 1 ? { scale, opacity, y: yOffset } : {}}
      className="sticky top-0 w-full min-h-[100dvh] flex items-center justify-center bg-background py-24"
    >
      <div className="absolute inset-0 bg-background mix-blend-multiply" />
      {/* Subtle top border for visual separation when stacked */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
          
          {/* Visual Container */}
          <div className={`lg:col-span-7 relative ${isEven ? 'lg:col-start-1' : 'lg:col-start-6'}`}>
            <motion.div 
              initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] overflow-hidden group rounded-md border border-white/5"
            >
              <Image 
                src={`/media/projects/${project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}.png`}
                alt={project.title} 
                fill 
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
                sizes="(max-width: 1024px) 100vw, 60vw"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/seed/${project.title.toLowerCase().replace(/\s+/g, '')}/1600/1000`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent pointer-events-none" />
              {/* Corner ticks */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50" />
            </motion.div>
          </div>

          {/* Typography & Metadata */}
          <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? 'lg:col-start-8' : 'lg:col-start-1'}`}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-xs text-primary/70 uppercase tracking-widest">
                  {String(index + 1).padStart(2, '0')} // {project.technologies[0]}
                </span>
                <span className="h-px bg-white/10 flex-1" />
              </div>

              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1] tracking-tight mb-6">
                {project.title}
              </h3>
              
              <div className="relative pl-6 border-l border-primary/20 mb-8">
                <p className="font-sans text-base lg:text-lg text-secondary-foreground font-light leading-relaxed">
                  {project.description}
                </p>
                {project.details && project.details.length > 0 && (
                  <p className="font-sans text-sm text-muted font-light leading-relaxed mt-4">
                    {project.details[0]}
                  </p>
                )}
              </div>

              <ProjectMeta project={project} />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-10 bg-background">
      {/* Introduction */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl text-foreground tracking-tighter"
        >
          Selected Architecture
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans text-lg text-secondary-foreground mt-6 max-w-xl"
        >
          High-performance systems and interactive experiences engineered for scale and aesthetic precision.
        </motion.p>
      </div>

      {/* Sticky Stack Container */}
      <div className="relative pb-24">
        {projects.map((project, idx) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            index={idx} 
            total={projects.length} 
          />
        ))}
      </div>
    </section>
  );
}
