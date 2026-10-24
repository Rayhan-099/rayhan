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
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Top Telemetry Header */}
      <div className="hero-top-tag flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gunmetal/60 text-xs font-mono text-steel select-none">
        <div className="flex items-center gap-2 flex-wrap">
          <IconCrosshair className="w-3.5 h-3.5 text-ember shrink-0" />
          <span>LOCATION: {profile.coordinates}</span>
          <span className="text-steel/40 hidden sm:inline">|</span>
          <span className="text-steel-light">NOIDA, UTTAR PRADESH</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
          <span className="text-porcelain uppercase tracking-widest text-[11px] font-semibold">
            AVAILABLE FOR ENGINEERING ROLES
          </span>
        </div>
      </div>

      {/* Commanding Editorial Typography Masthead */}
      <div className="text-center w-full my-6 md:my-10 relative z-0 select-none">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-syne font-extrabold uppercase leading-[0.9] tracking-tight text-porcelain">
          <span className="hero-title-first inline-block">
            RAYHAN{" "}
          </span>
          <span className="hero-title-second inline-block metallic-title">
            KHAN
          </span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-ember tracking-telemetry uppercase mt-3">
          Full-Stack Systems & Applied Machine Learning Engineer
        </p>
      </div>

      {/* Balanced Editorial Three-Column Stage */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Role Overview & Scroll CTA */}
        <div className="hero-col-left md:col-span-4 flex flex-col items-start space-y-6 order-2 md:order-1">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold block">
              ENGINEERING ETHOS
            </span>
            <p className="font-sans text-sm md:text-base text-porcelain/90 leading-relaxed max-w-sm">
              Engineering resilient backend architectures and integrating deep learning inference models into production applications.
            </p>
          </div>

          <div className="pt-1">
            <a
              href="#about"
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-gunmetal hover:border-crimson bg-eclipse-surface/90 transition-all shadow-sm"
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

        {/* Center Column: Stylized Portrait Frame with Bottom Fade */}
        <div className="hero-portrait-wrap md:col-span-4 flex justify-center order-1 md:order-2 relative z-20">
          <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[4/5] hero-portrait-mask rounded-2xl overflow-hidden border border-gunmetal/60 shadow-2xl bg-eclipse-elevated">
            <Image
              src="/rayhan-headshot.jpg"
              alt="Rayhan Khan | Software Engineer"
              fill
              priority
              sizes="(max-width: 768px) 260px, 320px"
              className="object-cover object-top grayscale contrast-125 select-none hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Right Column: Technical Disciplines and Contact CTA */}
        <div className="hero-col-right md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right space-y-6 order-3">
          <div className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-steel">
            <div className="text-steel-light border-b border-gunmetal/60 pb-1 w-full md:w-auto">
              CORE SPECIALIZATIONS
            </div>
            <div className="hover:text-porcelain transition-colors flex items-center md:justify-end gap-2">
              <span className="text-crimson font-bold">01 //</span>
              <span>Full-Stack Architecture</span>
            </div>
            <div className="hover:text-porcelain transition-colors flex items-center md:justify-end gap-2">
              <span className="text-crimson font-bold">02 //</span>
              <span>Computer Vision & DINOv2</span>
            </div>
            <div className="hover:text-porcelain transition-colors flex items-center md:justify-end gap-2">
              <span className="text-crimson font-bold">03 //</span>
              <span>Remote Sensing & SAR</span>
            </div>
            <div className="hover:text-porcelain transition-colors flex items-center md:justify-end gap-2">
              <span className="text-ember font-bold">04 //</span>
              <span>Edge AI & Hand Tracking</span>
            </div>
          </div>

          <div className="pt-1">
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
