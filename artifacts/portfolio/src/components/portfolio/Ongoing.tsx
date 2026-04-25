import { motion } from "framer-motion";
import { Activity, Server, Play, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Ongoing() {
  return (
    <section id="ongoing" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ongoing Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
    </section>
  );
}
