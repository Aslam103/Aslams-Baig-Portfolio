import { motion } from "framer-motion";
import { Route, ArrowDown, MapPin } from "lucide-react";
import { learningPath } from "@/data/learningPath";

const LEVEL_COLORS = {
  Beginner: "bg-cyan-500",
  Intermediate: "bg-blue-500",
  Advanced: "bg-violet-500",
  Expert: "bg-fuchsia-500"
};

export function LearningPath() {
  return (
    <section id="learning-path" className="py-24 relative bg-black/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 flex items-center justify-center gap-3">
              <Route className="w-8 h-8 text-cyan-400" />
              Learning Path
            </h2>
            <div className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" />
            <p className="text-muted-foreground">A progression, not a checklist — start where you are, climb where you want.</p>
          </motion.div>
        </div>

        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex items-stretch justify-between relative pt-8 pb-12">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-500/20 via-violet-500/50 to-fuchsia-500/20 -translate-y-1/2" />
          
          {learningPath.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative w-1/4 px-4 flex flex-col items-center"
            >
              {/* Timeline Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/50 z-10 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${LEVEL_COLORS[stage.stage]} shadow-[0_0_10px_currentColor]`} />
              </div>

              {/* Top part (Stage label) */}
              <div className="h-24 flex items-end justify-center pb-8">
                <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground font-semibold">
                  {stage.stage}
                </div>
              </div>

              {/* Bottom part (Content) */}
              <div className="h-32 pt-8 text-center">
                <h3 className="text-lg font-bold text-foreground mb-2 whitespace-nowrap">{stage.program}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="lg:hidden relative pl-6 sm:pl-12 py-8 space-y-12">
          {/* Vertical line */}
          <div className="absolute top-8 bottom-8 left-[31px] sm:left-[55px] w-0.5 bg-gradient-to-b from-cyan-500/20 via-violet-500/50 to-fuchsia-500/20" />
          
          {learningPath.map((stage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute top-2 -left-[9px] sm:-left-[9px] w-4 h-4 rounded-full bg-black border-2 border-white/50 z-10 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${LEVEL_COLORS[stage.stage]} shadow-[0_0_10px_currentColor]`} />
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${LEVEL_COLORS[stage.stage].replace('bg-', '')}/20 to-transparent blur-2xl rounded-full translate-x-1/2 -translate-y-1/2`} />
                <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground font-semibold mb-2">
                  {stage.stage}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{stage.program}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}