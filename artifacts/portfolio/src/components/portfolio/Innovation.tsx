import { motion } from "framer-motion";
import { Brain, Workflow, GraduationCap, LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Innovation() {
  const cards = [
    {
      title: "AI Learning Systems",
      desc: "Curricula designed around AI tooling so students learn the tools they'll actually use.",
      icon: Brain,
      color: "cyan"
    },
    {
      title: "Automation Workflows",
      desc: "n8n + Docker pipelines that automate enrolment, content delivery, and mentor handoffs.",
      icon: Workflow,
      color: "violet"
    },
    {
      title: "Structured Education Models",
      desc: "Cohort blueprints with outcome milestones, weekly artifacts, and feedback loops.",
      icon: GraduationCap,
      color: "gold"
    },
    {
      title: "Dashboard-based Thinking",
      desc: "Every system has a dashboard — visibility is a feature, not an afterthought.",
      icon: LayoutDashboard,
      color: "blue"
    }
  ];

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
              Innovation & Systems Thinking
            </h2>
            <div className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" />
            <p className="text-muted-foreground">Treating education as an engineering problem — optimizing for outcomes.</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const colorClass = card.color === 'gold' ? 'text-yellow-400' : `text-${card.color}-400`;
            const borderHover = card.color === 'gold' ? 'hover:border-yellow-500/40' : `hover:border-${card.color}-500/40`;
            const bgClass = card.color === 'gold' ? 'bg-yellow-500/10' : `bg-${card.color}-500/10`;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`glass-panel h-full border-white/5 ${borderHover} transition-all duration-300 group`}>
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl ${bgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${colorClass}`} style={card.color === 'gold' ? { color: 'hsl(45 80% 60%)' } : {}} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
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
