"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { IconArrowRight, IconExternalLink, IconGitHub, IconCrosshair } from "./CustomIcons";

interface WorksWheel3DProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

// ECHO WorksWheel Mathematical Constants
const CARD_H_RATIO = 0.42;
const CARD_MAX_W_RATIO = 0.46;
const CARD_RATIO = 1.45;
const STEP = 40; // Degrees between cards on the drum
const DRUM_RATIO = 2.22;
const LENS_RATIO = 2.7;
const RING_RATIO = 1.14;
const BOW_RATIO = 1.82;
const CULL = 1.8;
const WHEEL_UNITS = 850;
const DRAG_UNITS = 380;
const SETTLE_MS = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));

function calculatePlace(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel3D({ projects, onSelectProject }: WorksWheel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const count = projects.length;
  const lastIndex = Math.max(count - 1, 0);

  // Animation and physics state stored in refs to avoid re-renders during RAF
  const turnRef = useRef(0);
  const targetRef = useRef(0);
  const activeIndexRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const settlingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const metricsRef = useRef({
    cardW: 360,
    cardH: 248,
    ringR: 280,
    ringScale: 1,
    drumR: 550,
    bow: 450,
    depth: 670,
  });

  const updateMetrics = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const w = stage.clientWidth || 800;
    const h = stage.clientHeight || 560;

    const isMobile = w < 640;
    let cardW: number;
    let cardH: number;

    if (isMobile) {
      cardW = Math.min(w * 0.86, 340);
      cardH = cardW / 1.38;
    } else {
      cardW = Math.min(h * CARD_H_RATIO * CARD_RATIO, w * CARD_MAX_W_RATIO);
      cardH = cardW / CARD_RATIO;
    }

    const drumR = cardH * DRUM_RATIO;
    const ringR = cardH * RING_RATIO;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.2, 1)
      : 1;

    metricsRef.current = {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW_RATIO,
      depth: cardH * LENS_RATIO,
    };

    stage.style.perspective = `${metricsRef.current.depth}px`;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      card.style.width = `${cardW}px`;
      card.style.height = `${cardH}px`;
      card.style.marginLeft = `${-cardW / 2}px`;
      card.style.marginTop = `${-cardH / 2}px`;
    });
  }, [count]);

  const steerTo = useCallback((next: number) => {
    targetRef.current = clamp(next, 0, lastIndex);
  }, [lastIndex]);

  const handleNext = useCallback(() => {
    steerTo(Math.round(targetRef.current) + 1);
  }, [steerTo]);

  const handlePrev = useCallback(() => {
    steerTo(Math.round(targetRef.current) - 1);
  }, [steerTo]);

  // Main 3D Drum animation loop
  useEffect(() => {
    updateMetrics();

    let ro: ResizeObserver | null = null;
    if (stageRef.current) {
      ro = new ResizeObserver(() => {
        updateMetrics();
      });
      ro.observe(stageRef.current);
    }

    let isRunning = true;
    let frameId = 0;

    const draw = () => {
      if (!isRunning) return;
      frameId = requestAnimationFrame(draw);

      const gap = targetRef.current - turnRef.current;
      if (Math.abs(gap) < 0.0005) {
        turnRef.current = targetRef.current;
      } else {
        turnRef.current += gap * EASE;
      }

      const t = turnRef.current;
      const m = 1; // Pure 3D drum projection mode
      const pos = t;

      const { ringR, ringScale, drumR, bow } = metricsRef.current;

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const ringDeg = d * (360 / count);
        const card = cardRefs.current[i];

        if (card) {
          card.style.transform = calculatePlace(
            ringDeg,
            drumDeg,
            ringR,
            drumR,
            bow,
            m
          );

          // Alpha fade for back-facing cards to prevent clutter
          const isFacing = Math.abs(d) < CULL;
          card.style.opacity = isFacing ? (1 - Math.min(1, Math.abs(d) * 0.45)).toFixed(3) : "0";
          card.style.pointerEvents = isFacing && Math.abs(d) < 0.8 ? "auto" : "none";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 10));
        }

        const face = card ? (card.firstElementChild as HTMLElement) : null;
        if (face) {
          const isCurrent = Math.abs(d) < 0.4;
          face.style.borderColor = isCurrent ? "#FF493D" : "#29252E";
          face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
        }
      }

      const near = clamp(Math.round(pos), 0, lastIndex);
      if (near !== activeIndexRef.current) {
        activeIndexRef.current = near;
        setActiveIndex(near);
      }
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      if (ro) ro.disconnect();
    };
  }, [count, lastIndex, updateMetrics]);

  // Wheel scrubbing listener
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      const next = targetRef.current + delta / WHEEL_UNITS;

      // Only prevent default if within boundaries to avoid trapping the page scroll
      if (
        (delta > 0 && targetRef.current < lastIndex) ||
        (delta < 0 && targetRef.current > 0)
      ) {
        e.preventDefault();
      }

      steerTo(next);

      if (settlingTimerRef.current) clearTimeout(settlingTimerRef.current);
      settlingTimerRef.current = setTimeout(() => {
        steerTo(Math.round(targetRef.current));
      }, SETTLE_MS);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stage.removeEventListener("wheel", onWheel);
      if (settlingTimerRef.current) clearTimeout(settlingTimerRef.current);
    };
  }, [lastIndex, steerTo]);

  // Pointer drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    dragStartYRef.current = e.clientY;
    dragDeltaRef.current = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const diff = dragStartYRef.current - e.clientY;
    dragDeltaRef.current += Math.abs(diff);
    steerTo(targetRef.current + diff / DRAG_UNITS);
    dragStartYRef.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
    steerTo(Math.round(targetRef.current));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div ref={containerRef} className="w-full space-y-8 select-none">
      {/* Top Header & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gunmetal/80">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-ember font-bold block mb-1">
            CORE SYSTEMS REEL
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-porcelain">
            Specialized Architectures
          </h3>
        </div>

        {/* Step Counter & Buttons */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs text-steel-light bg-eclipse-surface px-3 py-1.5 rounded-lg border border-gunmetal">
            <span className="text-ember font-bold">0{activeIndex + 1}</span>
            <span className="text-steel/50 mx-1.5">/</span>
            <span>0{count}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous Project in 3D Wheel"
              className="w-10 h-10 rounded-full border border-gunmetal hover:border-ember bg-eclipse-surface text-steel hover:text-porcelain disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === lastIndex}
              aria-label="Next Project in 3D Wheel"
              className="w-10 h-10 rounded-full border border-gunmetal hover:border-ember bg-eclipse-surface text-steel hover:text-porcelain disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Drum Stage + Side Index Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Perspective Stage Container */}
        <div className="lg:col-span-8 relative">
          <div
            ref={stageRef}
            tabIndex={0}
            role="listbox"
            aria-label="3D Cylindrical Projects Wheel"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-2xl bg-eclipse-surface border border-gunmetal overflow-hidden cursor-grab active:cursor-grabbing outline-none focus-visible:ring-1 focus-visible:ring-ember touch-pan-x"
          >
            {/* Ambient Vignette Overlay */}
            <div className="absolute inset-0 bg-radial from-transparent via-eclipse-surface/40 to-eclipse-black/90 pointer-events-none z-10" />

            {/* Reel Status Badge */}
            <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-eclipse-black/85 border border-gunmetal text-[11px] font-mono text-steel">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
              <span>INTERACTIVE 3D REEL</span>
            </div>

            {/* Perspective Wheel 3D Anchor */}
            <div
              ref={wheelRef}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  id={`works-card-${idx}`}
                  role="option"
                  aria-selected={idx === activeIndex}
                  onClick={() => {
                    if (dragDeltaRef.current > 8) return;
                    if (idx === activeIndex) {
                      onSelectProject(proj);
                    } else {
                      steerTo(idx);
                    }
                  }}
                  className="group absolute cursor-pointer pointer-events-auto [backface-visibility:hidden] transition-shadow duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-eclipse-elevated border border-gunmetal shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Project Imagery */}
                    {proj.image ? (
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 768px) 320px, 460px"
                        className="object-cover object-top select-none pointer-events-none grayscale contrast-115 group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-eclipse-surface text-steel font-mono text-xs">
                        <span>{proj.title}</span>
                      </div>
                    )}

                    {/* Gradient Overlay for Text Readability */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-eclipse-black via-eclipse-black/40 to-transparent" />

                    {/* Card Content Overlay */}
                    <div className="pointer-events-none absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 text-[11px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                          {proj.contextLabel || proj.date}
                        </span>
                        <span className="text-[11px] font-mono text-ember uppercase tracking-wider">
                          INDEX 0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-tight text-porcelain drop-shadow-sm mb-1">
                          {proj.title}
                        </h4>
                        <p className="font-sans text-xs text-steel-light line-clamp-2">
                          {proj.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Inspect Action Pill */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono">
              <span className="bg-eclipse-black/90 px-3 py-1.5 rounded-lg border border-gunmetal text-steel-light">
                {activeProject.stats}
              </span>
              <button
                onClick={() => onSelectProject(activeProject)}
                className="pointer-events-auto px-4 py-1.5 rounded-lg bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <span>Inspect Dossier</span>
                <IconArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Index Directory */}
        <div className="lg:col-span-4 space-y-6 bg-eclipse-surface p-6 rounded-2xl border border-gunmetal">
          <div className="flex items-center justify-between border-b border-gunmetal/60 pb-3">
            <span className="font-heading text-xs uppercase tracking-wider text-porcelain font-bold">
              Active System
            </span>
            <span className="text-xs font-mono text-ember">
              ID: {activeProject.id.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight text-porcelain">
              {activeProject.title}
            </h4>
            <p className="text-xs font-heading font-medium text-ember uppercase tracking-wider">
              {activeProject.subtitle}
            </p>
            <p className="text-xs sm:text-sm font-sans text-steel-light leading-relaxed">
              {activeProject.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-1.5 pt-2 border-t border-gunmetal/60">
            <span className="text-[11px] font-mono text-steel uppercase tracking-wider block mb-1">
              Architecture Highlights
            </span>
            {activeProject.deliverables?.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-sans text-steel-light">
                <span className="text-ember font-mono">&rsaquo;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {activeProject.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 text-[11px] font-mono bg-eclipse-elevated text-steel-light border border-gunmetal rounded"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Direct Action Buttons */}
          <div className="pt-4 border-t border-gunmetal/60 flex items-center gap-3">
            <button
              onClick={() => onSelectProject(activeProject)}
              className="flex-1 py-2.5 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <span>View Full Dossier</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </button>
            {activeProject.links.github && (
              <a
                href={activeProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${activeProject.title} source code`}
                className="p-2.5 rounded-full bg-gunmetal hover:bg-gunmetal-border text-steel hover:text-porcelain transition-colors inline-flex items-center justify-center"
              >
                <IconGitHub className="w-4 h-4" />
              </a>
            )}
            {activeProject.links.live && (
              <a
                href={activeProject.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${activeProject.title} live deployment`}
                className="p-2.5 rounded-full bg-gunmetal hover:bg-gunmetal-border text-steel hover:text-porcelain transition-colors inline-flex items-center justify-center"
              >
                <IconExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Quick-Jump Index Navigation Bar */}
          <div className="pt-2 border-t border-gunmetal/40">
            <span className="text-[11px] font-mono text-steel uppercase tracking-wider block mb-2">
              Reel Index
            </span>
            <div className="flex flex-col space-y-1">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => steerTo(idx)}
                  className={`flex items-center justify-between text-left px-2.5 py-1.5 rounded transition-all text-xs font-mono ${
                    idx === activeIndex
                      ? "bg-eclipse-elevated text-ember font-bold border-l-2 border-ember"
                      : "text-steel hover:text-porcelain hover:bg-eclipse-elevated/40"
                  }`}
                >
                  <span className="truncate">{proj.title}</span>
                  <span className="text-[11px] text-steel/60">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
