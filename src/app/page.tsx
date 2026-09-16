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
  return (
    <main className="relative min-h-screen">
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
