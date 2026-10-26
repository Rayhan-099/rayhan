"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { IconClose, IconExternalLink, IconGitHub, IconCrosshair } from "./CustomIcons";
import { SkeletonMedia } from "./SkeletonMedia";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setActiveViewIdx(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    // Capture currently focused element for clean focus restoration
    if (typeof document !== "undefined") {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Set initial focus to close button
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap Tab focus inside modal
      if (e.key === "Tab" && modalContainerRef.current) {
        const focusableElements = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      // Safe keyboard arrow navigation between gallery views
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowRight") {
        if (project.gallery && project.gallery.length > 1) {
          e.preventDefault();
          setActiveViewIdx((prev) => (prev + 1) % project.gallery!.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (project.gallery && project.gallery.length > 1) {
          e.preventDefault();
          setActiveViewIdx((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      // Restore focus to trigger element
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentView = project.gallery?.[activeViewIdx] || {
    id: "default",
    label: "Overview",
    image: project.image,
    caption: project.subtitle,
    telemetry: project.stats,
  };
  const totalViews = project.gallery?.length || 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-eclipse-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalContainerRef}
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-eclipse-surface border border-gunmetal-border rounded-xl shadow-2xl z-10 overflow-hidden"
      >
        {/* Header (sticky at top) */}
        <div className="flex items-start justify-between border-b border-gunmetal p-5 sm:p-6 pb-4 bg-eclipse-surface/95 backdrop-blur-sm shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-mono text-xs uppercase tracking-telemetry text-ember font-bold">
                {project.date}
              </span>
              {project.contextLabel && (
                <span className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-burgundy text-porcelain border border-crimson/30 rounded">
                  {project.contextLabel}
                </span>
              )}
            </div>
            <h2
              id="modal-project-title"
              className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold tracking-tight text-porcelain uppercase"
            >
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-heading font-medium text-ember mt-0.5">{project.subtitle}</p>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 text-steel hover:text-porcelain hover:bg-gunmetal rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
            aria-label="Close project details"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Interactive Architectural Media Stage */}
          <div className="space-y-3">
            {project.gallery && project.gallery.length > 1 && (
              <div
                className="flex flex-wrap items-center gap-2"
                role="tablist"
                aria-label={`${project.title} architectural perspectives`}
              >
                <span className="text-[11px] font-mono text-steel uppercase tracking-wider mr-1 hidden sm:inline-block">
                  VIEWS:
                </span>
                {project.gallery.map((view, idx) => (
                  <button
                    key={view.id}
                    role="tab"
                    id={`modal-tab-${view.id}`}
                    aria-controls="modal-gallery-media"
                    aria-selected={activeViewIdx === idx}
                    onClick={() => setActiveViewIdx(idx)}
                    className={`px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson ${
                      activeViewIdx === idx
                        ? "bg-crimson text-porcelain font-bold shadow-sm ring-1 ring-ember/40"
                        : "bg-eclipse-elevated text-steel hover:text-porcelain border border-gunmetal hover:border-steel"
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            )}

            <div
              id="modal-gallery-media"
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-gunmetal bg-eclipse-black shadow-xl"
            >
              <SkeletonMedia label={project.title} className="absolute inset-0 z-0" />
              {project.gallery && project.gallery.length > 0 ? (
                project.gallery.map((view, idx) => (
                  <div
                    key={view.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-out ${
                      activeViewIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={view.image}
                      alt={view.caption || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover object-top"
                      priority={idx === 0}
                    />
                  </div>
                ))
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/85 via-transparent to-transparent pointer-events-none z-20" />

              {/* Bottom Telemetry Caption within Media Stage */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-steel-light bg-eclipse-black/90 px-3 py-1.5 rounded-lg border border-gunmetal shadow-md z-30">
                <span className="truncate">{currentView.telemetry || project.stats}</span>
                {totalViews > 1 && (
                  <span className="text-ember shrink-0 ml-2 font-bold font-mono">
                    VIEW {activeViewIdx + 1}/{totalViews}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Telemetry bar */}
          <div className="flex items-center gap-2 p-3 bg-eclipse-elevated border border-gunmetal/60 rounded-md text-xs font-mono text-steel">
            <IconCrosshair className="w-4 h-4 text-ember flex-shrink-0" />
            <span className="truncate">{project.stats}</span>
          </div>

          {/* Body content */}
          <div className="space-y-6 text-sm text-porcelain/90">
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-ember mb-2">
                System Purpose
              </h3>
              <p className="leading-relaxed text-porcelain/80 font-sans">{project.description}</p>
            </div>

            {project.details && project.details.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-ember mb-2">
                  Engineering Decisions
                </h3>
                <ul className="space-y-2">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-steel-light leading-relaxed font-sans">
                      <span className="font-mono text-xs text-ember mt-1 select-none">&rsaquo;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.deliverables && project.deliverables.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-ember mb-2">
                  Verified Deliverables
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 bg-eclipse-elevated/80 border border-gunmetal rounded text-xs font-sans text-steel-light"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h3 className="font-sans font-semibold text-xs uppercase tracking-wider text-steel mb-2">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-gunmetal/60 text-porcelain-dim border border-gunmetal rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions (sticky at bottom) */}
        <div className="flex items-center gap-4 p-5 sm:p-6 pt-4 border-t border-gunmetal bg-eclipse-surface/95 backdrop-blur-sm shrink-0">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-crimson hover:bg-crimson-hover text-porcelain text-xs font-sans font-medium uppercase tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <span>Live Deployment</span>
              <IconExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gunmetal hover:bg-gunmetal-border text-porcelain text-xs font-sans font-medium uppercase tracking-wider rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <IconGitHub className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
