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
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const mediaBlurRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const scrollPromptRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!sectionRef.current || !stageRef.current) return;

      const section = sectionRef.current;
      const stage = stageRef.current;
      const mediaContainer = mediaContainerRef.current;
      const mediaBlur = mediaBlurRef.current;
      const contentOverlay = contentOverlayRef.current;
      const titleLeft = titleLeftRef.current;
      const titleRight = titleRightRef.current;
      const scrollPrompt = scrollPromptRef.current;

      const isMobile = window.innerWidth < 768;
      const ASPECT_RATIO = 16 / 10;
      const startW = isMobile ? 280 : 320;
      const startH = isMobile ? 360 : 420;

      const applyFrame = (progress: number) => {
        const maxWByViewport = window.innerWidth * 0.94;
        const maxWByHeight = window.innerHeight * 0.86 * ASPECT_RATIO;
        const endW = Math.min(maxWByViewport, maxWByHeight);
        const endH = endW / ASPECT_RATIO;

        const currentW = startW + progress * (endW - startW);
        const currentH = startH + progress * (endH - startH);
        const textTranslateX = progress * (isMobile ? 160 : 130);

        // Media container sizing
        if (mediaContainer) {
          mediaContainer.style.width = `${currentW.toFixed(1)}px`;
          mediaContainer.style.height = `${currentH.toFixed(1)}px`;
          const borderOpacity = (0.2 + (1 - progress) * 0.3).toFixed(2);
          mediaContainer.style.borderColor = `rgba(169, 165, 178, ${borderOpacity})`;
        }

        // Hardware-accelerated dual-layer unblur: smoothly fades out the pre-blurred layer
        if (mediaBlur) {
          if (progress < 0.45) {
            mediaBlur.style.visibility = "visible";
            mediaBlur.style.opacity = `${Math.max(0, 1 - progress * 2.3).toFixed(3)}`;
          } else {
            mediaBlur.style.opacity = "0";
            mediaBlur.style.visibility = "hidden";
          }
        }

        // Title outward push and fade
        const titleOpacity = Math.max(0, 1 - progress * 1.6).toFixed(3);
        if (titleLeft) {
          titleLeft.style.transform = `translateX(-${textTranslateX.toFixed(1)}vw) translateZ(0)`;
          titleLeft.style.opacity = `${titleOpacity}`;
        }
        if (titleRight) {
          titleRight.style.transform = `translateX(${textTranslateX.toFixed(1)}vw) translateZ(0)`;
          titleRight.style.opacity = `${titleOpacity}`;
        }

        // Subtitle prompt translation and fade
        if (scrollPrompt) {
          const subOpacity = Math.max(0, 1 - progress * 2.8).toFixed(3);
          scrollPrompt.style.opacity = `${subOpacity}`;
          scrollPrompt.style.transform = `translateY(${progress * 20}px)`;
        }

        // Perimeter content reveal when expanded
        if (contentOverlay) {
          if (progress >= 0.80) {
            const contentFade = Math.min(1, (progress - 0.80) / 0.20);
            contentOverlay.style.opacity = `${contentFade.toFixed(3)}`;
            contentOverlay.style.pointerEvents = contentFade > 0.5 ? "auto" : "none";
            contentOverlay.style.transform = `translateY(${((1 - contentFade) * 16).toFixed(1)}px)`;
          } else {
            contentOverlay.style.opacity = "0";
            contentOverlay.style.pointerEvents = "none";
            contentOverlay.style.transform = "translateY(20px)";
          }
        }
      };

      if (prefersReducedMotion) {
        applyFrame(1.0);
        return;
      }

      // Initial frame setup
      applyFrame(0);

      // Dedicated ScrollTrigger with PINNING to recreate the genuine ECHO-WEBSITE experience
      let stInstance: ScrollTrigger | null = null;
      stInstance = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          applyFrame(self.progress);
        },
        onRefresh: (self) => {
          applyFrame(self ? self.progress : (stInstance ? stInstance.progress : 0));
        },
      });

      return () => {
        if (stInstance) stInstance.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-eclipse-black text-porcelain"
      style={{ height: "260vh" }}
    >
      {/* Pinned Viewport Stage (ECHO-inspired ScrollExpandMedia) */}
      <div
        ref={stageRef}
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-center z-10 px-4 will-change-transform"
      >
        {/* Ambient background depth glow */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-eclipse-black via-burgundy-muted/40 to-eclipse-black opacity-60" />

        {/* Center Expanding Media Stage */}
        <div
          ref={mediaContainerRef}
          className="relative z-10 rounded-2xl overflow-hidden border border-gunmetal-border bg-eclipse-surface shadow-2xl transition-none flex items-center justify-center will-change-[width,height]"
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
            <div className="absolute inset-0 bg-gradient-to-b from-eclipse-black/90 via-eclipse-black/45 to-eclipse-black/95 pointer-events-none" />

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
              className="font-syne text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-porcelain leading-tight will-change-transform"
            >
              Systematic
            </h2>
            <h2
              ref={titleRightRef}
              className="font-syne text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-ember leading-tight will-change-transform"
            >
              Architecture.
            </h2>
            <p
              ref={scrollPromptRef}
              className="font-mono text-[11px] uppercase tracking-telemetry text-steel mt-2 will-change-transform"
            >
              SCROLL TO EXPAND
            </p>
          </div>

          {/* Minimalist Perimeter Content - Revealed When Fully Expanded */}
          <div
            ref={contentOverlayRef}
            className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-10 opacity-0 select-none pointer-events-none will-change-[transform,opacity]"
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

            {/* Center Zone: COMPLETELY OPEN & UNOBSCURED (ECHO-WEBSITE PATTERN) */}
            <div className="flex-1 pointer-events-none min-h-[80px] md:min-h-[160px]" />

            {/* Bottom Perimeter: Core Architecture Pillars & Summary */}
            <div className="pt-4 border-t border-gunmetal/80 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-eclipse-surface/80 p-4 md:p-6 rounded-xl">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs sm:text-sm text-porcelain/90 leading-relaxed font-sans">
                  {profile.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <span className="font-mono text-[10px] text-crimson font-bold block mb-0.5">
                      PILLAR 01
                    </span>
                    <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-porcelain">
                      Full-Stack Systems
                    </h4>
                    <p className="font-sans text-[11px] text-steel mt-0.5">
                      FastAPI, Next.js, PostgreSQL
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-crimson font-bold block mb-0.5">
                      PILLAR 02
                    </span>
                    <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-porcelain">
                      Applied AI & Vision
                    </h4>
                    <p className="font-sans text-[11px] text-steel mt-0.5">
                      DINOv2, MediaPipe 60fps
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-crimson font-bold block mb-0.5">
                      PILLAR 03
                    </span>
                    <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-porcelain">
                      Autonomous RAG
                    </h4>
                    <p className="font-sans text-[11px] text-steel mt-0.5">
                      LangGraph, Vector Engines
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="#projects"
                  className="pointer-events-auto px-5 py-2.5 bg-crimson hover:bg-crimson-hover text-porcelain font-mono text-xs uppercase tracking-wider rounded-full transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Systems</span>
                  <span className="text-xs">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
