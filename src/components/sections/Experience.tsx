"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/content/experience";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const tickerTopRef = useRef<HTMLDivElement>(null);
  const tickerBottomRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState("01 / FOUNDATIONS & ACADEMIC RIGOR");
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { target: 0.05, label: "01 / ORIGIN" },
    { target: 0.45, label: "02 / SYNK AI" },
    { target: 0.85, label: "03 / BCG DATA SCIENCE" },
  ];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!sectionRef.current || !stageRef.current || !horizontalTrackRef.current) return;

      const isMobile = window.innerWidth < 768;
      if (prefersReducedMotion || isMobile) {
        // Fallback for mobile and reduced motion is handled via CSS layout
        return;
      }

      const section = sectionRef.current;
      const stage = stageRef.current;
      const track = horizontalTrackRef.current;
      const tickerTop = tickerTopRef.current;
      const tickerBottom = tickerBottomRef.current;
      const progressBar = progressBarRef.current;

      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth);
      };

      const applyHorizontalScroll = (progress: number) => {
        const clampedProgress = Math.max(0, Math.min(1, progress));
        const maxTranslate = getScrollDistance();
        const currentTranslateX = -clampedProgress * maxTranslate;

        // 1. Move Horizontal Camera
        track.style.transform = `translate3d(${currentTranslateX.toFixed(1)}px, 0, 0)`;

        // 2. Parallax background date typography
        const dateBgs = track.querySelectorAll<HTMLElement>(".exp-date-bg");
        dateBgs.forEach((dateEl) => {
          const factor = parseFloat(dateEl.getAttribute("data-parallax-factor") || "0.15");
          const dateOffset = -currentTranslateX * factor;
          dateEl.style.transform = `translate3d(${dateOffset.toFixed(1)}px, 0, 0)`;
        });

        // 3. Counter-drifting ambient background tickers
        if (tickerTop) {
          const topOffset = currentTranslateX * 0.35;
          tickerTop.style.transform = `translate3d(${topOffset.toFixed(1)}px, 0, 0)`;
        }
        if (tickerBottom) {
          const bottomOffset = -currentTranslateX * 0.25;
          tickerBottom.style.transform = `translate3d(${bottomOffset.toFixed(1)}px, 0, 0)`;
        }

        // 4. Progress bar HUD
        if (progressBar) {
          progressBar.style.width = `${(clampedProgress * 100).toFixed(1)}%`;
        }

        // 5. Update phase and active chapter indicator
        if (clampedProgress < 0.30) {
          setActivePhase("01 / FOUNDATIONS & ACADEMIC RIGOR");
          setActiveChapter(0);
        } else if (clampedProgress < 0.70) {
          setActivePhase("02 / APPLIED AI & VISION BENCHMARKS");
          setActiveChapter(1);
        } else {
          setActivePhase("03 / ENTERPRISE DATA SCIENCE & SIMULATION");
          setActiveChapter(2);
        }
      };

      applyHorizontalScroll(0);

      let stInstance: ScrollTrigger | null = null;
      stInstance = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          applyHorizontalScroll(self.progress);
        },
        onRefresh: (self) => {
          applyHorizontalScroll(self ? self.progress : (stInstance ? stInstance.progress : 0));
        },
      });

      return () => {
        if (stInstance) stInstance.kill();
      };
    },
    { scope: sectionRef }
  );

  const scrollToChapter = (targetProgress: number) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const totalDist = section.offsetHeight - window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetScroll = sectionTop + targetProgress * totalDist;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const bcg = experience.find((e) => e.id === "bcg-data-science")!;
  const synk = experience.find((e) => e.id === "synk-ai")!;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-eclipse-black text-porcelain md:h-[280vh]"
      aria-label="Professional Experience and Chronology"
    >
      {/* Pinned Viewport Stage (ECHO "Where I've Been" Horizontal Installation) */}
      <div
        ref={stageRef}
        className="relative w-full md:h-screen md:overflow-hidden flex flex-col justify-between py-12 md:py-16 px-6 md:px-14 will-change-transform z-10"
      >
        {/* Layer 0: Ambient Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(245, 232, 232, 0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Layer 1: Ambient Counter-Drifting Background Tickers */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-around pointer-events-none overflow-hidden opacity-[0.035] select-none z-0">
          <div
            ref={tickerTopRef}
            className="whitespace-nowrap font-syne font-black uppercase text-[13vw] tracking-tighter will-change-transform leading-none text-porcelain"
          >
            MACHINE LEARNING SYSTEMS &nbsp;&bull;&nbsp; DISTRIBUTED ARCHITECTURE &nbsp;&bull;&nbsp; EMPIRICAL DATA PIPELINES &nbsp;&bull;&nbsp;
          </div>
          <div
            ref={tickerBottomRef}
            className="whitespace-nowrap font-syne font-black uppercase text-[13vw] tracking-tighter will-change-transform leading-none text-ember"
          >
            2024 &nbsp;&bull;&nbsp; ACADEMIC FOUNDATIONS &nbsp;&bull;&nbsp; 2026 &nbsp;&bull;&nbsp; PRODUCTION INFERENCE &nbsp;&bull;&nbsp;
          </div>
        </div>

        {/* Top HUD Status Bar */}
        <header className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gunmetal/80 text-xs font-mono text-steel">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span className="text-porcelain uppercase tracking-widest font-bold">
              03 / WHERE I&apos;VE BEEN
            </span>
            <span className="text-steel/40">|</span>
            <span className="text-ember font-medium tracking-wider">{activePhase}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-steel/60">PROGRESSION</span>
            <div className="w-28 sm:w-36 h-[2px] bg-gunmetal rounded-full overflow-hidden">
              <div ref={progressBarRef} className="h-full bg-ember transition-all duration-75 w-0" />
            </div>
          </div>
        </header>

        {/* Center: Massive Horizontal Spatial Canvas */}
        <div className="relative z-20 flex-1 w-full my-auto overflow-hidden flex items-center">
          <div
            ref={horizontalTrackRef}
            className="flex flex-col md:flex-row items-stretch md:items-center h-full will-change-transform transition-none gap-12 md:gap-0"
            style={{ width: "100%", maxWidth: "none" }}
          >
            {/* ================= ENVIRONMENT 00: INTRO ENV (0vw - 80vw) ================= */}
            <div className="relative flex-shrink-0 w-full md:w-[75vw] px-4 md:px-12 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold block">
                  TRAJECTORY & FOCUS
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-syne font-extrabold uppercase tracking-tight text-porcelain leading-[0.9]">
                  WHERE I&apos;VE <br />
                  <span className="metallic-title">BEEN</span>
                </h2>
                <p className="font-sans text-sm md:text-base text-steel-light leading-relaxed pt-2">
                  A continuous progression from computer science foundations at Amity University to applied artificial intelligence research and enterprise-scale data science pipelines.
                </p>
                <div className="pt-4 flex items-center gap-3 text-xs font-sans text-steel">
                  <span>Scroll vertically to traverse timeline</span>
                  <span className="text-ember">→</span>
                </div>
              </div>
            </div>

            {/* ================= CHAPTER 01: SYNK AI (80vw - 175vw) ================= */}
            <div className="exp-panel relative flex-shrink-0 w-full md:w-[95vw] px-4 md:px-16 flex flex-col justify-center">
              {/* Background Parallax Year Typography */}
              <div
                className="exp-date-bg hidden md:block absolute -top-8 right-12 md:right-28 text-[12vw] md:text-[14vw] font-syne font-black uppercase text-porcelain/[0.035] tracking-tighter select-none pointer-events-none will-change-transform"
                data-parallax-factor="0.15"
              >
                2026
              </div>

              <div className="relative z-10 max-w-4xl p-6 md:p-10 rounded-2xl bg-eclipse-surface/85 border border-gunmetal shadow-2xl backdrop-blur-none">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                    MILESTONE 01 / {synk.date}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                    {synk.location}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain leading-[0.92] mb-3">
                  {synk.role}
                </h3>
                <p className="text-sm font-sans font-bold text-ember uppercase tracking-wider mb-6">
                  {synk.company}
                </p>

                <p className="font-sans text-sm md:text-base text-steel-light leading-relaxed max-w-2xl mb-6">
                  Engineered machine learning pipelines utilizing Python, PyTorch, Pandas, and NumPy for intelligent data products. Constructed preprocessing workflows, model evaluation harnesses, and iterative benchmark suites for production models.
                </p>

                {/* Milestone Deliverable Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gunmetal/80">
                  <div className="p-4 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
                    <span className="font-mono text-[10px] text-crimson uppercase tracking-wider block mb-1">
                      CORE CONTRIBUTION
                    </span>
                    <p className="font-sans text-xs text-porcelain/90 leading-relaxed">
                      Constructed preprocessing workflows and automated model evaluation harnesses for low-latency inference.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
                    <span className="font-mono text-[10px] text-crimson uppercase tracking-wider block mb-1">
                      STACK & BENCHMARKS
                    </span>
                    <p className="font-mono text-xs text-steel">
                      Python &bull; PyTorch &bull; Pandas &bull; NumPy &bull; Benchmarking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= CHAPTER 02: BCG DATA SCIENCE (175vw - 270vw) ================= */}
            <div className="exp-panel relative flex-shrink-0 w-full md:w-[95vw] px-4 md:px-16 flex flex-col justify-center">
              {/* Background Parallax Year Typography */}
              <div
                className="exp-date-bg hidden md:block absolute -top-8 right-12 md:right-28 text-[12vw] md:text-[14vw] font-syne font-black uppercase text-porcelain/[0.035] tracking-tighter select-none pointer-events-none will-change-transform"
                data-parallax-factor="0.15"
              >
                OCT 2026
              </div>

              <div className="relative z-10 max-w-4xl p-6 md:p-10 rounded-2xl bg-eclipse-surface/85 border border-gunmetal shadow-2xl backdrop-blur-none">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
                    MILESTONE 02 / {bcg.date}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-burgundy/80 text-porcelain border border-crimson/30 rounded">
                    {bcg.location}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl md:text-6xl font-syne font-extrabold uppercase tracking-tight text-porcelain leading-[0.92] mb-3">
                  {bcg.role}
                </h3>
                <p className="text-sm font-sans font-bold text-ember uppercase tracking-wider mb-6">
                  {bcg.company}
                </p>

                <p className="font-sans text-sm md:text-base text-steel-light leading-relaxed max-w-2xl mb-6">
                  Analyzed customer churn drivers for enterprise client datasets, formulating empirical investigation hypotheses. Engineered feature engineering pipelines and trained a Random Forest classifier achieving 50% recall on high-risk accounts.
                </p>

                {/* Milestone Deliverable Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gunmetal/80">
                  <div className="p-4 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
                    <span className="font-mono text-[10px] text-crimson uppercase tracking-wider block mb-1">
                      CLASSIFIER PRECISION
                    </span>
                    <p className="font-sans text-xs text-porcelain/90 leading-relaxed">
                      Optimized Random Forest hyperparameters to isolate statistical drivers of churn with actionable retention recommendations.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-eclipse-elevated border border-gunmetal/60">
                    <span className="font-mono text-[10px] text-crimson uppercase tracking-wider block mb-1">
                      STACK & TOOLS
                    </span>
                    <p className="font-mono text-xs text-steel">
                      Random Forest &bull; Scikit-Learn &bull; Statistical Testing &bull; Python
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Pills / Chapter Jumps */}
        <div className="hidden md:flex relative z-20 w-full max-w-[1400px] mx-auto items-center justify-between pt-4 border-t border-gunmetal/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => scrollToChapter(ch.target)}
                className={`px-4 py-2 rounded-full border transition-all text-xs font-sans font-medium uppercase tracking-wider ${
                  activeChapter === idx
                    ? "bg-crimson border-crimson text-porcelain"
                    : "border-gunmetal text-steel hover:text-porcelain hover:border-steel"
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>

          <div className="text-steel-light text-xs font-sans">
            Trajectory &bull; Noida &bull; Worldwide
          </div>
        </div>
      </div>
    </section>
  );
}
