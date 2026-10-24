"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconMenu, IconClose, IconExternalLink, IconGitHub, IconLinkedIn } from "./CustomIcons";
import { profile } from "@/content/profile";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "CERTIFICATIONS", href: "#certifications" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ["about", "projects", "experience", "skills", "certifications", "contact"];
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 px-4 md:px-10 ${
        isScrolled ? "pt-3 pb-2" : "pt-6 pb-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand signature */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-eclipse-surface border border-gunmetal text-porcelain focus:outline-none"
        >
          <div className="w-2 h-2 bg-ember rounded-full group-hover:scale-125 transition-transform" />
          <span className="font-syne font-bold tracking-tight text-xs md:text-sm uppercase group-hover:text-ember transition-colors">
            RAYHAN KHAN
          </span>
        </Link>

        {/* Center Floating Pill Navigation (Restrained opaque surface, no glassmorphism) */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1 p-1 bg-eclipse-surface border border-gunmetal/90 rounded-full shadow-xl font-mono text-xs uppercase tracking-wider text-steel"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-crimson text-porcelain shadow-sm"
                    : "hover:text-porcelain hover:bg-gunmetal/50"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions & External Outlets */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 p-1 bg-eclipse-surface border border-gunmetal rounded-full">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-steel hover:text-porcelain hover:bg-gunmetal transition-colors"
              title="GitHub Profile"
            >
              <IconGitHub className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-steel hover:text-porcelain hover:bg-gunmetal transition-colors"
              title="LinkedIn Network"
            >
              <IconLinkedIn className="w-3.5 h-3.5" />
            </a>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-porcelain bg-crimson hover:bg-crimson-hover transition-colors shadow-sm focus:outline-none focus:ring-1 focus:ring-ember"
          >
            <span>Resume</span>
            <IconExternalLink className="w-3 h-3 text-porcelain/80" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-eclipse-surface border border-gunmetal text-steel hover:text-porcelain focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <IconClose className="w-4 h-4" /> : <IconMenu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Restrained opaque surface, no glassmorphism) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-[70px] bg-eclipse-surface border border-gunmetal/90 rounded-2xl p-6 shadow-2xl z-50">
          <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-syne font-bold text-sm uppercase tracking-wider text-steel hover:text-porcelain py-2 border-b border-gunmetal/40"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 flex items-center justify-between text-xs font-mono text-steel">
              <span>{profile.location}</span>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember hover:underline"
              >
                GitHub Profile →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
