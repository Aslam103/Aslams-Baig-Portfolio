import { motion } from "framer-motion";
import { Code, Monitor, GraduationCap, Video, Calculator, BrainCircuit } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SKILL_CATEGORIES = [
  {
    title: "AI & Tech",
    icon: BrainCircuit,
    color: "text-cyan-400",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/30",
    skills: [
      { name: "AI Tools & Automation (n8n)", level: 90 },
      { name: "Web Design (HTML/CSS/JS, WordPress)", level: 85 },
      { name: "SQL / Oracle", level: 75 },
      { name: "C/C++", level: 70 },
      { name: "Android App Dev", level: 65 },
      { name: "Java", level: 40 },
    ]
  },
  {
    title: "Teaching & Strategy",
    icon: GraduationCap,
    color: "text-violet-400",
    bg: "bg-violet-500/20",
    border: "border-violet-500/30",
    skills: [
      { name: "Teaching & Mentoring", level: 95 },
      { name: "Course Design", level: 90 },
      { name: "Counseling & Communication", level: 85 },
      { name: "Digital Marketing (SEO/SEM/Social)", level: 80 },
    ]
  },
  {
    title: "Media & IT",
    icon: Video,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    skills: [
      { name: "Video Editing (Premiere, Resolve, Filmora)", level: 85 },
      { name: "Graphic Design (CorelDraw, PS, Canva)", level: 85 },
      { name: "PC Hardware & Networking", level: 90 },
    ]
  },
  {
    title: "Data & Admin",
    icon: Calculator,
    color: "text-gold-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
    skills: [
      { name: "Advanced Excel", level: 90 },
      { name: "Data Analysis", level: 85 },
      { name: "Financial Analysis & Accounting", level: 80 },
      { name: "Tally ERP 9, Miracle, Busy, FOCUS 9", level: 85 },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative bg-black/20">
      <div className="container mx-auto px-4">
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
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-panel p-6 rounded-2xl border ${category.border} hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.bg}`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-foreground/90">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-background/50" 
                        indicatorClassName={`bg-gradient-to-r from-${category.color.replace('text-', '')} to-opacity-80`}
                        style={{
                          '--progress-background': `var(--${category.color.replace('text-', '')})`
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
