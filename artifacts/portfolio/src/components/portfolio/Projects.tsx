import { motion } from "framer-motion";
import { Brain, BarChart3, Code2, Workflow, Users, Video, LineChart, Target, Zap, Award, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HIGH_VALUE_PROJECTS = [
  {
    title: "AI-integrated Course Design",
    description: "Designing curricula that blend AI tools with practical learning.",
    icon: Brain,
    tag: "Education Systems",
    color: "cyan"
  },
  {
    title: "Data Analytics Training Programs",
    description: "Building structured training tracks for analytics learners.",
    icon: BarChart3,
    tag: "Curriculum",
    color: "blue"
  },
  {
    title: "Full Stack Java Teaching",
    description: "Mentoring students through end-to-end Java development.",
    icon: Code2,
    tag: "Mentorship",
    color: "violet"
  },
  {
    title: "Automation Workflows",
    description: "Building self-hosted automation pipelines with n8n + Docker.",
    icon: Workflow,
    tag: "Systems",
    color: "green"
  },
  {
    title: "Student Mentoring Systems",
    description: "Structured one-on-one and cohort mentoring programs.",
    icon: Users,
    tag: "Mentorship",
    color: "yellow"
  },
  {
    title: "Content Creation",
    description: "Long-form educational content and video production.",
    icon: Video,
    tag: "Media",
    color: "pink"
  }
];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {HIGH_VALUE_PROJECTS.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <Card className={`glass-panel h-full hover:-translate-y-2 transition-transform duration-300 border-white/5 hover:border-${proj.color}-500/40 group overflow-hidden`}>
                  <div className={`h-1 w-full bg-gradient-to-r from-${proj.color}-500/50 to-transparent`} />
                  <CardHeader className="pb-3 relative">
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-${proj.color}-500/10 flex items-center justify-center group-hover:bg-${proj.color}-500/20 transition-colors`}>
                      <Icon className={`w-5 h-5 text-${proj.color}-400`} />
                    </div>
                    <Badge variant="outline" className={`w-fit mb-3 bg-white/5 border-white/10 text-xs`}>{proj.tag}</Badge>
                    <CardTitle className="text-xl pr-12">{proj.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {proj.description}
                    </p>
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
