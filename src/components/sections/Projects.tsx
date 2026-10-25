"use client";

import React, { useState, useRef, useEffect } from "react";
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
  IconShield,
  IconTerminal,
} from "../ui/CustomIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedFeatureTab, setSelectedFeatureTab] = useState<"vision" | "latency" | "privacy">("vision");
  const [wheelIndex, setWheelIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const lumine = projects.find((p) => p.id === "lumine")!;
  const wheelProjects = projects.filter((p) => p.id !== "lumine");

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
    },
    { scope: containerRef }
  );

  const handleNextWheel = () => {
    setWheelIndex((prev) => (prev + 1) % wheelProjects.length);
  };

  const handlePrevWheel = () => {
    setWheelIndex((prev) => (prev - 1 + wheelProjects.length) % wheelProjects.length);
  };

  const currentWheelProject = wheelProjects[wheelIndex];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-14 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/80 gap-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-ember mb-2 font-medium">
            02 / Flagship Systems & Applied Research
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Flagship Systems
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-xl leading-relaxed">
          Deep architectural investigations spanning self-supervised computer vision, multimodal remote sensing, and low-latency client-side Edge AI.
        </p>
      </div>

      <div className="space-y-28">
        {/* ============================================================
            1. FEATURED SYSTEM SHOWCASE: LUMINE AI (ECHO Liquid Perspective Preset)
            ============================================================ */}
        <article className="project-fade-in space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                  FLAGSHIP 01 &bull; FEATURED ARCHITECTURE
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                  {lumine.date}
                </span>
              </div>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                {lumine.title}
              </h3>
              <p className="text-sm font-sans font-medium text-steel-light mt-1">
                {lumine.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveProject(lumine)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Inspect Full Dossier</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
              {lumine.links.live && (
                <a
                  href={lumine.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gunmetal hover:bg-gunmetal-border text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Live Deployment</span>
                  <IconExternalLink className="w-3.5 h-3.5 text-steel" />
                </a>
              )}
            </div>
          </div>

          {/* Interactive Liquid Perspective Media Canvas */}
          <div
            onClick={() => setActiveProject(lumine)}
            className="group relative cursor-pointer w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-gunmetal bg-eclipse-surface shadow-2xl transition-all duration-500 hover:border-crimson/60"
            style={{ perspective: "1000px" }}
          >
            <Image
              src={lumine.image}
              alt={lumine.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top grayscale contrast-115 group-hover:scale-[1.02] group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/95 via-eclipse-black/30 to-eclipse-black/60 pointer-events-none" />

            {/* Diagnostic Telemetry Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain/90">
              <div className="flex items-center gap-2 bg-eclipse-black/85 px-3 py-1.5 rounded-lg border border-gunmetal">
                <IconCrosshair className="w-3.5 h-3.5 text-ember" />
                <span>MODEL: DINOv2 (VISION TRANSFORMER)</span>
              </div>
              <span className="hidden sm:inline-block px-3 py-1.5 rounded-lg bg-eclipse-black/85 border border-gunmetal text-steel">
                31 CLASSIFIED DERMATOLOGICAL CLASSES
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-porcelain">
              <span className="bg-eclipse-black/90 px-3 py-1.5 rounded-lg border border-gunmetal text-steel-light">
                {lumine.stats}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-ember uppercase tracking-wider text-[11px] font-sans font-bold">
                <span>Click to inspect complete architectural dossier</span>
                <span>&rarr;</span>
              </span>
            </div>
          </div>

          {/* Interactive Diagnostic Tabs & System Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm md:text-base text-porcelain/90 leading-relaxed font-sans">
                {lumine.description}
              </p>

              {/* Feature Switcher Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setSelectedFeatureTab("vision")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium uppercase tracking-wider transition-all border ${
                    selectedFeatureTab === "vision"
                      ? "bg-crimson border-crimson text-porcelain"
                      : "bg-eclipse-elevated border-gunmetal text-steel hover:text-porcelain"
                  }`}
                >
                  Neural Architecture
                </button>
                <button
                  onClick={() => setSelectedFeatureTab("latency")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium uppercase tracking-wider transition-all border ${
                    selectedFeatureTab === "latency"
                      ? "bg-crimson border-crimson text-porcelain"
                      : "bg-eclipse-elevated border-gunmetal text-steel hover:text-porcelain"
                  }`}
                >
                  Edge Inference
                </button>
                <button
                  onClick={() => setSelectedFeatureTab("privacy")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium uppercase tracking-wider transition-all border ${
                    selectedFeatureTab === "privacy"
                      ? "bg-crimson border-crimson text-porcelain"
                      : "bg-eclipse-elevated border-gunmetal text-steel hover:text-porcelain"
                  }`}
                >
                  Privacy Guarantee
                </button>
              </div>

              {/* Tab Narrative Content */}
              <div className="p-4 rounded-xl bg-eclipse-surface border border-gunmetal text-xs font-sans leading-relaxed text-steel-light">
                {selectedFeatureTab === "vision" && (
                  <p>
                    Leverages Meta AI&apos;s self-supervised DINOv2 vision transformer with frozen patch token embeddings and custom multi-layer perceptron heads trained to classify 31 dermatological conditions with high sensitivity.
                  </p>
                )}
                {selectedFeatureTab === "latency" && (
                  <p>
                    Engineered with ONNX Runtime Web and WebAssembly acceleration directly in the user&apos;s browser, achieving sub-12ms inference latency without sending image payloads across the network.
                  </p>
                )}
                {selectedFeatureTab === "privacy" && (
                  <p>
                    100% zero-upload architecture: patient diagnostic imagery is processed exclusively in browser memory and discarded immediately following analysis, ensuring zero HIPAA or privacy exposure.
                  </p>
                )}
              </div>
            </div>

            {/* Stack Tags and Deliverables */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-steel block">
                ENGINEERED STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {lumine.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-steel block mb-2">
                  VERIFIED DELIVERABLES
                </span>
                <ul className="space-y-1.5 text-xs font-sans text-steel-light">
                  {lumine.deliverables?.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-crimson font-mono">&rsaquo;</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* ============================================================
            2. 3D DRUM REEL SHOWCASE (ECHO WorksWheel 3D Projection)
            ============================================================ */}
        <div className="project-fade-in pt-8 border-t border-gunmetal/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                  SPECIALIZED PRODUCTION ARCHITECTURES
                </span>
                <span className="text-steel/40">|</span>
                <span className="font-mono text-xs text-ember">
                  0{wheelIndex + 1} / 0{wheelProjects.length}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                Engineered Systems Archive
              </h3>
            </div>

            {/* Navigation Wheel Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevWheel}
                aria-label="Previous System in 3D Wheel"
                className="w-10 h-10 rounded-full border border-gunmetal hover:border-steel bg-eclipse-surface text-steel hover:text-porcelain flex items-center justify-center transition-colors"
              >
                &larr;
              </button>
              <button
                onClick={handleNextWheel}
                aria-label="Next System in 3D Wheel"
                className="w-10 h-10 rounded-full border border-gunmetal hover:border-steel bg-eclipse-surface text-steel hover:text-porcelain flex items-center justify-center transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>

          {/* Active 3D Perspective Card Stage */}
          <div className="relative w-full rounded-2xl bg-eclipse-surface border border-gunmetal p-6 md:p-10 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Media Preview Stage */}
              <div
                onClick={() => setActiveProject(currentWheelProject)}
                className="lg:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden border border-gunmetal-border cursor-pointer group bg-eclipse-black"
              >
                {currentWheelProject.image ? (
                  <Image
                    src={currentWheelProject.image}
                    alt={currentWheelProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top grayscale contrast-115 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-steel font-mono text-xs p-6 text-center">
                    <IconCrosshair className="w-8 h-8 text-crimson mb-2" />
                    <span>DIAGNOSTIC ARCHITECTURE PREVIEW</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/85 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-porcelain">
                  <span className="bg-eclipse-black/85 px-2.5 py-1 rounded border border-gunmetal text-steel-light text-[11px]">
                    {currentWheelProject.stats}
                  </span>
                  <span className="text-ember font-sans font-medium text-[11px] uppercase">
                    Inspect &rarr;
                  </span>
                </div>
              </div>

              {/* System Specifications Dossier */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                    SYSTEM 0{wheelIndex + 2}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-burgundy text-porcelain border border-crimson/30 rounded">
                    {currentWheelProject.date}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
                  {currentWheelProject.title}
                </h4>
                <p className="text-xs sm:text-sm font-sans font-medium text-steel">
                  {currentWheelProject.subtitle}
                </p>

                <p className="text-xs sm:text-sm font-sans text-steel-light leading-relaxed">
                  {currentWheelProject.description}
                </p>

                {/* Detail Highlights */}
                <ul className="space-y-1.5 text-xs font-sans text-steel-light">
                  {currentWheelProject.details.slice(0, 3).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-crimson font-mono">&rsaquo;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {currentWheelProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-eclipse-elevated text-steel border border-gunmetal rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setActiveProject(currentWheelProject)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>View Dossier</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {currentWheelProject.links.github && (
                    <a
                      href={currentWheelProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gunmetal hover:bg-gunmetal-border text-steel hover:text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                    >
                      <IconGitHub className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-2 pt-8 mt-6 border-t border-gunmetal/60">
              {wheelProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setWheelIndex(idx)}
                  aria-label={`Jump to ${p.title}`}
                  className={`h-1.5 rounded-full transition-all ${
                    wheelIndex === idx ? "w-8 bg-ember" : "w-2 bg-gunmetal hover:bg-steel"
                  }`}
                />
              ))}
            </div>
          </div>
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
