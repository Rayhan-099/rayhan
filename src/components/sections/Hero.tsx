"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/content/profile";
import { IconArrowRight, IconCrosshair } from "../ui/CustomIcons";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-telemetry", {
        opacity: 0,
        y: -15,
        duration: 0.8,
        stagger: 0.1,
      })
        .from(
          ".hero-headline-line",
          {
            yPercent: 100,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.4"
        )
        .from(
          ".hero-portrait",
          {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.8"
        )
        .from(
          ".hero-narrative",
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Telemetry Header */}
      <div className="hero-telemetry flex flex-wrap items-center justify-between gap-4 pb-8 mb-4 border-b border-gunmetal/60 text-xs font-mono text-steel">
        <div className="flex items-center gap-2">
          <IconCrosshair className="w-3.5 h-3.5 text-ember" />
          <span>LOCATION: {profile.coordinates}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
          <span className="text-porcelain uppercase tracking-widest">
            AVAILABLE FOR ENGINEERING ROLES
          </span>
        </div>
      </div>

      {/* Main Grid Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left / Center: Masthead Typography */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="overflow-hidden">
            <h1 className="hero-headline-line text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-porcelain">
              RAYHAN
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-headline-line text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-porcelain/40">
              KHAN
            </h1>
          </div>

          <div className="hero-narrative mt-8 max-w-2xl space-y-4">
            <p className="text-lg md:text-xl font-medium text-porcelain/90 leading-snug">
              Software Engineer specializing in full-stack architecture, machine learning inference, and data-driven systems.
            </p>
            <p className="text-sm md:text-base text-steel leading-relaxed">
              Undergraduate at Dr. A.P.J. Abdul Kalam Technical University (AKTU). Designing scalable backends, computer vision pipelines with DINOv2, and remote sensing analysis engines.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="hero-cta flex flex-wrap items-center gap-4 mt-8 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson-hover text-porcelain font-mono text-xs uppercase tracking-wider rounded transition-colors focus:ring-1 focus:ring-ember"
            >
              <span>Explore Selected Systems</span>
              <IconArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gunmetal hover:bg-gunmetal-border text-porcelain font-mono text-xs uppercase tracking-wider rounded transition-colors"
            >
              <span>Direct Transmission</span>
            </a>
          </div>
        </div>

        {/* Right: Architectural Headshot Focal Artifact */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="hero-portrait relative w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-xl overflow-hidden border border-gunmetal-border bg-eclipse-surface group">
            <Image
              src="/rayhan-headshot.jpg"
              alt="Rayhan Khan"
              fill
              priority
              sizes="(max-width: 768px) 280px, 320px"
              className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle overlay shading for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black via-transparent to-transparent opacity-80" />
            
            {/* Corner telemetry tag */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-steel bg-eclipse-black/80 px-3 py-1.5 rounded border border-gunmetal/60">
              <span>RAYHAN KHAN</span>
              <span className="text-ember font-bold">AKTU / CSE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
