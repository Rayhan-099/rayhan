import React from "react";
import Link from "next/link";
import { IconArrowRight, IconCrosshair } from "@/components/ui/CustomIcons";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-telemetry text-ember mb-4">
        <IconCrosshair className="w-4 h-4" />
        <span>Telemetry Fault 404 / Route Missing</span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-porcelain mb-4">
        OUT OF BOUNDS
      </h1>

      <p className="text-sm md:text-base text-steel max-w-md mb-8 leading-relaxed">
        The requested coordinate does not exist in the active systems registry. Please return to the primary navigation index.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-crimson hover:bg-crimson-hover text-porcelain font-mono text-xs uppercase tracking-wider rounded transition-colors"
      >
        <span>Return to Primary System</span>
        <IconArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
