import { useState } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { CurrentRole } from "@/components/portfolio/CurrentRole";
import { Courses } from "@/components/portfolio/Courses";
import { LearningPath } from "@/components/portfolio/LearningPath";
import { Experience } from "@/components/portfolio/Experience";
import { TeachingPhilosophy } from "@/components/portfolio/TeachingPhilosophy";
import { Certifications } from "@/components/portfolio/Certifications";
import { Innovation } from "@/components/portfolio/Innovation";
import { Ongoing } from "@/components/portfolio/Ongoing";
import { Upcoming } from "@/components/portfolio/Upcoming";
import { Documents } from "@/components/portfolio/Documents";
import { Resources } from "@/components/portfolio/Resources";
import { SocialEcosystem } from "@/components/portfolio/SocialEcosystem";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { ChatbotSection } from "@/components/portfolio/Chatbot";
import { Contact, Footer } from "@/components/portfolio/Contact";

export default function Home() {
  const [dashboardMode, setDashboardMode] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation dashboardMode={dashboardMode} setDashboardMode={setDashboardMode} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CurrentRole />
        <Courses />
        <LearningPath />
        <Experience />
        <TeachingPhilosophy />
        <Certifications />
        <Innovation />
        <Ongoing />
        <Upcoming />
        <Documents />
        <Resources />
        <SocialEcosystem />
        <Testimonials />
        <ChatbotSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
