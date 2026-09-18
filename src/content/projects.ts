export const projects = [
  {
    id: "lumine",
    title: "Lumine – AI-Powered Skin Intelligence",
    date: "July 2026",
    technologies: ["React", "FastAPI", "PostgreSQL", "Hugging Face", "DINOv2", "Google Gemini"],
    description: "Engineered a full-stack AI platform to classify visual skin conditions, mapping image inputs to diagnostic insight. Built with a React frontend and a resilient PostgreSQL backend to securely manage user history, track trends, and enforce data privacy.",
    details: [
      "Integrated DINOv2 alongside Google Gemini and Hugging Face APIs to build a context-aware assistant capable of providing personalized, history-informed insights.",
      "Developed a robust API using FastAPI, deployed across Vercel and Render with strict rate limiting, secure image validation, and comprehensive automated testing via Pytest."
    ],
    links: {
      live: "https://lumineai.vercel.app/",
      github: "https://github.com/Rayhan-099/lumine"
    }
  },
  {
    id: "satquery-ai",
    title: "SatQuery AI",
    description: "Developed a multimodal Earth Observation assistant that translates natural-language queries into deterministic remote sensing analysis.",
    details: [
      "Architected an orchestration layer mapping human intent directly to analytical tools for NDVI, NDWI, and Sentinel-1 SAR processing.",
      "Implemented robust raster analysis using Rasterio and NumPy, dynamically generating spatial statistics and validating numerical claims against the source imagery.",
      "Demonstrated consistent accuracy across curated benchmark cases, strictly grounding the AI responses in verifiable geospatial evidence."
    ],
    technologies: ["Next.js", "FastAPI", "PyTorch", "Rasterio"],
    links: {
      live: "https://aisatquery.vercel.app/",
      github: "https://github.com/Rayhan-099/satquery-ai"
    },
    contextLabel: "SIH 2026"
  },
  {
    id: "current-capital",
    title: "Current Capital – Finance Manager",
    date: "February 2026",
    technologies: ["React", "Node.js", "Express", "Tailwind CSS", "Gemini AI", "Context API"],
    description: "Architected a full-stack personal finance application addressing the problem of manual expense tracking through dynamic envelope budgeting and automated categorization.",
    details: [
      "Engineered a low-latency Node.js and Express REST API, secured by stateless JWT authentication, to reliably serve user financial data.",
      "Enabled real-time financial analytics by integrating customized Recharts into a responsive, glassmorphism-themed React interface.",
      "Integrated Google Gemini Vision AI to parse receipt images and automatically extract and categorize transaction data."
    ],
    links: {
      live: "https://finance-manager-zeta.vercel.app/",
      github: "https://github.com/Rayhan-099/finance-manager"
    }
  },
  {
    id: "health-assistant",
    title: "Health Assistant Platform",
    date: "September 2025",
    technologies: ["React", "Supabase", "Medical APIs"],
    description: "Led the collaborative development of a comprehensive healthcare platform to clear the Smart India Hackathon 2025 internal selection round under a strict 48-hour deadline.",
    details: [
      "Architected a fault-tolerant Supabase backend integrated with specialized medical APIs, consistently achieving <250ms response times.",
      "Engineered a scalable React frontend comprising multiple independent modules and a highly reliable real-time medical reminder system."
    ],
    links: {
      live: "https://health-assistant-azure.vercel.app/",
      github: "https://github.com/Rayhan-099/health-assistant"
    }
  }
];
