# Concrete Technical Reference Analysis: ECHO-WEBSITE

**Reference Source:** `/mnt/d/Vyuk Projects/ECHO-WEBSITE/`  
**Target Repository:** `/mnt/d/Vyuk Projects/Rayhan-Portfolio/`  
**Inspection Date:** 2026-10-24  

---

## 1. Exact Typography Reverse Engineering

### 1.1 Font Identification & Verification
Direct inspection of `/mnt/d/Vyuk Projects/ECHO-WEBSITE/index.html` (lines 16-18, 34-36) and `package.json` revealed:
- **Primary Typography:** **`Plus Jakarta Sans`** (`'Plus Jakarta Sans', Inter, system-ui, sans-serif`)
- **Weights Deployed:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold), 900 (Black).
- **Prohibition Compliance:** While `Inter` and `system-ui` were listed as fallback options in the reference, the Master Build Prompt strictly forbids them as primary fonts. Therefore, in the new portfolio:
  - `Plus Jakarta Sans` is configured as the primary display and body family via `next/font/google` and `@fontsource/plus-jakarta-sans`, with self-hosted zero-latency delivery.
  - `JetBrains Mono` is designated for monospace telemetry, dates, geospatial coordinates, and technical metadata.
  - No serif headlines are used. No mixed regular/italic gimmicks are used.

### 1.2 Reference Type Hierarchy & Spacing Tokens

| Reference Token | Weight | Tracking | Leading | Purpose in Reference | Adapted Purpose in Rayhan's Portfolio |
|---|---|---|---|---|---|
| **Giant Display** | 800 / 900 | `-0.035em` (`tracking-tight`) | `0.85` | Hero & Contact Titles | Hero Headline (`RAYHAN KHAN`) & Finale Headline |
| **Section Title** | 800 | `-0.025em` (`tracking-tight`) | `0.9` | Section Headers (`SELECTED WORKS`, `ABOUT`) | Major Section Headings with numeric index (`01 / PROJECTS`) |
| **Item Title** | 700 / 800 | `-0.02em` | `1.1` | Project Titles | System Titles (`LUMINE AI`, `SATQUERY AI`) |
| **Category Badge** | 700 | `+0.08em` (`tracking-wider`) | `1.0` | Meta Labels (`FEATURED`, `EST. 2000`) | Specialization Badges (`SIH 2026 SELECTED`, `DINOv2`) |
| **Interactive Nav** | 600 | `+0.06em` | `1.2` | Top Navigation Links | Header Nav Links & CTA Actions |
| **Body & Narrative**| 400 / 500 | `0` | `1.65` (`leading-relaxed`) | Case study & About copy | Architectural narratives & technical explanations |
| **Monospace Telemetry**| 500 | `+0.15em` | `1.0` | Tech stacks & coordinates | Tech stacks, certification IDs, latency metrics |

---

## 2. Motion and Interaction Architecture

### 2.1 ScrollExpandMedia Technique
- **Source File:** `/mnt/d/Vyuk Projects/ECHO-WEBSITE/scroll-expand-media.js`
- **Mechanism:**
  - Initial container begins compact (`300px × 400px` desktop, `280px × 360px` mobile).
  - An aspect ratio constant (`1024 / 546 ≈ 1.875`) defines the target geometry.
  - As scroll progress `p` increases from 0 to 1:
    - Width interpolates: `startW + p * (endW - startW)` where `endW = min(vw * 0.94, (vh * 0.86) * ASPECT_RATIO)`.
    - Height matches width divided by aspect ratio.
  - **Hardware-Accelerated Kinetic Unblur:**
    - Dual-layer composition: a sharp base image under a pre-blurred overlay layer.
    - Instead of recomputing expensive CSS `filter: blur()` during scroll (which triggers reflow), the overlay layer opacity transitions smoothly: `opacity = max(0, 1 - p * 2.3)`. When `p >= 0.45`, `visibility` is toggled to `hidden` to liberate GPU fill rate.
  - **Adapted Implementation:**
    - Adapted for Rayhan's flagship AI systems (`Lumine AI` skin intelligence and `SatQuery AI`), transitioning from an initial technical summary into a full-bleed architectural inspection.

### 2.2 WorksWheel 3D Drum Reel
- **Source File:** `/mnt/d/Vyuk Projects/ECHO-WEBSITE/works-wheel.js`
- **Mechanism:**
  - 3D cylindrical projection in CSS space:
    ```javascript
    transform: translateX(${m * bowAt(drumDeg, bow)}px)
               rotateZ(${(1 - m) * ringDeg}deg)
               translateY(${-(1 - m) * ringR}px)
               rotateX(${m * drumDeg}deg)
               translateZ(${m * drumR}px);
    ```
  - Inertia physics using lerp: `target += (dest - target) * EASE`.
  - Step navigation with keyboard arrow handling and drag touch velocity.
- **Adapted Implementation:**
  - Adapted into an interactive project carousel showcasing Rayhan's secondary and SIH systems (Hand Tracking Visualizer, Current Capital, Health Assistant).

### 2.3 Horizontal Spatial Experience Timeline
- **Source File:** `/mnt/d/Vyuk Projects/ECHO-WEBSITE/experience-section.js`
- **Mechanism:**
  - Sticky viewport pins while vertical scroll controls horizontal translation of the stage: `translateX(-${progress * totalDistance}px)`.
  - Accessible fallback: when `prefers-reduced-motion` is active, the container collapses to a clean vertical stack without transform translation.
- **Adapted Implementation:**
  - Adapted for Rayhan's Career & Experience timeline (BCG Data Science and SYNK AI), with vertical progress indicators and crisp telemetry.

---

## 3. Surface & Lighting Treatments

- **Palette Transition:** ECHO is predominantly monochrome (`#0D0D0D` to `#FAFAFA`). Rayhan's portfolio translates these composition principles into the required color system:
  - Base canvas: Eclipse Black (`#110D13`)
  - Elevated surfaces: Gunmetal (`#29252E`)
  - Environmental depth: Infernal Burgundy (`#42151F`)
  - Text: Porcelain Silver (`#F5E8E8`)
  - Accents: Scarlet Crimson (`#A51F30`) and Phoenix Ember (`#FF493D`)
- **Hairline Precision:** Borders use subtle alpha boundaries (`border-white/10` or `border-porcelain/10`), preventing heavy boxiness.
