import { motion } from "framer-motion";
import { Activity, ArrowRight, Play, Server, Layers, CalendarDays, Medal, Link2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        
        {/* Ongoing Projects */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ongoing Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI-Integrated Learning Systems", desc: "Building practical, structured learning systems enhanced with AI.", icon: Server },
              { title: "n8n Automation Workflows", desc: "Developing complex automations running in Docker environments.", icon: Play },
              { title: "Personal Portfolio Expansion", desc: "Continuously improving digital identity, branding, and resource sharing.", icon: Layers },
            ].map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="glass-panel h-full border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{proj.title}</h3>
                      <p className="text-sm text-muted-foreground">{proj.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Plans & Sports */}
        <div className="grid md:grid-cols-2 gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <CalendarDays className="w-6 h-6 text-violet-400" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Upcoming Plans</h2>
            </div>
            
            <div className="space-y-4">
              {[
                "New highly practical courses",
                "More student-friendly content creation",
                "AI Chatbot enhancements and fine-tuning",
                "Digital teaching system deployment",
                "Linked portfolio & document library integration",
                "Dashboard data visualization upgrades"
              ].map((plan, idx) => (
                <div key={idx} className="flex items-center gap-3 glass-panel p-4 rounded-lg border-white/5">
                  <ArrowRight className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="text-sm font-medium">{plan}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Medal className="w-6 h-6 text-gold-400" style={{ color: 'hsl(45 80% 60%)' }} />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Sports Background</h2>
            </div>

            <Card className="glass-panel overflow-hidden border-white/5">
              <div className="h-32 bg-gradient-to-br from-black to-neutral-900 relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardContent className="relative -mt-10 p-6">
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                  <Medal className="w-8 h-8 text-gold-400" style={{ color: 'hsl(45 80% 60%)' }} />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      Football
                      <Badge variant="outline" className="text-xs bg-white/5 border-white/10">Enthusiast / Player</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Strategic team play and physical endurance.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      Taekwondo
                      <Badge variant="outline" className="text-xs bg-white/5 border-white/10">College Level</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Discipline, focus, and competitive martial arts training.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      Karate
                      <Badge variant="outline" className="text-xs bg-white/5 border-white/10">Experienced</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Foundational martial arts technique and defensive skills.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
