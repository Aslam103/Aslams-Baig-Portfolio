import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Layout, Monitor, Calculator, Database, Code, Globe, PenTool, TrendingUp, PieChart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses, CourseCategory } from "@/data/courses";

const ICONS: Record<string, React.ElementType> = {
  "monitor": Monitor,
  "calculator": Calculator,
  "database": Database,
  "code": Code,
  "globe": Globe,
  "pen-tool": PenTool,
  "trending-up": TrendingUp,
  "pie-chart": PieChart,
  "layout": Layout,
  "sparkles": Sparkles,
};

const CATEGORY_COLORS: Record<CourseCategory, { border: string; bg: string; text: string }> = {
  core: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400" },
  specialization: { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400" },
  modular: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400" },
};

export function Courses() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCourses = activeTab === "all" 
    ? courses 
    : courses.filter(c => c.category === activeTab);

  return (
    <section id="courses" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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

        <div className="flex justify-center mb-10">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10 h-auto p-1">
              <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:text-white py-2.5">All</TabsTrigger>
              <TabsTrigger value="core" className="rounded-md data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 py-2.5">Core</TabsTrigger>
              <TabsTrigger value="specialization" className="rounded-md data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400 py-2.5">Specialization</TabsTrigger>
              <TabsTrigger value="modular" className="rounded-md data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 py-2.5">Modular</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const Icon = ICONS[course.iconHint] || BookOpen;
              const colorTheme = CATEGORY_COLORS[course.category];
              
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="glass-panel h-full flex flex-col hover:-translate-y-1 transition-all duration-300 group overflow-hidden border-white/5 hover:border-white/20">
                    <CardHeader className="pb-3 pt-5 relative">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full border ${colorTheme.border} ${colorTheme.bg} ${colorTheme.text}`}>
                          {course.category}
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight">{course.name}</CardTitle>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2 font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          {course.level}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          {course.duration}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pt-0 pb-5">
                      <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
                        {course.keyTopics.map((topic, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-colors">
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">Outcome</div>
                        <div className="flex items-start gap-2 text-sm">
                          <Target className={`w-4 h-4 mt-0.5 shrink-0 ${colorTheme.text}`} />
                          <span className={`font-medium ${colorTheme.text} leading-snug`}>{course.outcome}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}