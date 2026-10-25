"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/content/education";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Education() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".edu-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="education"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
      aria-label="Academic Foundation and Education"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-ember" />
            <span className="font-mono text-xs uppercase tracking-wider text-ember font-medium">
              06 / Academic Foundation &amp; Theory
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Education
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed">
          Formal university foundations in computer science, software engineering principles, and computing systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {education.map((item, index) => {
          const isPrimary = index === 0;
          return (
            <div
              key={item.institution + index}
              className={`edu-block p-6 rounded-2xl bg-eclipse-surface border flex flex-col justify-between transition-colors ${
                isPrimary
                  ? "border-gunmetal/90 hover:border-crimson/60 relative overflow-hidden"
                  : "border-gunmetal/60 hover:border-gunmetal"
              }`}
            >
              {isPrimary && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-crimson" />
              )}

              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gunmetal/50">
                  <span className="font-mono text-xs text-crimson font-bold">
                    CREDENTIAL 0{index + 1}
                  </span>
                  {isPrimary && (
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-crimson/20 text-ember border border-crimson/40">
                      Undergraduate
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-syne font-bold uppercase tracking-tight text-porcelain mb-2 leading-snug">
                  {item.degree}
                </h3>
                <p className="text-xs sm:text-sm text-steel-light font-medium mb-3">
                  {item.institution}
                </p>

                {isPrimary && (
                  <div className="pt-2 text-xs font-sans text-steel leading-relaxed space-y-1">
                    <p className="font-mono text-[10px] text-ember uppercase">Core Disciplines:</p>
                    <p className="text-steel-light text-[11px]">
                      Data Structures &amp; Algorithms • Operating Systems • Database Management • Computer Vision &amp; AI
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gunmetal/60 flex items-center justify-between text-xs font-mono text-steel">
                <span>{item.dates}</span>
                <span>{item.location.split(",")[0]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
