import React from "react";

interface SkeletonMediaProps {
  aspectRatio?: string; // e.g., "aspect-[16/9]", "aspect-[4/3]"
  className?: string;
  label?: string;
}

/**
 * SkeletonMedia
 * High-precision architectural loading placeholder for asynchronous images and canvases.
 * Features subtle gunmetal-to-eclipse shimmer, telemetry crosshairs, and reduced-motion fallback.
 */
export function SkeletonMedia({
  aspectRatio = "aspect-video",
  className = "",
  label = "ACQUIRING_ASSET",
}: SkeletonMediaProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading: ${label}`}
      className={`relative w-full overflow-hidden bg-eclipse-surface border border-gunmetal/70 rounded-xl flex items-center justify-center ${aspectRatio} ${className}`}
    >
      {/* Background Subtle Gradient Shimmer */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent motion-safe:animate-[shimmer_2s_infinite] -translate-x-full"
        style={{
          animationTimingFunction: "ease-in-out",
        }}
      />

      {/* Subtle Corner Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gunmetal-border/80" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gunmetal-border/80" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gunmetal-border/80" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gunmetal-border/80" />

      {/* Center Precision Telemetry Marker */}
      <div className="flex flex-col items-center gap-1.5 z-10 opacity-60">
        <div className="w-4 h-4 border border-ember/40 rounded-sm flex items-center justify-center">
          <div className="w-1 h-1 bg-ember/80" />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-steel uppercase select-none">
          {label}
        </span>
      </div>
    </div>
  );
}
