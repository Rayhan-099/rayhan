# Implementation Plan and Architecture Specification

## 1. Technical Stack and Architecture

- **Framework:** Next.js 14+ (App Router, Server Components + Client Motion Boundaries)
- **Language:** TypeScript 5+ (Strict mode, zero `any` tolerance)
- **Styling:** Tailwind CSS v3 with design tokens matching the required palette
- **Typography:** `Plus Jakarta Sans` (Display and Body) and `JetBrains Mono` (Telemetry)
- **Motion Engine:** GSAP 3.12+ with ScrollTrigger and `@gsap/react` `useGSAP` hook
- **Smooth Scroll:** Lenis (`lenis`) with GSAP ticker synchronization and reduced-motion guard
- **Testing:** Playwright / Vitest / TypeScript compiler verification

---

## 2. Directory Layout in `/mnt/d/Vyuk Projects/Rayhan-Portfolio/`

```
Rayhan-Portfolio/
├── docs/                               # System documentation
│   ├── SKILL-EXECUTION.md
│   ├── ECHO-REFERENCE-ANALYSIS.md
│   ├── CONTENT-SOURCES.md
│   ├── ART-DIRECTION.md
│   ├── DESIGN-SYSTEM.md
│   └── IMPLEMENTATION-PLAN.md
├── public/                             # Optimized media and static assets
│   ├── media/projects/                 # WebP optimized project imagery
│   │   ├── lumine.webp
│   │   ├── satquery.webp
│   │   ├── current-capital.webp
│   │   ├── hand-tracking.webp
│   │   └── health-assistant.webp
│   ├── rayhan-headshot.jpg             # Verified headshot
│   ├── resume.pdf                      # Verified resume download
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout, font injection, SEO metadata
│   │   ├── page.tsx                    # Main single-page portfolio route
│   │   ├── terms/
│   │   │   └── page.tsx                # Verified Terms of Service
│   │   ├── privacy/
│   │   │   └── page.tsx                # Verified Privacy Policy
│   │   ├── not-found.tsx               # Custom 404 page
│   │   ├── sitemap.ts                  # Dynamic XML sitemap generator
│   │   ├── robots.ts                   # Robots.txt generator
│   │   └── globals.css                 # Sovereign color tokens and reset
│   ├── components/
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.tsx # Lenis + GSAP ScrollTrigger bridge
│   │   ├── ui/
│   │   │   ├── Navigation.tsx          # Editorial top masthead with mobile drawer
│   │   │   ├── CustomIcons.tsx         # Bespoke SVG paths (zero Lucide)
│   │   │   ├── SkeletonLoader.tsx      # Low-CLS async loading states
│   │   │   ├── ProjectModal.tsx        # High-detail architectural inspection modal
│   │   │   └── Footer.tsx              # Clean footer with legal routes & status
│   │   ├── motion/
│   │   │   ├── KineticUnblurStage.tsx  # ECHO-inspired ScrollExpandMedia mechanism
│   │   │   └── TelemetrySweep.tsx      # Radar sweep animation for SatQuery AI
│   │   └── sections/
│   │       ├── Hero.tsx                # Asymmetric typography reveal & headline
│   │       ├── About.tsx               # Editorial biography & engineering focus
│   │       ├── Projects.tsx            # Full-bleed flagship systems showcase
│   │       ├── Experience.tsx          # BCG & SYNK chronological timeline
│   │       ├── Skills.tsx              # Categorized engineering disciplines
│   │       ├── Achievements.tsx        # SIH 2025 & SIH 2026 hackathon leadership
│   │       ├── Education.tsx           # AKTU B.Tech & CBSE academic credentials
│   │       ├── Certifications.tsx      # Coursera credentials archive with verification links
│   │       └── Contact.tsx             # Direct outreach & verified contact points
│   ├── content/
│   │   ├── profile.ts                  # Verified biography and contact info
│   │   ├── projects.ts                 # 5 verified projects with deep specs
│   │   ├── experience.ts               # BCG & SYNK verified records
│   │   ├── skills.ts                   # Technical capabilities inventory
│   │   ├── achievements.ts             # SIH leadership records
│   │   ├── education.ts                # Verified degrees & schools
│   │   └── certifications.ts           # 30+ verified credentials with IDs
│   ├── hooks/
│   │   └── useReducedMotion.ts         # User accessibility preference hook
│   └── types/
│       └── index.ts                    # Strict TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 3. Section Architecture & Technical Implementation

### 3.1 Hero Section (`Hero.tsx`)
- High-impact display typography: "RAYHAN KHAN" with subtitle "Software Engineer · AI/ML Systems Architect".
- Asymmetric layout:
  - Left: Location `NOIDA, UTTAR PRADESH, INDIA`, live availability indicator, and quick index anchors.
  - Center: Atmospheric focal headshot with hairline border and depth mask.
  - Right: Concise engineering summary (focusing on full-stack architecture, machine learning models, and production deployment).
- GSAP timeline reveals headline with staggered overflow-hidden masks.

### 3.2 About Section (`About.tsx`)
- Editorial layout with bold section indicator `01 / IDENTITY`.
- Factual narrative extracted from verified sources: Computer Science undergraduate at AKTU, specializing in full-stack architecture, deep learning inference, and distributed systems.
- Core philosophy: bridging the gap between raw AI experimentation and robust, deployable software.

### 3.3 Projects Section (`Projects.tsx`)
- Flagship showcases for:
  1. **Lumine AI:** DINOv2 skin intelligence with kinetic unblur and longitudinal history metrics.
  2. **SatQuery AI:** Geospatial assistant for SIH 2026 with radar telemetry sweep and band analysis specs.
  3. **Current Capital:** Financial manager with Gemini Vision receipt extraction.
  4. **Hand Tracking Visualizer:** Real-time 60 FPS Three.js / WebGL Edge AI particle simulation.
  5. **Health Assistant Platform:** SIH 2025 winning architecture with Supabase and clinical APIs.
- Interactive modal inspection for detailed system architecture, deliverables, and live links.

### 3.4 Experience Section (`Experience.tsx`)
- High-contrast timeline:
  - Boston Consulting Group (BCG) Data Science Job Simulation (October 2026)
  - SYNK Artificial Intelligence Intern (July 2026 – September 2026)
- Clear contribution points: Python, PyTorch, Pandas, NumPy, churn analysis, model evaluation.

### 3.5 Skills Section (`Skills.tsx`)
- Clean, non-gimmicky grid categorized by engineering domain:
  - Languages (Python, TypeScript, JavaScript, C++, C, SQL, Java)
  - AI & Machine Learning (PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, OpenCV)
  - Full-Stack & APIs (FastAPI, React.js, Next.js, Node.js, Express.js, Django)
  - Databases & Cloud (PostgreSQL, MongoDB, Firebase, Google Cloud Platform, Docker)
  - Core Focus (Agentic AI, RAG Systems, Computer Vision, MLOps, System Architecture)

### 3.6 Achievements, Education, and Certifications
- **Achievements:** Clear presentation of SIH 2025 (48-hour healthcare sprint) and SIH 2026 leadership.
- **Education:** AKTU Bachelor of Technology in Computer Science and Engineering.
- **Certifications:** Interactive archive featuring Google Advanced Data Analytics, Google IT Automation, IBM Agentic AI, and Advanced RAG, linked directly to Coursera verification credentials.

### 3.7 Contact & Legal Sections
- **Contact:** Direct email `khanrayhan8307@gmail.com`, GitHub, LinkedIn, and LeetCode links.
- **Footer:** Status telemetry, current year, copyright, and direct links to `/terms` and `/privacy`.
- **Legal Pages:**
  - `/terms`: Professional Terms of Service reflecting static portfolio functionality, intellectual property rights, and fair usage.
  - `/privacy`: Factual Privacy Policy documenting zero non-essential cookie tracking, standard hosting telemetry, and explicit user-initiated communications.

---

## 4. Verification & Testing Strategy
- Compile check: `tsc --noEmit`
- Lint check: `npm run lint`
- Build check: `npm run build`
- Browser validation: Verify on responsive viewports (1440px, 1280px, 768px, 390px, 320px).
- Reduced motion test: Verify static layout fallbacks when `prefers-reduced-motion` is enabled.
