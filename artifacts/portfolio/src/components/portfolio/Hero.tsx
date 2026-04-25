import { motion } from "framer-motion";
import { MessageSquare, LayoutGrid, Compass, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="min-h-[100dvh] flex items-center justify-center pt-24 pb-16 relative overflow-hidden">
      {/* Ambient background textures */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex">
              <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/30 px-4 py-1.5 text-sm font-mono tracking-wide">
                SYSTEM STATUS: ONLINE
              </Badge>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Mirza Aslam <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600">Baig</span>
            </h1>
            
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-500 bg-white/5 backdrop-blur-sm">
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                Mirza Aslam Baig is an AI Educator, Course Designer, and System Builder based in Hyderabad. He architects practical learning experiences that combine AI tooling, data analytics, and structured automation — translating complex technical concepts into outcomes students actually use. Across 13+ years he has built courses, run training cohorts, mentored learners, designed dashboards, and shipped automation workflows on n8n and Docker. He is currently leading technical training and learning systems at TWG International (Abids, Hyderabad).
              </p>
              <ul className="text-sm text-foreground/80 space-y-2 mt-4 list-disc pl-4 marker:text-violet-500">
                <li>Course design across AI, Data Analytics, Full Stack Java, Excel, Financial Analysis, and Digital Skills</li>
                <li>Self-hosted automation systems with n8n + Docker for repeatable training operations</li>
                <li>Operations & accounting fluency (Tally, FOCUS 9, reconciliation) translated into curriculum</li>
                <li>Long-form content & video production for educational distribution</li>
                <li>Mentorship, counseling, and structured learner support</li>
                <li>B.C.A (pursuing), MSCIT 84%, ADFA — continuous learner</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <Button 
                onClick={() => scrollTo("#projects")} 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all h-12 px-6"
                data-testid="btn-hero-projects"
              >
                <LayoutGrid className="w-5 h-5 mr-2" />
                View Projects
              </Button>
              <Button 
                onClick={() => scrollTo("#courses")} 
                variant="outline" 
                size="lg" 
                className="border-white/20 hover:bg-white/10 h-12 px-6"
                data-testid="btn-hero-courses"
              >
                <Compass className="w-5 h-5 mr-2" />
                Explore Courses
              </Button>
              <Button 
                onClick={() => scrollTo("#chatbot")} 
                variant="outline" 
                size="lg" 
                className="border-white/20 hover:bg-white/10 h-12 px-6"
                data-testid="btn-hero-chat"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI
              </Button>
              <Button 
                onClick={() => scrollTo("#contact")} 
                variant="outline" 
                size="lg" 
                className="border-white/20 hover:bg-white/10 h-12 px-6"
                data-testid="btn-hero-connect"
              >
                <Users className="w-5 h-5 mr-2" />
                Connect
              </Button>
            </div>
            
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-violet-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
              
              <div className="absolute inset-12 rounded-full overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
                <img 
                  src={`${import.meta.env.BASE_URL}src/assets/hero-avatar.png`} 
                  alt="MAB AI Avatar" 
                  className="w-full h-full object-cover opacity-90 mix-blend-screen"
                  onError={(e) => {
                     e.currentTarget.style.display = 'none';
                     e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-cyan-900', 'to-violet-900');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
