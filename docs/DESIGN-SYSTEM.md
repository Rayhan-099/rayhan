# Design System Specification

## 1. Color System (The Sovereign Palette)

The application adheres strictly to the required seven-tier palette:

```css
:root {
  --color-eclipse-black:    #110D13; /* Primary foundation canvas, hero, footer */
  --color-infernal-burgundy: #42151F; /* Environmental strata, deep section transitions */
  --color-scarlet-crimson:   #A51F30; /* Primary interactive links, active tabs, key accents */
  --color-phoenix-ember:     #FF493D; /* Selective telemetry spikes, hover highlights, live pulses */
  --color-porcelain-silver:  #F5E8E8; /* Primary headings, high-contrast readable narrative */
  --color-ashen-steel:       #A9A5B2; /* Secondary text, metadata, subtle hairline dividers */
  --color-gunmetal:          #29252E; /* Elevated structural surfaces, subtle card borders */
}
```

### Functional Color Applications
- **Backgrounds:** `bg-[#110D13]` (Base), `bg-[#17131A]` (Elevated layer), `bg-[#29252E]/40` (Glassless backdrop).
- **Text:** `text-[#F5E8E8]` (Headings, primary body), `text-[#A9A5B2]` (Descriptions, dates, labels), `text-[#FF493D]` (Live indicators, status accents).
- **Borders & Dividers:** `border-[#29252E]` (Subtle), `border-[#A9A5B2]/20` (Hairline rules), `border-[#A51F30]/40` (Interactive focus).
- **Interactive Controls:** Base `text-[#F5E8E8]`, hover `text-[#FF493D]`, focus ring `ring-1 ring-[#A51F30]`.

---

## 2. Typography Specification

### Primary Display and Body: `Plus Jakarta Sans`
Loaded via `@fontsource/plus-jakarta-sans` and `next/font/google` for zero layout shifts and offline independence.

- **Display Headline (Hero / Finale):**
  `text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.88] uppercase text-[#F5E8E8]`
- **Section Heading:**
  `text-3xl md:text-5xl font-extrabold tracking-tight leading-[0.92] uppercase text-[#F5E8E8]`
- **System / Project Heading:**
  `text-2xl md:text-3xl font-bold tracking-tight text-[#F5E8E8]`
- **Section Index / Badge:**
  `font-mono text-xs uppercase tracking-[0.2em] text-[#FF493D]`
- **Primary Body Copy:**
  `text-base md:text-lg font-normal leading-relaxed text-[#F5E8E8]/90 max-w-prose`
- **Secondary Technical Metadata:**
  `text-sm font-medium leading-normal text-[#A9A5B2]`
- **Monospace Telemetry (`JetBrains Mono`):**
  `font-mono text-xs tracking-wider uppercase text-[#A9A5B2]`

---

## 3. Structural Grid and Layout Geometry

- **Max Content Width:** `max-w-7xl mx-auto px-6 md:px-12 lg:px-16`
- **Vertical Section Spacing:** `py-24 md:py-32 lg:py-40`
- **Corner Radii:** Strictly bounded. Pill buttons use `rounded-full`. Content surfaces use restrained geometric corners (`rounded-lg` or `rounded-none` with hairline borders). No excessive bubble corners.
- **Elevation:** Surface hierarchy is achieved through lightness and alpha layering (`#110D13` -> `#1A151C` -> `#29252E`), never through drop shadows.

---

## 4. Bespoke Vector Iconography (Zero Lucide / Zero Emojis)

To satisfy the prohibition on Lucide icons and emojis, all system icons are handcrafted vector SVGs with mathematical precision:
- `IconExternalLink`: Minimalist diagonal arrow emerging from square bracket.
- `IconGitHub`: Clean monochrome GitHub silhouette.
- `IconLinkedIn`: Minimalist professional glyph.
- `IconLeetCode`: Geometric algorithmic icon.
- `IconTerminal`: Clean telemetry prompt chevron.
- `IconShield`: Clean verification shield for certifications.
- `IconCrosshair`: Technical coordinate locator for geospatial telemetry.
- `IconPulse`: Live status telemetry beat.

---

## 5. Skeleton Loading State Contract

Where asynchronous or remote assets load (images, project modals, legal text):
- Base shape: geometric match to final container (`rounded-lg bg-[#29252E]/60`).
- Shimmer: subtle, restrained opacity oscillation (`animate-pulse` between 0.3 and 0.7 opacity, using `--color-gunmetal`).
- Zero layout shift: explicit `aspect-ratio` and dimension attributes defined upfront.
- Accessibility: `aria-busy="true"` and `role="status"` with screen-reader text.
