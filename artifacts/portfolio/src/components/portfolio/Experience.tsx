import { motion } from "framer-motion";
import { Briefcase, Trophy, ChevronRight, Award, LineChart, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EXPERIENCE = [
  {
    title: "Office Coordinator & Administrator",
    company: "Zakat Center India, Hyderabad Unit",
    period: "Nov 2022 – Present",
    description: "Managing daily operations, resolving administrative issues, and handling accounts using Focus software & Google Sheets. Performed account reconciliation, generated reports, and managed stakeholder communication. Handled social media, designed banners, created event presentations, edited success story videos, and counseled beneficiaries.",
    icon: Briefcase,
    color: "cyan"
  },
  {
    title: "Teacher (ICT, Grades 5-10)",
    company: "Crescent English Medium School",
    period: "3 years",
    description: "Taught computer basics and ICT. Fostered digital literacy among students through practical curriculum design.",
    icon: Briefcase,
    color: "violet"
  },
  {
    title: "Digital Marketing Specialist",
    company: "Freelance",
    period: "2 years",
    description: "Led digital marketing campaigns focusing on SEO, SEM, and social media for clients.",
    icon: Briefcase,
    color: "blue"
  },
  {
    title: "Computer Instructor (ICT & Science, Grades 5-8)",
    company: "Sunrise English Medium School",
    period: "2 years",
    description: "Instructed students in computer science and general science with hands-on labs.",
    icon: Briefcase,
    color: "violet"
  },
  {
    title: "PC Repair & Networking Specialist",
    company: "Freelance",
    period: "10 years",
    description: "Provided comprehensive PC maintenance, networking services, and customized network setup solutions for small businesses.",
    icon: Briefcase,
    color: "blue"
  },
  {
    title: "Assistant Manager cum Accountant",
    company: "MMI Book Distribution Sub Depot",
    period: "2 years",
    description: "Managed depot operations, accounting, and inventory distribution.",
    icon: Briefcase,
    color: "yellow"
  },
  {
    title: "Lab Assistant",
    company: "Elegant IT, Yavatmal",
    period: "2 years",
    description: "Assisted in maintaining lab equipment and helping students with technical tasks.",
    icon: Briefcase,
    color: "cyan"
  },
  {
    title: "Teacher (Social Studies, Grades 4-10)",
    company: "Jamia Darul Huda English Medium School",
    period: "1 year",
    description: "Taught social studies using engaging, interactive methodologies.",
    icon: Briefcase,
    color: "violet"
  }
];

const ACHIEVEMENTS = [
  {
    text: "Reduced financial discrepancies by 20% at Zakat Center via better reconciliation.",
    icon: LineChart
  },
  {
    text: "Increased social media engagement by 30% through targeted content.",
    icon: Target
  },
  {
    text: "Increased lead generation by 25% as a digital marketer.",
    icon: Zap
  },
  {
    text: "Reduced downtime by 40% for small businesses via proactive PC maintenance.",
    icon: Award
  },
  {
    text: "Built an internal Android app for Zakat Center improving staff efficiency by 25%.",
    icon: Trophy
  },
  {
    text: "Created promotional videos leading to a 30% donor engagement increase.",
    icon: Award
  },
  {
    text: "Designed and maintained multiple WordPress sites for small businesses.",
    icon: Trophy
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                Work Experience
              </h2>
              <div className="w-20 h-1 bg-violet-500 rounded mb-10" />
            </motion.div>

            <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-10">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 md:pl-10"
                >
                  <div className={`absolute -left-4 md:-left-4 top-1 w-8 h-8 rounded-full bg-background border-2 border-${exp.color}-500 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(var(--${exp.color}-500),0.3)]`}>
                    <div className={`w-3 h-3 rounded-full bg-${exp.color}-400`} />
                  </div>
                  
                  <Card className="glass-panel border-white/5 hover:border-white/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                          <p className="text-muted-foreground font-medium flex items-center gap-2">
                            {exp.company}
                          </p>
                        </div>
                        <div className="inline-flex shrink-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${exp.color}-500/10 text-${exp.color}-400 border border-${exp.color}-500/20 whitespace-nowrap`}>
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Key Achievements
              </h2>
              <div className="w-20 h-1 bg-gold-500 rounded mb-8" style={{ backgroundColor: 'hsl(45 80% 60%)' }} />
              
              <div className="space-y-4">
                {ACHIEVEMENTS.map((ach, idx) => {
                  const Icon = ach.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="glass-panel p-4 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-gold-500/10 transition-colors" style={{ color: 'hsl(45 80% 60%)' }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed pt-1">
                        {ach.text}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
