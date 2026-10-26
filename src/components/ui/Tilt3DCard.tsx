"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 6)
  perspective?: number; // Perspective distance in px (default: 1000)
  scale?: number; // Subtle hover scale (default: 1.015)
  glare?: boolean; // Whether to render specular flare reflection
  glareOpacity?: number; // Maximum glare opacity (default: 0.15)
}

/**
 * Tilt3DCard : Quaternion-Damped 3D Perspective Tilt & Specular Flare
 * Reverse-engineered from analog-editorial-portfolio 3D object orientation matrix.
 * Calculates normalized pointer coordinates relative to card bounds and smoothly
 * interpolates pitch and yaw angles via requestAnimationFrame lerping.
 */
export function Tilt3DCard({
  children,
  className = "",
  maxTilt = 6,
  perspective = 1000,
  scale = 1.015,
  glare = true,
  glareOpacity = 0.15,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetAngles = useRef({ x: 0, y: 0 });
  const currentAngles = useRef({ x: 0, y: 0 });
  const glareCoords = useRef({ x: 50, y: 50, opacity: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const animate = () => {
      // Damped lerp interpolation (smoothing factor: 0.12)
      currentAngles.current.x += (targetAngles.current.x - currentAngles.current.x) * 0.12;
      currentAngles.current.y += (targetAngles.current.y - currentAngles.current.y) * 0.12;

      if (cardRef.current) {
        if (isHovered) {
          cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${currentAngles.current.x.toFixed(
            2
          )}deg) rotateY(${currentAngles.current.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`;
        } else {
          // Smooth return to rest orientation
          if (
            Math.abs(currentAngles.current.x) > 0.05 ||
            Math.abs(currentAngles.current.y) > 0.05
          ) {
            cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${currentAngles.current.x.toFixed(
              2
            )}deg) rotateY(${currentAngles.current.y.toFixed(2)}deg) scale3d(1, 1, 1)`;
          } else {
            cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovered, maxTilt, perspective, scale, reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType === "touch") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Strictly bounded normalized coordinates from -0.5 to +0.5 relative to center
    const rawX = (e.clientX - rect.left) / rect.width - 0.5;
    const rawY = (e.clientY - rect.top) / rect.height - 0.5;
    const normX = Math.max(-0.5, Math.min(0.5, rawX));
    const normY = Math.max(-0.5, Math.min(0.5, rawY));

    // Pitch (rotateX) and Yaw (rotateY)
    targetAngles.current.x = -normY * maxTilt * 2;
    targetAngles.current.y = normX * maxTilt * 2;

    if (glare) {
      glareCoords.current = {
        x: (normX + 0.5) * 100,
        y: (normY + 0.5) * 100,
        opacity: glareOpacity,
      };
    }
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType === "touch") return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    targetAngles.current = { x: 0, y: 0 };
    glareCoords.current.opacity = 0;
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`will-change-transform transform-gpu ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}

      {/* Dynamic Specular Flare Reflection */}
      {glare && !reducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glareCoords.current.x}% ${glareCoords.current.y}%, rgba(255, 255, 255, ${glareCoords.current.opacity}), transparent 75%)`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
