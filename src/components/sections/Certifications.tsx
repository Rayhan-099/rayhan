"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/content/certifications";
import { IconExternalLink, IconShield } from "../ui/CustomIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Certifications() {
  const [filter, setFilter] = useState<string>("featured");
  const containerRef = useRef<HTMLElement>(null);

  const getFilteredCertifications = () => {
    switch (filter) {
      case "featured":
        return certifications.filter((c) => c.featured);
      case "all":
        return certifications;
      case "ibm":
        return certifications.filter((c) => c.issuer.toLowerCase().includes("ibm"));
      case "google":
        return certifications.filter((c) => c.issuer.toLowerCase().includes("google"));
      case "other":
        return certifications.filter(
          (c) => !c.issuer.toLowerCase().includes("ibm") && !c.issuer.toLowerCase().includes("google")
        );
      default:
        return certifications.filter((c) => c.featured);
    }
  };

  const displayed = getFilteredCertifications();

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
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [filter] }
  );

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
      aria-label="Verified Certifications and Credentials"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gunmetal/60 gap-4">
        <div>
          <span className="font-heading text-xs uppercase tracking-widest text-ember font-bold block mb-2">
            INDUSTRY CREDENTIALS &amp; ARCHIVE
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-porcelain">
            Certifications
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed">
          30 verified industry specializations spanning agentic systems, vector databases, deep learning, and cloud infrastructure.
        </p>
      </div>

      {/* Filter Tabs & Live Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("featured")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filter === "featured"
                ? "bg-crimson text-porcelain font-bold shadow-sm"
                : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
            }`}
          >
            Featured ({certifications.filter((c) => c.featured).length})
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filter === "all"
                ? "bg-crimson text-porcelain font-bold shadow-sm"
                : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
            }`}
          >
            All Archive (30)
          </button>
          <button
            onClick={() => setFilter("ibm")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filter === "ibm"
                ? "bg-crimson text-porcelain font-bold shadow-sm"
                : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
            }`}
          >
            IBM (14)
          </button>
          <button
            onClick={() => setFilter("google")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filter === "google"
                ? "bg-crimson text-porcelain font-bold shadow-sm"
                : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
            }`}
          >
            Google (12)
          </button>
          <button
            onClick={() => setFilter("other")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filter === "other"
                ? "bg-crimson text-porcelain font-bold shadow-sm"
                : "bg-eclipse-surface text-steel hover:text-porcelain border border-gunmetal"
            }`}
          >
            Packt &amp; Others (4)
          </button>
        </div>

        <span className="font-mono text-xs text-steel/80 shrink-0">
          Displaying {displayed.length} of 30 verified credentials
        </span>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayed.map((cert) => (
          <div
            key={cert.id}
            className="cert-item p-5 rounded-xl bg-eclipse-surface border border-gunmetal/80 hover:border-crimson/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-2 text-xs font-mono text-steel border-b border-gunmetal/40">
                <span className="text-crimson font-bold uppercase">{cert.issuer}</span>
                <span className="text-steel/70">ID: {cert.id.slice(0, 14)}...</span>
              </div>
              <h3 className="text-sm font-bold font-syne uppercase tracking-tight text-porcelain leading-snug">
                {cert.name}
              </h3>
            </div>

            <div className="pt-4 mt-3 flex items-center justify-between text-xs font-mono border-t border-gunmetal/30">
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

      {/* Action Toggle if on featured */}
      {filter === "featured" && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setFilter("all")}
            className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider bg-eclipse-surface hover:bg-gunmetal border border-gunmetal/80 hover:border-crimson/50 text-porcelain transition-colors inline-flex items-center gap-2"
          >
            <span>View All 30 Credentials</span>
            <span>→</span>
          </button>
        </div>
      )}
    </section>
  );
}
