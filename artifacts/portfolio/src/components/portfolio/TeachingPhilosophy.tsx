import { motion } from "framer-motion";
import { Target, Compass, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TeachingPhilosophy() {
  return (
    <section id="philosophy" className="py-24 relative bg-black/40">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Teaching Philosophy
          </h2>
          <div className="w-20 h-1 bg-violet-500 rounded mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-panel h-full border-white/5 hover:border-violet-500/30 transition-colors">
              <CardContent className="p-8">
                <Target className="w-8 h-8 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold mb-4">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To build a practical education ecosystem where learning creates real-life transformation. It’s not just about delivering information, but architecting the conditions where students can build confidence through competence.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-panel h-full border-white/5 hover:border-cyan-500/30 transition-colors">
              <CardContent className="p-8">
                <Compass className="w-8 h-8 text-violet-400 mb-6" />
                <h3 className="text-xl font-bold mb-4">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To simplify complex knowledge using interactive learning, emotional intelligence, AI tools, and structured systems. The goal is to move students from passive listeners to active builders.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-panel p-8 rounded-2xl border-white/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-gold-400" style={{ color: 'hsl(45 80% 60%)' }} />
            <h3 className="text-xl font-bold">Core Principles</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Practical Learning', 'Discipline', 'Responsibility', 'Innovation', 'Honesty', 'Growth', 'Compassion', 'Respect for Learners'].map((val, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl text-center text-sm font-medium hover:bg-white/10 transition-colors">
                {val}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
