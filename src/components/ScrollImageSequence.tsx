"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ============================================================================
 * SCROLL & SPEED CONFIGURATION CONTROLS
 * ============================================================================
 * 
 * 1. SCROLL_LENGTH_VH:
 *    Controls how much vertical scrolling is required to advance through
 *    the entire sequence.
 *    - To make the sequence SLOWER (requires more scroll effort): Increase this value (e.g., 500 or 600).
 *    - To make the sequence FASTER (requires less scroll effort): Decrease this value (e.g., 250 or 300).
 *    Desktop default: 400vh.
 * 
 * 2. FRAME STRIDE (Desktop vs Mobile):
 *    Controls the sampling density of frames.
 *    - STRIDE_DESKTOP = 1: Preloads all 241 frames at full fidelity.
 *    - STRIDE_MOBILE = 2: Preloads every 2nd frame (~121 frames) on devices < 768px
 *      to conserve memory and mobile bandwidth, while strictly guaranteeing that the
 *      final ending frame (ezgif-frame-241.jpg) is preserved.
 */
export const SCROLL_LENGTH_VH = 400;
export const SCROLL_LENGTH_MOBILE_VH = 300;
export const TOTAL_FRAMES = 241;
export const STRIDE_DESKTOP = 1;
export const STRIDE_MOBILE = 2;

export function ScrollImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded image cache stored in ref to prevent unnecessary React re-renders during high-speed drawing
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameUrlsRef = useRef<string[]>([]);

  // Frame tracking & requestAnimationFrame coalescing refs
  const currentRenderedIndexRef = useRef<number>(-1);
  const targetFrameIndexRef = useRef<number>(0);
  const rafPendingRef = useRef<boolean>(false);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Component states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [totalTargetCount, setTotalTargetCount] = useState<number>(TOTAL_FRAMES);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState<number>(1);
  const [scrollProgressDisplay, setScrollProgressDisplay] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  /**
   * High-performance canvas drawing function
   * Renders image using "cover" aspect ratio mode centered on the viewport.
   * Caps devicePixelRatio at 2.0 to avoid excessive GPU/memory overhead on 3x-4x mobile screens.
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

    // Aspect ratio "cover" calculations
    const imgAspect = img.width / img.height;
    const canvasAspect = targetWidth / targetHeight;

    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      // Viewport is wider than 16:9 image
      drawWidth = targetWidth;
      drawHeight = targetWidth / imgAspect;
      offsetY = (targetHeight - drawHeight) / 2;
    } else {
      // Viewport is narrower / taller than 16:9 image
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
   * Preload frames deterministically based on device width & accessibility preferences
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      setIsReducedMotion(true);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    const isMobile = window.innerWidth < 768;
    const stride = isMobile ? STRIDE_MOBILE : STRIDE_DESKTOP;

    // Generate URLs with deterministic stride
    const urls: string[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += stride) {
      urls.push(`/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`);
    }

    // Crucial: Guarantee the final ending frame is ALWAYS included in the sequence
    const finalFrameUrl = `/frames/ezgif-frame-${String(TOTAL_FRAMES).padStart(3, "0")}.jpg`;
    if (urls[urls.length - 1] !== finalFrameUrl) {
      urls.push(finalFrameUrl);
    }

    frameUrlsRef.current = urls;
    setTotalTargetCount(urls.length);

    const loadedImages: HTMLImageElement[] = new Array(urls.length);
    let completedCount = 0;

    const onImageLoaded = (index: number, img: HTMLImageElement) => {
      if (isCancelled) return;
      loadedImages[index] = img;
      completedCount++;

      setLoadedCount(completedCount);
      const percent = Math.round((completedCount / urls.length) * 100);
      setLoadPercent(percent);

      // Render the first frame as soon as frame 0 is ready so canvas is never blank
      if (index === 0 && canvasRef.current) {
        renderFrameToCanvas(img);
        currentRenderedIndexRef.current = 0;
      }

      if (completedCount === urls.length) {
        imagesRef.current = loadedImages;
        setIsLoading(false);
        // Refresh ScrollTrigger to ensure all pin spacers and subsequent sections recalculate
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }
    };

    const onImageError = (index: number, url: string) => {
      if (isCancelled) return;
      console.warn(`[ScrollImageSequence] Failed to load frame at ${url}, falling back to placeholder`);
      completedCount++;
      setLoadedCount(completedCount);
      setHasError(true);

      // Use a blank or fallback Image
      const placeholder = new Image();
      loadedImages[index] = placeholder;

      if (completedCount === urls.length) {
        imagesRef.current = loadedImages;
        setIsLoading(false);
        ScrollTrigger.refresh();
      }
    };

    // Begin concurrent image preloading
    urls.forEach((url, idx) => {
      const img = new Image();
      img.src = url;
      img.onload = () => onImageLoaded(idx, img);
      img.onerror = () => onImageError(idx, url);
    });

    return () => {
      isCancelled = true;
    };
  }, [renderFrameToCanvas]);

  /**
   * Handle responsive resize and orientation changes
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
   * GSAP ScrollTrigger Integration
   * Pinned sequence with bidirectional scrub and normalized frame index mapping
   */
  useEffect(() => {
    if (isLoading || isReducedMotion || typeof window === "undefined") return;

    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    // Normalizing function: maps normalized progress (0.0 to 1.0) across total frame count
    const updateProgress = (progress: number) => {
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const totalCount = imagesRef.current.length;
      if (totalCount === 0) return;

      /**
       * Normalized frame index calculation:
       * frameIndex = Math.round(progress * (frameCount - 1))
       * Clamped between 0 and (frameCount - 1)
       */
      const targetIndex = Math.max(0, Math.min(totalCount - 1, Math.round(clampedProgress * (totalCount - 1))));

      requestFrameDraw(targetIndex);
      setActiveFrameDisplay(targetIndex + 1);
      setScrollProgressDisplay(Math.round(clampedProgress * 100));
    };

    // Dedicated ScrollTrigger with PINNING
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: stage,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        updateProgress(self.progress);
      },
      onRefresh: (self) => {
        updateProgress(self ? self.progress : 0);
      },
    });

    scrollTriggerInstanceRef.current = st;

    return () => {
      if (st) st.kill();
      scrollTriggerInstanceRef.current = null;
    };
  }, [isLoading, isReducedMotion, requestFrameDraw]);

  // ============================================================================
  // ACCESSIBILITY FALLBACK: PREFERS REDUCED MOTION
  // ============================================================================
  if (isReducedMotion) {
    return (
      <section
        id="neural-sequence"
        className="relative w-full py-24 bg-eclipse-black border-y border-gunmetal/80"
        aria-label="Neural Sequence Exploration"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gunmetal/80 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-telemetry text-crimson block mb-2">
                Static Visual Mode // Reduced Motion
              </span>
              <h2 className="text-3xl sm:text-4xl font-syne font-bold text-porcelain">
                Neural Latent Exploration
              </h2>
            </div>
            <p className="text-xs font-mono text-steel max-w-md">
              Continuous perception & spatial synthesis. Static high-resolution keyframe presented for accessibility.
            </p>
          </div>

          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gunmetal/80 bg-eclipse-elevated">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/frames/ezgif-frame-001.jpg"
              alt="Neural reconstruction scene depicting architectural pillars and celestial body"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[11px] text-porcelain-dim bg-eclipse-black/80 px-3 py-1.5 rounded border border-gunmetal">
              KEYFRAME 001 // 1920×1080 ARCHITECTURAL MANIFOLD
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================================
  // CINEMATIC SCROLL-LINKED SEQUENCE CONTAINER
  // ============================================================================
  return (
    <section
      id="neural-sequence"
      ref={containerRef}
      className="relative w-full bg-eclipse-black"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      aria-label="Scroll Driven Neural Image Sequence"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-eclipse-black z-20"
      >
        {/* HTML Canvas Render Surface */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block select-none pointer-events-none"
        />

        {/* ====================================================================
            MINIMALIST RESTILLED PRELOADER
            ==================================================================== */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-eclipse-black/95 px-6">
            <div className="w-full max-w-md p-6 bg-eclipse-surface border border-gunmetal/90 rounded-lg shadow-2xl">
              <div className="flex items-center justify-between font-mono text-xs text-steel mb-3">
                <span className="text-ember font-bold tracking-wider">BUFFERING NEURAL FRAMES</span>
                <span>{loadPercent}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-1.5 bg-gunmetal rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-burgundy via-crimson to-ember transition-all duration-150 ease-out"
                  style={{ width: `${loadPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-steel/70 mt-3">
                <span>STAGE: SYNTHETIC LATENT SAMPLING</span>
                <span>
                  {loadedCount} / {totalTargetCount} FRAMES
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            RESTRAINED EDITORIAL HUD TELEMETRY OVERLAY
            Non-intrusive edge metadata that frames the visual masterpiece
            ==================================================================== */}
        {!isLoading && (
          <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
            {/* Top Telemetry Bar */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 bg-eclipse-black/60 backdrop-none p-3 rounded border border-gunmetal/60">
                <span className="font-mono text-[10px] uppercase tracking-telemetry text-crimson font-bold">
                  SYS.02 // NEURAL RECONSTRUCTION
                </span>
                <span className="font-mono text-xs text-porcelain tracking-wide">
                  CONTINUOUS SPATIAL SYNTHESIS
                </span>
              </div>

              <div className="font-mono text-xs text-right bg-eclipse-black/60 p-3 rounded border border-gunmetal/60">
                <div className="text-ember font-bold tracking-widest">{scrollProgressDisplay}% COMPLETE</div>
                <div className="text-[10px] text-steel">
                  FRAME {String(activeFrameDisplay).padStart(3, "0")} / {String(totalTargetCount).padStart(3, "0")}
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="flex items-end justify-between">
              <div className="max-w-xs sm:max-w-sm hidden sm:block bg-eclipse-black/60 p-3 rounded border border-gunmetal/60">
                <span className="font-mono text-[10px] uppercase tracking-wider text-steel-light block">
                  HIGH-DIMENSIONAL SPATIAL MODELING
                </span>
                <p className="font-mono text-[11px] text-steel mt-0.5 leading-snug">
                  Scroll forward and reverse to traverse 241 continuous photographic perspectives rendered via HTML canvas.
                </p>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs text-steel-light bg-eclipse-black/60 px-4 py-2 rounded-full border border-gunmetal/70">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                <span className="tracking-wider uppercase">SCROLL TO TRAVERSE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
