"use client";

import { motion } from "motion/react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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
  return (
    <section id="skills" className="relative z-10 py-32 md:py-48">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        
        <motion.div 
          className="mb-24 md:mb-40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            variants={fadeUp} custom={0}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-[0.85] tracking-tight"
          >
            Skills.
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-32 md:gap-40">
          {categories.map((category, catIdx) => (
            <motion.div 
              key={category.number}
              className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start border-t border-accent/10 pt-12 md:pt-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Category label */}
              <div className="w-full lg:w-1/3 flex-shrink-0">
                <motion.span 
                  variants={fadeUp} custom={0}
                  className="font-sans text-[11px] tracking-[0.4em] uppercase text-accent/60 mb-4 block"
                >
                  {category.number}
                </motion.span>
                <motion.h3 
                  variants={fadeUp} custom={0.08}
                  className="font-display text-5xl md:text-7xl text-foreground leading-[0.9]"
                >
                  {category.title}
                </motion.h3>
              </div>

              {/* Skill items */}
              <div className="w-full lg:w-2/3">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 md:gap-x-16">
                  {category.items.map((item, itemIdx) => (
                    <motion.li 
                      key={item.name} 
                      variants={fadeUp}
                      custom={0.1 + itemIdx * 0.08}
                      className="flex flex-col gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon ? (
                          <Image 
                            src={item.icon} 
                            alt={item.name} 
                            width={22} 
                            height={22} 
                            className="opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                          />
                        ) : (
                          <span className="w-[22px] h-[22px] rounded-sm border border-accent/20 flex items-center justify-center text-[8px] text-accent/60 font-sans">
                            AI
                          </span>
                        )}
                        <span className="font-sans text-lg tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-sans text-sm text-muted font-light leading-relaxed border-l border-accent/8 pl-4">
                        {item.desc}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
