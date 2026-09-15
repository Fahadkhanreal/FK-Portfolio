import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero/Hero";
import { MetricsBar } from "@/components/MetricsBar";
import { StatementReveal } from "@/components/StatementReveal";
import { WorkShowcase } from "@/components/WorkShowcase";
import { AIPlayground } from "@/components/AIPlayground";
import { TechConstellation } from "@/components/TechConstellation";
import { Philosophy } from "@/components/Philosophy";
import { About } from "@/components/About";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Terminal } from "@/components/Terminal";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#ECE9E2] selection:bg-[#8C7BFF] selection:text-[#0A0A0C]">
      {/* Floating Navigation */}
      <Nav />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Real-Time Production Metrics Bar */}
      <MetricsBar />

      {/* 3. Editorial Statement */}
      <StatementReveal />

      {/* 4. Selected Work */}
      <WorkShowcase />

      {/* 5. Interactive AI & Architecture Lab */}
      <AIPlayground />

      {/* 6. Tech Stack Constellation */}
      <TechConstellation />

      {/* 7. Engineering Philosophy */}
      <Philosophy />

      {/* 8. About */}
      <About />

      {/* 9. Experience / Building Process */}
      <ProcessTimeline />

      {/* 10. Terminal — "FAHAD.OS" */}
      <Terminal />

      {/* 11. Currently Building */}
      <CurrentlyBuilding />

      {/* 12. Contact — Cinematic Ending */}
      <Contact />

      {/* 13. Footer */}
      <Footer />
    </main>
  );
}
