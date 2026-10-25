"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  pullStrength?: number; // Maximum offset in px (default: 12)
  strength?: number; // Alias for pull strength
  radius?: number; // Optional radius for boundary clamp
}

/**
 * MagneticButton — Elastic Magnetic Pointer Attraction
 * Reverse-engineered from ECHO-Design-Studio interactive button physics.
 * Pulls the button element smoothly toward the cursor when hovering
 * within proximity, snapping back with spring release on exit.
 */
export function MagneticButton({
  children,
  className = "",
  pullStrength = 12,
  strength,
  radius,
}: MagneticButtonProps) {
  const activeStrength = strength !== undefined ? (strength <= 1 ? Math.round(strength * 40) : strength) : pullStrength;
  const buttonRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const animate = () => {
      // Spring easing interpolation
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.18;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.18;

      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(${currentOffset.current.x.toFixed(
          2
        )}px, ${currentOffset.current.y.toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distFromCenterX = (e.clientX - centerX) / (rect.width / 2);
    const distFromCenterY = (e.clientY - centerY) / (rect.height / 2);

    targetOffset.current = {
      x: Math.max(-activeStrength, Math.min(activeStrength, distFromCenterX * activeStrength)),
      y: Math.max(-activeStrength, Math.min(activeStrength, distFromCenterY * activeStrength)),
    };
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    targetOffset.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{
        transition: isHovered ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
