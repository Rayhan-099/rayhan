# Typography Refinement & Semantic Role Overhaul Report

**Project:** Rayhan Khan Engineering Portfolio  
**Audit Date:** 2026-10-24  
**Auditor:** Principal Creative Developer & Typography Specialist  

---

## 1. Diagnosis of the Typography Problem

### Target Sentence
> *"Deep architectural investigations spanning self-supervised computer vision, multimodal remote sensing, and low-latency client-side Edge AI."*

### Historical Progression & Diagnosis of Failure
1. **Initial Baseline:** The sentence was set in `text-xs font-mono text-steel` (`JetBrains Mono`). It read like an IDE code comment or debugging log.
2. **Mission 4 Attempt:** JetBrains Mono was replaced by Chivo Mono. However, because Chivo Mono is still a fixed-width monospace typeface, the core aesthetic flaw remained: multi-line prose, section subtitles, project narratives, navigation buttons, and legal pages were still forced into monospace formatting. Multi-line descriptions looked like terminal dumps rather than intentional editorial prose.
3. **Mission 5 Resolution:** Complete semantic role reset. Rather than using monospace as an indiscriminate catch-all, we established three strict, unambiguous typographic roles across the entire application:

| Typographic Role | Assigned Typeface | Weight Spectrum | Semantic Application |
| :--- | :--- | :--- | :--- |
| **Display / Masthead** | **Syne** (`font-syne`) | `700` (Bold), `800` (ExtraBold) | Hero masthead (`RAYHAN KHAN`), Section titles (`FLAGSHIP SYSTEMS`, `EXPERIENCE`, `SKILLS`), Card titles, Modal dossiers. |
| **Editorial Prose & Interface** | **Instrument Sans** (`font-sans`) | `400` (Regular), `500` (Medium), `600` (SemiBold) | Target sentence, all section subtitles, project narratives, experience bullets, navigation links, buttons, modal descriptions, and legal pages. |
| **Technical Telemetry & Tokens** | **Chivo Mono** (`font-mono`) | `400` (Regular), `500` (Medium), `700` (Bold) | Strictly reserved for real technical tokens: geographic timecodes (`UTC +05:30`), numeric metrics (`<12ms`, `60 FPS`), stack pills (`[PyTorch]`, `[FastAPI]`), credential IDs (`ID: cert-...`), and step indices. |

---

## 2. Empirical Browser Inspection (Headless Chromium)

### Target Sentence Computed Style Verification
- **DOM Selector:** `p` containing `"Deep architectural investigations"` inside `#projects`
- **Computed Font Family:** `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Computed Font Weight:** `400`
- **Computed Font Size:** `14px` (`text-sm`, scaling to `16px` on `md` viewports)
- **Computed Line Height:** `22.75px` (`leading-relaxed`)
- **Computed Color:** `rgb(197, 194, 204)` (`#C5C2CC` / Ashen Steel Light)
- **Class Applied:** `font-sans text-sm md:text-base text-steel-light max-w-xl leading-relaxed`
- **Verification Status:** **100% Verified (Prose rendered cleanly in proportional sans-serif)**

---

## 3. Scope of Semantic Replacement Across the Project

The semantic role restructuring was applied across all components:

1. **`src/components/sections/Projects.tsx`:**
   - Target sentence converted from `font-mono text-xs` to `font-sans text-sm md:text-base text-steel-light max-w-xl leading-relaxed`.
   - Project descriptions and bullet points converted to `font-sans text-sm leading-relaxed`.
   - Action buttons converted from `font-mono` to `font-sans font-medium text-xs uppercase tracking-wider`.
   - Monospace strictly retained for technology tags (`[DINOv2]`, `[FastAPI]`) and status metrics.
2. **`src/components/sections/About.tsx`:**
   - Subtitle prompt converted to `font-sans text-[11px] uppercase tracking-wider text-steel`.
   - Expanded card narrative converted to `font-sans text-sm leading-relaxed`.
   - Architectural pillar descriptions converted to `font-sans text-[11px] text-steel`.
   - Monospace reserved for `01 / ABOUT` and `PILLAR 01` indices.
3. **`src/components/sections/Skills.tsx`:**
   - Header subtitle converted to `font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed`.
   - Matrix skill tags retain `font-mono text-xs` for technical token presentation.
4. **`src/components/sections/Experience.tsx`:**
   - Subtitle converted to `font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed`.
   - Responsibility bullet narratives rendered in `font-sans text-sm leading-relaxed`.
   - Dates and role indices retain `font-mono`.
5. **`src/components/sections/Achievements.tsx`:**
   - Subtitle converted to `font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed`.
   - Detailed achievement narratives rendered in `font-sans text-sm text-steel leading-relaxed`.
6. **`src/components/sections/Education.tsx`:**
   - Subtitle converted to `font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed`.
   - Credential index and dates retain `font-mono`.
7. **`src/components/sections/Certifications.tsx`:**
   - Subtitle converted to `font-sans text-sm md:text-base text-steel-light max-w-md leading-relaxed`.
   - Credential archive toggle button converted to `font-sans font-medium text-xs uppercase tracking-wider`.
   - Credential IDs and dates retain `font-mono`.
8. **`src/components/sections/Contact.tsx`:**
   - Lead paragraph rendered in `font-sans text-base md:text-lg text-steel max-w-xl leading-relaxed`.
   - Action buttons converted to `font-sans font-medium text-xs uppercase tracking-wider`.
   - Verified profile links converted to `font-sans font-medium text-xs`.
   - Trailing period on headline removed (`LET'S BUILD SOMETHING`).
9. **`src/components/ui/Navigation.tsx`:**
   - Nav pill items and Resume action button converted to `font-sans font-medium text-xs uppercase tracking-wider`.
10. **`src/components/ui/ProjectModal.tsx`:**
    - Modal dossier section headers (`System Purpose`, `Engineering Decisions`, `Verified Deliverables`) converted to `font-sans font-semibold text-xs uppercase tracking-wider`.
    - Deliverable lists and descriptions rendered in `font-sans`.
    - Removed `backdrop-blur-md` in strict adherence to zero glassmorphism constraint.
11. **`src/components/ui/Footer.tsx`:**
    - Navigation link lists and connected profile links converted to `font-sans text-xs text-steel`.
    - Legal bar converted to `font-sans text-xs text-steel/70`.
12. **`src/app/privacy/page.tsx` & `src/app/terms/page.tsx`:**
    - Legal prose bodies, section subheadings, and return links converted to `font-sans`.
    - Headline trailing periods removed.
13. **`src/app/not-found.tsx`:**
    - Return button converted to `font-sans font-medium text-xs uppercase tracking-wider`.

---

## 4. Full-Site Typography Audit (`docs/TYPOGRAPHY-AUDIT.md`)

- **Total Elements Inspected:** 113 elements across 4 routes (`/`, `/terms`, `/privacy`, `/404`)
- **Prohibited Fonts Found:** **0** (Inter, Roboto, Arial, Helvetica, Space Grotesk, Geist, Instrument Serif, and Plus Jakarta Sans are 0% present).
- **Target Sentence Status:** **✓ Valid** (`Instrument Sans`, weight 400).
- **Synthetic Bold / Faux Bold Check:** All weights verified against actual imported `@fontsource` files (400, 500, 600, 700, 800).
- **Computed Font Compliance:** **100% Verified**.
