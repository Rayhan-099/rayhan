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
      aria-label="Verified Achievements and Leadership"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-ember font-bold block mb-2">
            VERIFIED RECOGNITION &amp; LEADERSHIP
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-porcelain">
            Achievements
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed">
          Verified hackathon leadership records and national competitive selection results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((item, index) => (
          <div
            key={item.id || index}
            className="achievement-card relative p-6 md:p-8 rounded-2xl bg-eclipse-surface border border-gunmetal hover:border-ember/50 transition-colors flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Border Highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson via-ember to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gunmetal/60">
                <span className="font-heading text-xs text-ember font-bold tracking-wider uppercase">
                  NATIONAL SELECTION
                </span>
                <span className="px-3 py-1 text-xs font-mono uppercase bg-burgundy/60 text-porcelain border border-crimson/40 rounded-full font-medium">
                  {item.role}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-porcelain mb-4 leading-tight">
                {item.title}
              </h3>

              <ul className="space-y-3 text-sm text-steel-light leading-relaxed">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <span className="font-mono text-ember text-sm select-none shrink-0 mt-0.5">
                      &rsaquo;
                    </span>
                    <span className="text-steel-light">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-gunmetal/40 flex items-center justify-between text-xs font-mono text-steel">
              <span className="uppercase text-steel/70">National Competitive Selection</span>
              <span className="text-ember font-medium">Verified Record</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
