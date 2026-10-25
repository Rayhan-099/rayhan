"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/content/skills";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const containerRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  const displayedSkills = activeCategory === "all"
    ? skills
    : skills.filter((c) => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".skill-domain-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });

      gsap.from(".skill-spotlight-panel", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: -30,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
      aria-label="Technical Skills and Disciplines"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gunmetal/60 gap-6">
        <div>
          <span className="font-chakra text-xs uppercase tracking-widest text-ember font-bold block mb-2">
            TECHNICAL MATRIX &amp; DISCIPLINE
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-porcelain">
            Engineering Matrix
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed">
          Rigorous stack selection across distributed backend runtimes, deep learning vision models, relational databases, and low-latency edge inference.
        </p>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-xs font-chakra uppercase tracking-wider transition-all ${
            activeCategory === "all"
              ? "bg-crimson text-porcelain font-bold shadow-sm"
              : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
          }`}
        >
          All Domains
        </button>
        {skills.map((c) => {
          const key = c.category.toLowerCase().split(" ")[0];
          const isSelected = activeCategory === key;
          return (
            <button
              key={c.category}
              onClick={() => setActiveCategory(isSelected ? "all" : key)}
              className={`px-4 py-2 rounded-full text-xs font-chakra uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-crimson text-porcelain font-bold shadow-sm"
                  : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
              }`}
            >
              {c.category}
            </button>
          );
        })}
      </div>

      {/* ================= ART-DIRECTED DUAL-COLUMN ARCHITECTURE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Systems Architecture Foundations */}
        <div className="skill-spotlight-panel lg:col-span-5 rounded-2xl bg-eclipse-surface border border-gunmetal p-6 md:p-8 relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gunmetal/60">
            <span className="font-chakra text-xs uppercase tracking-wider text-ember font-bold">
              CORE SPECIALIZATION
            </span>
            <span className="font-mono text-xs uppercase text-steel-light">
              AKTU CSE • NOIDA
            </span>
          </div>

          <div>
            <h3 className="font-chakra text-xl md:text-2xl font-bold uppercase tracking-tight text-porcelain mb-3 leading-tight">
              Distributed Backends &amp; Applied Computer Vision
            </h3>
            <p className="font-sans text-xs md:text-sm text-steel-light leading-relaxed">
              Engineering focus centered on high-throughput asynchronous APIs, vision transformer fine-tuning, deterministic satellite raster computation, and client-side Edge AI runtimes.
            </p>
          </div>

          {/* Architectural Pillars */}
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
              <span className="font-chakra text-xs font-bold text-porcelain uppercase block mb-1">
                Zero-Trust API Architecture
              </span>
              <p className="font-sans text-xs text-steel-light">
                Stateless token authentication, token-bucket rate limiting, structured Pydantic data schemas, and transactional PostgreSQL integrity.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
              <span className="font-chakra text-xs font-bold text-ember uppercase block mb-1">
                Edge AI &amp; WebAssembly Runtimes
              </span>
              <p className="font-sans text-xs text-steel-light">
                Browser-local neural model inference via ONNX Runtime Web and Google MediaPipe, achieving sub-15ms latency with 100% data confidentiality.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
              <span className="font-chakra text-xs font-bold text-porcelain uppercase block mb-1">
                Geospatial &amp; Multimodal Pipelines
              </span>
              <p className="font-sans text-xs text-steel-light">
                High-throughput raster computation across Sentinel-1 SAR and Sentinel-2 multispectral imagery with automated band thresholding.
              </p>
            </div>
          </div>

          {/* Core Principle Quote */}
          <div className="pt-2 border-t border-gunmetal/60">
            <p className="font-sans text-xs text-steel-light italic leading-relaxed">
              &ldquo;Minimal code surface area, strict interface contracts, and verifiable runtime performance across client and server.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Categorized Domain Matrix */}
        <div ref={matrixRef} className="lg:col-span-7 space-y-6">
          {displayedSkills.map((category) => (
            <div
              key={category.category}
              className="skill-domain-card p-6 rounded-2xl bg-eclipse-surface border border-gunmetal hover:border-gunmetal-border transition-colors"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gunmetal/60">
                <h3 className="font-chakra text-sm sm:text-base uppercase tracking-wider text-porcelain font-bold">
                  {category.category}
                </h3>
                <span className="font-mono text-xs uppercase tracking-wider text-steel">
                  {category.items.length} {category.items.length === 1 ? "Technology" : "Technologies"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group px-3 py-1.5 text-xs font-mono bg-eclipse-elevated text-steel-light border border-gunmetal hover:border-ember/60 hover:text-porcelain transition-all duration-200 cursor-default flex items-center gap-2 rounded-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-steel/50 group-hover:bg-ember transition-colors" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
