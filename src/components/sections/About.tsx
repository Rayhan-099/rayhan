"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/profile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const mediaBlurRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion || !sectionRef.current) return;

      const section = sectionRef.current;
      const mediaContainer = mediaContainerRef.current;
      const mediaBlur = mediaBlurRef.current;
      const contentOverlay = contentOverlayRef.current;
      const titleLeft = titleLeftRef.current;
      const titleRight = titleRightRef.current;

      const isMobile = window.innerWidth < 768;
      const ASPECT_RATIO = 16 / 10;
      const startW = isMobile ? 280 : 320;
      const startH = isMobile ? 360 : 420;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          const maxWByViewport = window.innerWidth * 0.94;
          const maxWByHeight = window.innerHeight * 0.85 * ASPECT_RATIO;
          const endW = Math.min(maxWByViewport, maxWByHeight);
          const endH = endW / ASPECT_RATIO;

          const currentW = startW + progress * (endW - startW);
          const currentH = startH + progress * (endH - startH);
          const textTranslateX = progress * (isMobile ? 120 : 100);

          // Sizing update
          if (mediaContainer) {
            mediaContainer.style.width = `${currentW}px`;
            mediaContainer.style.height = `${currentH}px`;
          }

          // Hardware-accelerated unblur
          if (mediaBlur) {
            if (progress < 0.45) {
              mediaBlur.style.visibility = "visible";
              mediaBlur.style.opacity = `${Math.max(0, 1 - progress * 2.3)}`;
            } else {
              mediaBlur.style.opacity = "0";
              mediaBlur.style.visibility = "hidden";
            }
          }

          // Title outward push
          const titleOpacity = Math.max(0, 1 - progress * 1.8);
          if (titleLeft) {
            titleLeft.style.transform = `translateX(-${textTranslateX}vw)`;
            titleLeft.style.opacity = `${titleOpacity}`;
          }
          if (titleRight) {
            titleRight.style.transform = `translateX(${textTranslateX}vw)`;
            titleRight.style.opacity = `${titleOpacity}`;
          }

          // Perimeter content reveal when expanded
          if (contentOverlay) {
            if (progress > 0.5) {
              const contentOpacity = Math.min(1, (progress - 0.5) * 2.2);
              contentOverlay.style.opacity = `${contentOpacity}`;
              contentOverlay.style.pointerEvents = "auto";
            } else {
              contentOverlay.style.opacity = "0";
              contentOverlay.style.pointerEvents = "none";
            }
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-eclipse-black text-porcelain"
      style={{ minHeight: "220vh" }}
    >
      {/* Sticky Viewport Stage (ECHO-inspired ScrollExpandMedia) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center z-10 px-4">
        {/* Ambient background depth glow */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-eclipse-black via-burgundy-muted/40 to-eclipse-black opacity-60" />

        {/* Center Expanding Media Stage */}
        <div
          ref={mediaContainerRef}
          className="relative z-10 rounded-2xl overflow-hidden border border-gunmetal-border bg-eclipse-surface shadow-2xl transition-none flex items-center justify-center"
          style={{
            width: "320px",
            height: "420px",
            maxWidth: "96vw",
            maxHeight: "88vh",
          }}
        >
          {/* Base Crisp Media */}
          <div className="relative w-full h-full">
            <Image
              src="/media/projects/lumine.webp"
              alt="Rayhan Khan | Engineering Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 85vw"
              className="object-cover object-center grayscale contrast-125"
            />
            {/* Subtle contrast gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/95 via-eclipse-black/40 to-eclipse-black/80" />

            {/* Pre-blurred layer for 120 FPS GPU Unblur */}
            <div
              ref={mediaBlurRef}
              className="absolute inset-0 w-full h-full pointer-events-none transition-none"
              style={{
                filter: "blur(20px)",
                opacity: 1,
                willChange: "opacity",
              }}
            >
              <Image
                src="/media/projects/lumine.webp"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover object-center grayscale contrast-125"
              />
            </div>
          </div>

          {/* Initial Center Text (Splits and slides away on scroll) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none px-4 text-center">
            <h2
              ref={titleLeftRef}
              className="font-syne text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-porcelain leading-tight"
            >
              Systematic
            </h2>
            <h2
              ref={titleRightRef}
              className="font-syne text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-ember leading-tight"
            >
              Architecture.
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-telemetry text-steel mt-2">
              SCROLL TO INSPECT
            </p>
          </div>

          {/* Minimalist Perimeter Content - Revealed When Fully Expanded */}
          <div
            ref={contentOverlayRef}
            className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-10 opacity-0 transition-opacity duration-300 select-none pointer-events-none"
          >
            {/* Top Perimeter Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gunmetal pb-4">
              <h3 className="font-syne text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-porcelain max-w-xl">
                Turning Research & Machine Learning into Resilient Software Systems
              </h3>
              <span className="font-mono text-xs text-ember tracking-widest shrink-0 uppercase">
                01 / ABOUT
              </span>
            </div>

            {/* Middle Content Summary */}
            <div className="max-w-2xl space-y-3 py-4">
              <p className="text-sm md:text-base font-normal text-porcelain/90 leading-relaxed">
                {profile.summary}
              </p>
              <p className="hidden sm:block text-xs md:text-sm text-steel leading-relaxed">
                Undergraduate in Computer Science & Engineering at Dr. A.P.J. Abdul Kalam Technical University (AKTU). Specializing in full-stack architecture, asynchronous backend engineering with FastAPI, and deploying self-supervised vision models.
              </p>
            </div>

            {/* Bottom Perimeter: 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gunmetal">
              <div className="p-3 bg-eclipse-surface/80 border border-gunmetal/80 rounded-lg">
                <span className="font-mono text-[11px] text-crimson font-bold block mb-0.5">
                  PILLAR 01
                </span>
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-porcelain">
                  Full-Stack Systems
                </h4>
                <p className="text-[11px] text-steel mt-1 leading-snug">
                  FastAPI, React, Node.js, and relational PostgreSQL data vaults.
                </p>
              </div>

              <div className="p-3 bg-eclipse-surface/80 border border-gunmetal/80 rounded-lg">
                <span className="font-mono text-[11px] text-crimson font-bold block mb-0.5">
                  PILLAR 02
                </span>
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-porcelain">
                  Applied AI & Vision
                </h4>
                <p className="text-[11px] text-steel mt-1 leading-snug">
                  DINOv2 vision transformers, Sentinel SAR analysis, and 60 FPS Edge AI.
                </p>
              </div>

              <div className="p-3 bg-eclipse-surface/80 border border-gunmetal/80 rounded-lg">
                <span className="font-mono text-[11px] text-crimson font-bold block mb-0.5">
                  PILLAR 03
                </span>
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-porcelain">
                  Reliability & Tests
                </h4>
                <p className="text-[11px] text-steel mt-1 leading-snug">
                  40+ automated Pytest suites, token-bucket limits, and strict schemas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
