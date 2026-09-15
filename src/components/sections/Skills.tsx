"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const listY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.section 
      ref={sectionRef} 
      id="skills" 
      className="relative z-10 py-24 md:py-40 border-t border-line overflow-hidden"
    >
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col items-start"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
            Domain Expertise
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-foreground leading-[1] tracking-tight italic">
            Capabilities
          </h2>
        </motion.div>

        <motion.div 
          style={reduceMotion ? {} : { y: listY }}
          className="flex flex-col gap-12 md:gap-20"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {categories.map((category, catIdx) => (
            <motion.div 
              key={category.number}
              className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-24 items-start"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline gap-4 md:w-1/3 pt-2">
                <span className="font-sans text-xs text-text-secondary/50">
                  {category.number}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-text-primary leading-none italic">
                  {category.title}
                </h3>
              </div>

              {/* Items */}
              <ul className="flex flex-col w-full md:w-2/3">
                {category.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isHovered = hoveredIdx === id;
                  const isSomethingHovered = hoveredIdx !== null;
                  const opacityClass = isSomethingHovered 
                    ? isHovered ? "opacity-100" : "opacity-30" 
                    : "opacity-100";
                  
                  return (
                    <li 
                      key={item.name} 
                      className={`group py-6 md:py-8 flex flex-col gap-2 border-b border-line transition-all duration-500 cursor-default ${opacityClass}`}
                      onMouseEnter={() => setHoveredIdx(id)}
                    >
                      <span className="font-sans text-2xl md:text-3xl font-light text-foreground transition-transform duration-500 origin-left group-hover:translate-x-2">
                        {item.name}
                      </span>
                      <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed max-w-xl transition-all duration-500 opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto group-hover:mt-2">
                        {item.desc}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
