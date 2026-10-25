# Mission 6: Comprehensive Baseline Audit & Motion Mapping

**Project:** Rayhan Khan Engineering Portfolio  
**Audit Date:** 2026-10-25  
**Auditor:** Principal Creative Developer & Motion Engineer  

---

## 1. Baseline Repositories, History & Branches

- **Active Project:** `/mnt/d/Vyuk Projects/Rayhan-Portfolio/`
  - Current Branch: `master`
  - Latest Commit: `1b5eb5b` (*"feat: complete creative direction reset, integrate canvas into About, and apply semantic typography system"*)
  - Build Status: Clean Next.js 14.2 production build (`npm run build`), 9/9 static routes prerendered.
- **Reference Project (Older Portfolio):** `/mnt/d/Vyuk Projects/Rayhan-099/`
  - Branch: `main` (commit `ca6bad5`)
  - Hero Investigation: The earlier hero implementation in `Rayhan-099/src/components/sections/Hero.tsx` featured:
    1. **Monolithic Typography Scale:** Massive staggered headline `"RAYHAN"` / `"KHAN."` using `text-[clamp(3.5rem,10.2vw,11.2rem)] font-black leading-[0.85] tracking-tight`.
    2. **Atmospheric Environment:** Full-bleed background layer (`AtmosphericScene` / canvas) sitting behind the content with bottom-anchored content and cinematic entrance reveals.
    3. **Clear Editorial Hierarchy:** Clean location badge (`Noida, India • Software Engineer`), role title (`AI Systems & Full-Stack Application Architect`), and pill action buttons (`View Projects`, `Resume`, `GitHub`, `LinkedIn`).
    4. **Failure in Current Hero:** The current hero squeezed the masthead into a standard 3-column layout where the centered portrait card competed directly with the typography, shrinking the headline and reducing visual impact.
- **Inspiration Project:** `/mnt/d/Vyuk Projects/ECHO-WEBSITE/`
  - Running on: `http://localhost:8085`
  - Technologies: Vanilla ES Modules, Tailwind CSS v3, OGL WebGL, StringTune scroll physics, CSS 3D transforms (`WorksWheel`), custom canvas engines (`ScrollExpandMedia`).

---

## 2. Hero Frame Sequence Assets

- **Source Path:** `/home/rayhan/Videos/hero-frames`
- **Destination Path in Portfolio:** `public/hero-frames/`
- **Frame Count:** Exactly **300 frames** (`ezgif-frame-001.jpg` to `ezgif-frame-300.jpg`).
- **Dimensions:** `1280 × 720` (16:9 widescreen HD).
- **Format & Color Mode:** JPEG, RGB.
- **Total Payload Size:** `10.01 MB` (average `~33 KB` per frame).
- **Aesthetic Tone:** Deep chromatic darkness with rich burgundy, ember, and charcoal undertones (mean RGB `[91, 67, 65]`), harmonizing with our Eclipse Black (`#110D13`), Infernal Burgundy (`#42151F`), and Phoenix Ember (`#FF493D`) palette.
- **Ordering Strategy:** Strictly numeric sorting (`ezgif-frame-%03d.jpg`, index 1 to 300).
- **Performance Budget & Loading Strategy:**
  - Initial load: Preload frames 1 to 20 for immediate paint, rendering Frame 1 onto `<canvas>` instantly to eliminate blank frames or layout shifts.
  - Background decode: Asynchronously stream subsequent frames into an in-memory `HTMLImageElement[]` cache via `requestIdleCallback` / staged batching.
  - Mobile Optimization: On viewports `< 768px`, employ a stride of 2 (150 frames loaded) while strictly preserving frame 300, halving memory consumption while maintaining buttery smooth 60fps scrub.
  - DPR Clamping: Canvas backing buffer clamped at `devicePixelRatio = 2.0` with `alpha: false`.

---

## 3. ECHO's Five Scroll-Animation Systems & Portfolio Mapping

| # | ECHO Reference Experience | Implementation in ECHO | Target Portfolio Section | Planned Motion Replication |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Landing-Page / Hero Scroll Animation** | Metallic typography, symmetrical editorial grid, masked portrait, flowing text banner on scroll. | **Main Hero (`Hero.tsx`)** | Staggered monolithic typography + background canvas driven by 300 hero-frames + scroll-linked bidirectional flowing text marquee + smooth transition into About. |
| **2** | **About Me Scroll Animation** | `scroll-expand-media.js`: Pinned 240vh section, 320×420 card expanding to `94vw/86vh`, text splitting outward, perimeter content reveal. | **About Section (`About.tsx`)** | **PRESERVED & INTACT**: Already successfully implemented with the living 241-frame sequence in the expanding media container. |
| **3** | **Projects Scroll Animation** | `works-wheel.js`: 3D cylindrical drum reel projection with radial ring transforms (`rotateX`, `rotateZ`, `translateZ`), card depth, and project dossiers. | **Projects Section (`Projects.tsx`)** | 3D drum perspective cards and smooth scroll-linked wheel progression across Rayhan's flagship projects (`Lumine AI`, `SatQuery AI`, `Current Capital`). |
| **4** | **Featured Project Scroll Animation** | `flex-carousel.js`: Liquid lens bending, interactive accordion expansion, and focused card selection. | **Featured Project Showcase in `Projects.tsx`** | Dedicated featured interactive presentation for `Lumine AI` with dynamic perspective tabs, deliverable inspection, and live preview architecture. |
| **5** | **“Where I've Been” Scroll Animation** | `experience-section.js`: Horizontal spatial canvas driven by vertical scroll, sticky viewport, parallax background typography dates, counter-drifting background tickers, and milestone cards. | **Experience Section (`Experience.tsx`)** | Transform vertical scroll into horizontal spatial progression through career milestones (Vyuk ML Research, Open Source, Freelance Systems) with counter-drifting ambient tickers and parallax year typography. |

---

## 4. Empirical Screenshot Evidence (Captured at `screenshots/mission6_baseline/`)

- `rp_01_hero_initial_1440.png`: Current Rayhan-Portfolio initial hero.
- `rp_02_hero_scroll_250_1440.png`: Hero at Y=250px scroll.
- `rp_03_hero_scroll_500_1440.png`: Hero at Y=500px scroll.
- `rp_04_about_start_pin_1440.png`: About section start of pinned sequence.
- `rp_05_about_mid_pin_1440.png`: About section at 50% expansion with canvas sequence.
- `rp_06_about_end_pin_1440.png`: About section fully expanded with perimeter pillars.
- `rp_07_about_unpinned_into_projects_1440.png`: Unpinning into Projects.
- `rp_08_projects_1440.png`: Current Projects cards.
- `rp_09_experience_1440.png`: Current Experience timeline.
- `rp_10_skills_1440.png`: Current Skills matrix.
- `rp_11_contact_footer_1440.png`: Contact & Footer.
- `rp_12_hero_mobile_390.png`: Mobile 390px hero.
- `rp_13_about_mobile_390.png`: Mobile 390px About section.
- `echo_01_hero_initial_1440.png`: ECHO Hero landing.
- `echo_02_hero_scroll_300_1440.png`: ECHO Hero scrolled.
- `echo_03_about_start_1440.png`: ECHO About initial card.
- `echo_04_about_mid_expanded_1440.png`: ECHO About expanded state.
- `echo_05_experience_panel1_1440.png`: ECHO Experience Chapter 1.
- `echo_06_experience_panel2_1440.png`: ECHO Experience Chapter 2.
- `echo_07_experience_panel3_1440.png`: ECHO Experience Chapter 3.
- `echo_08_projects_wheel_1440.png`: ECHO WorksWheel 3D Drum Reel.
- `echo_09_landing_pages_carousel_1440.png`: ECHO FlexCarousel.
