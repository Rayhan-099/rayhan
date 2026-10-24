"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/profile";

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".about-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Section Index & Title */}
        <div className="lg:col-span-4 space-y-3 about-fade">
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember">
            01 / Identity and Engineering Focus
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.92] text-porcelain">
            Systematic Architecture.
          </h2>
          <p className="font-mono text-xs text-steel pt-2">
            ACADEMIC BASE: DR. A.P.J. ABDUL KALAM TECHNICAL UNIVERSITY
          </p>
        </div>

        {/* Narrative & Engineering Disciplines */}
        <div className="lg:col-span-8 space-y-8 about-fade">
          <p className="text-lg md:text-xl font-normal leading-relaxed text-porcelain/90">
            {profile.summary}
          </p>

          <div className="space-y-4 text-steel leading-relaxed text-sm md:text-base">
            {profile.aboutDetails.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Core Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gunmetal">
            <div className="p-4 bg-eclipse-surface border border-gunmetal rounded-lg">
              <span className="font-mono text-xs text-crimson font-bold block mb-1">
                PILLAR 01
              </span>
              <h3 className="font-bold text-porcelain text-sm uppercase tracking-wider mb-1">
                Full-Stack Systems
              </h3>
              <p className="text-xs text-steel leading-relaxed">
                Asynchronous REST APIs with FastAPI and Node.js, relational PostgreSQL schema design, and responsive React interfaces.
              </p>
            </div>

            <div className="p-4 bg-eclipse-surface border border-gunmetal rounded-lg">
              <span className="font-mono text-xs text-crimson font-bold block mb-1">
                PILLAR 02
              </span>
              <h3 className="font-bold text-porcelain text-sm uppercase tracking-wider mb-1">
                Applied AI and CV
              </h3>
              <p className="text-xs text-steel leading-relaxed">
                Self-supervised vision transformers (DINOv2), multimodal geospatial analysis (Sentinel SAR), and client-side Edge AI.
              </p>
            </div>

            <div className="p-4 bg-eclipse-surface border border-gunmetal rounded-lg">
              <span className="font-mono text-xs text-crimson font-bold block mb-1">
                PILLAR 03
              </span>
              <h3 className="font-bold text-porcelain text-sm uppercase tracking-wider mb-1">
                Reliability and Tests
              </h3>
              <p className="text-xs text-steel leading-relaxed">
                40+ automated Pytest suites, JWT token-bucket security, strict input schema validation, and reproducible pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
