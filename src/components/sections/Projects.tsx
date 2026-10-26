"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { Project } from "@/types";
import { ProjectModal } from "../ui/ProjectModal";
import { WorksWheel3D } from "../ui/WorksWheel3D";
import FlexCarousel, { FlexCarouselItem } from "../ui/FlexCarousel";
import { ProjectAccordion } from "../ui/ProjectAccordion";
import { MagneticButton } from "../ui/MagneticButton";
import { Tilt3DCard } from "../ui/Tilt3DCard";
import {
  IconExternalLink,
  IconArrowRight,
  IconCrosshair,
} from "../ui/CustomIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeLumineLayer, setActiveLumineLayer] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);

  const lumine = projects.find((p) => p.id === "lumine")!;
  const wheelProjects = projects.filter((p) => p.id !== "lumine");

  const currentLumineView = lumine.gallery?.[activeLumineLayer] || {
    id: "overview",
    label: "01 Overview",
    image: lumine.image,
    caption: "31 CLASSIFIED DERMATOLOGICAL CLASSES",
    telemetry: "MODEL: DINOv2 (VISION TRANSFORMER)",
  };

  const carouselItems: FlexCarouselItem[] = projects.map((p) => ({
    src: p.image,
    alt: p.title,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    link: p.links.live || p.links.github,
  }));

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const items = gsap.utils.toArray<HTMLElement>(".project-fade-in");
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      });

      // ScrollTrigger Clip-Mask Frame Expansion (ECHO Work.tsx architecture)
      const lumineFrame = containerRef.current?.querySelector<HTMLElement>(".lumine-clip-frame");
      const lumineInner = containerRef.current?.querySelector<HTMLElement>(".lumine-inner-image");

      if (lumineFrame && lumineInner) {
        gsap.fromTo(
          lumineFrame,
          {
            clipPath: "inset(7% 3.5% 7% 3.5% round 24px)",
            scale: 0.94,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lumineFrame,
              start: "top 85%",
              end: "top 25%",
              scrub: 1.6,
            },
          }
        );

        gsap.fromTo(
          lumineInner,
          {
            scale: 1.15,
          },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lumineFrame,
              start: "top 85%",
              end: "top 25%",
              scrub: 1.6,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-14 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/80 gap-6">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-ember font-bold block mb-2">
            ENGINEERED SYSTEMS
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-porcelain">
            Flagship Systems
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-xl leading-relaxed">
          Deep architectural investigations spanning self-supervised computer vision, multimodal remote sensing, and low-latency client-side Edge AI.
        </p>
      </div>

      <div className="space-y-24">
        {/* ============================================================
            1. FEATURED SYSTEMS: FLEXCAROUSEL (WebGL Liquid Displacement)
            ============================================================ */}
        <div className="project-fade-in space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
              <span className="font-heading text-xs uppercase tracking-wider text-ember font-bold">
                INTERACTIVE GALLERY
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-gunmetal bg-eclipse-surface overflow-hidden shadow-2xl relative w-full h-[540px] md:h-[620px]">
            <FlexCarousel
              items={carouselItems}
              preset="liquid"
              intro="rise"
              cardHeight={0.62}
              gap={16}
              squeeze={0.2}
              focusOnClick={true}
              captions={true}
              captureWheel={false}
              onSelect={(index) => {
                const selected = projects[index];
                if (selected) setActiveProject(selected);
              }}
            />
          </div>
        </div>

        {/* ============================================================
            2. DEEP ARCHITECTURAL BREAKDOWN: LUMINE AI (Flagship System)
            ============================================================ */}
        <article className="project-fade-in space-y-8 pt-6 border-t border-gunmetal/80">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-heading text-xs uppercase tracking-wider text-ember font-bold">
                  FLAGSHIP ARCHITECTURE
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                  {lumine.date}
                </span>
              </div>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-porcelain">
                {lumine.title}
              </h3>
              <p className="text-sm font-heading font-medium text-steel-light mt-1">
                {lumine.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton strength={0.3} radius={80}>
                <button
                  onClick={() => setActiveProject(lumine)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Inspect Full Dossier</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              </MagneticButton>
              {lumine.links.live && (
                <MagneticButton strength={0.3} radius={80}>
                  <a
                    href={lumine.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gunmetal hover:bg-gunmetal-border text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Live Deployment</span>
                    <IconExternalLink className="w-3.5 h-3.5 text-steel" />
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Interactive Architectural Layer Switcher (analog-editorial dissection & ECHO view switching) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <IconCrosshair className="w-3.5 h-3.5 text-ember" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-steel-light font-medium">
                ARCHITECTURAL LAYER DISSECTION:
              </span>
            </div>
            <div
              className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-eclipse-surface border border-gunmetal"
              role="tablist"
              aria-label="Lumine AI Architectural Perspectives"
            >
              {lumine.gallery?.map((view, idx) => (
                <button
                  key={view.id}
                  role="tab"
                  id={`lumine-tab-${view.id}`}
                  aria-selected={activeLumineLayer === idx}
                  aria-controls="lumine-media-canvas"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLumineLayer(idx);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      setActiveLumineLayer((prev) => (prev + 1) % (lumine.gallery?.length || 1));
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActiveLumineLayer((prev) => (prev - 1 + (lumine.gallery?.length || 1)) % (lumine.gallery?.length || 1));
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson ${
                    activeLumineLayer === idx
                      ? "bg-crimson text-porcelain font-bold shadow-md border border-crimson/50"
                      : "text-steel-light hover:text-porcelain hover:bg-gunmetal/60"
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Cinematic Media Canvas with ScrollTrigger Clip-Mask Expansion (ECHO Work.tsx) */}
          <Tilt3DCard maxTilt={4} perspective={1200} glareOpacity={0.12} className="w-full">
            <div
              id="lumine-media-canvas"
              onClick={() => setActiveProject(lumine)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveProject(lumine);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Inspect Lumine AI architectural dossier"
              className="lumine-clip-frame lumine-card group relative cursor-pointer w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] rounded-xl overflow-hidden border border-gunmetal bg-eclipse-surface shadow-2xl transition-all duration-500 hover:border-ember/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember will-change-[clip-path,transform]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="lumine-inner-image absolute inset-0 w-full h-full will-change-transform">
                {lumine.gallery?.map((view, idx) => (
                  <div
                    key={view.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeLumineLayer === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={view.image}
                      alt={view.caption || lumine.title}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1200px"
                      className="object-cover object-top grayscale contrast-115 group-hover:scale-[1.02] group-hover:grayscale-0 transition-transform duration-700 ease-out"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/95 via-eclipse-black/20 to-eclipse-black/60 pointer-events-none z-20" />

              {/* Diagnostic Telemetry Overlay with 3D Z-Depth Floating Parallax */}
              <div
                className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain/90 pointer-events-none z-30"
                style={{ transform: "translateZ(26px)" }}
              >
                <div className="flex items-center gap-2 bg-eclipse-black/90 px-3 py-1.5 rounded-lg border border-gunmetal backdrop-blur-sm shadow-lg">
                  <IconCrosshair className="w-3.5 h-3.5 text-ember animate-pulse" />
                  <span>{currentLumineView.telemetry || "MODEL: DINOv2 (VISION TRANSFORMER)"}</span>
                </div>
                <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-eclipse-black/90 border border-gunmetal text-steel-light backdrop-blur-sm shadow-lg">
                  {currentLumineView.caption}
                </span>
              </div>

              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain pointer-events-none z-30"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="bg-eclipse-black/90 px-3 py-1.5 rounded-lg border border-gunmetal text-steel-light backdrop-blur-sm shadow-lg">
                  {lumine.stats}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-ember uppercase tracking-wider text-[11px] font-heading font-bold bg-eclipse-black/85 px-3 py-1.5 rounded-lg border border-gunmetal/80">
                  <span>View Dossier</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          </Tilt3DCard>

          {/* Streamlined Architectural Narrative & Verified Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm md:text-base text-porcelain/90 leading-relaxed font-sans">
                {lumine.description}
              </p>

              {/* Direct Architectural Highlights Grounded in Actual Repository */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-eclipse-surface border border-gunmetal">
                  <span className="text-[11px] font-mono text-ember font-bold block mb-1">
                    VISION TRANSFORMER
                  </span>
                  <h4 className="font-heading text-xs font-bold text-porcelain uppercase">
                    Meta DINOv2 ViT
                  </h4>
                  <p className="text-[11px] font-sans text-steel-light mt-1">
                    31 dermatological classes with Top-3 probability vectors.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-eclipse-surface border border-gunmetal">
                  <span className="text-[11px] font-mono text-ember font-bold block mb-1">
                    BACKEND ENGINE
                  </span>
                  <h4 className="font-heading text-xs font-bold text-porcelain uppercase">
                    FastAPI & Postgres
                  </h4>
                  <p className="text-[11px] font-sans text-steel-light mt-1">
                    Asynchronous inference, rate limiting, and 40+ Pytest suites.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-eclipse-surface border border-gunmetal">
                  <span className="text-[11px] font-mono text-ember font-bold block mb-1">
                    LONGITUDINAL VAULT
                  </span>
                  <h4 className="font-heading text-xs font-bold text-porcelain uppercase">
                    Gemini Explanations
                  </h4>
                  <p className="text-[11px] font-sans text-steel-light mt-1">
                    Longitudinal scan timeline and contextual clinical insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Stack Tags and Deliverables */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-heading uppercase tracking-wider text-ember font-bold block">
                ENGINEERED STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {lumine.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono bg-eclipse-elevated text-steel-light border border-gunmetal rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <span className="text-xs font-heading uppercase tracking-wider text-ember font-bold block mb-2">
                  VERIFIED DELIVERABLES
                </span>
                <ul className="space-y-1.5 text-xs font-sans text-steel-light">
                  {lumine.deliverables?.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-ember font-mono">&rsaquo;</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* ============================================================
            CINEMATIC LUMINE-TO-SECONDARY ARCHITECTURAL BRIDGE
            (ECHO Design Studio Horizon Threshold & Analog Editorial Rhythm)
            ============================================================ */}
        <div className="relative py-6 my-4 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent w-full absolute top-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="relative z-10 px-5 py-2 rounded-full bg-eclipse-surface border border-gunmetal text-[11px] font-mono text-steel uppercase tracking-wider flex items-center gap-2.5 shadow-lg backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            <span className="font-medium text-steel-light">
              SECONDARY ARCHITECTURES &bull; 04 PRODUCTION SYSTEMS
            </span>
          </div>
        </div>

        {/* ============================================================
            3. EXPANDABLE SYSTEMS MATRIX: EXPAND-ON-HOVER (ECHO skiper52)
            ============================================================ */}
        <div className="project-fade-in pt-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-ember" />
              <span className="font-heading text-xs uppercase tracking-wider text-ember font-bold">
                EXPANDABLE ARCHITECTURES
              </span>
            </div>
            <span className="font-mono text-xs text-steel-light">
              HOVER OR FOCUS CARDS TO EXPAND SYSTEM DETAILS
            </span>
          </div>

          <ProjectAccordion
            projects={wheelProjects}
            onSelectProject={setActiveProject}
          />
        </div>

        {/* ============================================================
            4. ECHO WORKSWHEEL 3D PROJECTION REEL
            ============================================================ */}
        <div className="project-fade-in pt-8 border-t border-gunmetal/80">
          <WorksWheel3D
            projects={wheelProjects}
            onSelectProject={setActiveProject}
          />
        </div>
      </div>

      {/* Project Modal Dossier Viewer */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
