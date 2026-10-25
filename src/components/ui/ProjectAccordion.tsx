"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconArrowRight, IconExternalLink, IconGitHub } from "./CustomIcons";

interface ProjectAccordionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

/**
 * ProjectAccordion — ExpandOnHover Interactive Systems Accordion
 * Reverse-engineered from ECHO-Design-Studio skiper52.tsx.
 * Provides fluid flex ratio expansion (flex-[3.5] active vs flex-1 inactive)
 * with instant tactile responsiveness, revealing architectural specifications,
 * deliverables, and technologies for secondary flagship systems.
 */
export function ProjectAccordion({ projects, onSelectProject }: ProjectAccordionProps) {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || "");
  const reducedMotion = useReducedMotion();

  return (
    <div className="project-accordion w-full space-y-4">
      {/* Desktop & Tablet Fluid Flex Accordion */}
      <div className="hidden lg:flex gap-4 min-h-[460px] w-full items-stretch">
        {projects.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              onPointerEnter={() => !reducedMotion && setActiveId(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(item.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={`System: ${item.title}`}
              className={`accordion-item relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between ${
                isActive
                  ? "flex-[3.5] border-ember/60 bg-eclipse-surface shadow-2xl p-7"
                  : "flex-1 border-gunmetal bg-eclipse-elevated/70 hover:border-gunmetal-border p-5"
              }`}
            >
              {/* Background Atmospheric Media Gradient */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  isActive ? "opacity-30" : "opacity-15"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="40vw"
                  className="object-cover object-top grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black via-eclipse-black/85 to-eclipse-black/40" />
              </div>

              {/* Card Header Top */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-gunmetal/60">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider font-bold transition-colors duration-300 ${
                      isActive ? "text-ember" : "text-steel"
                    }`}
                  >
                    {item.contextLabel || item.date}
                  </span>
                  {item.id === "current-capital" && isActive && (
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                      FINANCIAL COMMAND
                    </span>
                  )}
                </div>

                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-eclipse-black/80 border border-gunmetal text-steel-light">
                  0{index + 1}
                </span>
              </div>

              {/* Inactive Vertical / Condensed Presentation */}
              {!isActive && (
                <div className="relative z-10 my-auto py-6">
                  <h4 className="font-heading text-lg xl:text-xl uppercase font-bold text-porcelain tracking-tight line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs font-sans text-steel line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              )}

              {/* Active Expanded Content Presentation */}
              {isActive && (
                <div className="relative z-10 flex-1 flex flex-col justify-between pt-4">
                  <div className="space-y-2">
                    <h4 className="font-display text-2xl xl:text-3xl font-extrabold uppercase text-porcelain tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs font-heading font-medium text-ember uppercase tracking-wider">
                      {item.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm font-sans text-steel-light leading-relaxed max-w-xl pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Architecture Deliverables */}
                  <div className="space-y-1.5 py-3 border-t border-gunmetal/60 my-2">
                    <span className="text-[10px] font-mono text-steel uppercase tracking-wider block">
                      Architecture Specifications
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.deliverables?.slice(0, 2).map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-1.5 text-xs font-sans text-porcelain/90"
                        >
                          <span className="text-ember font-mono select-none">&rsaquo;</span>
                          <span className="line-clamp-1">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Bar: Tech Stack & Actions */}
                  <div className="pt-3 border-t border-gunmetal/60 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 max-w-sm">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono bg-eclipse-elevated text-steel-light border border-gunmetal rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(item);
                        }}
                        className="px-4 py-2 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Inspect</span>
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {item.links.github && (
                        <a
                          href={item.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${item.title} source on GitHub`}
                          className="p-2 rounded-full bg-gunmetal hover:bg-gunmetal-border text-steel hover:text-porcelain transition-colors"
                        >
                          <IconGitHub className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {item.links.live && (
                        <a
                          href={item.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View ${item.title} live deployment`}
                          className="p-2 rounded-full bg-gunmetal hover:bg-gunmetal-border text-steel hover:text-porcelain transition-colors"
                        >
                          <IconExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile & Small Screen Responsive Stack */}
      <div className="lg:hidden space-y-4">
        {projects.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onSelectProject(item)}
            className="p-6 rounded-2xl bg-eclipse-surface border border-gunmetal hover:border-ember/50 transition-colors space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-gunmetal/60">
              <span className="font-mono text-xs text-ember uppercase tracking-wider font-bold">
                {item.contextLabel || item.date}
              </span>
              <span className="font-mono text-xs text-steel">0{index + 1}</span>
            </div>

            <div>
              <h4 className="font-heading text-xl font-bold uppercase text-porcelain">
                {item.title}
              </h4>
              <p className="text-xs text-ember font-medium mt-0.5">{item.subtitle}</p>
              <p className="text-xs font-sans text-steel-light mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-gunmetal/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-steel">{item.stats}</span>
              <span className="text-xs font-heading text-ember uppercase tracking-wider font-bold inline-flex items-center gap-1">
                <span>Dossier</span>
                <span>&rarr;</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
