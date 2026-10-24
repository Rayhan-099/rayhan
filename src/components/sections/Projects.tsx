"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { Project } from "@/types";
import { ProjectModal } from "../ui/ProjectModal";
import {
  IconExternalLink,
  IconGitHub,
  IconCrosshair,
  IconArrowRight,
} from "../ui/CustomIcons";

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const projectCards = gsap.utils.toArray<HTMLElement>(".project-stage-item");
      projectCards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember mb-2">
            02 / Flagship Systems and Software Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-porcelain">
            Selected Work.
          </h2>
        </div>
        <p className="text-xs font-mono text-steel max-w-sm">
          Empirical engineering across computer vision, remote sensing pipelines, and high-performance full-stack platforms.
        </p>
      </div>

      {/* Flagship Showcases with Distinctive Architectural Compositions */}
      <div className="space-y-24">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={project.id}
              className="project-stage-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Media Stage: Distinctive Aspect Framing */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div
                  onClick={() => setActiveProject(project)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-gunmetal-border bg-eclipse-surface aspect-[16/10]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  {/* Atmospheric overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/90 via-eclipse-black/30 to-transparent" />

                  {/* Top-right context badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {project.contextLabel && (
                      <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-burgundy/90 text-porcelain border border-crimson/40 rounded">
                        {project.contextLabel}
                      </span>
                    )}
                    <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-eclipse-black/80 text-steel border border-gunmetal rounded">
                      {project.date}
                    </span>
                  </div>

                  {/* Bottom Telemetry Strip */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <IconCrosshair className="w-3.5 h-3.5 text-ember flex-shrink-0" />
                      <span className="truncate text-steel-light">{project.stats}</span>
                    </div>
                    <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider text-ember flex-shrink-0">
                      Click to Inspect
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Dossier Column */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-telemetry text-crimson block mb-1">
                    System 0{index + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-porcelain">
                    {project.title}
                  </h3>
                  <p className="text-sm text-steel mt-1">{project.subtitle}</p>
                </div>

                <p className="text-sm md:text-base text-porcelain/80 leading-relaxed">
                  {project.description}
                </p>

                {/* Key architectural highlights */}
                <ul className="space-y-2 text-xs text-steel">
                  {project.details.slice(0, 2).map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-mono text-crimson select-none">›</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-gunmetal/60">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-porcelain hover:text-ember transition-colors"
                  >
                    <span>Inspect Specs</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-steel hover:text-porcelain transition-colors"
                    >
                      <span>Live Site</span>
                      <IconExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-steel hover:text-porcelain transition-colors"
                    >
                      <IconGitHub className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Deep Inspection Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
