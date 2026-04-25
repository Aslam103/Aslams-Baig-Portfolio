import { motion } from "framer-motion";
import { Building2, ExternalLink, Target, Sparkles, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CurrentRole() {
  return (
    <section id="current-role" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Current Role
          </h2>
          <div className="w-20 h-1 bg-cyan-500 rounded mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="glass-panel overflow-hidden border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 group">
            <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 opacity-80 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 md:opacity-10 pointer-events-none">
                <Building2 className="w-48 h-48 text-cyan-400" />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                      Technical Training & Learning Systems
                    </h3>
                    <p className="text-lg text-cyan-400 font-medium flex items-center gap-2">
                      Technoworld Group (TWG International)
                      <span className="text-muted-foreground text-sm font-normal px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        Abids, Hyderabad
                      </span>
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                    At TWG International, Mirza contributes to learning systems design — shaping technical training programs across Full Stack Java, Data Analytics, AI tooling, and Digital Skills. The focus is on building outcomes-first cohorts where students leave with portfolio-grade artifacts, not just certificates.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {[
                      { icon: Target, label: "Curriculum architecture" },
                      { icon: Users, label: "Cohort mentoring" },
                      { icon: Sparkles, label: "AI tooling integration" },
                      { icon: Award, label: "Outcomes-first delivery" }
                    ].map((chip, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground hover:bg-white/10 hover:border-cyan-500/30 transition-colors">
                        <chip.icon className="w-4 h-4 text-cyan-400" />
                        {chip.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <Button 
                    className="w-full md:w-auto h-12 px-8 bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                    onClick={() => window.open('https://technoworldgroup.com', '_blank', 'noopener,noreferrer')}
                    data-testid="button-visit-company"
                  >
                    Visit Company <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
