"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { projects } from "@/content/projects";

function ProjectMeta({ project }: { project: typeof projects[0] }) {
  return (
    <div className="flex flex-col gap-4 w-full mt-6 pt-6 border-t border-line">
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map(tech => (
          <span key={tech} className="font-sans text-[11px] text-text-secondary px-3 py-1.5 bg-surface/50 rounded-full border border-line">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-6 mt-2">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-text-primary hover:text-primary transition-colors">
            <span className="border-b border-transparent group-hover:border-primary pb-0.5 transition-colors">Visit Site</span>
            <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors">
            <span className="border-b border-transparent group-hover:border-text-primary pb-0.5 transition-colors">Source</span>
            <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full py-20 md:py-32 flex items-center justify-center border-t border-line/50 first:border-t-0"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
          
          {/* Visual Container */}
          <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm"
            >
              <motion.div style={!reduceMotion ? { y: imgY } : {}} className="absolute inset-0 h-[120%] -top-[10%]">
                <Image 
                  src={`/media/projects/${project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}.png`}
                  alt={project.title} 
                  fill 
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${project.title.toLowerCase().replace(/\s+/g, '')}/1600/1000`;
                  }}
                />
              </motion.div>
              {/* Soft overlay to match dusk atmosphere */}
              <div className="absolute inset-0 bg-[#d6a3b6]/5 mix-blend-color pointer-events-none" />
            </motion.div>
          </div>

          {/* Typography & Metadata */}
          <div className={`lg:col-span-5 flex flex-col ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-sans text-xs text-text-secondary uppercase tracking-widest">
                  No. {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px bg-line flex-1" />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1.1] mb-6 italic">
                {project.title}
              </h3>
              
              <div className="relative">
                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {project.description}
                </p>
                {project.details && project.details.length > 0 && (
                  <p className="font-sans text-sm text-text-muted mt-4">
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
    <section id="projects" className="relative z-10 bg-background pt-24 md:pt-40">
      {/* Introduction */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-6xl text-text-primary tracking-tight"
        >
          Selected Works
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans text-base md:text-lg text-text-secondary mt-6 max-w-lg"
        >
          High-performance systems and interactive experiences engineered for scale and aesthetic precision.
        </motion.p>
      </div>

      {/* Editorial Scroll Container */}
      <div className="relative pb-24 border-t border-line">
        {projects.map((project, idx) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            index={idx} 
          />
        ))}
      </div>
    </section>
  );
}
