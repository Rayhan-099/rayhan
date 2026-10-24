import React from "react";
import Link from "next/link";
import { profile } from "@/content/profile";
import { IconGitHub, IconLinkedIn, IconLeetCode } from "./CustomIcons";

export function Footer() {
  return (
    <footer className="w-full bg-eclipse-black border-t border-gunmetal py-16 text-steel">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gunmetal/60">
          {/* Identity & Status */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-ember animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-telemetry text-porcelain">
                System Status: Operational
              </span>
            </div>
            <h2 className="text-2xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
              Rayhan Khan
            </h2>
            <p className="text-sm text-steel max-w-md leading-relaxed">
              Software Engineer specializing in full-stack architecture, machine learning inference, and data-driven systems.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-syne text-xs uppercase tracking-wider text-porcelain font-bold">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-sans text-steel">
              <li>
                <a href="#about" className="hover:text-ember transition-colors">
                  01 / About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-ember transition-colors">
                  02 / Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-ember transition-colors">
                  03 / Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-ember transition-colors">
                  04 / Technical Skills
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-ember transition-colors">
                  05 / Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-ember transition-colors">
                  06 / Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social and Verified Outlets */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-syne text-xs uppercase tracking-wider text-porcelain font-bold">
              Connected Profiles
            </h3>
            <div className="flex flex-col space-y-2 text-xs font-sans text-steel">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-porcelain transition-colors"
              >
                <IconGitHub className="w-4 h-4 text-crimson" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-porcelain transition-colors"
              >
                <IconLinkedIn className="w-4 h-4 text-crimson" />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-porcelain transition-colors"
              >
                <IconLeetCode className="w-4 h-4 text-crimson" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Attribution Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-steel/70 gap-4">
          <p>© {new Date().getFullYear()} Rayhan Khan. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-porcelain transition-colors">
              Terms of Service
            </Link>
            <span className="text-gunmetal">|</span>
            <Link href="/privacy" className="hover:text-porcelain transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
