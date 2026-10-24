"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { Project } from "@/types";
import { ProjectModal } from "../ui/ProjectModal";
import {
  IconExternalLink,
  IconGitHub,
  IconCrosshair,
  IconArrowRight,
  IconTerminal,
  IconShield,
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

      const items = gsap.utils.toArray<HTMLElement>(".project-showcase-stage");
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
          },
          y: 45,
          opacity: 0,
          duration: 1.0,
          ease: "power2.out",
        });
      });
    },
    { scope: containerRef }
  );

  const lumine = projects.find((p) => p.id === "lumine")!;
  const satquery = projects.find((p) => p.id === "satquery-ai")!;
  const capital = projects.find((p) => p.id === "current-capital")!;
  const handTracking = projects.find((p) => p.id === "hand-tracking-visualizer")!;
  const health = projects.find((p) => p.id === "health-assistant")!;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember mb-2">
            02 / Flagship Systems & Applied Research
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Projects.
          </h2>
        </div>
        <p className="text-xs font-mono text-steel max-w-md">
          Deep architectural investigations spanning self-supervised computer vision, multimodal remote sensing, and low-latency client-side Edge AI.
        </p>
      </div>

      <div className="space-y-32">
        {/* ============================================================
            PROJECT 01: LUMINE AI (Full-Bleed Wide Diagnostic Canvas)
            ============================================================ */}
        <article className="project-showcase-stage space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                  FLAGSHIP 01
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                  {lumine.date}
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                {lumine.title}
              </h3>
              <p className="text-sm font-medium text-steel mt-1">{lumine.subtitle}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveProject(lumine)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-mono text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Inspect Dossier</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
              {lumine.links.live && (
                <a
                  href={lumine.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gunmetal hover:bg-gunmetal-border text-porcelain font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Live Site</span>
                  <IconExternalLink className="w-3 h-3 text-steel" />
                </a>
              )}
            </div>
          </div>

          {/* Full-bleed media canvas with interactive diagnostic crosshairs */}
          <div
            onClick={() => setActiveProject(lumine)}
            className="group relative cursor-pointer w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-gunmetal-border bg-eclipse-surface shadow-2xl"
          >
            <Image
              src={lumine.image}
              alt={lumine.title}
              fill
              sizes="100vw"
              className="object-cover object-top grayscale contrast-115 group-hover:scale-[1.02] group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/90 via-transparent to-eclipse-black/40" />

            {/* Diagnostic telemetry HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain/90">
              <div className="flex items-center gap-2 bg-eclipse-black/80 px-3 py-1.5 rounded border border-gunmetal">
                <IconCrosshair className="w-3.5 h-3.5 text-ember" />
                <span>MODEL: DINOv2 (VISION TRANSFORMER)</span>
              </div>
              <span className="hidden sm:inline-block px-3 py-1.5 rounded bg-eclipse-black/80 border border-gunmetal text-steel">
                31 CLASSIFIED DERMATOLOGICAL CLASSES
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain">
              <span className="bg-eclipse-black/85 px-3 py-1.5 rounded border border-gunmetal text-steel-light">
                {lumine.stats}
              </span>
              <span className="hidden sm:inline-block text-ember uppercase tracking-wider text-[11px] font-bold">
                Click to inspect full architecture →
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <p className="md:col-span-8 text-sm md:text-base text-porcelain/85 leading-relaxed">
              {lumine.description}
            </p>
            <div className="md:col-span-4 flex flex-wrap gap-1.5 justify-start md:justify-end items-start">
              {lumine.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* ============================================================
            PROJECT 02: SATQUERY AI (Geospatial Radar Telemetry Command Deck)
            ============================================================ */}
        <article className="project-showcase-stage grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 md:p-10 rounded-2xl bg-eclipse-surface border border-gunmetal">
          {/* Left: Custom Radar Telemetry Stage */}
          <div className="lg:col-span-6 relative aspect-square max-w-[420px] mx-auto w-full rounded-xl overflow-hidden bg-eclipse-black border border-gunmetal flex items-center justify-center">
            {/* Concentric radar rings */}
            <div className="absolute inset-8 rounded-full border border-gunmetal/80" />
            <div className="absolute inset-16 rounded-full border border-gunmetal/60" />
            <div className="absolute inset-28 rounded-full border border-gunmetal/40" />

            {/* Radar crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-gunmetal" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-gunmetal" />

            {/* Rotating radar sweep beam */}
            <div className="absolute inset-8 rounded-full pointer-events-none radar-sweep-beam">
              <div
                className="w-1/2 h-1/2 origin-bottom-right"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(255, 73, 61, 0.4) 0deg, rgba(165, 31, 48, 0.1) 40deg, transparent 60deg)",
                }}
              />
            </div>

            {/* Center Satellite Position Indicator */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-ember animate-ping" />
              <div className="w-2.5 h-2.5 rounded-full bg-crimson absolute" />
              <span className="font-mono text-[10px] tracking-widest text-porcelain mt-3 bg-eclipse-surface/90 px-2 py-0.5 rounded border border-gunmetal">
                SENTINEL-1 SAR (10m)
              </span>
            </div>

            {/* Live coordinates telemetry */}
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-steel">
              <div>NDVI / NDWI ENGINE</div>
              <div className="text-ember">POLARIZATION: VV + VH</div>
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-steel bg-burgundy/80 px-2 py-0.5 rounded border border-crimson/30">
              SIH 2026 SELECTED
            </div>
          </div>

          {/* Right: Technical Dossier */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold block mb-1">
                SYSTEM 02 / GEOSPATIAL INTELLIGENCE
              </span>
              <h3 className="text-3xl md:text-4xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                {satquery.title}
              </h3>
              <p className="text-sm font-medium text-steel mt-1">{satquery.subtitle}</p>
            </div>

            <p className="text-sm md:text-base text-porcelain/85 leading-relaxed">
              {satquery.description}
            </p>

            <ul className="space-y-2 text-xs font-mono text-steel-light">
              {satquery.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-crimson mt-0.5">›</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {satquery.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gunmetal">
              <button
                onClick={() => setActiveProject(satquery)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-porcelain hover:text-ember transition-colors"
              >
                <span>Inspect Architecture</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
              {satquery.links.live && (
                <a
                  href={satquery.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-steel hover:text-porcelain transition-colors"
                >
                  <span>Live Assistant</span>
                  <IconExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </article>

        {/* ============================================================
            PROJECT 03: CURRENT CAPITAL (Structured Financial Architecture)
            ============================================================ */}
        <article className="project-showcase-stage grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold block mb-1">
                SYSTEM 03 / FINANCIAL INFRASTRUCTURE
              </span>
              <h3 className="text-3xl md:text-4xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                {capital.title}
              </h3>
              <p className="text-sm font-medium text-steel mt-1">{capital.subtitle}</p>
            </div>

            <p className="text-sm md:text-base text-porcelain/85 leading-relaxed">
              {capital.description}
            </p>

            <div className="p-4 rounded-lg bg-eclipse-surface border border-gunmetal space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-porcelain font-semibold">
                <IconTerminal className="w-3.5 h-3.5 text-ember" />
                <span>GEMINI VISION AI RECEIPT INGESTION</span>
              </div>
              <p className="text-steel leading-relaxed">
                Automated parsing of vendor names, itemized lines, taxes, and dynamic envelope budgeting allocation in sub-100ms API response loops.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {capital.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gunmetal/60">
              <button
                onClick={() => setActiveProject(capital)}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-porcelain hover:text-ember transition-colors"
              >
                <span>Inspect Ledger Engine</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
              {capital.links.live && (
                <a
                  href={capital.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-steel hover:text-porcelain transition-colors"
                >
                  <span>Live App</span>
                  <IconExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div
            onClick={() => setActiveProject(capital)}
            className="lg:col-span-7 group relative cursor-pointer aspect-[16/10] rounded-2xl overflow-hidden border border-gunmetal-border bg-eclipse-surface shadow-2xl order-1 lg:order-2"
          >
            <Image
              src={capital.image}
              alt={capital.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top grayscale contrast-115 group-hover:scale-[1.02] group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/85 via-transparent to-eclipse-black/30" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-steel bg-eclipse-black/80 p-2.5 rounded border border-gunmetal">
              <span>{capital.stats}</span>
              <span className="text-ember font-semibold uppercase tracking-wider text-[11px]">
                {capital.date}
              </span>
            </div>
          </div>
        </article>

        {/* ============================================================
            PROJECT 04 & 05: SPLIT-GRID FOR HAND TRACKING & HEALTH ASSISTANT
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hand Tracking Visualizer */}
          <article className="project-showcase-stage p-6 md:p-8 rounded-2xl bg-eclipse-surface border border-gunmetal flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-crimson font-bold uppercase tracking-wider">
                  SYSTEM 04 / 3D GRAPHICS
                </span>
                <span className="px-2 py-0.5 rounded bg-gunmetal text-steel">
                  {handTracking.date}
                </span>
              </div>

              <h3 className="text-2xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                {handTracking.title}
              </h3>
              <p className="text-xs text-steel">{handTracking.subtitle}</p>

              <div
                onClick={() => setActiveProject(handTracking)}
                className="group relative cursor-pointer aspect-[16/10] rounded-xl overflow-hidden border border-gunmetal bg-eclipse-black"
              >
                <Image
                  src={handTracking.image}
                  alt={handTracking.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-steel bg-eclipse-black/80 px-2.5 py-1 rounded border border-gunmetal">
                  <span>60 FPS EDGE AI INFERENCE</span>
                  <span className="text-ember">21 LANDMARKS</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-porcelain/85 leading-relaxed">
                {handTracking.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gunmetal flex items-center justify-between">
              <button
                onClick={() => setActiveProject(handTracking)}
                className="text-xs font-mono uppercase tracking-wider text-porcelain hover:text-ember transition-colors inline-flex items-center gap-1.5"
              >
                <span>Inspect Shader Loop</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
              {handTracking.links.live && (
                <a
                  href={handTracking.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-wider text-steel hover:text-porcelain transition-colors inline-flex items-center gap-1"
                >
                  <span>Simulation</span>
                  <IconExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </article>

          {/* Health Assistant Platform */}
          <article className="project-showcase-stage p-6 md:p-8 rounded-2xl bg-eclipse-surface border border-gunmetal flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-crimson font-bold uppercase tracking-wider">
                  SYSTEM 05 / HACKATHON WINNER
                </span>
                <span className="px-2 py-0.5 rounded bg-burgundy/80 text-porcelain border border-crimson/30">
                  SIH 2025
                </span>
              </div>

              <h3 className="text-2xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                {health.title}
              </h3>
              <p className="text-xs text-steel">{health.subtitle}</p>

              <div
                onClick={() => setActiveProject(health)}
                className="group relative cursor-pointer aspect-[16/10] rounded-xl overflow-hidden border border-gunmetal bg-eclipse-black"
              >
                <Image
                  src={health.image}
                  alt={health.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-steel bg-eclipse-black/80 px-2.5 py-1 rounded border border-gunmetal">
                  <span>SUPABASE &bull; &lt;250MS QUERY</span>
                  <span className="text-ember">&gt;95% RELIABILITY</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-porcelain/85 leading-relaxed">
                {health.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gunmetal flex items-center justify-between">
              <button
                onClick={() => setActiveProject(health)}
                className="text-xs font-mono uppercase tracking-wider text-porcelain hover:text-ember transition-colors inline-flex items-center gap-1.5"
              >
                <span>Inspect Hackathon Dossier</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
              {health.links.live && (
                <a
                  href={health.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-wider text-steel hover:text-porcelain transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal</span>
                  <IconExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </article>
        </div>
      </div>

      {/* Deep Inspection Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
