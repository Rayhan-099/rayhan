# MISSION 13: REFERENCE REVERSE-ENGINEERING & IMPLEMENTATION MATRIX

**Project:** Rayhan Khan Personal Engineering Portfolio  
**Working Directory:** `/mnt/d/Vyuk Projects/Rayhan-Portfolio/`  
**Primary Reference A:** `https://github.com/Jishnu09-siuu/ECHO-Design-Studio`  
**Primary Reference B:** `https://github.com/Jishnu09-siuu/analog-editorial-portfolio`  
**Date:** October 25, 2026  

---

## 1. Verified Reference Study

### Reference A: ECHO Design Studio (`ECHO-Design-Studio`)
- **Architecture:** Next.js 14 App Router, Tailwind CSS, GSAP 3.12, ScrollTrigger, Framer Motion, Lenis smooth scrolling.
- **Key Motion Findings:**
  1. `components/sections/Work.tsx`: ScrollTrigger-driven clip-path mask frame expansion (`clipPath: inset(14% 9% 14% 9% round 20px) -> inset(0% 0% 0% 0% round 16px)`) with inner image counter-scale (`scale: 1.18 -> 1.0`) on scrub `1.8`.
  2. `components/ui/SpotlightReveal.tsx`: Cursor-responsive dynamic spotlight masking using requestAnimationFrame spring loop (`smooth += delta * 0.15`), `IntersectionObserver` pause on offscreen, and dynamic `maskImage: radial-gradient(circle 260px at X Y, ...)`.
  3. `components/ui/skiper52.tsx`: Interactive spring-damped flex accordion cards with ratio expansion (`flex-[3.8]` vs `flex-1`) with spring stiffness 240, damping 26, mass 0.8.
  4. `components/sections/About.tsx`: Continuous gradient horizon blend masks (`linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)`) seamlessly bridging full-bleed graphics into subsequent sections.
  5. `components/ui/ArrowButton.tsx`: Magnetic interactive button pull with pointer-displacement physics.

### Reference B: Analog Editorial Portfolio (`analog-editorial-portfolio`)
- **Architecture:** Astro / Vite bundle with Three.js (r168), GSAP, Lenis.
- **Key Motion Findings:**
  1. `index.js`: Interactive 3D spatial transformation matrix with quaternion damping, raycasted perspective tilt on pointer move, and multi-plane depth parallax.
  2. Multi-tier depth layering: foreground stage moves at unity, midground anchors move at 0.65x with perspective translation, and background coordinate grid drifts at 0.25x.
  3. Tangible tactile feedback: pointer hover alters surface specular reflectance and depth offsets without displacing the user's cursor.

---

## 2. Implementation Matrix (6 Meaningful Effects Across 4 Categories)

| # | Reference Effect | Verified Source & Implementation | Motion Category | Portfolio Destination | Actual Change Made |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **ScrollTrigger Clip-Mask Frame Expansion with Counter-Parallax** | `ECHO-Design-Studio/components/sections/Work.tsx` (`clipPath: inset(...)`, `scale: 0.92 -> 1.0`, `img scale: 1.18 -> 1.0`, scrub: 1.8) | **Category 1:** Scroll-Linked Choreography | `src/components/sections/Projects.tsx` (Flagship `Lumine AI`) & `About.tsx` | Implemented scroll-linked frame expansion where card begins contracted inside a deep-inset vignette and smoothly expands to full widescreen as user scrolls into the section, with inner media counter-scaling. |
| **2** | **Multi-Plane Spatial Parallax & Perspective Depth** | `analog-editorial-portfolio/index.js` (Multi-layer spatial coordinate planes with differential scroll rates) | **Category 1:** Scroll-Linked Choreography | `src/components/sections/Hero.tsx` & `About.tsx` | Foreground monumental typography (`RAYHAN` / `KHAN`), centred portrait anchor with ambient halo, and background canvas execute calibrated multi-rate scroll parallax (1.0x, 0.65x, 0.25x) with depth perspective. |
| **3** | **Continuous Horizon Bridge & Section Velocity Handoff** | `ECHO-Design-Studio/components/sections/About.tsx` (Multi-stop gradient horizon fade & transition masks) | **Category 2:** Section-to-Section Transitions | `src/components/sections/About.tsx` &rarr; `Projects.tsx` &rarr; `Experience.tsx` | Created continuous seamless horizon thresholds that dissolve the end of the About 241-frame unblur stage directly into Projects, and Projects into Experience with zero visual jarring or abrupt background jumps. |
| **4** | **Dynamic Specular Spotlight & Radial Luminance Masking** | `ECHO-Design-Studio/components/ui/SpotlightReveal.tsx` (RAF spring-damped pointer tracking + `radial-gradient` luminance mask) | **Category 3:** Interactive Depth & Lighting | `src/components/ui/SpotlightLuminance.tsx` in `Projects.tsx` & `Skills.tsx` | Created `SpotlightLuminance` component that tracks cursor coordinates with damped spring physics, projecting a subtle darkroom crimson/ember luminance halo and border highlight over active cards. |
| **5** | **Quaternion-Damped 3D Card Tilt Physics** | `analog-editorial-portfolio/index.js` (Pointer-relative rotation matrix, normalized coordinates, lerp damping) | **Category 3:** Interactive Depth & Lighting | `src/components/ui/Tilt3DCard.tsx` in `Projects.tsx` (Lumine AI) & `About.tsx` (Portrait) | Implemented smooth 3D perspective tilt reacting to pointer position across cards with subtle specular flare reflection and automatic fallback on touch / reduced-motion. |
| **6** | **Spring-Damped Interactive Systems Accordion** | `ECHO-Design-Studio/components/ui/skiper52.tsx` (ExpandOnHover flex ratio scaling `flex-[3.8]` vs `flex-1` with spring transition) | **Category 4:** Pointer & Touch Interactions | `src/components/sections/Projects.tsx` (Secondary systems suite: SatQuery AI, Current Capital, Hand Tracking, Health Assistant) | Implemented interactive spring accordion allowing visitors to hover or tap secondary projects to fluidly expand their architectural specs, live deliverables, and technologies without leaving the page. |
| **7** | **Magnetic Interactive Action Anchors** | `ECHO-Design-Studio/components/ui/ArrowButton.tsx` (Pointer attraction within bounding threshold) | **Category 4:** Pointer & Touch Interactions | `src/components/ui/MagneticButton.tsx` in `Hero.tsx`, `Projects.tsx`, `Contact.tsx` | Implemented magnetic button physics that smoothly attracts button content toward the cursor within a 45px proximity zone with spring return on mouse leave. |

---

## 3. Preservation Guarantees

1. **Identity & Portrait:** Rayhan Khan's real portrait remains the centred visual focal point of the hero stage.
2. **Master Assets:** 300 Hero JPG frames and 241 About JPG frames remain 100% untouched and active in HTML5 canvas engines. Zero WebP conversions.
3. **Approved Typography:** `Syne` (display), `Space Grotesk` (architectural headers), `Plus Jakarta Sans` (body prose), and `JetBrains Mono` (code/telemetry).
4. **Original Palette:** Eclipse Black (`#110D13`), Infernal Burgundy (`#42151F`), Scarlet Crimson (`#A51F30`), Phoenix Ember (`#FF493D`), Porcelain Silver (`#F5E8E8`), Ashen Steel (`#A9A5B2`), Gunmetal (`#29252E`).
5. **Strict Privacy:** City-level only: `"Noida, Uttar Pradesh, India"`. Zero phone numbers, zero raw GPS coordinates.
6. **No Fake Photography Metadata:** Zero `35MM MONOCHROME`, `ISO 400`, `D-76` camera stamps.
