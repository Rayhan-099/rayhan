import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "lumine",
    title: "Lumine AI",
    subtitle: "Computer Vision Skin Intelligence Platform",
    date: "July 2026",
    technologies: ["React", "FastAPI", "PostgreSQL", "DINOv2", "Google Gemini", "Pytest"],
    description:
      "A clinical-grade computer vision platform engineered to classify 31 dermatological conditions from image inputs, pairing diagnostic precision with an encrypted patient history vault.",
    details: [
      "Integrated Meta's DINOv2 self-supervised vision transformer alongside Google Gemini and Hugging Face APIs to produce context-aware clinical explanations based on patient longitudinal history.",
      "Engineered an asynchronous FastAPI backend deployed across Vercel and Render with token-bucket rate limiting, encrypted image pipelines, and 40+ automated Pytest test suites."
    ],
    deliverables: [
      "Vision Transformer Inference Pipeline",
      "Stateless JWT Authentication and Encrypted Patient Vault",
      "Dynamic Trend Tracking and Longitudinal Analytics"
    ],
    stats: "31 Classified Conditions | <350ms Model Inference | 40+ Automated Tests",
    image: "/media/projects/lumine.webp",
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
    image: "/media/projects/lumine.webp",
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
    technologies: ["React", "Node.js", "Express", "Tailwind CSS", "Gemini Vision AI"],
    description:
      "A modern financial architecture addressing manual bookkeeping through dynamic envelope budgeting, automated ledger synchronization, and real-time visual cashflow models.",
    details: [
      "Engineered a low-latency Node.js and Express REST API secured by stateless JWT authentication and strict input schema validation.",
      "Integrated Google Gemini Vision AI to parse receipt imagery, extracting vendor names, amounts, tax breakdowns, and category classifications directly into the database."
    ],
    deliverables: [
      "Vision-Powered Receipt Extraction",
      "Dynamic Multi-Envelope Budgeting Engine",
      "Interactive Real-Time Financial Telemetry"
    ],
    stats: "Automated OCR Ingestion | Envelope Budgeting | Sub-100ms API Latency",
    image: "/media/projects/current-capital.webp",
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
