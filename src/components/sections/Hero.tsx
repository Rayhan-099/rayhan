"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/profile";
import { IconArrowRight, IconCrosshair } from "../ui/CustomIcons";
import { Tilt3DCard } from "../ui/Tilt3DCard";
import { MagneticButton } from "../ui/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_HERO_FRAMES = 300;
const STRIDE_DESKTOP = 1;
const STRIDE_MOBILE = 2;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const tickerTopRef = useRef<HTMLDivElement>(null);
  const tickerBottomRef = useRef<HTMLDivElement>(null);

  // In-memory frame buffer cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRenderedIndexRef = useRef<number>(-1);
  const targetFrameIndexRef = useRef<number>(0);
  const rafPendingRef = useRef<boolean>(false);

  /**
   * Render target frame in "cover" aspect ratio mode centered on the canvas
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
   * Preload hero frames with initial priority batch
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isCancelled = false;
    const isMobile = window.innerWidth < 768;
    const stride = isMobile ? STRIDE_MOBILE : STRIDE_DESKTOP;

    const urls: string[] = [];
    for (let i = 1; i <= TOTAL_HERO_FRAMES; i += stride) {
      urls.push(`/hero-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`);
    }

    const finalFrameUrl = `/hero-frames/ezgif-frame-${String(TOTAL_HERO_FRAMES).padStart(3, "0")}.jpg`;
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

    // Load initial 20 frames with highest priority, then load remaining
    const PRIORITY_BATCH = Math.min(25, urls.length);

    const loadRemaining = () => {
      if (isCancelled) return;
      for (let idx = PRIORITY_BATCH; idx < urls.length; idx++) {
        const img = new window.Image();
        img.src = urls[idx];
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
      }
    };

    for (let idx = 0; idx < PRIORITY_BATCH; idx++) {
      const img = new window.Image();
      img.src = urls[idx];
      img.onload = () => {
        onImageLoaded(idx, img);
        if (idx === PRIORITY_BATCH - 1) {
          if ("requestIdleCallback" in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadRemaining);
          } else {
            setTimeout(loadRemaining, 100);
          }
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        completedCount++;
        loadedImages[idx] = new window.Image();
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [renderFrameToCanvas]);

  /**
   * Resize listener
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
   * GSAP ScrollTrigger Sequence + Flowing Text scrub
   */
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!sectionRef.current || !stageRef.current) return;

      const section = sectionRef.current;
      const stage = stageRef.current;
      const contentWrap = contentWrapRef.current;
      const tickerTop = tickerTopRef.current;
      const tickerBottom = tickerBottomRef.current;

      if (prefersReducedMotion) {
        return;
      }

      const applyScrollState = (progress: number) => {
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // 1. Scrub background canvas frames
        const totalCount = imagesRef.current.length;
        if (totalCount > 0) {
          const targetIndex = Math.max(
            0,
            Math.min(totalCount - 1, Math.round(clampedProgress * (totalCount - 1)))
          );
          requestFrameDraw(targetIndex);
        }

        // 2. Kinetic flowing text marquee layers (counter-drifting)
        if (tickerTop) {
          const xOffset = -clampedProgress * 320;
          tickerTop.style.transform = `translate3d(${xOffset.toFixed(1)}px, 0, 0)`;
        }
        if (tickerBottom) {
          const xOffset = clampedProgress * 280;
          tickerBottom.style.transform = `translate3d(${xOffset.toFixed(1)}px, 0, 0)`;
        }

        // 3. Multi-Plane Spatial Parallax across typography and portrait (analog-editorial reference)
        const wordFirst = contentWrap?.querySelector<HTMLElement>(".hero-word-first");
        const wordSecond = contentWrap?.querySelector<HTMLElement>(".hero-word-second");
        const portraitStage = contentWrap?.querySelector<HTMLElement>(".hero-portrait-stage");

        if (wordFirst) {
          wordFirst.style.transform = `translate3d(0, ${(-clampedProgress * 42).toFixed(1)}px, 0)`;
        }
        if (portraitStage) {
          portraitStage.style.transform = `translate3d(0, ${(-clampedProgress * 24).toFixed(1)}px, 0)`;
        }
        if (wordSecond) {
          wordSecond.style.transform = `translate3d(0, ${(-clampedProgress * 12).toFixed(1)}px, 0)`;
        }

        // 4. Foreground content lift and smooth handoff into About
        if (contentWrap) {
          if (clampedProgress >= 0.70) {
            const exitProgress = (clampedProgress - 0.70) / 0.30;
            const opacity = Math.max(0, 1 - exitProgress * 1.5);
            const translateY = -exitProgress * 60;
            contentWrap.style.opacity = `${opacity.toFixed(3)}`;
            contentWrap.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
          } else {
            contentWrap.style.opacity = "1";
            contentWrap.style.transform = "translate3d(0, 0, 0)";
          }
        }
      };

      // Initial frame setup
      applyScrollState(0);

      // Entrance animation on mount
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-telemetry-tag", {
        opacity: 0,
        y: -15,
        duration: 0.8,
      })
        .from(
          ".hero-word-first",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.4"
        )
        .from(
          ".hero-word-second",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.8"
        )
        .from(
          ".hero-footer-bar",
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
          },
          "-=0.6"
        );

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
          applyScrollState(self.progress);
        },
        onRefresh: (self) => {
          applyScrollState(self ? self.progress : (stInstance ? stInstance.progress : 0));
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
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-eclipse-black text-porcelain"
      style={{ height: "220vh" }}
      aria-label="Rayhan Khan — Portfolio Introduction"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between relative z-10 px-6 md:px-14 py-8 md:py-12 will-change-transform select-none"
      >
        {/* Living Background Frame Sequence Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block select-none pointer-events-none z-0"
        />

        {/* Ambient Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-eclipse-black/85 via-eclipse-black/45 to-eclipse-black/90 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 z-0" />

        {/* ============================================================
            FLOWING TEXT MARQUEE LAYERS (Cinematic Spatial Depth)
            ============================================================ */}
        <div className="absolute inset-0 flex flex-col justify-around pointer-events-none overflow-hidden z-[1] opacity-[0.06] select-none">
          {/* Upper Flowing Ticker (Drifts Left on Scroll) */}
          <div
            ref={tickerTopRef}
            className="whitespace-nowrap font-syne font-black uppercase text-[12vw] tracking-tighter will-change-transform leading-none text-porcelain"
          >
            AUTONOMOUS AI SYSTEMS &nbsp;&bull;&nbsp; COMPUTER VISION &nbsp;&bull;&nbsp; DISTRIBUTED BACKENDS &nbsp;&bull;&nbsp; EDGE INFERENCE &nbsp;&bull;&nbsp; FULL-STACK SYSTEMS &nbsp;&bull;&nbsp;
          </div>

          {/* Lower Flowing Ticker (Drifts Right on Scroll) */}
          <div
            ref={tickerBottomRef}
            className="whitespace-nowrap font-syne font-black uppercase text-[12vw] tracking-tighter will-change-transform leading-none text-ember"
          >
            FASTAPI &nbsp;&bull;&nbsp; PYTORCH &nbsp;&bull;&nbsp; NEXT.JS &nbsp;&bull;&nbsp; DINOV2 &nbsp;&bull;&nbsp; POSTGRESQL &nbsp;&bull;&nbsp; RASTERIO &nbsp;&bull;&nbsp; LANGGRAPH &nbsp;&bull;&nbsp;
          </div>
        </div>

        {/* Foreground Content Wrapper (Elevated & Responsive) */}
        <div
          ref={contentWrapRef}
          className="relative z-10 w-full max-w-[1400px] mx-auto h-full flex flex-col justify-between will-change-[opacity,transform]"
        >
          {/* Top Bar — Clean Identity & Real Status */}
          <div className="hero-telemetry-tag flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gunmetal/80 text-xs font-mono text-steel">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-heading font-bold text-porcelain tracking-wider uppercase text-xs">
                RAYHAN KHAN
              </span>
              <span className="text-steel/40 hidden sm:inline">&bull;</span>
              <span className="text-steel-light font-mono text-[11px]">NOIDA, UTTAR PRADESH, INDIA</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy/40 border border-ember/30">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
              <span className="text-porcelain uppercase tracking-widest text-[11px] font-mono font-medium">
                AVAILABLE FOR ENGINEERING ROLES
              </span>
            </div>
          </div>

          {/* Central Stage: Integrated Monumental Stack with Centred Portrait Anchor */}
          <div className="my-auto py-4 md:py-6 flex flex-col items-center text-center justify-center relative z-10 w-full">
            <h1 className="font-display text-[clamp(3.8rem,11.5vw,12.5rem)] font-extrabold uppercase leading-[0.80] tracking-tight text-porcelain select-none">
              <span className="hero-word-first block">
                RAYHAN
              </span>
            </h1>

            {/* Centred Portrait Anchor with Ambient Crimson Halo & 3D Pointer Tilt (analog-editorial reference) */}
            <div className="hero-portrait-stage relative flex justify-center items-center -my-3 sm:-my-6 z-20">
              <div className="absolute w-72 h-72 rounded-full bg-crimson/20 blur-3xl pointer-events-none" />

              <Tilt3DCard maxTilt={5} scale={1.02} glare={true} className="relative z-10">
                <div className="relative w-[200px] h-[250px] sm:w-[240px] sm:h-[300px] md:w-[270px] md:h-[340px] hero-portrait-mask flex items-end justify-center">
                  <img
                    src="/rayhan-headshot.jpg"
                    alt="Rayhan Khan"
                    className="w-full h-full object-cover object-top select-none pointer-events-none filter contrast-105 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/90 via-transparent to-transparent pointer-events-none" />
                </div>
              </Tilt3DCard>
            </div>

            <h1 className="font-display text-[clamp(3.8rem,11.5vw,12.5rem)] font-extrabold uppercase leading-[0.80] tracking-tight select-none z-10">
              <span className="hero-word-second block metallic-title">
                KHAN
              </span>
            </h1>

            <div className="mt-4 max-w-2xl">
              <span className="font-heading font-bold text-xs sm:text-sm md:text-base text-ember tracking-widest uppercase block">
                Full-Stack Systems &amp; Applied Machine Learning Engineer
              </span>
              <div className="flex flex-wrap justify-center gap-2 mt-3 font-mono text-[11px] text-steel-light">
                <span className="px-2.5 py-1 rounded bg-gunmetal/40 border border-gunmetal/80 text-porcelain">
                  FastAPI
                </span>
                <span className="px-2.5 py-1 rounded bg-gunmetal/40 border border-gunmetal/80 text-porcelain">
                  PyTorch
                </span>
                <span className="px-2.5 py-1 rounded bg-gunmetal/40 border border-gunmetal/80 text-porcelain">
                  DINOv2
                </span>
                <span className="px-2.5 py-1 rounded bg-gunmetal/40 border border-gunmetal/80 text-porcelain">
                  Next.js
                </span>
                <span className="px-2.5 py-1 rounded bg-gunmetal/40 border border-gunmetal/80 text-porcelain">
                  PostgreSQL
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Panel & Action Navigation */}
          <div className="hero-footer-bar pt-6 border-t border-gunmetal/80 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="font-heading text-xs uppercase tracking-widest text-ember font-bold block">
                ENGINEERING ETHOS
              </span>
              <p className="font-sans text-xs sm:text-sm md:text-base text-steel-light leading-relaxed">
                Engineering resilient backend architectures and integrating deep learning inference models into production applications.
              </p>
            </div>

            {/* Action Buttons with Magnetic Pointer Attraction (ECHO reference) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <MagneticButton pullStrength={10}>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Explore Systems</span>
                  <IconArrowRight className="w-3.5 h-3.5 rotate-90" />
                </a>
              </MagneticButton>

              <MagneticButton pullStrength={8}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-3 rounded-full border border-gunmetal hover:border-steel bg-eclipse-surface/80 text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  Resume
                </a>
              </MagneticButton>

              <MagneticButton pullStrength={8}>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-3 rounded-full border border-gunmetal hover:border-steel bg-eclipse-surface/80 text-steel hover:text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  GitHub
                </a>
              </MagneticButton>

              <MagneticButton pullStrength={8}>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-3 rounded-full border border-gunmetal hover:border-steel bg-eclipse-surface/80 text-steel hover:text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  LinkedIn
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Bottom Horizon Blend — Seamlessly bridges hero into About (ECHO reference) */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(17, 13, 19, 0.7) 45%, #110D13 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
