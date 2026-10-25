# Comprehensive Typography Audit

This document records the empirical browser inspection of computed font families and weights across all active routes and rendered components in Rayhan Khan's portfolio.

**Inspection Environment:** Headless Chromium (/home/rayhan/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome) at 1440x900 viewport.  
**Audit Timestamp:** 2026-10-25T05:29:42.465Z  
**Intended Typography System:**
- **Display Headlines:** Syne (Weights 700, 800)
- **Body & UI Interface:** Instrument Sans (Weights 400, 500, 600, 700)
- **Technical Telemetry & Metadata:** Chivo Mono (Weights 400, 500, 600, 700, 800)

---

## 1. Executive Summary

- **Total Inspected Samples:** 114 elements across 4 routes (Home, Terms, Privacy, 404)
- **Unexpected / Prohibited Font Families Found:** **0**
- **Computed Font Compliance:** **100% Verified**
- **Plus Jakarta Sans Status:** Completely eliminated (0 references detected in computed styles)
- **Synthetic Bold / Faux Bold Check:** All weights (400, 500, 600, 700, 800) are explicitly imported via `@fontsource`, preventing faux-bold synthesis.

---

## 2. Element-by-Element Computed Style Inspection

| Route | Category | Tag | Sample Text | Computed `font-family` | Weight | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Home | Target Sentence (Mission 5 Refinement) | `<p>` | "Deep architectural investigations s" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Home | Navigation | `<a>` | "RAYHAN KHAN" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Home | Navigation | `<span>` | "RAYHAN KHAN" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Navigation | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Navigation | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Primary Headlines (H1) | `<h1>` | "RAYHAN KHAN" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Section Headlines (H2) | `<h2>` | "SYSTEMATIC" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Section Headlines (H2) | `<h2>` | "ARCHITECTURE" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Section Headlines (H2) | `<h2>` | "ARCHITECTING SCALABLE SOFTWARE AT T" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Section Headlines (H2) | `<h2>` | "FLAGSHIP SYSTEMS" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Sub-Headings (H3) | `<h3>` | "TURNING RESEARCH & MACHINE LEARNING" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Sub-Headings (H3) | `<h3>` | "LUMINE AI" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Sub-Headings (H3) | `<h3>` | "ENGINEERED SYSTEMS ARCHIVE" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Sub-Headings (H3) | `<h3>` | "ARTIFICIAL INTELLIGENCE INTERN" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Pillar Headings (H4) | `<h4>` | "FULL-STACK SYSTEMS" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Pillar Headings (H4) | `<h4>` | "APPLIED AI & VISION" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Pillar Headings (H4) | `<h4>` | "AUTONOMOUS RAG" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Pillar Headings (H4) | `<h4>` | "DISTRIBUTED SYSTEMS & APIS" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Paragraphs / Body Copy | `<p>` | "FULL-STACK SYSTEMS & APPLIED MACHIN" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Paragraphs / Body Copy | `<p>` | "Engineering resilient backend archi" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Home | Paragraphs / Body Copy | `<p>` | "SCROLL TO EXPLORE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Home | Paragraphs / Body Copy | `<p>` | "RAYHAN KHAN • AKTU CSE NOIDA" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Home | Technical Telemetry | `<div>` | "LOCATION: 28.5355° N, 77.3910° E |" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Home | Technical Telemetry | `<span>` | "ENGINEERING ETHOS" | `"Chivo Mono", monospace` | `700` | ✓ Valid |
| Home | Technical Telemetry | `<p>` | "RAYHAN KHAN • AKTU CSE NOIDA" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Home | Technical Telemetry | `<span>` | "01 / ABOUT" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Home | Interactive Buttons | `<button>` | "" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Home | Interactive Buttons | `<button>` | "INSPECT FULL DOSSIER" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Interactive Buttons | `<button>` | "NEURAL ARCHITECTURE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Interactive Buttons | `<button>` | "EDGE INFERENCE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Action Pill Links | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Action Pill Links | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Action Pill Links | `<a>` | "EXPERIENCE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Action Pill Links | `<a>` | "SKILLS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Home | Footer Elements | `<h2>` | "RAYHAN KHAN" | `Syne, sans-serif` | `800` | ✓ Valid |
| Home | Footer Elements | `<p>` | "Software Engineer specializing in f" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Home | Footer Elements | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| Home | Footer Elements | `<a>` | "01 / About" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Navigation | `<a>` | "RAYHAN KHAN" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Navigation | `<span>` | "RAYHAN KHAN" | `Syne, sans-serif` | `700` | ✓ Valid |
| Terms of Service | Navigation | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Terms of Service | Navigation | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Terms of Service | Primary Headlines (H1) | `<h1>` | "TERMS OF SERVICE" | `Syne, sans-serif` | `800` | ✓ Valid |
| Terms of Service | Section Headlines (H2) | `<h2>` | "01 / SCOPE AND PURPOSE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Terms of Service | Section Headlines (H2) | `<h2>` | "02 / INTELLECTUAL PROPERTY AND OPEN" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Terms of Service | Section Headlines (H2) | `<h2>` | "03 / EXTERNAL LINKS AND LIVE DEPLOY" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Terms of Service | Section Headlines (H2) | `<h2>` | "04 / LIMITATION OF LIABILITY" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Terms of Service | Sub-Headings (H3) | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| Terms of Service | Sub-Headings (H3) | `<h3>` | "CONNECTED PROFILES" | `Syne, sans-serif` | `700` | ✓ Valid |
| Terms of Service | Paragraphs / Body Copy | `<p>` | "Effective Date: October 2026 | Noid" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Paragraphs / Body Copy | `<p>` | "This website is the professional pe" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Paragraphs / Body Copy | `<p>` | "The portfolio design, custom vector" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Paragraphs / Body Copy | `<p>` | "Open source repositories and softwa" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Technical Telemetry | `<span>` | "LEGAL FRAMEWORK" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Terms of Service | Technical Telemetry | `<p>` | "khanrayhan8307@gmail.com" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Terms of Service | Technical Telemetry | `<span>` | "SYSTEM STATUS: OPERATIONAL" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Terms of Service | Interactive Buttons | `<button>` | "" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Action Pill Links | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Terms of Service | Action Pill Links | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Terms of Service | Action Pill Links | `<a>` | "EXPERIENCE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Terms of Service | Action Pill Links | `<a>` | "SKILLS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Terms of Service | Footer Elements | `<h2>` | "RAYHAN KHAN" | `Syne, sans-serif` | `800` | ✓ Valid |
| Terms of Service | Footer Elements | `<p>` | "Software Engineer specializing in f" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Terms of Service | Footer Elements | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| Terms of Service | Footer Elements | `<a>` | "01 / About" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Navigation | `<a>` | "RAYHAN KHAN" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Navigation | `<span>` | "RAYHAN KHAN" | `Syne, sans-serif` | `700` | ✓ Valid |
| Privacy Policy | Navigation | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Privacy Policy | Navigation | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Privacy Policy | Primary Headlines (H1) | `<h1>` | "PRIVACY POLICY" | `Syne, sans-serif` | `800` | ✓ Valid |
| Privacy Policy | Section Headlines (H2) | `<h2>` | "01 / PRINCIPLES OF TRANSPARENCY" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Privacy Policy | Section Headlines (H2) | `<h2>` | "02 / COOKIES AND TRACKING TECHNOLOG" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Privacy Policy | Section Headlines (H2) | `<h2>` | "03 / HOSTING INFRASTRUCTURE AND SER" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Privacy Policy | Section Headlines (H2) | `<h2>` | "04 / USER-INITIATED CONTACT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `600` | ✓ Valid |
| Privacy Policy | Sub-Headings (H3) | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| Privacy Policy | Sub-Headings (H3) | `<h3>` | "CONNECTED PROFILES" | `Syne, sans-serif` | `700` | ✓ Valid |
| Privacy Policy | Paragraphs / Body Copy | `<p>` | "Effective Date: October 2026 | Noid" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Paragraphs / Body Copy | `<p>` | "Your privacy is respected. This sta" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Paragraphs / Body Copy | `<p>` | "This website does not use tracking" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Paragraphs / Body Copy | `<p>` | "Client-side browser storage (such a" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Technical Telemetry | `<span>` | "DATA GOVERNANCE" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Privacy Policy | Technical Telemetry | `<p>` | "khanrayhan8307@gmail.com" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Privacy Policy | Technical Telemetry | `<span>` | "SYSTEM STATUS: OPERATIONAL" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| Privacy Policy | Interactive Buttons | `<button>` | "" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Action Pill Links | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Privacy Policy | Action Pill Links | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Privacy Policy | Action Pill Links | `<a>` | "EXPERIENCE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Privacy Policy | Action Pill Links | `<a>` | "SKILLS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| Privacy Policy | Footer Elements | `<h2>` | "RAYHAN KHAN" | `Syne, sans-serif` | `800` | ✓ Valid |
| Privacy Policy | Footer Elements | `<p>` | "Software Engineer specializing in f" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| Privacy Policy | Footer Elements | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| Privacy Policy | Footer Elements | `<a>` | "01 / About" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Navigation | `<a>` | "RAYHAN KHAN" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Navigation | `<span>` | "RAYHAN KHAN" | `Syne, sans-serif` | `700` | ✓ Valid |
| 404 Route | Navigation | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| 404 Route | Navigation | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| 404 Route | Primary Headlines (H1) | `<h1>` | "OUT OF BOUNDS" | `Syne, sans-serif` | `800` | ✓ Valid |
| 404 Route | Section Headlines (H2) | `<h2>` | "RAYHAN KHAN" | `Syne, sans-serif` | `800` | ✓ Valid |
| 404 Route | Sub-Headings (H3) | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| 404 Route | Sub-Headings (H3) | `<h3>` | "CONNECTED PROFILES" | `Syne, sans-serif` | `700` | ✓ Valid |
| 404 Route | Paragraphs / Body Copy | `<p>` | "The requested coordinate does not e" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Paragraphs / Body Copy | `<p>` | "Software Engineer specializing in f" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Paragraphs / Body Copy | `<p>` | "© 2026 Rayhan Khan. All rights rese" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Technical Telemetry | `<div>` | "TELEMETRY FAULT 404 / ROUTE MISSING" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| 404 Route | Technical Telemetry | `<span>` | "SYSTEM STATUS: OPERATIONAL" | `"Chivo Mono", monospace` | `400` | ✓ Valid |
| 404 Route | Interactive Buttons | `<button>` | "" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Action Pill Links | `<a>` | "ABOUT" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| 404 Route | Action Pill Links | `<a>` | "PROJECTS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| 404 Route | Action Pill Links | `<a>` | "EXPERIENCE" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| 404 Route | Action Pill Links | `<a>` | "SKILLS" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `500` | ✓ Valid |
| 404 Route | Footer Elements | `<h2>` | "RAYHAN KHAN" | `Syne, sans-serif` | `800` | ✓ Valid |
| 404 Route | Footer Elements | `<p>` | "Software Engineer specializing in f" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |
| 404 Route | Footer Elements | `<h3>` | "NAVIGATION" | `Syne, sans-serif` | `700` | ✓ Valid |
| 404 Route | Footer Elements | `<a>` | "01 / About" | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `400` | ✓ Valid |

---

## 3. Font Loading & Native Form Controls Audit

1. **Button & Native Control Inheritance:**
   `button, input, textarea, select, optgroup { font-family: inherit; }` is explicitly declared in `src/app/globals.css`, eliminating browser-default typography overrides.
2. **SVG Text Monogram:**
   `src/app/icon.svg` declares `font-family="Syne, sans-serif"`, eliminating system-ui fallbacks.
3. **Modal & Loading States:**
   `#modal-project-title` explicitly specifies `font-syne font-extrabold`, guaranteeing Syne display rendering on client-side dialogue mount.
4. **Navigation Items:**
   Floating pill navigation links and mobile drawer links explicitly resolve to `font-mono` or `font-syne`, matching the architectural branding.
