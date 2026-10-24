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

      tl.from(".hero-top-tag", {
        opacity: 0,
        y: -20,
        duration: 0.8,
      })
        .from(
          ".hero-title-first",
          {
            yPercent: 80,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.5"
        )
        .from(
          ".hero-title-second",
          {
            yPercent: 80,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.9"
        )
        .from(
          ".hero-portrait-wrap",
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.8"
        )
        .from(
          ".hero-col-left",
          {
            opacity: 0,
            x: -25,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          ".hero-col-right",
          {
            opacity: 0,
            x: 25,
            duration: 0.9,
          },
          "-=0.9"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Telemetry Header */}
      <div className="hero-top-tag flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gunmetal/60 text-xs font-mono text-steel select-none">
        <div className="flex items-center gap-2">
          <IconCrosshair className="w-3.5 h-3.5 text-ember" />
          <span>LOCATION: {profile.coordinates}</span>
          <span className="text-steel/50">|</span>
          <span>NOIDA, UTTAR PRADESH</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
          <span className="text-porcelain uppercase tracking-widest text-[11px] font-semibold">
            AVAILABLE FOR ENGINEERING ROLES
          </span>
        </div>
      </div>

      {/* Big Display Title Header (ECHO-inspired Typography Architecture) */}
      <div className="text-center w-full my-4 md:my-6 relative z-0 select-none">
        <h1 className="text-[14vw] md:text-[9rem] lg:text-[11rem] font-syne font-extrabold uppercase leading-[0.85] tracking-tighter">
          <span className="hero-title-first block text-porcelain">
            RAYHAN
          </span>
          <span className="hero-title-second block metallic-title">
            KHAN
          </span>
        </h1>
      </div>

      {/* Symmetrical / Balanced Editorial Stage */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 items-end mt-2 md:-mt-28 z-10">
        {/* Left Column: Role Details & Scroll CTA */}
        <div className="hero-col-left md:col-span-3 flex flex-col items-start order-2 md:order-1 pt-6 md:pt-0 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ember block mb-1">
              ENGINEERING ROLES
            </span>
            <p className="font-syne font-bold text-base md:text-lg text-porcelain uppercase leading-tight">
              Software Engineer
            </p>
            <p className="text-xs text-steel mt-1">
              Full-Stack Systems & Applied Machine Learning
            </p>
          </div>

          <div className="pt-2">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gunmetal hover:border-crimson bg-eclipse-surface/80 transition-all"
              aria-label="Scroll to About Section"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-steel group-hover:text-porcelain">
                Explore Systems
              </span>
              <div className="w-6 h-6 rounded-full bg-gunmetal group-hover:bg-crimson flex items-center justify-center transition-colors">
                <IconArrowRight className="w-3 h-3 text-porcelain rotate-90 transform group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* Center Column: Stylized Depth-Masked Portrait Overlapping Masthead */}
        <div className="hero-portrait-wrap md:col-span-6 flex justify-center order-1 md:order-2 relative z-20 -mt-12 md:-mt-20">
          <div className="relative w-[280px] sm:w-[340px] md:w-[420px] aspect-[4/5] hero-portrait-mask">
            <Image
              src="/rayhan-headshot.jpg"
              alt="Rayhan Khan | Software Engineer"
              fill
              priority
              sizes="(max-width: 768px) 300px, 420px"
              className="object-cover object-top grayscale contrast-125 select-none hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Column: Technical Pitch and Core Disciplines */}
        <div className="hero-col-right md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right order-3 pt-6 md:pt-0 space-y-6">
          <p className="text-xs font-medium uppercase leading-relaxed tracking-wider text-steel-light max-w-[240px]">
            Engineering resilient backend architectures and integrating deep learning inference models into production applications.
          </p>

          <div className="flex flex-col space-y-2 text-xs font-mono uppercase tracking-widest text-steel">
            <span className="hover:text-porcelain transition-colors">
              Full-Stack Architecture
            </span>
            <span className="hover:text-porcelain transition-colors">
              Computer Vision & DINOv2
            </span>
            <span className="hover:text-porcelain transition-colors text-ember font-semibold">
              Remote Sensing & SAR
            </span>
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-mono text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Transmit Message</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
