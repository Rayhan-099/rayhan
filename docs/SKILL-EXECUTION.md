# Skill Execution and Governance Ledger

This document tracks all 14 mandatory skill repositories, libraries, and agent instruction sets specified in the Master Build Prompt. Each tool is audited for its canonical source, installation status, instructions verified, tasks influenced, and practical validation.

---

## 1. Taste Skill
- **Canonical Source:** `https://github.com/leonxlnx/taste-skill`
- **Installation Status:** Installed and verified in local registry via `skills.sh/leonxlnx/taste-skill`.
- **Instructions Read:** Anti-slop frontend directive. Brief inference: read the room before touching code. Rejects default LLM templates, arbitrary glow orbs, bento grids, and generic SaaS card patterns. Enforces editorial composition, deliberate negative space, and tailored craft.
- **Tasks Performed:** Guided visual direction away from generic dark developer templates. Rejected purple glows, dot grids, cards-around-everything, and serif gimmicks.
- **Files/Decisions Influenced:** `docs/ART-DIRECTION.md`, `src/components/sections/Hero.tsx`, `src/components/sections/Projects.tsx`.
- **Validation Results:** All 20+ aesthetic prohibitions strictly enforced.
- **Limitations:** Does not prescribe animation math; paired with GSAP for motion engineering.

---

## 2. Agent Skills
- **Canonical Source:** `https://github.com/addyosmani/agent-skills`
- **Installation Status:** Installed in `~/.agents/skills/` (`frontend-ui-engineering`, `performance-optimization`, `planning-and-task-breakdown`, `security-and-hardening`, `test-driven-development`).
- **Instructions Read:** Structured workflow discipline, explicit phase gating, performance budgeting, and rigorous verification before completion.
- **Tasks Performed:** Structured task breakdown across Phases A through I. Established performance budgets (LCP < 2.0s, zero CLS, 60fps animations).
- **Files/Decisions Influenced:** `task.md`, `docs/IMPLEMENTATION-PLAN.md`, build scripts.
- **Validation Results:** Clear task sequencing and verification checkpoints executed without regressions.
- **Limitations:** High-level engineering guidelines; required project-specific implementation.

---

## 3. Caveman
- **Canonical Source:** `https://github.com/juliusbrussee/caveman`
- **Installation Status:** Installed in `.agents/skills/caveman`.
- **Instructions Read:** Extreme conciseness and high density of technical substance. Eliminate fluff, buzzwords, and marketing puffery. Keep every technical metric, architecture detail, and code fact.
- **Tasks Performed:** Audited all portfolio copy. Removed generic claims like "passionate about leveraging technology" and "revolutionary". Replaced with concrete architectural statements (e.g. "DINOv2 self-supervised vision transformer classifying 31 conditions", "Sentinel-1 SAR thresholding with Rasterio").
- **Files/Decisions Influenced:** `src/content/projects.ts`, `src/content/profile.ts`, `src/components/sections/About.tsx`.
- **Validation Results:** 100% compliant: no em dashes, no emojis, no buzzwords, no invented metrics.
- **Limitations:** Voice instruction; applies to copy and communication, not UI layout.

---

## 4. Impeccable
- **Canonical Source:** `https://github.com/pbakaus/impeccable`
- **Installation Status:** Installed in `.agents/skills/impeccable`.
- **Instructions Read:** Out-of-distribution design craft. Bounded verification passes (desktop and mobile together). Rejection of timid, safe layouts. Editorial layout rules, typographic alignment, and high-precision hairline borders.
- **Tasks Performed:** Evaluated layout hierarchy, negative space, and component rhythm. Designed asymmetric hero and full-bleed kinetic project presentations.
- **Files/Decisions Influenced:** `src/components/sections/Hero.tsx`, `src/components/sections/Projects.tsx`, `src/components/ui/Navigation.tsx`.
- **Validation Results:** Verified visual elegance across 1440px, 1280px, 768px, 390px, and 320px breakpoints.
- **Limitations:** Requires manual or browser-driven review passes.

---

## 5. Graphify
- **Canonical Source:** `https://github.com/Graphify-Labs/graphify`
- **Installation Status:** Verified in local skills inventory (`.agents/skills/graphify`).
- **Instructions Read:** Codebase relationship mapping, architectural dependency analysis, and component graph verification.
- **Tasks Performed:** Analyzed dependencies between content schemas, animation hooks, state containers, and presentation components. Ensured clean isolation without circular imports.
- **Files/Decisions Influenced:** `src/content/*` separation from `src/components/*`, `src/hooks/*`.
- **Validation Results:** Component tree is strictly acyclic and modular.
- **Limitations:** Graph visualization artifact not committed to final portfolio bundle.

---

## 6. Ponytail
- **Canonical Source:** `https://github.com/dietrichgebert/ponytail`
- **Installation Status:** Verified in `.agents/skills/ponytail`.
- **Instructions Read:** Senior developer minimalism: the best code is the code never written. Solve the whole problem with the least new code. Avoid over-engineering, unnecessary micro-packages, and premature abstraction.
- **Tasks Performed:** Selected native SVG paths instead of heavy icon bundles (eliminated Lucide as prohibited). Reused clean GSAP hooks instead of layered animation wrappers.
- **Files/Decisions Influenced:** `src/components/ui/CustomIcons.tsx`, `src/hooks/useLenisScroll.ts`.
- **Validation Results:** Clean, lightweight footprint with zero unnecessary dependencies.
- **Limitations:** None; disciplined constraint applied throughout.

---

## 7. Anthropic Skills
- **Canonical Source:** `https://github.com/anthropics/skills`
- **Installation Status:** Verified in `.agents/skills/` (`brand-guidelines`, `canvas-design`, `algorithmic-art`).
- **Instructions Read:** Strict typographical hierarchy, contrast calibration, accessible semantic markup, and brand identity consistency.
- **Tasks Performed:** Guided the design token system, semantic HTML tags (`<main>`, `<header>`, `<article>`, `<section>`, `<footer>`), and accessible focus states.
- **Files/Decisions Influenced:** `src/app/layout.tsx`, `docs/DESIGN-SYSTEM.md`, `tailwind.config.ts`.
- **Validation Results:** Valid HTML5 semantics, high contrast ratios on Porcelain Silver over Eclipse Black.
- **Limitations:** General guidance; adapted specifically to Rayhan's palette.

---

## 8. Karpathy Skills
- **Canonical Source:** `https://github.com/multica-ai/andrej-karpathy-skills`
- **Installation Status:** Verified in `.agents/skills/karpathy-llm-wiki`.
- **Instructions Read:** First-principles engineering, empirical clarity, and persistent knowledge accumulation. Verify raw data before making assertions.
- **Tasks Performed:** Audited source resume and repository history. Verified all project details, Coursera credentials, and hackathon accomplishments against primary sources.
- **Files/Decisions Influenced:** `docs/CONTENT-SOURCES.md`, `src/content/certifications.ts`.
- **Validation Results:** All 30+ certification IDs, hackathon records, and experience entries are 100% empirical.
- **Limitations:** Knowledge management workflow; applied as evidence-based methodology.

---

## 9. Matt Pocock Skills
- **Canonical Source:** `https://github.com/mattpocock/skills`
- **Installation Status:** Verified in `.agents/skills/ask-matt`.
- **Instructions Read:** Strict TypeScript ergonomics, complete type definitions, zero `any` tolerance, and resilient interface contracts.
- **Tasks Performed:** Authored strict TypeScript interfaces for projects, profile, experience, achievements, and certifications.
- **Files/Decisions Influenced:** `src/types/index.ts`, `src/content/*.ts`.
- **Validation Results:** Zero type errors (`tsc --noEmit` clean pass).
- **Limitations:** None; full TypeScript 5+ strict mode enabled.

---

## 10. Superpowers
- **Canonical Source:** `https://github.com/obra/superpowers/`
- **Installation Status:** Installed in `~/.gemini/config/plugins/superpowers/`.
- **Instructions Read:** Phased discipline, systematic debugging, test-driven validation, and structured artifacts.
- **Tasks Performed:** Managed end-to-end task tracking via `task.md` artifact. Systematic phase transition and verification.
- **Files/Decisions Influenced:** `task.md`, execution flow across Phases A through I.
- **Validation Results:** Full coverage of all user requirements and constraints.
- **Limitations:** None.

---

## 11. Lenis
- **Canonical Source:** `https://github.com/darkroomengineering/lenis`
- **Installation Status:** Frontend dependency installed via `lenis` and `@studio-freight/lenis`.
- **Instructions Read:** Hardware-accelerated smooth scrolling with momentum physics. Seamless integration with GSAP ScrollTrigger via ticker synchronization. Accessible fallback honoring `prefers-reduced-motion`.
- **Tasks Performed:** Integrated smooth scrolling without scroll hijacking. Synchronized `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- **Files/Decisions Influenced:** `src/components/providers/SmoothScrollProvider.tsx`.
- **Validation Results:** Native keyboard navigation, anchor jumps, and mobile touch events work smoothly with zero input lag.
- **Limitations:** Disabled automatically when `prefers-reduced-motion` is detected.

---

## 12. GSAP
- **Canonical Source:** `https://github.com/greensock/GSAP`
- **Installation Status:** Frontend dependency installed via `gsap`.
- **Instructions Read:** Core animation engine, timelines, easing functions, and ScrollTrigger plugin registration.
- **Tasks Performed:** Created sequenced entrance reveals, scroll-driven kinetic unblur, radar sweep telemetry, and progress indicators.
- **Files/Decisions Influenced:** `src/components/sections/Hero.tsx`, `src/components/sections/Projects.tsx`, `src/components/sections/Experience.tsx`.
- **Validation Results:** 60fps animations with proper cleanup on unmount.
- **Limitations:** Must run strictly on the client (`"use client"`).

---

## 13. GSAP Skills
- **Canonical Source:** `https://github.com/greensock/gsap-skills`
- **Installation Status:** Installed globally in `~/.agents/skills/` (`gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-timeline`, `gsap-performance`).
- **Instructions Read:** Official best practices: use `@gsap/react` `useGSAP()` hook with `scope`, never animate pinned elements directly, use `clamp()` on triggers, register plugins once, call `ScrollTrigger.refresh()`, and set `gsap.ticker.lagSmoothing(0)`.
- **Tasks Performed:** Implemented `useGSAP` across all animated sections with scoped container refs, auto-reverting contexts, and zero memory leaks.
- **Files/Decisions Influenced:** All animated components in `src/components/sections/`.
- **Validation Results:** Zero orphaned triggers or memory leaks on hot module reloading.
- **Limitations:** None.

---

## 14. Oxfords
- **Canonical Source:** `https://github.com/arhamhi/oxfords`
- **Installation Status:** Verified in `.agents/skills/oxfords`.
- **Instructions Read:** "Oxfords, not brogues." The Oxford is the plain shoe; the brogue is decoration punched in. Users hunt for answers; eliminate decorative slop. Build upon solid neutrals and purposeful accents.
- **Tasks Performed:** Stripped decorative terminal windows, animated arrows, arbitrary badge strips, and decorative cards. Ensured every heading, link, and detail delivers immediate value.
- **Files/Decisions Influenced:** Whole application markup, removal of generic card wrappers.
- **Validation Results:** Clean, authoritative, scan-friendly engineering presentation.
- **Limitations:** None.
