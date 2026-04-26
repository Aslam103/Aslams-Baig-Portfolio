import { motion } from "framer-motion";
import { GraduationCap, BrainCircuit, Code, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Statically-listed Tailwind classes so the JIT compiler keeps them in the
// final stylesheet. Don't construct these with template literals.
type Theme = {
  text: string;
  iconBg: string;
  border: string;
  glow: string;
  trackBg: string;
  indicator: string;
  chip: string;
};

const THEMES = {
  cyan: {
    text: "text-cyan-300",
    iconBg: "bg-cyan-500/15 border border-cyan-500/30",
    border: "border-cyan-500/25 hover:border-cyan-400/50",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.45)]",
    trackBg: "bg-cyan-500/10",
    indicator: "bg-gradient-to-r from-cyan-400 to-cyan-300",
    chip: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  violet: {
    text: "text-violet-300",
    iconBg: "bg-violet-500/15 border border-violet-500/30",
    border: "border-violet-500/25 hover:border-violet-400/50",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.45)]",
    trackBg: "bg-violet-500/10",
    indicator: "bg-gradient-to-r from-violet-400 to-violet-300",
    chip: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  },
  blue: {
    text: "text-sky-300",
    iconBg: "bg-sky-500/15 border border-sky-500/30",
    border: "border-sky-500/25 hover:border-sky-400/50",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.45)]",
    trackBg: "bg-sky-500/10",
    indicator: "bg-gradient-to-r from-sky-400 to-sky-300",
    chip: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  },
  amber: {
    text: "text-amber-300",
    iconBg: "bg-amber-500/15 border border-amber-500/30",
    border: "border-amber-500/25 hover:border-amber-400/50",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.45)]",
    trackBg: "bg-amber-500/10",
    indicator: "bg-gradient-to-r from-amber-400 to-amber-300",
    chip: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
} satisfies Record<string, Theme>;

type ThemeKey = keyof typeof THEMES;

interface SkillCategory {
  title: string;
  icon: typeof BrainCircuit;
  theme: ThemeKey;
  tagline: string;
  skills: { name: string; level: number }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Automation",
    icon: BrainCircuit,
    theme: "cyan",
    tagline: "Workflows · Agents · Tooling",
    skills: [
      { name: "n8n & Workflow Automation", level: 95 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Docker Deployment", level: 85 },
      { name: "AI Tool Integration", level: 90 },
    ],
  },
  {
    title: "Development & Data",
    icon: Code,
    theme: "violet",
    tagline: "Stacks · Queries · Analytics",
    skills: [
      { name: "Full Stack Java", level: 85 },
      { name: "SQL & Databases", level: 90 },
      { name: "Data Analytics", level: 85 },
      { name: "Web Technologies (HTML/JS)", level: 85 },
    ],
  },
  {
    title: "Teaching & Operations",
    icon: GraduationCap,
    theme: "blue",
    tagline: "Curriculum · Mentoring · Ops",
    skills: [
      { name: "Course Curriculum Design", level: 95 },
      { name: "Cohort Mentoring", level: 95 },
      { name: "Advanced Excel", level: 90 },
      { name: "Financial Accounting (Tally)", level: 85 },
    ],
  },
  {
    title: "Media & Systems",
    icon: Settings,
    theme: "amber",
    tagline: "Production · Design · Hardware",
    skills: [
      { name: "Video Production (Premiere)", level: 85 },
      { name: "Graphic Design", level: 85 },
      { name: "PC Hardware & Networks", level: 90 },
      { name: "Digital Marketing", level: 80 },
    ],
  },
];

function levelBand(level: number): string {
  if (level >= 95) return "Expert";
  if (level >= 90) return "Advanced";
  if (level >= 80) return "Proficient";
  return "Intermediate";
}

export function Skills() {
  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);
  const avg = Math.round(
    allSkills.reduce((s, x) => s + x.level, 0) / Math.max(1, allSkills.length),
  );
  const expertCount = allSkills.filter((s) => s.level >= 90).length;

  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Capabilities
          </motion.div>
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

          {/* Summary chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-muted-foreground">
              <span className="text-foreground/90">{allSkills.length}</span> tracked skills
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-muted-foreground">
              avg <span className="text-cyan-300">{avg}%</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-muted-foreground">
              <span className="text-emerald-300">{expertCount}</span> at expert tier
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            const t = THEMES[category.theme];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`glass-panel p-6 md:p-7 rounded-2xl border ${t.border} ${t.glow} bg-black/40 transition-all duration-300`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${t.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${t.text}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold leading-tight">
                      {category.title}
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                      {category.tagline}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-baseline text-sm mb-1.5 gap-3">
                        <span className="font-medium text-foreground/90 truncate">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border ${t.chip}`}
                          >
                            {levelBand(skill.level)}
                          </span>
                          <span className="text-muted-foreground font-mono tabular-nums text-xs">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={skill.level}
                        className={`h-1.5 ${t.trackBg}`}
                        indicatorClassName={t.indicator}
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
