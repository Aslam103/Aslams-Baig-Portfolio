import { motion } from "framer-motion";
import { GraduationCap, Video, Calculator, BrainCircuit, Code, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SKILL_CATEGORIES = [
  {
    title: "AI & Automation",
    icon: BrainCircuit,
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/30",
    skills: [
      { name: "n8n & Workflow Automation", level: 95 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Docker Deployment", level: 85 },
      { name: "AI Tool Integration", level: 90 },
    ]
  },
  {
    title: "Development & Data",
    icon: Code,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    border: "border-violet-500/30",
    skills: [
      { name: "Full Stack Java", level: 85 },
      { name: "SQL & Databases", level: 90 },
      { name: "Data Analytics", level: 85 },
      { name: "Web Technologies (HTML/JS)", level: 85 },
    ]
  },
  {
    title: "Teaching & Operations",
    icon: GraduationCap,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    skills: [
      { name: "Course Curriculum Design", level: 95 },
      { name: "Cohort Mentoring", level: 95 },
      { name: "Advanced Excel", level: 90 },
      { name: "Financial Accounting (Tally)", level: 85 },
    ]
  },
  {
    title: "Media & Systems",
    icon: Settings,
    color: "text-gold-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
    skills: [
      { name: "Video Production (Premiere)", level: 85 },
      { name: "Graphic Design", level: 85 },
      { name: "PC Hardware & Networks", level: 90 },
      { name: "Digital Marketing", level: 80 },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
          >
            Skills Dashboard
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-cyan-500 rounded mx-auto" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            // Handle gold mapping for inline styles
            const isGold = category.color === 'text-gold-400';
            const textStyle = isGold ? { color: 'hsl(45 80% 60%)' } : {};
            const bgVar = isGold ? '45 80% 60%' : `var(--${category.color.replace('text-', '')})`;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-panel p-8 rounded-2xl border ${category.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-black/40`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${category.bg}`}>
                    <Icon className={`w-7 h-7 ${category.color}`} style={textStyle} />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-foreground/90">{skill.name}</span>
                        <span className="text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-white/10" 
                        indicatorClassName={isGold ? 'bg-yellow-400' : `bg-${category.color.replace('text-', '')}`}
                        style={{
                          '--progress-background': bgVar
                        } as any}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
