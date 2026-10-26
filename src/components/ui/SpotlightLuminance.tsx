"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SpotlightLuminanceProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  spotlightRadius?: number;
  color?: string;
  spotlightColor?: string;
  borderColor?: string;
  borderHighlightColor?: string;
}

/**
 * SpotlightLuminance : Cursor-Responsive Dynamic Radial Luminance
 * Reverse-engineered from ECHO-Design-Studio SpotlightReveal.
 * Damped spring physics tracks pointer coordinates, projecting dynamic
 * specular luminance and border highlights across darkroom surfaces.
 */
export function SpotlightLuminance({
  children,
  className = "",
  radius = 280,
  spotlightRadius,
  color = "rgba(255, 73, 61, 0.08)", // Ember ambient specular
  spotlightColor,
  borderColor = "rgba(255, 73, 61, 0.28)",
  borderHighlightColor,
}: SpotlightLuminanceProps) {
  const activeRadius = spotlightRadius ?? radius;
  const activeColor = spotlightColor ?? color;
  const activeBorderColor = borderHighlightColor ?? borderColor;

  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const inView = useRef(true);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  // Auto-pause loop when out of viewport for zero background CPU load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const loop = () => {
      if (inView.current && containerRef.current && isHovered) {
        const dx = mouse.current.x - smooth.current.x;
        const dy = mouse.current.y - smooth.current.y;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          smooth.current.x += dx * 0.18;
          smooth.current.y += dy * 0.18;

          containerRef.current.style.setProperty("--spotlight-x", `${smooth.current.x}px`);
          containerRef.current.style.setProperty("--spotlight-y", `${smooth.current.y}px`);
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isHovered]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;

    if (!isHovered) {
      smooth.current.x = mouse.current.x;
      smooth.current.y = mouse.current.y;
      setIsHovered(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouse.current = { x: -999, y: -999 };
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--spotlight-radius": `${activeRadius}px`,
          "--spotlight-color": activeColor,
          "--spotlight-border-color": activeBorderColor,
        } as React.CSSProperties
      }
    >
      {/* Specular Ambient Spotlight Glow Layer */}
      {!reducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
          style={{
            background: `radial-gradient(var(--spotlight-radius) circle at var(--spotlight-x, -999px) var(--spotlight-y, -999px), var(--spotlight-color), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Dynamic Border Glow Highlight */}
      {!reducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500 ease-out"
          style={{
            background: `radial-gradient(var(--spotlight-radius) circle at var(--spotlight-x, -999px) var(--spotlight-y, -999px), var(--spotlight-border-color), transparent 60%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
