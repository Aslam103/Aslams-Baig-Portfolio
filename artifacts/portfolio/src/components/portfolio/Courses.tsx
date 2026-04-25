import { motion } from "framer-motion";
import { BookOpen, Clock, Target, PenTool, Brain, Database, Layout, Globe, Video, Calculator, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const COURSES = [
  {
    title: "Full Stack Java",
    description: "End-to-end Java development for production systems. Master the full stack from backend logic to frontend UI.",
    outcome: "Deploy complete Java web applications",
    practical: "Build real-world production systems",
    skills: ["Java", "Spring Boot", "React", "SQL", "APIs"],
    icon: Code,
    color: "violet"
  },
  {
    title: "Advanced Data Analytics",
    description: "From spreadsheets to dashboards: comprehensive data cleaning, modeling, and visualization techniques.",
    outcome: "Create actionable data dashboards",
    practical: "Hands-on data modeling & reporting",
    skills: ["SQL", "PowerBI / Tableau", "Data Cleaning", "Modeling"],
    icon: Database,
    color: "blue"
  },
  {
    title: "AI Tools & Automation",
    description: "Practical AI tooling that integrates into daily workflows. Master n8n for building complex pipelines.",
    outcome: "Build independent automation pipelines",
    practical: "Includes Docker setup & webhook integrations",
    skills: ["n8n", "Docker", "Prompt Engineering", "Webhooks"],
    icon: Brain,
    color: "cyan"
  },
  {
    title: "Advanced Excel",
    description: "Deep dive into functions, complex modeling, dashboards, and reporting at expert depth.",
    outcome: "Automate complex reporting tasks",
    practical: "Work with real-world financial datasets",
    skills: ["Macros", "Pivot Tables", "VLOOKUP/INDEX", "Dashboards"],
    icon: Calculator,
    color: "green"
  },
  {
    title: "Financial Analysis & Accounting",
    description: "Learn Tally, FOCUS 9, reconciliation, and analytical reporting with real accounting principles.",
    outcome: "Manage full-cycle accounting",
    practical: "Reconciliation & discrepancy resolution",
    skills: ["Tally ERP", "FOCUS 9", "Reconciliation", "Auditing"],
    icon: Database,
    color: "yellow"
  },
  {
    title: "Digital Skills",
    description: "Foundational digital literacy and marketing skills essential for modern modern workplaces.",
    outcome: "Execute multi-channel digital strategies",
    practical: "Live campaign management",
    skills: ["SEO/SEM", "Social Media", "Digital Literacy", "Campaigns"],
    icon: Globe,
    color: "orange"
  },
  {
    title: "Content Creation",
    description: "Educational video, graphics, and long-form content production for digital distribution.",
    outcome: "Produce broadcast-ready content",
    practical: "Edit promotional success stories",
    skills: ["Premiere", "DaVinci", "Photoshop", "Storyboarding"],
    icon: Video,
    color: "pink"
  }
];

export function Courses() {
  return (
    <section id="courses" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 flex items-center justify-center gap-3"
          >
            <BookOpen className="w-8 h-8 text-cyan-400" />
            Courses & Expertise
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" 
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Practical, outcome-driven programs designed to transform raw information into usable, real-world skills.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES.map((course, idx) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="h-full"
              >
                <Card className="glass-panel h-full flex flex-col hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group overflow-hidden border-white/5">
                  <div className={`h-2 w-full bg-gradient-to-r from-${course.color}-500/50 to-transparent`} />
                  <CardHeader className="pb-3 relative">
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-xl pr-10">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pb-4">
                    <p className="text-sm text-muted-foreground mb-5 flex-1">
                      {course.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Outcome</div>
                        <div className="flex items-start gap-2 text-sm text-foreground">
                          <Target className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                          <span>{course.outcome}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Practical Focus</div>
                        <div className="flex items-start gap-2 text-sm text-foreground">
                          <PenTool className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" style={{ color: 'hsl(45 80% 60%)' }} />
                          <span>{course.practical}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1 mt-3">Skills Gained</div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {course.skills.map((skill, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
