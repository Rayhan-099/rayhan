"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { IconClose, IconExternalLink, IconGitHub, IconCrosshair } from "./CustomIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeViewIdx, setActiveViewIdx] = useState(0);

  useEffect(() => {
    setActiveViewIdx(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (project.gallery && project.gallery.length > 1) {
          setActiveViewIdx((prev) => (prev + 1) % project.gallery!.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (project.gallery && project.gallery.length > 1) {
          setActiveViewIdx((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-eclipse-black/90"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-eclipse-surface border border-gunmetal-border rounded-xl p-6 md:p-8 shadow-2xl z-10">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gunmetal pb-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs uppercase tracking-telemetry text-ember">
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
              className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-porcelain uppercase"
            >
              {project.title}
            </h2>
            <p className="text-sm font-heading font-medium text-ember mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-steel hover:text-porcelain hover:bg-gunmetal rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-crimson"
            aria-label="Close project details"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Architectural Media Stage (analog-editorial & ECHO reference) */}
        <div className="space-y-3 mb-6">
          {project.gallery && project.gallery.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-steel uppercase tracking-wider mr-1 hidden sm:inline-block">
                VIEWS:
              </span>
              {project.gallery.map((view, idx) => (
                <button
                  key={view.id}
                  onClick={() => setActiveViewIdx(idx)}
                  className={`px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all duration-200 ${
                    activeViewIdx === idx
                      ? "bg-crimson text-porcelain font-bold shadow-sm ring-1 ring-ember/40"
                      : "bg-eclipse-elevated text-steel hover:text-porcelain border border-gunmetal hover:border-steel"
                  }`}
                  aria-pressed={activeViewIdx === idx}
                >
                  {view.label}
                </button>
              ))}
            </div>
          )}

          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-gunmetal bg-eclipse-black shadow-xl group">
            <Image
              src={currentView.image}
              alt={currentView.caption || project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-top transition-opacity duration-300"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eclipse-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Telemetry Caption within Media Stage */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-steel-light bg-eclipse-black/90 px-3 py-1.5 rounded-lg border border-gunmetal shadow-md">
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
        <div className="flex items-center gap-2 p-3 bg-eclipse-elevated border border-gunmetal/60 rounded-md mb-6 text-xs font-mono text-steel">
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

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 mt-8 border-t border-gunmetal">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-crimson hover:bg-crimson-hover text-porcelain text-xs font-sans font-medium uppercase tracking-wider rounded transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gunmetal hover:bg-gunmetal-border text-porcelain text-xs font-sans font-medium uppercase tracking-wider rounded transition-colors"
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
