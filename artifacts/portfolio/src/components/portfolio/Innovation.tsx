import { motion } from "framer-motion";
import { MessageSquare, Workflow, Server, Settings, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { systems } from "@/data/systems";

const ICONS: Record<string, React.ElementType> = {
  "message-square": MessageSquare,
  "workflow": Workflow,
  "server": Server,
  "settings": Settings,
  "graduation-cap": GraduationCap
};

export function Innovation() {
  return (
    <section id="innovation" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              AI Systems & Innovations
            </h2>
            <div className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" />
            <p className="text-muted-foreground">Architecture behind the teaching — where systems, automation, and learning meet.</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {systems.map((card, idx) => {
            const Icon = ICONS[card.iconHint] || Settings;
            const isWide = idx === systems.length - 1 && systems.length % 2 !== 0 && systems.length % 3 !== 0;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={isWide ? 'lg:col-span-3 sm:col-span-2 max-w-lg mx-auto w-full' : ''}
              >
                <Card className={`glass-panel h-full border-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 group`}>
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}