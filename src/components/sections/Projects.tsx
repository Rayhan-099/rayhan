"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { projects } from "@/content/projects";
import { useSectionTracker } from "@/hooks/useSectionTracker";
import { animate, utils } from "animejs";

function useProjectReveal(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Reset styles for animejs target
    const targets = el.querySelectorAll('.anim-reveal');
    targets.forEach(t => {
      (t as HTMLElement).style.opacity = '0';
      (t as HTMLElement).style.transform = 'translateY(30px)';
    });

    let hasRevealed = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;
          animate(el.querySelectorAll('.anim-reveal'), {
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1200,
            delay: utils.stagger(200, { start: delay }),
            ease: 'outQuart'
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, delay]);
}

function ProjectMeta({ project }: { project: typeof projects[0] }) {
  return (
    <div className="flex flex-col gap-4 w-full mt-6 pt-6 border-t border-line">
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map(tech => (
          <span key={tech} className="font-sans text-[11px] text-foreground-secondary px-3 py-1.5 bg-foreground/5 rounded-full border border-line">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-6 mt-2">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-foreground hover:text-primary transition-colors">
            <span className="border-b border-transparent group-hover:border-primary pb-0.5 transition-colors">Visit Site</span>
            <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-foreground-secondary hover:text-foreground transition-colors">
            <span className="border-b border-transparent group-hover:border-foreground pb-0.5 transition-colors">Source</span>
            <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  useSectionTracker(sectionRef, "projects");
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Project 1 (Lumine) Animations
  const p1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p1Scroll } = useScroll({ target: p1Ref, offset: ["start end", "end start"] });
  const p1ClipPath = useTransform(p1Scroll, [0.2, 0.5], ["inset(10% 20% 10% 20%)", "inset(0% 0% 0% 0%)"]);
  const p1Scale = useTransform(p1Scroll, [0.2, 0.8], [1.1, 1]);
  const p1ImgY = useTransform(p1Scroll, [0, 1], ["-10%", "10%"]);
  useProjectReveal(p1Ref, 500);

  // Project 2 (Current Capital) Animations
  const p2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p2Scroll } = useScroll({ target: p2Ref, offset: ["start end", "end start"] });
  const p2ImgY = useTransform(p2Scroll, [0, 1], ["-20%", "20%"]);
  useProjectReveal(p2Ref, 300);
  
  // Project 3 (Health Assistant) Animations
  const p3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p3Scroll } = useScroll({ target: p3Ref, offset: ["start end", "end start"] });
  const p3Grayscale = useTransform(p3Scroll, [0.3, 0.6], ["100%", "0%"]);
  const p3ImgY = useTransform(p3Scroll, [0, 1], ["-15%", "15%"]);
  useProjectReveal(p3Ref, 300);

  // Project 4 (Hand Tracking) Animations
  const p4Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p4Scroll } = useScroll({ target: p4Ref, offset: ["start end", "end start"] });
  const p4Scale = useTransform(p4Scroll, [0, 1], [0.95, 1.05]);
  const p4ImgY = useTransform(p4Scroll, [0, 1], ["-15%", "15%"]);
  useProjectReveal(p4Ref, 300);

  return (
    <motion.section 
      ref={sectionRef} 
      id="projects" 
      className="relative z-10 pt-24 md:pt-40 pb-24 border-t border-line overflow-hidden"
    >
      {/* Introduction */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl text-foreground tracking-tight italic"
        >
          Projects
        </motion.h2>
      </div>

      <div className="flex flex-col gap-32 md:gap-48 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Project 01: Lumine (Huge cinematic reveal) */}
        {projects[0] && (
          <div ref={p1Ref} className="relative w-full min-h-[90vh] flex flex-col justify-center">
            <motion.div 
              style={reduceMotion ? {} : { clipPath: p1ClipPath }} 
              className="absolute inset-0 w-full h-[70vh] md:h-[90vh] origin-center overflow-hidden z-0"
            >
              <motion.div style={reduceMotion ? {} : { scale: p1Scale, y: p1ImgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image src="/media/projects/lumine.png" unoptimized={true} alt="Lumine" fill className="object-cover" sizes="100vw" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/lumine/1600/1000'; }} />
                <div className="absolute inset-0 bg-background/20 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              </motion.div>
            </motion.div>
            
            <div className="relative z-10 w-full max-w-2xl mt-auto pt-64 md:pt-[50vh]">
              <h3 className="anim-reveal font-serif text-5xl md:text-7xl text-foreground italic mb-6">Lumine</h3>
              <p className="anim-reveal font-sans text-lg text-foreground leading-relaxed max-w-xl">{projects[0].description}</p>
              <div className="anim-reveal"><ProjectMeta project={projects[0]} /></div>
            </div>
          </div>
        )}

        {/* Project 02: Current Capital (Asymmetric vertical layout) */}
        {projects[1] && (
          <div ref={p2Ref} className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center relative w-full">
            <div className="md:col-span-5 flex flex-col order-2 md:order-1">
              <h3 className="anim-reveal font-serif text-4xl md:text-5xl text-foreground italic mb-6">Current Capital</h3>
              <p className="anim-reveal font-sans text-base md:text-lg text-foreground-secondary leading-relaxed mb-4">{projects[1].description}</p>
              <p className="anim-reveal font-sans text-sm text-foreground-secondary/70 leading-relaxed">{projects[1].details?.[0]}</p>
              <div className="anim-reveal"><ProjectMeta project={projects[1]} /></div>
            </div>
            <div className="md:col-span-7 relative order-1 md:order-2 h-[60vh] md:h-[80vh] w-full overflow-hidden">
              <motion.div style={reduceMotion ? {} : { y: p2ImgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image src="/media/projects/current-capital.png" unoptimized={true} alt="Current Capital" fill className="object-cover object-left-top" sizes="50vw" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/currentcapital/800/1200'; }} />
                <div className="absolute inset-0 bg-[#121013]/20 mix-blend-color pointer-events-none" />
              </motion.div>
            </div>
          </div>
        )}

        {/* Project 03: Health Assistant (Wide format with color grade transition) */}
        {projects[2] && (
          <div ref={p3Ref} className="flex flex-col relative w-full pt-12 md:pt-24">
            <div className="relative w-full aspect-[21/9] overflow-hidden mb-12">
              <motion.div 
                style={reduceMotion ? {} : { filter: `grayscale(${p3Grayscale})`, y: p3ImgY }}
                className="absolute inset-0 w-full h-[130%] -top-[15%]"
              >
                <Image src="/media/projects/health-assistant.png" unoptimized={true} alt="Health Assistant" fill className="object-cover" sizes="100vw" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/healthassistant/1600/900'; }} />
                <div className="absolute inset-0 bg-[#765D67]/20 mix-blend-color pointer-events-none" />
              </motion.div>
            </div>
            <div className="w-full max-w-3xl ml-auto border-t border-line pt-8 flex flex-col md:flex-row gap-8 justify-between">
              <div>
                <h3 className="anim-reveal font-serif text-4xl text-foreground italic mb-4">Health Assistant</h3>
                <p className="anim-reveal font-sans text-base text-foreground-secondary leading-relaxed max-w-xl">{projects[2].description}</p>
              </div>
              <div className="anim-reveal min-w-[200px]">
                <ProjectMeta project={projects[2]} />
              </div>
            </div>
          </div>
        )}

        {/* Project 04: Hand Tracking (Interactive square scale) */}
        {projects[3] && (
          <div ref={p4Ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative w-full pt-12 md:pt-24 pb-24">
            <div className="relative aspect-square w-full overflow-hidden">
              <motion.div style={reduceMotion ? {} : { scale: p4Scale, y: p4ImgY }} className="absolute inset-0 w-full h-[130%] -top-[15%] origin-center">
                <Image src="/media/projects/hand-tracking.png" unoptimized={true} alt="Hand Tracking" fill className="object-cover" sizes="50vw" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/handtracking/1000/1000'; }} />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#121013] via-transparent to-[#121013]/50 pointer-events-none" />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <h3 className="anim-reveal font-serif text-4xl text-foreground italic mb-6">Hand Tracking</h3>
              <p className="anim-reveal font-sans text-base md:text-lg text-foreground-secondary leading-relaxed mb-4">{projects[3].description}</p>
              <p className="anim-reveal font-sans text-sm text-foreground-secondary/70 leading-relaxed">{projects[3].details?.[0]}</p>
              <div className="anim-reveal"><ProjectMeta project={projects[3]} /></div>
            </div>
          </div>
        )}

      </div>
    </motion.section>
  );
}
