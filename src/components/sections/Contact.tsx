"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/profile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  IconGitHub,
  IconLinkedIn,
  IconLeetCode,
  IconExternalLink,
  IconTerminal,
} from "../ui/CustomIcons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".contact-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-gunmetal/60"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Closing Bold Statement */}
        <div className="lg:col-span-7 space-y-6 contact-fade">
          <span className="font-heading text-xs uppercase tracking-widest text-ember font-bold block">
            INITIATE COLLABORATION
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight leading-[0.92] select-none">
            <span className="block text-porcelain">LET&apos;S TALK &bull;</span>
            <span className="block metallic-title mt-2">LET&apos;S BUILD</span>
          </h2>

          <p className="text-base md:text-lg text-steel-light max-w-xl leading-relaxed">
            I am currently open to software engineering opportunities, collaborative systems research, and challenging full-stack or machine learning initiatives.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-crimson hover:bg-crimson-hover text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors shadow-sm focus:ring-1 focus:ring-ember"
            >
              <IconTerminal className="w-4 h-4" />
              <span>{copied ? "Address Copied to Clipboard" : "Copy Direct Email"}</span>
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gunmetal hover:bg-gunmetal-border text-porcelain font-sans font-medium text-xs uppercase tracking-wider transition-colors"
            >
              <span>Open Mail Client</span>
              <IconExternalLink className="w-3.5 h-3.5 text-steel" />
            </a>
          </div>
        </div>

        {/* Right: Verified Coordinates & Profiles */}
        <div className="lg:col-span-5 contact-fade p-6 md:p-8 rounded-2xl bg-eclipse-surface border border-gunmetal space-y-6">
          <h3 className="font-heading text-xs uppercase tracking-wider text-porcelain font-bold pb-3 border-b border-gunmetal/60">
            Direct Routing
          </h3>

          <div className="space-y-4 text-sm font-mono">
            <div>
              <span className="text-xs text-steel/70 uppercase block mb-1">Electronic Mail</span>
              <a
                href={`mailto:${profile.email}`}
                className="text-porcelain hover:text-ember transition-colors"
              >
                {profile.email}
              </a>
            </div>

            <div>
              <span className="text-xs text-steel/70 uppercase block mb-1">Primary Location</span>
              <p className="text-porcelain font-sans font-medium">
                {profile.location}
              </p>
            </div>

            <div>
              <span className="text-xs text-steel/70 uppercase block mb-1">Availability</span>
              <p className="text-steel-light font-sans text-xs">
                Open to Full-Time Engineering Roles &amp; Remote Teams Worldwide
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gunmetal/60">
            <span className="text-xs font-sans text-steel/70 uppercase block mb-3">
              Verified Profiles
            </span>
            <div className="flex flex-col space-y-2 text-xs font-sans font-medium">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-eclipse-elevated border border-gunmetal/50 hover:border-crimson/50 text-steel hover:text-porcelain transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconGitHub className="w-4 h-4 text-crimson" />
                  <span>GitHub Profile</span>
                </div>
                <IconExternalLink className="w-3.5 h-3.5 text-steel/60" />
              </a>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-eclipse-elevated border border-gunmetal/50 hover:border-crimson/50 text-steel hover:text-porcelain transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconLinkedIn className="w-4 h-4 text-crimson" />
                  <span>LinkedIn Network</span>
                </div>
                <IconExternalLink className="w-3.5 h-3.5 text-steel/60" />
              </a>

              <a
                href={profile.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-eclipse-elevated border border-gunmetal/50 hover:border-crimson/50 text-steel hover:text-porcelain transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconLeetCode className="w-4 h-4 text-crimson" />
                  <span>LeetCode Algorithms</span>
                </div>
                <IconExternalLink className="w-3.5 h-3.5 text-steel/60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
