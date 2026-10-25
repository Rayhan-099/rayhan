"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/profile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 241;
const STRIDE_DESKTOP = 1;
const STRIDE_MOBILE = 2;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const scrollPromptRef = useRef<HTMLParagraphElement>(null);
  const mediaBlurRef = useRef<HTMLDivElement>(null);

  // In-memory image buffer cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRenderedIndexRef = useRef<number>(-1);
  const targetFrameIndexRef = useRef<number>(0);
  const rafPendingRef = useRef<boolean>(false);

  /**
   * High-performance canvas drawing function
   * Renders the current frame in "cover" aspect ratio mode centered on the expanding card.
   * Clamps DPR at 2.0 to avoid memory overhead on high-density mobile screens.
   */
  const renderFrameToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgAspect = img.width / img.height;
    const canvasAspect = targetWidth / targetHeight;

    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawWidth = targetWidth;
      drawHeight = targetWidth / imgAspect;
      offsetY = (targetHeight - drawHeight) / 2;
    } else {
      drawHeight = targetHeight;
      drawWidth = targetHeight * imgAspect;
      offsetX = (targetWidth - drawWidth) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  /**
   * Coalesced draw scheduler via requestAnimationFrame
   * Draws only when target frame differs from current rendered frame.
   */
  const requestFrameDraw = useCallback(
    (targetIndex: number) => {
      targetFrameIndexRef.current = targetIndex;

      if (!rafPendingRef.current) {
        rafPendingRef.current = true;
        requestAnimationFrame(() => {
          rafPendingRef.current = false;
          const indexToDraw = targetFrameIndexRef.current;
          const images = imagesRef.current;

          if (indexToDraw >= 0 && indexToDraw < images.length && images[indexToDraw]) {
            renderFrameToCanvas(images[indexToDraw]);
            currentRenderedIndexRef.current = indexToDraw;
          }
        });
      }
    },
    [renderFrameToCanvas]
  );

  /**
   * Preload WebP image frames for the sequence
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let isCancelled = false;
    const isMobile = window.innerWidth < 768;
    const stride = isMobile ? STRIDE_MOBILE : STRIDE_DESKTOP;

    const urls: string[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += stride) {
      urls.push(`/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`);
    }

    // Guarantee the final ending frame is preserved
    const finalFrameUrl = `/frames/ezgif-frame-${String(TOTAL_FRAMES).padStart(3, "0")}.jpg`;
    if (urls[urls.length - 1] !== finalFrameUrl) {
      urls.push(finalFrameUrl);
    }

    const loadedImages: HTMLImageElement[] = new Array(urls.length);
    let completedCount = 0;

    const onImageLoaded = (index: number, img: HTMLImageElement) => {
      if (isCancelled) return;
      loadedImages[index] = img;
      completedCount++;

      // Immediately render frame 0 so the canvas is never empty
      if (index === 0 && canvasRef.current) {
        renderFrameToCanvas(img);
        currentRenderedIndexRef.current = 0;
      }

      if (completedCount === urls.length) {
        imagesRef.current = loadedImages;
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }
    };

    urls.forEach((url, idx) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => onImageLoaded(idx, img);
      img.onerror = () => {
        if (isCancelled) return;
        completedCount++;
        loadedImages[idx] = new window.Image();
        if (completedCount === urls.length) {
          imagesRef.current = loadedImages;
          ScrollTrigger.refresh();
        }
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [renderFrameToCanvas]);

  /**
   * Handle resize
   */
  useEffect(() => {
    const handleResize = () => {
      const idx = currentRenderedIndexRef.current >= 0 ? currentRenderedIndexRef.current : 0;
      const images = imagesRef.current;
      if (images[idx]) {
        renderFrameToCanvas(images[idx]);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrameToCanvas]);

  /**
   * GSAP ScrollTrigger Animation
   * Controls both the container expansion and the canvas sequence progression simultaneously
   */
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!sectionRef.current || !stageRef.current || !pinWrapperRef.current) return;

      const pinWrapper = pinWrapperRef.current;
      const stage = stageRef.current;
      const mediaContainer = mediaContainerRef.current;
      const contentOverlay = contentOverlayRef.current;
      const titleLeft = titleLeftRef.current;
      const titleRight = titleRightRef.current;
      const scrollPrompt = scrollPromptRef.current;
      const mediaBlur = mediaBlurRef.current;

      const isMobile = window.innerWidth < 768;
      const ASPECT_RATIO = 16 / 10;
      const startW = isMobile ? 280 : 320;
      const startH = isMobile ? 360 : 420;

      const applyFrame = (progress: number) => {
        const clampedProgress = Math.max(0, Math.min(1, progress));
        const maxWByViewport = window.innerWidth * 0.94;
        const maxWByHeight = window.innerHeight * 0.86 * ASPECT_RATIO;
        const endW = Math.min(maxWByViewport, maxWByHeight);
        const endH = endW / ASPECT_RATIO;

        const currentW = startW + clampedProgress * (endW - startW);
        const currentH = startH + clampedProgress * (endH - startH);
        const textTranslateX = clampedProgress * (isMobile ? 160 : 130);

        // Media container sizing
        if (mediaContainer) {
          mediaContainer.style.width = `${currentW.toFixed(1)}px`;
          mediaContainer.style.height = `${currentH.toFixed(1)}px`;
          const borderOpacity = (0.2 + (1 - clampedProgress) * 0.3).toFixed(2);
          mediaContainer.style.borderColor = `rgba(169, 165, 178, ${borderOpacity})`;
        }

        // Scrub image sequence frames across normalized progress
        const totalCount = imagesRef.current.length;
        if (totalCount > 0) {
          const targetIndex = Math.max(
            0,
            Math.min(totalCount - 1, Math.round(clampedProgress * (totalCount - 1)))
          );
          requestFrameDraw(targetIndex);
        }

        // Title outward push and fade
        const titleOpacity = Math.max(0, 1 - clampedProgress * 1.6).toFixed(3);
        if (titleLeft) {
          titleLeft.style.transform = `translateX(-${textTranslateX.toFixed(1)}vw) translateZ(0)`;
          titleLeft.style.opacity = `${titleOpacity}`;
        }
        if (titleRight) {
          titleRight.style.transform = `translateX(${textTranslateX.toFixed(1)}vw) translateZ(0)`;
          titleRight.style.opacity = `${titleOpacity}`;
        }

        // Dual-Layer Hardware Unblur (ECHO ScrollExpandMedia)
        if (mediaBlur) {
          const blurFade = Math.max(0, 1 - clampedProgress * 2.3);
          mediaBlur.style.opacity = `${blurFade.toFixed(3)}`;
        }

        // Subtitle prompt translation and fade
        if (scrollPrompt) {
          const subOpacity = Math.max(0, 1 - clampedProgress * 2.8).toFixed(3);
          scrollPrompt.style.opacity = `${subOpacity}`;
          scrollPrompt.style.transform = `translateY(${clampedProgress * 20}px)`;
        }

        // Perimeter content reveal when expanded
        if (contentOverlay) {
          if (clampedProgress >= 0.80) {
            const contentFade = Math.min(1, (clampedProgress - 0.80) / 0.20);
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

      let stInstance: ScrollTrigger | null = null;
      stInstance = ScrollTrigger.create({
        trigger: pinWrapper,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          applyFrame(self.progress);
        },
        onRefresh: (self) => {
          applyFrame(self ? self.progress : (stInstance ? stInstance.progress : 0));
        },
      });

      // Animate the Editorial Identity cards when scrolled into view
      gsap.from(".identity-element", {
        scrollTrigger: {
          trigger: ".identity-showcase",
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
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
      aria-label="About Rayhan Khan"
    >
      {/* ================= STAGE 1: PINNED CANVAS EXPANSION (ECHO-INSPIRED) ================= */}
      <div ref={pinWrapperRef} className="relative w-full" style={{ height: "200vh" }}>
        <div
          ref={stageRef}
          className="w-full h-screen overflow-hidden flex flex-col items-center justify-center z-10 px-4 will-change-transform"
        >
          {/* Subtle ambient depth */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-eclipse-black via-burgundy-muted/30 to-eclipse-black opacity-60" />

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
            {/* Living Canvas Image Sequence */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover block select-none pointer-events-none"
            />

            {/* Dual-Layer Hardware Unblur Overlay (ECHO ScrollExpandMedia) */}
            <div
              ref={mediaBlurRef}
              className="absolute inset-0 z-10 pointer-events-none backdrop-blur-md bg-eclipse-surface/30 transition-opacity duration-150 ease-out will-change-[opacity]"
            />

            {/* Vignette Gradient for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-eclipse-black/85 via-eclipse-black/40 to-eclipse-black/90 pointer-events-none z-10" />

            {/* Initial Center Text (Splits and slides away on scroll) */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none px-4 text-center">
              <span
                ref={titleLeftRef}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-porcelain leading-none block will-change-transform"
              >
                Systematic
              </span>
              <span
                ref={titleRightRef}
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-ember leading-none block mt-1.5 will-change-transform"
              >
                Architecture
              </span>
              <p
                ref={scrollPromptRef}
                className="font-heading text-[10px] sm:text-xs uppercase tracking-widest text-steel mt-3 will-change-transform"
              >
                Scroll to explore
              </p>
            </div>

            {/* Minimalist Perimeter Content - Revealed When Fully Expanded */}
            <div
              ref={contentOverlayRef}
              className="absolute inset-0 z-30 flex flex-col justify-between p-6 md:p-10 opacity-0 select-none pointer-events-none will-change-[transform,opacity]"
            >
              {/* Top Perimeter Header with Author Thumbnail */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gunmetal/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-crimson/60 shrink-0 bg-eclipse-surface">
                    <img
                      src="/rayhan-headshot.jpg"
                      alt="Rayhan Khan"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-porcelain">
                      Turning Research &amp; Machine Learning into Resilient Software
                    </h3>
                    <p className="font-mono text-[11px] text-steel">
                      RAYHAN KHAN • NOIDA, INDIA
                    </p>
                  </div>
                </div>
                <span className="font-heading text-xs text-ember tracking-widest shrink-0 uppercase font-bold">
                  SYSTEMS ARCHITECT
                </span>
              </div>

              {/* Center Zone: OPEN & UNOBSCURED */}
              <div className="flex-1 pointer-events-none min-h-[60px] md:min-h-[140px]" />

              {/* Bottom Perimeter: Core Architecture Pillars & Summary */}
              <div className="pt-4 border-t border-gunmetal/80 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-eclipse-surface/90 p-4 md:p-6 rounded-xl border border-gunmetal/60">
                <div className="max-w-2xl space-y-3">
                  <p className="text-xs sm:text-sm text-porcelain/90 leading-relaxed font-sans">
                    {profile.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <span className="font-mono text-[11px] text-ember font-bold block mb-0.5">
                        CORE PILLAR
                      </span>
                      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-porcelain">
                        Full-Stack Systems
                      </h4>
                      <p className="font-sans text-[11px] text-steel mt-0.5">
                        FastAPI, Next.js, PostgreSQL
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-ember font-bold block mb-0.5">
                        CORE PILLAR
                      </span>
                      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-porcelain">
                        Applied AI &amp; Vision
                      </h4>
                      <p className="font-sans text-[11px] text-steel mt-0.5">
                        DINOv2, MediaPipe 60fps
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-ember font-bold block mb-0.5">
                        CORE PILLAR
                      </span>
                      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-porcelain">
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
                    className="pointer-events-auto px-5 py-2.5 bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider rounded-full transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Explore Systems</span>
                    <span className="text-xs">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STAGE 2: EDITORIAL PERSONAL IDENTITY SHOWCASE ================= */}
      <div className="identity-showcase relative z-20 py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Portrait */}
          <div className="identity-element lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-eclipse-surface border border-gunmetal/80 shadow-2xl group">
              <img
                src="/rayhan-headshot.jpg"
                alt="Rayhan Khan, Computer Science Engineer and AI Systems Architect based in Noida, India"
                className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/85 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Credential Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-eclipse-surface/90 px-3.5 py-2 rounded-lg border border-gunmetal/80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                  <span className="text-porcelain font-bold">AKTU CSE</span>
                </div>
                <span className="text-steel">NOIDA, UP, INDIA</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono border-b border-gunmetal/50 pb-2">
              <span className="font-heading font-bold uppercase tracking-wider text-porcelain">
                Rayhan Khan
              </span>
              <span className="text-ember uppercase font-semibold">
                Available for Engineering Roles
              </span>
            </div>
          </div>

          {/* Right Column: Statement, Academic Grounding & Manifesto */}
          <div className="identity-element lg:col-span-7 flex flex-col justify-center lg:pl-4">
            <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-ember mb-3 block">
              Engineering Identity &amp; Philosophy
            </span>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-porcelain leading-[1.08] mb-6">
              Architecting scalable software at the intersection of systems engineering and artificial intelligence.
            </h2>

            <div className="space-y-4 text-steel-light font-sans text-sm md:text-base leading-relaxed">
              <p>
                I am a Computer Science undergraduate at Dr. A.P.J. Abdul Kalam Technical University (AKTU) in Noida, focused on the engineering discipline required to take machine learning models from mathematical prototypes into production-grade, fault-tolerant software.
              </p>
              <p>
                My technical work spans low-latency asynchronous APIs, clinical computer vision platforms with DINOv2 self-supervised vision transformers, Sentinel satellite remote sensing pipelines with automated raster thresholding, and autonomous agentic workflows orchestrated via LangGraph.
              </p>
              <p>
                I prioritize sound data structures, minimal code surface area, strict type contracts, and verifiable runtime performance over decorative developer trends.
              </p>
            </div>

            {/* Core Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gunmetal/60">
              <div className="p-4 rounded-xl bg-eclipse-surface border border-gunmetal/80">
                <span className="font-mono text-[11px] text-ember font-bold block mb-1">
                  CORE DISCIPLINE
                </span>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-porcelain mb-1">
                  Distributed Systems &amp; APIs
                </h4>
                <p className="font-sans text-xs text-steel-light leading-normal">
                  Next.js, FastAPI, Node.js, and PostgreSQL with strict ACID guarantees, automated testing, and Docker isolation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-eclipse-surface border border-gunmetal/80">
                <span className="font-mono text-[11px] text-ember font-bold block mb-1">
                  CORE DISCIPLINE
                </span>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-porcelain mb-1">
                  Applied Machine Learning &amp; Vision
                </h4>
                <p className="font-sans text-xs text-steel-light leading-normal">
                  DINOv2 self-supervised feature extraction, Google MediaPipe Edge AI, and SAR remote sensing with Rasterio.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-gunmetal/40">
              <a
                href="#projects"
                className="px-6 py-3 bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider rounded-full transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Explore Technical Systems</span>
                <span className="text-xs">↓</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-eclipse-surface hover:bg-gunmetal border border-gunmetal/80 hover:border-crimson/50 text-porcelain font-sans font-medium text-xs uppercase tracking-wider rounded-full transition-colors inline-flex items-center gap-2"
              >
                <span>Download Verified Resume</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
