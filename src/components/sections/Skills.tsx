"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const categories = [
  {
    number: "01",
    title: "Intelligence",
    items: [
      { name: "Machine Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg", desc: "Predictive models, deep learning architectures, and neural network optimization." },
      { name: "Computer Vision", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg", desc: "Real-time object detection, image classification, and MediaPipe integration." },
      { name: "Generative AI", icon: null, desc: "LLM integration, RAG systems, Hugging Face models, and prompt engineering." },
      { name: "Data Science", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", desc: "Data preprocessing, exploratory analysis, and visualization pipelines." },
    ],
  },
  {
    number: "02",
    title: "Systems",
    items: [
      { name: "Python & FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", desc: "High-performance asynchronous backends and AI model serving." },
      { name: "Node.js & TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", desc: "Scalable network applications and strongly typed server logic." },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", desc: "Relational database design, complex querying, and data integrity." },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", desc: "Containerization, isolated environments, and deployment pipelines." },
    ],
  },
  {
    number: "03",
    title: "Interactive",
    items: [
      { name: "React & Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", desc: "Component-driven UI, SSR, and dynamic frontend architectures." },
      { name: "Three.js & WebGL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", desc: "3D graphics, custom shaders, and immersive browser environments." },
      { name: "Motion & Animation", icon: null, desc: "Complex timeline animations, scroll-driven interactions, and fluid motion." },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", desc: "Utility-first styling for rapid, responsive, and consistent design systems." },
    ],
  },
];

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative z-10 py-32 md:py-48 bg-background">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        <motion.div 
          className="mb-24 md:mb-32 flex flex-col items-center text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1 h-1 bg-tertiary shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-tertiary">
              Capabilities
            </span>
            <span className="w-1 h-1 bg-tertiary shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-tight">
            Technical Arsenal.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, catIdx) => (
            <motion.div 
              key={category.number}
              className="flex flex-col gap-8 bg-[#0b0f19] p-8 md:p-10 rounded-sm border border-white/5 relative overflow-hidden group hover:border-tertiary/30 transition-colors duration-500"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.05)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Header */}
              <div className="flex items-end justify-between border-b border-white/10 pb-6 relative z-10">
                <h3 className="font-display text-3xl md:text-4xl text-foreground leading-none">
                  {category.title}
                </h3>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-tertiary/60">
                  SEC.{category.number}
                </span>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-8 relative z-10">
                {category.items.map((item, itemIdx) => (
                  <li key={item.name} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      {item.icon ? (
                        <Image 
                          src={item.icon} 
                          alt={item.name} 
                          width={16} 
                          height={16} 
                          className="opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
                        />
                      ) : (
                        <span className="font-mono text-[10px] text-tertiary font-bold tracking-widest">
                          [+]
                        </span>
                      )}
                      <span className="font-sans text-base text-foreground group-hover:text-tertiary transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-secondary-foreground font-light leading-relaxed pl-7">
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
