import { motion } from "framer-motion";
import { FolderGit2, AlertCircle, ArrowUpRight, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

const LEGACY_WINS = [
  "20% reconciliation improvement via Focus + Google Sheets",
  "30% social engagement lift through visual storytelling",
  "25% lead-generation lift across digital marketing campaigns",
  "40% downtime reduction via proactive network support",
  "25% staff efficiency boost via internal Android app",
  "30% donor engagement lift via promotional videos"
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
          >
            Projects & Key Achievements
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-cyan-500 rounded mx-auto" 
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {projects.map((proj, idx) => {
            const isWide = idx === projects.length - 1 && projects.length % 2 !== 0 && projects.length % 3 !== 0;
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`h-full ${isWide ? 'lg:col-span-2' : ''}`}
              >
                <Card className={`glass-panel h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 border-white/5 hover:border-cyan-500/30 group overflow-hidden`}>
                  <div className={`h-1 w-full bg-gradient-to-r from-cyan-500/50 to-transparent`} />
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.tags.map((tag, tIdx) => (
                        <Badge key={tIdx} variant="outline" className="bg-white/5 border-white/10 text-[10px] uppercase tracking-wider text-muted-foreground">{tag}</Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl flex items-start justify-between gap-4">
                      {proj.title}
                      <FolderGit2 className="w-5 h-5 text-cyan-400 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-2">
                      {proj.summary}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-2">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-1 rounded bg-black/40 border border-white/5 text-muted-foreground">
                          {tool}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto space-y-3 pt-4 border-t border-white/5">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">
                          <AlertCircle className="w-3 h-3" /> Problem
                        </div>
                        <p className="text-sm text-foreground/90">{proj.problem}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-cyan-400/80 mb-1">
                          <ArrowUpRight className="w-3 h-3" /> Impact
                        </div>
                        <p className="text-sm font-medium text-cyan-400 leading-snug">{proj.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quantitative Wins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-2xl border-white/5 bg-black/40"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-gold-400" style={{ color: 'hsl(45 80% 60%)' }} />
            Quantitative Impact
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEGACY_WINS.map((win, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-sm font-medium text-foreground/90">{win}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}