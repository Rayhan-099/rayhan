"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".exp-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember mb-2">
            03 / Professional Experience
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Experience.
          </h2>
        </div>
        <p className="text-xs font-mono text-steel max-w-sm">
          Hands-on machine learning engineering, empirical data pipelines, and predictive model benchmarking.
        </p>
      </div>

      {/* Structured Chronology Timeline */}
      <div className="space-y-10">
        {experience.map((item, index) => (
          <div
            key={item.id}
            className="exp-item grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 p-6 md:p-8 rounded-2xl bg-eclipse-surface border border-gunmetal"
          >
            {/* Left: Role, Company, and Period */}
            <div className="md:col-span-5 space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold block">
                ROLE 0{index + 1} / {item.location}
              </span>
              <h3 className="text-xl md:text-2xl font-syne font-bold uppercase tracking-tight text-porcelain">
                {item.role}
              </h3>
              <p className="text-sm font-semibold text-steel-light">
                {item.company}
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 text-xs font-mono bg-gunmetal text-steel rounded-full">
                  {item.date}
                </span>
              </div>
            </div>

            {/* Right: Technical Contributions */}
            <div className="md:col-span-7">
              <ul className="space-y-3 text-sm text-porcelain/85 leading-relaxed">
                {item.description.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="font-mono text-crimson text-xs select-none mt-1">
                      ›
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
