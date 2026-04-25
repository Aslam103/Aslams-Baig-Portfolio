import { motion } from "framer-motion";
import { BookOpen, Clock, Lightbulb, PenTool, Database, DollarSign, Layout, Image as ImageIcon, Globe, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COURSES = [
  {
    title: "AI Tools & Automation",
    description: "Master modern AI workflows and build practical automations using tools like n8n.",
    duration: "6 Weeks",
    outcome: "Build independent automation pipelines",
    practical: "Includes Docker setup & webhook integrations",
    icon: Lightbulb,
    color: "cyan"
  },
  {
    title: "Advanced Excel",
    description: "Deep dive into data manipulation, complex formulas, pivot tables, and macros.",
    duration: "4 Weeks",
    outcome: "Automate reporting & data tasks",
    practical: "Real-world financial datasets",
    icon: Database,
    color: "green"
  },
  {
    title: "Data Analysis",
    description: "Extract insights from raw data to drive better business decisions.",
    duration: "8 Weeks",
    outcome: "Create actionable data dashboards",
    practical: "Hands-on projects with SQL & visualization",
    icon: LineChart, // Will import below
    color: "blue"
  },
  {
    title: "Financial Analysis & Accounting",
    description: "Learn Tally ERP 9, Miracle, Busy, and FOCUS 9 with real accounting principles.",
    duration: "10 Weeks",
    outcome: "Manage full-cycle accounting",
    practical: "Reconciliation & discrepancy resolution",
    icon: DollarSign,
    color: "yellow"
  },
  {
    title: "Web Development",
    description: "Build responsive websites using HTML, CSS, JS, and master WordPress management.",
    duration: "8 Weeks",
    outcome: "Launch fully functional websites",
    practical: "Deploy 3 live projects",
    icon: Layout,
    color: "violet"
  },
  {
    title: "Graphic Design",
    description: "Professional design using CorelDraw, Photoshop, Illustrator, and Canva.",
    duration: "6 Weeks",
    outcome: "Create premium brand assets",
    practical: "Design portfolios & marketing collateral",
    icon: ImageIcon,
    color: "pink"
  },
  {
    title: "Digital Skills & Marketing",
    description: "Master SEO, SEM, and social media management to drive engagement and leads.",
    duration: "6 Weeks",
    outcome: "Run profitable ad campaigns",
    practical: "Live campaign management",
    icon: Globe,
    color: "orange"
  },
  {
    title: "Content Creation",
    description: "Video/audio editing with Premiere, DaVinci Resolve, Filmora, and Audacity.",
    duration: "8 Weeks",
    outcome: "Produce broadcast-ready content",
    practical: "Edit promotional success stories",
    icon: Video,
    color: "red"
  }
];

export function Courses() {
  return (
    <section id="courses" className="py-20 relative bg-black/20">
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
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-xl pr-10">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-4">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground mb-2">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {course.duration}
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Target className="w-3 h-3 text-violet-400 mt-0.5 shrink-0" />
                      <span>{course.outcome}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-5">
                    <div className="w-full p-3 rounded bg-black/40 border border-white/5 text-xs text-muted-foreground flex items-start gap-2">
                      <PenTool className="w-3 h-3 mt-0.5 shrink-0 text-gold-400" style={{ color: 'hsl(45 80% 60%)' }} />
                      <span>{course.practical}</span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Needed to avoid undefined error
import { LineChart, Target } from "lucide-react";
