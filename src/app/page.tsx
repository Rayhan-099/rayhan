import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { AtmosphericScene } from "@/components/canvas/AtmosphericScene";
import { HeroVideo } from "@/components/canvas/HeroVideo";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Rayhan Khan",
        "url": "https://rayhank.vercel.app",
        "jobTitle": ["Software Engineer", "AI Engineer", "Full-Stack Developer"],
        "sameAs": [
          "https://github.com/Rayhan-099",
          "https://www.linkedin.com/in/rayhan-khan-081851340/"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Rayhan Khan Portfolio",
        "url": "https://rayhank.vercel.app"
      }
    ]
  };

  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroVideo />
      <AtmosphericScene />
      <Navigation />
      
      <div className="flex flex-col w-full relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
