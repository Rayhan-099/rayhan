import React from "react";
import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "text" | "circular" | "card";
  aspectRatio?: string;
}

export function SkeletonLoader({
  className,
  variant = "rectangular",
  aspectRatio,
}: SkeletonProps) {
  const baseClasses =
    "bg-gunmetal/60 relative overflow-hidden border border-gunmetal/80 transition-opacity duration-300 motion-safe:animate-pulse";

  if (variant === "text") {
    return (
      <div
        className={clsx(baseClasses, "h-4 w-full rounded", className)}
        role="status"
        aria-busy="true"
        aria-label="Loading text content"
      >
        <span className="sr-only">Loading text...</span>
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <div
        className={clsx(baseClasses, "rounded-full", className)}
        role="status"
        aria-busy="true"
        aria-label="Loading media"
      >
        <span className="sr-only">Loading media...</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={clsx(
          baseClasses,
          "p-6 rounded-lg flex flex-col space-y-4",
          className
        )}
        role="status"
        aria-busy="true"
        aria-label="Loading card content"
      >
        <div className="h-6 w-3/4 bg-gunmetal/80 rounded" />
        <div className="h-4 w-1/2 bg-gunmetal/50 rounded" />
        <div className="h-32 w-full bg-gunmetal/40 rounded-md mt-4" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-16 bg-gunmetal/70 rounded-full" />
          <div className="h-5 w-20 bg-gunmetal/70 rounded-full" />
        </div>
        <span className="sr-only">Loading project card...</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(baseClasses, "rounded-lg", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
      role="status"
      aria-busy="true"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function AsyncStateWrapper<T>({
  isLoading,
  error,
  isEmpty,
  data,
  skeleton,
  emptyMessage = "No records currently available.",
  children,
}: {
  isLoading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  data?: T;
  skeleton: React.ReactNode;
  emptyMessage?: string;
  children: (data: T) => React.ReactNode;
}) {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (error) {
    return (
      <div className="p-6 border border-crimson/40 bg-burgundy/20 rounded-lg text-porcelain text-sm">
        <p className="font-mono text-xs uppercase tracking-wider text-ember mb-1">
          Telemetry Error
        </p>
        <p className="text-steel">{error}</p>
      </div>
    );
  }

  if (isEmpty || !data) {
    return (
      <div className="p-8 border border-gunmetal bg-eclipse-surface rounded-lg text-center text-steel text-sm">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return <>{children(data)}</>;
}
