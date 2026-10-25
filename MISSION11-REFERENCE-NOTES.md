# MISSION 11 — REFERENCE & REVERSE-ENGINEERING NOTES

**Project:** Rayhan Khan — Personal Engineering Portfolio  
**Audit & Extraction Date:** October 25, 2026  
**Auditor:** Principal Creative Developer & Motion Architect  

---

## 1. Reference A: ECHO Website
- **Source Repository:** `https://github.com/Jishnu09-siuu/ECHO-WEBSITE`  
- **Local Directory:** `/mnt/d/Vyuk Projects/ECHO-WEBSITE` (served live on `http://localhost:8085`)  
- **Dissected Architecture:**
  - **Hero Stage:** Pinned scroll stage with kinetic marquee typography drifting counter-directionally based on normalized scroll progress (`translate3d(x, 0, 0)`). Living canvas sequence scrubbed via `requestAnimationFrame` coalescing.
  - **ScrollExpandMedia (About Transition):** Dual-layer container expansion: an initial constrained bounding card (`aspect-ratio: 16/10`) expands continuously to 94vw/86vh while scrubbing the 241-frame sequence. Dual-layer hardware unblur (`filter: blur(12px)` on backdrop fading smoothly to `opacity: 0` as progress advances past 0.35).
  - **Fluid Liquid Displacement (`FlexCarousel`):** WebGL shader utilizing `ogl` with vertex noise and fragment RGB displacement driven by pointer velocity and drag momentum.
  - **3D Drum Reel (`WorksWheel3D`):** Three.js cylindrical projection mapping project cards onto an orbital drum with inertial drag physics, responsive wheel scrub, and depth scaling.
  - **Key Design Lesson:** The motion serves the content. Elements do not bounce arbitrarily; every translation is directly proportional to scroll progress, maintaining a steady 1:1 tactile relationship between user input and visual response.

---

## 2. Reference B: ECHO Design Studio
- **Source Repository:** `https://github.com/Jishnu09-siuu/ECHO-Design-Studio`  
- **Local Directory:** `/mnt/d/Vyuk Projects/ECHO-Design-Studio`  
- **Dissected Architecture:**
  - **SpotlightReveal & Ambient Lighting:** Local radial gradients following cursor position with smooth lerp (`x += (targetX - x) * 0.08`).
  - **CustomCursor & Spring Physics:** Velocity-aware cursor deformation.
  - **Typography Restraint:** Strong, clean grotesque display lettering paired with generous line height and disciplined letter-spacing.
  - **Licensing Constraint:** Re-verified repository. **No license file exists.** Strictly zero code or asset copying; all observed interaction behaviors and lighting techniques are independently authored.
  - **Key Design Lesson:** The studio interface avoids dashboard clutter. Information is grouped with ample negative space; cards let imagery speak without drowning in metadata tags.

---

## 3. Reference C: Analog Editorial Portfolio
- **Source Repository:** `https://github.com/Jishnu09-siuu/analog-editorial-portfolio`  
- **Local Directory:** `/mnt/d/Vyuk Projects/analog-editorial-portfolio`  
- **Dissected Architecture:**
  - **3D Mechanical Object Presentation:** Three.js camera model with controlled lighting and material reflections.
  - **Darkroom Lighting Aesthetic:** Deep Obsidian surfaces (`#0E0C10`), subtle amber/crimson atmospheric backglows, and crisp typographic contrast.
  - **Licensing:** ISC License (permissive).
  - **Critical Art Direction Correction for Mission 11:** Mission 10 overinterpreted this reference by adding artificial photography stamps (`35MM MONOCHROME`, `ISO 400`, `D-76`) and fake metadata onto Rayhan's real portrait. In Mission 11, we strip away all fake photography jargon. The portrait is a real personal portrait of Rayhan Khan. We retain the restrained darkroom lighting and clean editorial borders, but remove all invented camera/film claims.

---

## 4. Reference D: REA — Reverse Engineer Anything
- **Source Repository:** `https://github.com/morluto/rea` (`rea-agents` on npm)  
- **Cloned & Inspected At:** `/mnt/d/Vyuk Projects/rea`  
- **Technical Analysis:**
  - REA is a specialized local-first Model Context Protocol (MCP) and CLI engine for deep reverse engineering of native binaries, Mach-O/ELF executables, decompiled functions, and application runtimes via bridge adapters (Ghidra, Hopper, IDA Pro).
  - **Applicability Assessment:** For client-side web applications running HTML5 Canvas, WebGL shaders (`ogl`/Three.js), and GSAP ScrollTrigger, REA's native binary analysis engine is not the primary tool; standard Chrome DevTools protocol, Puppeteer browser automation, and direct JavaScript runtime AST inspection provide exact DOM, shader, and network evidence.
  - **Findings Recorded:** REA's philosophy of *evidence provenance* (distinguishing verified facts from speculative hypotheses) is adopted directly for our asset integrity audit and performance testing.

---

## 5. Synthesis: Core Design Direction for Mission 11

| Section | Problem Identified in Mission 10 | Mission 11 Reference-Led Reset |
| :--- | :--- | :--- |
| **Hero** | Portrait pushed to right column; fake photography metadata (`35MM MONOCHROME`, `ISO 400`); reviewer switcher (`POSTER: [ A \| B ]`). | **Centre Rayhan's portrait as the unmistakable visual anchor.** Monumental typeset name, balanced negative space, zero fake metadata, zero reviewer toggles. |
| **Frame Sequences** | Converted to WebP against user preference. | **Restore the original 300 Hero JPGs and 241 About JPGs byte-identically.** Update manifests and canvas renderers to consume master JPGs. |
| **Typography** | Banned fonts (`Instrument Sans`, `Chivo Mono`, `Chakra Petch`) active across components. | **Complete purge of banned fonts.** Replace with a cohesive anime-adjacent editorial stack: `Syne` (display masthead), `Space Grotesk` (architectural headers & accents), and readable clean typography. |
| **Projects** | Cluttered descriptions, redundant instructions ("DRAG HORIZONTALLY"). | Clean, spacious showcase. Let the WebGL liquid distortion and 3D wheel speak through natural affordances without patronizing instructions. |
| **Lower Sections** | Dashboard pill fatigue in Skills and Credentials. | Editorial magazine rhythm, clear visual pauses, and disciplined negative space. |
