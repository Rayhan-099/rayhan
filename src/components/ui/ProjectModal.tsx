"use client";

import React, { useEffect } from "react";
import { Project } from "@/types";
import { IconClose, IconExternalLink, IconGitHub, IconCrosshair } from "./CustomIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
            <p className="text-sm font-chakra font-medium text-ember mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-steel hover:text-porcelain hover:bg-gunmetal rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-crimson"
            aria-label="Close project details"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry bar */}
        <div className="flex items-center gap-2 p-3 bg-eclipse-elevated border border-gunmetal/60 rounded-md mb-6 text-xs font-mono text-steel">
          <IconCrosshair className="w-4 h-4 text-ember flex-shrink-0" />
          <span className="truncate">{project.stats}</span>
        </div>

        {/* Body content */}
        <div className="space-y-6 text-sm text-porcelain/90">
          <div>
            <h3 className="font-chakra font-bold text-xs uppercase tracking-wider text-ember mb-2">
              System Purpose
            </h3>
            <p className="leading-relaxed text-porcelain/80 font-sans">{project.description}</p>
          </div>

          {project.details && project.details.length > 0 && (
            <div>
              <h3 className="font-chakra font-bold text-xs uppercase tracking-wider text-ember mb-2">
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
              <h3 className="font-chakra font-bold text-xs uppercase tracking-wider text-ember mb-2">
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
