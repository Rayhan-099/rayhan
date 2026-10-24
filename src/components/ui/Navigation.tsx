"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconMenu, IconClose, IconExternalLink } from "./CustomIcons";

const navItems = [
  { label: "Identity", href: "#about" },
  { label: "Systems", href: "#projects" },
  { label: "Chronology", href: "#experience" },
  { label: "Capabilities", href: "#skills" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-eclipse-black/90 backdrop-blur-md border-b border-gunmetal/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand signature */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-porcelain focus:outline-none"
        >
          <div className="w-2.5 h-2.5 bg-ember rounded-full group-hover:scale-125 transition-transform" />
          <span className="font-extrabold tracking-tight uppercase text-sm md:text-base group-hover:text-ember transition-colors">
            RAYHAN KHAN
          </span>
          <span className="hidden sm:inline-block font-mono text-xs text-steel/70 tracking-widest pl-2 border-l border-gunmetal">
            NOIDA 28.53° N
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-steel hover:text-porcelain transition-colors focus:outline-none focus:text-ember"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-porcelain bg-gunmetal/80 hover:bg-crimson border border-gunmetal rounded transition-colors focus:outline-none focus:ring-1 focus:ring-ember"
          >
            <span>Resume</span>
            <IconExternalLink className="w-3 h-3 text-steel-light" />
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-steel hover:text-porcelain focus:outline-none"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-eclipse-surface/95 backdrop-blur-xl border-b border-gunmetal p-6 shadow-2xl">
          <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-steel hover:text-porcelain py-2 border-b border-gunmetal/40"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-between font-mono text-sm uppercase tracking-widest text-ember py-2 pt-4"
            >
              <span>Download Resume</span>
              <IconExternalLink className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
