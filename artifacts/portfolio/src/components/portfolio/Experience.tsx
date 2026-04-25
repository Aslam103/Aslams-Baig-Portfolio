import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-violet-500 rounded mx-auto mb-10" />
          </motion.div>
        </div>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-10">
          {experience.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative pl-8 md:pl-12"
            >
              <div className={`absolute -left-[9px] md:-left-[9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-${exp.color}-500 z-10 shadow-[0_0_10px_rgba(var(--${exp.color}-500),0.5)]`} />
              
              <Card className="glass-panel border-white/5 hover:border-white/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                      <p className="text-muted-foreground font-medium text-sm mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="inline-flex shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${exp.color}-500/10 text-${exp.color}-400 border border-${exp.color}-500/20 whitespace-nowrap`}>
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}