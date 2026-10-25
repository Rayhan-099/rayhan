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
      {/* ================= HEADER & CATEGORY FILTER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gunmetal/60 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ember" />
            <span className="font-mono text-xs uppercase tracking-wider text-ember font-medium">
              04 / Technical Matrix &amp; Disciplines
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Technical Skills
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed">
          Disciplined selection of programming languages, machine learning frameworks, data backends, and systems architecture.
        </p>
      </div>

      {/* Filter Navigation Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
            activeCategory === "all"
              ? "bg-crimson text-porcelain font-bold shadow-sm"
              : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
          }`}
        >
          All Domains ({skills.length})
        </button>
        {skills.map((c) => {
          const key = c.category.toLowerCase().split(" ")[0];
          const isSelected = activeCategory === key;
          return (
            <button
              key={c.category}
              onClick={() => setActiveCategory(isSelected ? "all" : key)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-crimson text-porcelain font-bold shadow-sm"
                  : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
              }`}
            >
              {c.category} ({c.items.length})
            </button>
          );
        })}
      </div>

      {/* ================= ASYMMETRIC DUAL-COLUMN ARCHITECTURE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Specialization Spotlight Command Hub */}
        <div className="skill-spotlight-panel lg:col-span-5 rounded-2xl bg-eclipse-surface border border-gunmetal/80 p-6 md:p-8 relative overflow-hidden">
          {/* Subtle Burgundy Gradient Haze */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-burgundy/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gunmetal/60">
              <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                CORE FOCUS
              </span>
              <span className="font-mono text-xs uppercase text-steel">
                AKTU CSE • 2024–PRES
              </span>
            </div>

            <h3 className="font-syne text-xl md:text-2xl font-bold uppercase tracking-tight text-porcelain mb-4 leading-tight">
              Systems Engineering &amp; Autonomous AI
            </h3>

            <p className="font-sans text-xs md:text-sm text-steel-light leading-relaxed mb-6">
              Engineering emphasis centered on high-throughput backend APIs, vision transformer fine-tuning, and deterministic multi-agent state machines.
            </p>

            {/* Architecture Invariants Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/70">
                <span className="font-syne font-black text-2xl text-porcelain block">39</span>
                <span className="font-mono text-[10px] text-steel uppercase tracking-wider">
                  Verified Tools
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/70">
                <span className="font-syne font-black text-2xl text-ember block">60 FPS</span>
                <span className="font-mono text-[10px] text-steel uppercase tracking-wider">
                  Edge AI MediaPipe
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/70">
                <span className="font-syne font-black text-2xl text-crimson block">31 ViT</span>
                <span className="font-mono text-[10px] text-steel uppercase tracking-wider">
                  DINOv2 Classes
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-eclipse-elevated border border-gunmetal/70">
                <span className="font-syne font-black text-2xl text-porcelain block">ACID</span>
                <span className="font-mono text-[10px] text-steel uppercase tracking-wider">
                  PostgreSQL Relational
                </span>
              </div>
            </div>

            {/* Engineering Tenet */}
            <div className="p-4 rounded-xl bg-eclipse-black/60 border border-gunmetal/60">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                <span className="font-mono text-[10px] text-ember uppercase font-bold tracking-wider">
                  Architectural Principle
                </span>
              </div>
              <p className="font-sans text-xs text-steel leading-relaxed italic">
                &ldquo;Minimal code surface area, strict interface contracts, and verifiable runtime performance across client and server.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Categorized Domain Matrix */}
        <div ref={matrixRef} className="lg:col-span-7 space-y-6">
          {displayedSkills.map((category, index) => (
            <div
              key={category.category}
              className="skill-domain-card p-6 rounded-2xl bg-eclipse-surface border border-gunmetal/80 hover:border-gunmetal transition-colors"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gunmetal/60">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                    DOMAIN 0{index + 1}
                  </span>
                  <span className="text-gunmetal">|</span>
                  <h3 className="font-syne text-sm sm:text-base uppercase tracking-wider text-porcelain font-bold">
                    {category.category}
                  </h3>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-steel">
                  {category.items.length} {category.items.length === 1 ? "Tool" : "Tools"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group relative px-3.5 py-2 text-xs font-mono bg-eclipse-elevated text-steel-light border border-gunmetal/80 hover:border-crimson/60 hover:text-porcelain hover:bg-burgundy/30 rounded-lg transition-all duration-200 cursor-default flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-steel/40 group-hover:bg-crimson transition-colors" />
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
