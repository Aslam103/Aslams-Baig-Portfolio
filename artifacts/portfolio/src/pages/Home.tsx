import { useState } from "react";
import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Courses } from "@/components/portfolio/Courses";
import { Projects } from "@/components/portfolio/Projects";
import { Documents } from "@/components/portfolio/Documents";
import { ChatbotSection } from "@/components/portfolio/Chatbot";
import { Contact, Footer } from "@/components/portfolio/Contact";

export default function Home() {
  const [dashboardMode, setDashboardMode] = useState(false);

  return (
    <div className={`min-h-[100dvh] flex flex-col ${dashboardMode ? 'max-w-[1600px] mx-auto border-x border-white/5 shadow-2xl bg-black/40' : ''} transition-all duration-500`}>
      <Navigation dashboardMode={dashboardMode} setDashboardMode={setDashboardMode} />
      
      {/* Fixed Ambient Background - ensures the bg-glow image is applied */}
      <div 
        className="fixed inset-0 z-[-1] opacity-30 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}src/assets/bg-glow.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <main className="flex-1">
        <Hero />
        
        <div className={dashboardMode ? 'grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 px-4' : ''}>
          <div className={dashboardMode ? 'space-y-12' : ''}>
            <About />
            <Skills />
            <Experience />
            <Courses />
            <Projects />
            <Documents />
          </div>
          
          <div className={dashboardMode ? 'pt-20 space-y-8 sticky top-0 h-screen overflow-y-auto pb-20 custom-scrollbar' : ''}>
            <ChatbotSection />
            {dashboardMode && (
              <div className="glass-panel p-6 rounded-xl border-cyan-500/20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  System Metrics
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-mono text-cyan-400">99.9%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Active Workflows</span>
                    <span className="font-mono text-violet-400">12 (n8n)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-mono">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-muted-foreground">Visitors (Simulated)</span>
                    <span className="font-mono text-gold-400" style={{ color: 'hsl(45 80% 60%)' }}>1,024</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Contact />
      </main>

      <Footer />
      
      {/* Dashboard mode global styles override */}
      {dashboardMode && (
        <style>{`
          body.dashboard-mode {
            background-color: hsl(222 47% 5%);
          }
          .dashboard-mode section {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          .dashboard-mode .glass-panel {
            background: rgba(0,0,0,0.6);
            border-color: rgba(255,255,255,0.08);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
          }
        `}</style>
      )}
    </div>
  );
}
