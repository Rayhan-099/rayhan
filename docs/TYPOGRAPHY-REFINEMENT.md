# Typography Refinement & Font Replacement Report

**Project:** Rayhan Khan Engineering Portfolio  
**Audit Date:** 2026-10-24  
**Auditor:** Principal Creative Developer & Typography Specialist  

---

## 1. Diagnosis of the Original Font

### Target Sentence
> *"Deep architectural investigations spanning self-supervised computer vision, multimodal remote sensing, and low-latency client-side Edge AI."*

### Empirical Browser Inspection (Headless Chromium)
- **DOM Location:** `src/components/sections/Projects.tsx:75`
- **Markup:** `<p className="text-xs font-mono text-steel max-w-md">`
- **Computed Font Family:** `"JetBrains Mono", monospace`
- **Computed Font Weight:** `400`
- **Computed Font Size:** `12px`
- **Computed Line Height:** `16px`
- **Computed Color:** `rgb(169, 165, 178)` (`#A9A5B2` / Ashen Steel)

### Diagnostic Analysis
The sentence was rendered in **JetBrains Mono** via Tailwind's `font-mono` utility class. While JetBrains Mono is an exceptional monospace font for programming IDEs and code blocks, its fixed-pitch character widths and developer-centric glyph proportions made multi-line prose, section subtitles, and editorial descriptions look like IDE comments or terminal diagnostics rather than refined architectural copy.

Furthermore, `font-mono` had been applied uniformly across navigation links, project subtitles, skill matrices, modal dossiers, legal headers, and footer links, producing visual stiffness across the website.

---

## 2. Selection of the New Typeface: Chivo Mono

### Selected Family: **Chivo Mono** (designed by Héctor Gatti / Omnibus-Type)
- **Classification:** Neo-Grotesque Monospace / Technical Editorial Family
- **Available Weights Imported:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- **Package:** `@fontsource/chivo-mono` (v5.3.0)

### Typographic Rationale
1. **Neo-Grotesque Heritage:** Unlike standard coding typefaces, Chivo Mono was specifically crafted by Omnibus-Type with high-x-height and open apertures, preserving the visual rhythm of modern grotesque typography while maintaining monospace alignment.
2. **Superior Prose Readability:** Multi-line text such as the target sentence reads smoothly without character crowding or awkward glyph stretching.
3. **Weight Versatility:** With full weight coverage from 400 to 800, section labels (`font-bold`), interactive pills (`font-normal`), and modal specs (`font-medium`) render with true typographic hierarchy without browser synthetic bolding.
4. **Architectural & Telemetry Aesthetic:** Coordinates (`28.5355° N, 77.3910° E`), system identifiers (`SYS.01 // LUMINE AI`), and status tokens gain a sharp, cinematic feel that harmonizes with Syne (display headlines) and Instrument Sans (body copy).

---

## 3. Scope of Replacement Across the Project

The replacement of `JetBrains Mono` was executed globally across all configuration files, stylesheets, and rendered components:

1. **Dependency Management (`package.json`):**
   - Removed: `@fontsource/jetbrains-mono`
   - Added: `@fontsource/chivo-mono`
2. **Global Stylesheet (`src/app/globals.css`):**
   - Replaced imports with `@fontsource/chivo-mono/400.css` through `800.css`.
   - Updated `.font-mono { font-family: 'Chivo Mono', monospace; }`.
3. **Tailwind Design System (`tailwind.config.ts`):**
   - Configured `fontFamily.mono: ["Chivo Mono", "monospace"]`.
4. **All Components & Routes:**
   - `src/components/sections/Projects.tsx` (Flagship project headers, subtitles, tags, modal triggers)
   - `src/components/sections/Skills.tsx` (Matrix categories, telemetry badges, proficiency tokens)
   - `src/components/sections/About.tsx` (Coordinates, system metadata, kinetic unblur markers)
   - `src/components/sections/Experience.tsx` (Timeline chronology, dates, company tags)
   - `src/components/sections/Achievements.tsx` (Competition ranks, dates, metrics)
   - `src/components/sections/Certifications.tsx` (Credential IDs, verification links)
   - `src/components/sections/Contact.tsx` (Coordinate indices, transmission telemetry)
   - `src/components/ui/Navigation.tsx` (Floating pill links, active indicators, mobile menu items)
   - `src/components/ui/ProjectModal.tsx` (Dossier technical specifications, stack tags, status flags)
   - `src/components/ui/Footer.tsx` (Timestamp telemetry, copyright badges, legal navigation)
   - `src/app/privacy/page.tsx` & `src/app/terms/page.tsx` (Section headers, version tokens, clauses)
   - `src/app/not-found.tsx` (404 status indicator, telemetry return button)

---

## 4. Post-Replacement Verification (Empirical Headless Chromium)

### Target Sentence Computed Style
```json
{
  "text": "Deep architectural investigations spanning self-supervised computer vision, multimodal remote sensing, and low-latency client-side Edge AI.",
  "fontFamily": "\"Chivo Mono\", monospace",
  "fontSize": "12px",
  "fontWeight": "400",
  "lineHeight": "16px",
  "letterSpacing": "normal",
  "color": "rgb(169, 165, 178)",
  "className": "text-xs font-mono text-steel max-w-md"
}
```

### Full-Site Typography Audit (`docs/TYPOGRAPHY-AUDIT.md`)
- **Total Elements Inspected:** 116 elements across 4 routes (`/`, `/terms`, `/privacy`, `/404`)
- **Unexpected / Prohibited Fonts Detected:** **0**
- **Prohibited Fonts Check:** Inter, Roboto, Arial, Helvetica, Space Grotesk, Geist, Instrument Serif, and Plus Jakarta Sans are **0% present**.
- **Faux Bold Check:** All weights verified against actual imported `@fontsource` files.
- **Computed Font Compliance:** **100% Verified**
