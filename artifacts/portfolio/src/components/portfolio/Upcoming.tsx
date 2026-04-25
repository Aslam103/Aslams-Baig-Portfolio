import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

export function Upcoming() {
  return (
    <section id="upcoming" className="py-12 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-10">
            <CalendarDays className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Upcoming Plans</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "New highly practical courses",
              "More student-friendly content creation",
              "AI Chatbot enhancements and fine-tuning",
              "Digital teaching system deployment",
              "Linked portfolio & document library integration",
              "Dashboard data visualization upgrades"
            ].map((plan, idx) => (
              <div key={idx} className="flex items-center gap-4 glass-panel p-5 rounded-xl border-white/5 hover:border-violet-500/30 transition-colors">
                <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{plan}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
