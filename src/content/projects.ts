export const projects = [
  {
    id: "lumine",
    title: "Lumine – AI-Powered Skin Intelligence",
    date: "July 2026",
    technologies: ["React", "FastAPI", "PostgreSQL", "Hugging Face", "DINOv2", "Google Gemini"],
    description: "Developed a full-stack AI platform using React and FastAPI, integrating DINOv2 to classify 31 visual skin conditions. Engineered a PostgreSQL backend with JWT authentication to manage history, track trends, and enforce data privacy.",
    details: [
      "Integrated Google Gemini and Hugging Face APIs for personalized insights and a context-aware assistant using history.",
      "Deployed on Vercel and Render with API rate limiting, secure image validation, and 40+ automated Pytest tests."
    ],
    links: {
      live: "https://lumineai.vercel.app/",
      github: "https://github.com/Rayhan-099/lumine"
    }
  },
  {
    id: "satquery-ai",
    title: "SatQuery AI",
    description: "Engineered a multimodal EO assistant using Next.js and FastAPI for natural-language satellite analysis across NDVI, NDWI, and SAR.",
    details: [
      "Implemented raster analysis with Rasterio and NumPy, generating spatial statistics and validating numerical AI claims.",
      "Designed query orchestration mapping natural-language intent to NDVI, NDWI, and Sentinel-1 SAR analytical tools.",
      "Validated 7/7 curated benchmark cases spanning NDVI, NDWI, SAR, unsupported queries, and evidence-grounded responses."
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
    description: "Built a full-stack personal finance web app for automated expense tracking and dynamic envelope budgeting. Engineered a low-latency REST API with Node.js and Express, protected by stateless JWT authentication.",
    details: [
      "Enabled real-time financial analytics using custom Recharts to render interactive data visualizations.",
      "Designed a responsive, glassmorphism-themed frontend architecture using React, Context API, and Tailwind CSS.",
      "Integrated Google Gemini Vision AI to automatically extract and categorize transaction data from receipt images."
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
    description: "Led a team to build a full-stack health platform, clearing the SIH 2025 internal round. Architected a fault-tolerant Supabase backend with medical APIs, achieving <250ms response times.",
    details: [
      "Engineered 5+ React modules and a real-time medical reminder system with >95% reliability."
    ],
    links: {
      live: "https://health-assistant-azure.vercel.app/",
      github: "https://github.com/Rayhan-099/health-assistant"
    }
  }
];
