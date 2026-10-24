"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/content/achievements";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Achievements() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".achievement-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-ember mb-2 font-medium">
            05 / Verified Achievements & Leadership
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
            Achievements
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed">
          Verified hackathon leadership records and national selection results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((item, index) => (
          <div
            key={item.id || index}
            className="achievement-card p-6 md:p-8 rounded-2xl bg-eclipse-surface border border-gunmetal flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gunmetal/60">
                <span className="font-mono text-xs text-crimson font-bold">
                  MILESTONE 0{index + 1}
                </span>
                <span className="px-3 py-1 text-xs font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded-full">
                  {item.role}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-syne font-bold uppercase tracking-tight text-porcelain mb-4">
                {item.title}
              </h3>

              <ul className="space-y-3 text-sm text-steel leading-relaxed">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <span className="font-mono text-crimson text-xs select-none mt-1">
                      ›
                    </span>
                    <span>{detail}</span>
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
