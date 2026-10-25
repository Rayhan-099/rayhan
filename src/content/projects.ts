import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "lumine",
    title: "Lumine AI",
    subtitle: "Computer Vision Skin Intelligence Platform",
    date: "July 2026",
    technologies: ["React", "FastAPI", "PostgreSQL", "Meta DINOv2", "Google Gemini", "Pytest"],
    description:
      "A clinical-grade computer vision platform engineered to classify 31 dermatological conditions from image inputs, pairing diagnostic precision with an encrypted patient history vault.",
    details: [
      "Integrated Meta's DINOv2 self-supervised vision transformer alongside Google Gemini to produce context-aware clinical explanations based on patient longitudinal history.",
      "Engineered an asynchronous FastAPI backend deployed across Vercel and Render with token-bucket rate limiting, encrypted image pipelines, and 40+ automated Pytest test suites."
    ],
    deliverables: [
      "Vision Transformer Inference Pipeline",
      "Stateless JWT Authentication and Encrypted Patient Vault",
      "Dynamic Trend Tracking and Longitudinal Analytics"
    ],
    stats: "31 Classified Conditions | <350ms Model Inference | 40+ Automated Tests",
    image: "/media/projects/lumine.webp",
    gallery: [
      {
        id: "overview",
        label: "01 Overview",
        image: "/media/projects/lumine.webp",
        caption: "Production Skin Intelligence Interface",
        telemetry: "MODEL: META DINOv2 ViT • 31 SUPPORTED CLASSES"
      },
      {
        id: "analysis",
        label: "02 Neural Diagnostics",
        image: "/media/projects/lumine-analysis.webp",
        caption: "Vision Transformer Feature Embeddings & Top-3 Prediction Logic",
        telemetry: "INFERENCE: SUB-350MS • TOP-3 PROBABILITY VECTORS"
      },
      {
        id: "dashboard",
        label: "03 Telemetry Cockpit",
        image: "/media/projects/lumine-dashboard.webp",
        caption: "FastAPI + PostgreSQL Longitudinal Severity Dashboard",
        telemetry: "DATABASE: ACID POSTGRESQL • REAL-TIME RISK SPREAD"
      },
      {
        id: "history",
        label: "04 History Vault",
        image: "/media/projects/lumine-history.webp",
        caption: "Encrypted Longitudinal Patient Timeline & Privacy Control",
        telemetry: "PRIVACY: ZERO PERSISTENCE OPT-IN • JWT ENCRYPTION"
      }
    ],
    links: {
      live: "https://lumineai.vercel.app/",
      github: "https://github.com/Rayhan-099/lumine"
    }
  },
  {
    id: "satquery-ai",
    title: "SatQuery AI",
    subtitle: "Multimodal Earth Observation and SAR Pipeline",
    date: "August 2026",
    contextLabel: "SIH 2026",
    technologies: ["Next.js", "FastAPI", "PyTorch", "Rasterio", "NumPy", "Sentinel APIs"],
    description:
      "A geospatial intelligence assistant developed for Smart India Hackathon 2026 that translates natural language questions into deterministic remote sensing analysis across Sentinel-1 SAR and Sentinel-2 optical imagery.",
    details: [
      "Architected an orchestration engine mapping unstructured queries to analytical pipelines for NDVI, NDWI, surface water dynamics, and SAR backscatter thresholding.",
      "Implemented high-throughput raster processing using Rasterio and NumPy, computing zonal statistics and verifying satellite observations against raw band data."
    ],
    deliverables: [
      "Natural Language to Geospatial Tool Router",
      "Deterministic NDVI and NDWI Calculation Engine",
      "Dual-Polarization Sentinel-1 SAR Analysis Pipeline"
    ],
    stats: "SIH 2026 Selected | Multimodal SAR and Optical | 10m Resolution Analysis",
    image: "/media/projects/satquery-ai.webp",
    gallery: [
      {
        id: "sih-overview",
        label: "01 Mission Overview",
        image: "/media/projects/satquery-ai.webp",
        caption: "Smart India Hackathon 2026 Space Technology Submission",
        telemetry: "SIH26167 • TEAM LUNARIS • 10M SPATIAL RESOLUTION"
      },
      {
        id: "pipeline-arch",
        label: "02 Multimodal Pipeline",
        image: "/media/projects/satquery-arch.webp",
        caption: "Deterministic Sentinel-1 SAR & Sentinel-2 Optical Raster Orchestration",
        telemetry: "PYTORCH + RASTERIO • SAR BACKSCATTER + NDVI"
      }
    ],
    links: {
      live: "https://aisatquery.vercel.app/",
      github: "https://github.com/Rayhan-099/satquery-ai"
    }
  },
  {
    id: "current-capital",
    title: "Current Capital",
    subtitle: "Autonomous Financial Management and Analytics",
    date: "February 2026",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Recharts"],
    description:
      "A high-performance personal finance command center engineered to eliminate manual spreadsheets through real-time visual cashflow models, envelope budgeting guardrails, and JWT-secured ledger management.",
    details: [
      "Architected a low-latency Node.js and Express REST API with MongoDB aggregation pipelines for server-side financial metric calculations.",
      "Engineered interactive Recharts cashflow visualizations, multi-envelope budgeting thresholds, and automated transaction categorizations."
    ],
    deliverables: [
      "Real-Time Cashflow & Category Analytics Engine",
      "Dynamic Multi-Envelope Budgeting Guardrails",
      "Stateless JWT Session & Transaction Ledger"
    ],
    stats: "Real-Time Visual Analytics | Envelope Budgeting | Sub-100ms API Latency",
    image: "/media/projects/current-capital.webp",
    gallery: [
      {
        id: "cc-command",
        label: "01 Command Center",
        image: "/media/projects/current-capital.webp",
        caption: "Personal Finance Command Dashboard",
        telemetry: "MERN STACK • REAL-TIME CASHFLOW TELEMETRY"
      },
      {
        id: "cc-analytics",
        label: "02 Visual Analytics",
        image: "/media/projects/current-capital-analytics.webp",
        caption: "Recharts Category Breakdown & Spending Trends",
        telemetry: "MONGODB AGGREGATIONS • DYNAMIC BUDGET ENVELOPES"
      },
      {
        id: "cc-advisor",
        label: "03 AI Advisor",
        image: "/media/projects/current-capital-advisor.webp",
        caption: "Automated Financial Recommendations & Budget Guardrails",
        telemetry: "CONTEXTUAL ADVISORY • THRESHOLD NOTIFICATIONS"
      },
      {
        id: "cc-ledger",
        label: "04 Ledger Vault",
        image: "/media/projects/current-capital-ledger.webp",
        caption: "Encrypted Transaction Ledger & CRUD Operations",
        telemetry: "STATELESS JWT • BCRYPT SESSION PRIVACY"
      }
    ],
    links: {
      live: "https://finance-manager-zeta.vercel.app/",
      github: "https://github.com/Rayhan-099/finance-manager"
    }
  },
  {
    id: "hand-tracking-visualizer",
    title: "Hand Tracking Visualizer",
    subtitle: "Real-Time 3D Spatial Particle Simulation",
    date: "May 2026",
    technologies: ["Three.js", "WebGL", "Google MediaPipe", "React", "Tailwind CSS"],
    description:
      "A high-framerate computer vision graphics application mapping 21 hand landmarks to dynamic 3D particle simulations running completely client-side in the browser.",
    details: [
      "Achieved stable 60 FPS client-side inference using Google MediaPipe Edge AI with custom GPU fragment shaders for fluid particle motion.",
      "Designed spatial landmark physics calculating gesture tension, finger pinch vectors, and rotational velocities in real-time 3D coordinate space."
    ],
    deliverables: [
      "Client-Side Edge AI Inference Loop",
      "60 FPS GPU Particle Simulation Engine",
      "Dynamic Gesture Recognition and Velocity Physics"
    ],
    stats: "60 FPS Edge AI | 21 Spatial Landmarks | Zero Server Latency",
    image: "/media/projects/hand-tracking.webp",
    links: {
      live: "https://jujutsu-kaisen-rho.vercel.app/",
      github: "https://github.com/Rayhan-099/Hand-Tracking-Visualizer"
    }
  },
  {
    id: "health-assistant",
    title: "Health Assistant Platform",
    subtitle: "SIH 2025 Clinical Care Suite",
    date: "September 2025",
    contextLabel: "SIH 2025",
    technologies: ["React", "Supabase", "REST APIs", "Tailwind CSS"],
    description:
      "Led the engineering of a healthcare platform that secured victory in the Smart India Hackathon 2025 internal selection round under a demanding 48-hour sprint.",
    details: [
      "Architected a fault-tolerant Supabase relational backend integrated with clinical APIs, consistently achieving <250ms query response times.",
      "Engineered five responsive patient and practitioner modules with an automated reminder engine demonstrating over 95% execution reliability."
    ],
    deliverables: [
      "SIH 2025 Hackathon Winning Architecture",
      "Real-Time Medication and Appointment Engine",
      "High-Resilience Supabase Relational Schema"
    ],
    stats: "SIH 2025 Winner | 48-Hour Sprint | 6-Member Leadership",
    image: "/media/projects/health-assistant.webp",
    links: {
      live: "https://health-assistant-azure.vercel.app/",
      github: "https://github.com/Rayhan-099/health-assistant"
    }
  }
];
