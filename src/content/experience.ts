import { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "bcg-data-science",
    role: "Data Science Job Simulation",
    company: "Boston Consulting Group (BCG)",
    date: "October 2026",
    location: "Remote",
    description: [
      "Analyzed customer churn drivers for enterprise client datasets, formulating empirical investigation hypotheses.",
      "Engineered data pipelines using Python, Pandas, and NumPy, applying statistical tests to identify key churn indicators.",
      "Trained and evaluated a Random Forest classifier achieving 50% recall on churn risks, translating model predictions into strategic retention workflows."
    ]
  },
  {
    id: "synk-ai",
    role: "Artificial Intelligence Intern",
    company: "SYNK",
    date: "July 2026 to September 2026",
    location: "Remote",
    description: [
      "Engineered machine learning pipelines utilizing Python, PyTorch, Pandas, and NumPy for intelligent data products.",
      "Constructed preprocessing workflows, model evaluation harnesses, and iterative benchmark suites for production models."
    ]
  }
];
