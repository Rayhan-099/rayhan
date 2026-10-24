"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/content/certifications";
import { IconExternalLink, IconShield } from "../ui/CustomIcons";

export function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const featured = certifications.filter((c) => c.featured);
  const remaining = certifications.filter((c) => !c.featured);
  const displayed = showAll ? certifications : featured;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".cert-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-telemetry text-ember mb-2">
            07 / Empirical Credentials and Specializations
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-porcelain">
            Certifications.
          </h2>
        </div>
        <p className="text-xs font-mono text-steel max-w-sm">
          30+ verified industry specializations spanning agentic systems, vector databases, deep learning, and cloud infrastructure.
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayed.map((cert) => (
          <div
            key={cert.id}
            className="cert-item p-5 rounded-lg bg-eclipse-surface border border-gunmetal hover:border-crimson/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-2 text-xs font-mono text-steel border-b border-gunmetal/40">
                <span className="text-crimson font-semibold">{cert.issuer}</span>
                <span className="text-steel/70">ID: {cert.id.slice(0, 12)}...</span>
              </div>
              <h3 className="text-sm font-bold text-porcelain leading-snug">
                {cert.name}
              </h3>
            </div>

            <div className="pt-4 mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-steel/70">{cert.date}</span>
              {cert.link && cert.link !== "#" ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-steel hover:text-ember transition-colors"
                >
                  <IconShield className="w-3.5 h-3.5 text-crimson" />
                  <span>Verify Credential</span>
                  <IconExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-steel/60">
                  <IconShield className="w-3.5 h-3.5 text-steel/60" />
                  <span>Verified Record</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Toggle View More Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-6 py-2.5 font-mono text-xs uppercase tracking-wider bg-gunmetal hover:bg-gunmetal-border text-porcelain rounded transition-colors"
        >
          <span>{showAll ? "Collapse to Featured Credentials" : `View Full Archive (${certifications.length} Specializations)`}</span>
        </button>
      </div>
    </section>
  );
}
