"use client";

import { motion, useReducedMotion } from "motion/react";

const categories = [
  {
    number: "01",
    title: "Intelligence",
    items: [
      { name: "Machine Learning", desc: "Predictive models, deep learning architectures, and neural network optimization." },
      { name: "Computer Vision", desc: "Real-time object detection, image classification, and MediaPipe integration." },
      { name: "Generative AI", desc: "LLM integration, RAG systems, Hugging Face models, and prompt engineering." },
      { name: "Data Science", desc: "Data preprocessing, exploratory analysis, and visualization pipelines." },
    ],
  },
  {
    number: "02",
    title: "Systems",
    items: [
      { name: "Python & FastAPI", desc: "High-performance asynchronous backends and AI model serving." },
      { name: "Node.js & TypeScript", desc: "Scalable network applications and strongly typed server logic." },
      { name: "PostgreSQL", desc: "Relational database design, complex querying, and data integrity." },
      { name: "Docker", desc: "Containerization, isolated environments, and deployment pipelines." },
    ],
  },
  {
    number: "03",
    title: "Interactive",
    items: [
      { name: "React & Next.js", desc: "Component-driven UI, SSR, and dynamic frontend architectures." },
      { name: "Three.js & WebGL", desc: "3D graphics, custom shaders, and immersive browser environments." },
      { name: "Motion & Animation", desc: "Complex timeline animations, scroll-driven interactions, and fluid motion." },
      { name: "Tailwind CSS", desc: "Utility-first styling for rapid, responsive, and consistent design systems." },
    ],
  },
];

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative z-10 py-24 md:py-40 bg-background border-t border-line">
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
            Domain Expertise
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-text-primary leading-[1] tracking-tight italic">
            Capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((category, catIdx) => (
            <motion.div 
              key={category.number}
              className="flex flex-col"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="flex items-baseline gap-4 border-b border-line pb-4 mb-6">
                <span className="font-sans text-xs text-text-muted">
                  {category.number}
                </span>
                <h3 className="font-serif text-2xl text-text-primary leading-none italic">
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-6">
                {category.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-1">
                    <span className="font-sans text-[15px] font-medium text-text-primary">
                      {item.name}
                    </span>
                    <p className="font-sans text-[14px] text-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
