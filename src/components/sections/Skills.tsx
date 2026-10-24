"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/content/skills";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".skill-category-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember mb-2">
            04 / Technical Skills & Disciplines
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Technical Skills.
          </h2>
        </div>
        <p className="text-xs font-mono text-steel max-w-sm">
          Disciplined selection of programming languages, machine learning frameworks, data backends, and systems architecture.
        </p>
      </div>

      {/* Grid of Categorized Domains */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, index) => (
          <div
            key={category.category}
            className="skill-category-block p-6 rounded-2xl bg-eclipse-surface border border-gunmetal flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gunmetal/60">
                <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                  DOMAIN 0{index + 1}
                </span>
                <h3 className="font-syne text-xs uppercase tracking-wider text-porcelain font-bold">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className="px-3 py-1.5 text-xs font-mono bg-eclipse-elevated text-steel-light border border-gunmetal/70 rounded hover:border-crimson/50 hover:text-porcelain transition-colors"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
