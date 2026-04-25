import { motion } from "framer-motion";
import {
  MessageSquare,
  LayoutGrid,
  Compass,
  Users,
  Award,
  Languages,
  GraduationCap,
  Sparkles,
  BookOpen,
  Workflow,
  Briefcase,
} from "lucide-react";
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
            <div className="relative w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem] mx-auto">
              {/* Orbital rings */}
              <div className="absolute inset-12 rounded-full border border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-16 rounded-full border border-violet-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-20 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />

              {/* MAB orb */}
              <div className="absolute inset-24 rounded-full overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
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

              {/* Floating stat — Total Experience (top-left) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute top-2 left-0 sm:left-2 glass-panel bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover-elevate"
                data-testid="stat-experience"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/30">
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-white leading-none">13<span className="text-cyan-400">+</span></div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Years Exp</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat — MSCIT Score (top-right) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute top-8 right-0 sm:right-2 glass-panel bg-black/60 backdrop-blur-xl border border-violet-500/30 rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover-elevate"
                data-testid="stat-mscit"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center border border-violet-500/30">
                    <Award className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-white leading-none">84<span className="text-violet-400 text-lg">%</span></div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">MSCIT</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat — Languages (bottom-left) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-10 left-0 sm:-left-2 glass-panel bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 hover-elevate"
                data-testid="stat-languages"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Languages className="w-5 h-5" style={{ color: "hsl(45 80% 60%)" }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-white leading-none">5</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Languages</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat — Certifications (bottom-right) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute bottom-2 right-0 sm:right-2 glass-panel bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl px-4 py-3 hover-elevate"
                data-testid="stat-cert"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <GraduationCap className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight text-white leading-none">B.C.A · ADFA</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Education</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat — Courses (mid-right) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="hidden sm:flex absolute top-1/2 -right-4 -translate-y-1/2 glass-panel bg-black/60 backdrop-blur-xl border border-violet-500/20 rounded-2xl px-3 py-2 hover-elevate items-center gap-2"
                data-testid="stat-courses"
              >
                <BookOpen className="w-4 h-4 text-violet-400" />
                <div>
                  <div className="text-sm font-bold text-white leading-none">6 Tracks</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">Courses</div>
                </div>
              </motion.div>

              {/* Floating stat — Automations (mid-left) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="hidden sm:flex absolute top-1/2 -left-4 -translate-y-1/2 glass-panel bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl px-3 py-2 hover-elevate items-center gap-2"
                data-testid="stat-automations"
              >
                <Workflow className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-sm font-bold text-white leading-none">n8n · Docker</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">Automation</div>
                </div>
              </motion.div>
            </div>

            {/* Specialty chips below the orb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-6 flex flex-wrap justify-center gap-2 max-w-md mx-auto"
              data-testid="hero-specialties"
            >
              {[
                "AI Educator",
                "Course Designer",
                "System Builder",
                "Mentor",
                "Content Creator",
                "Data Analytics",
                "Full Stack Java",
              ].map((tag, i) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`text-xs font-medium border px-3 py-1 backdrop-blur-sm ${
                    i % 3 === 0
                      ? "border-cyan-500/30 bg-cyan-500/5 text-cyan-300"
                      : i % 3 === 1
                      ? "border-violet-500/30 bg-violet-500/5 text-violet-300"
                      : "border-white/15 bg-white/5 text-foreground/80"
                  }`}
                  data-testid={`chip-specialty-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Sparkles className="w-3 h-3 mr-1.5 opacity-70" />
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
