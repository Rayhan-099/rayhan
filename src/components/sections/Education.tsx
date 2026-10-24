"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/content/education";

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
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember mb-2">
            06 / Academic Foundation
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-porcelain">
            Education.
          </h2>
        </div>
        <p className="text-xs font-mono text-steel max-w-sm">
          Formal university foundations in computer science and engineering principles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {education.map((item, index) => (
          <div
            key={item.institution + index}
            className="edu-block p-6 rounded-xl bg-eclipse-surface border border-gunmetal flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-crimson font-bold block mb-2">
                CREDENTIAL 0{index + 1}
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-porcelain mb-2">
                {item.degree}
              </h3>
              <p className="text-sm text-steel-light font-medium mb-3">
                {item.institution}
              </p>
            </div>

            <div className="pt-4 border-t border-gunmetal/60 flex items-center justify-between text-xs font-mono text-steel">
              <span>{item.dates}</span>
              <span>{item.location.split(",")[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
