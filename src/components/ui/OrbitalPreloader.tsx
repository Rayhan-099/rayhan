"use client";

import React, { useEffect, useRef, useState } from "react";

export function OrbitalPreloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    // Only run on fresh page load, don't repeat endlessly
    const hasLoaded = sessionStorage.getItem("rayhan_preloader_done");
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 160 * dpr;
    canvas.height = 160 * dpr;
    ctx.scale(dpr, dpr);

    const startTime = performance.now();
    const duration = 1100; // 1.1s sleek non-blocking intro
    const dotsCount = 18;
    const radius = 48;

    const render = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      
      // Update progress percentage
      setProgress(Math.round(t * 100));

      ctx.clearRect(0, 0, 160, 160);
      const centerX = 80;
      const centerY = 80;

      // Base orbital guide ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(41, 37, 46, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Orbiting particles with harmonic wave phase
      for (let i = 0; i < dotsCount; i++) {
        const angle = (i / dotsCount) * Math.PI * 2 + (time * 0.003);
        const wave = Math.sin(angle * 3 + time * 0.005) * 4;
        const currentRadius = radius + wave;

        const x = centerX + Math.cos(angle) * currentRadius;
        const y = centerY + Math.sin(angle) * currentRadius;

        // Ember to porcelain gradient points
        const alpha = 0.3 + 0.7 * Math.sin((i / dotsCount) * Math.PI);
        const isLead = i === Math.floor(((time * 0.002) % 1) * dotsCount);

        ctx.beginPath();
        ctx.arc(x, y, isLead ? 2.8 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isLead ? "#FF493D" : `rgba(245, 232, 232, ${alpha * 0.8})`;
        ctx.shadowColor = isLead ? "#FF493D" : "transparent";
        ctx.shadowBlur = isLead ? 8 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        // Complete and fade
        setFading(true);
        sessionStorage.setItem("rayhan_preloader_done", "true");
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }
    };

    rafRef.current = requestAnimationFrame(render);

    // Hard fallback timeout so user is never trapped
    const fallbackTimer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 300);
    }, 1500);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-eclipse-black transition-opacity duration-500 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          style={{ width: "160px", height: "160px" }}
          className="select-none pointer-events-none"
        />
        <div className="mt-4 flex flex-col items-center">
          <span className="font-mono text-xs text-steel tabular-nums tracking-widest">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
