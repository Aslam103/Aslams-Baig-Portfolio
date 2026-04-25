import { motion } from "framer-motion";
import { User, BookOpen, Target, Heart, Shield, Zap, Compass, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VALUES = [
  { icon: Shield, label: "Honesty" },
  { icon: Zap, label: "Growth" },
  { icon: Target, label: "Practical Learning" },
  { icon: Flag, label: "Discipline" },
  { icon: Heart, label: "Responsibility" },
  { icon: Heart, label: "Compassion" },
  { icon: Compass, label: "Innovation" },
  { icon: User, label: "Respect for Learners" },
];

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                About Me
              </h2>
              <div className="w-20 h-1 bg-cyan-500 rounded mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-6">
                I am an educator and system builder passionate about creating practical, 
                AI-integrated learning ecosystems. With 13+ years of diverse experience across 
                teaching, administration, IT, and digital marketing, I bridge the gap between 
                complex knowledge and actionable skills.
              </p>
              
              <div className="space-y-4">
                <div className="glass-panel p-4 rounded-lg border-l-2 border-l-cyan-500">
                  <h3 className="font-semibold text-cyan-400 mb-1 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Vision
                  </h3>
                  <p className="text-sm text-muted-foreground">To build a practical education ecosystem where learning creates real-life transformation.</p>
                </div>
                <div className="glass-panel p-4 rounded-lg border-l-2 border-l-violet-500">
                  <h3 className="font-semibold text-violet-400 mb-1 flex items-center gap-2">
                    <Compass className="w-4 h-4" /> Mission
                  </h3>
                  <p className="text-sm text-muted-foreground">To simplify complex knowledge using interactive learning, emotional intelligence, AI tools, and structured systems.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-panel overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid sm:grid-cols-2 gap-px bg-white/10">
                    <div className="bg-background/80 p-6 backdrop-blur-sm">
                      <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Personal Details</h4>
                      <ul className="space-y-3">
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground">Full Name</span>
                          <span className="font-medium text-right">Mirza Aslam Bismillah Baig</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground">DOB</span>
                          <span className="font-medium">12 July 1989</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium text-right">Hyderabad, India<br/><span className="text-xs text-muted-foreground">(Originally from Old Hakeempet, TS)</span></span>
                        </li>
                        <li className="flex justify-between pt-1">
                          <span className="text-muted-foreground">Languages</span>
                          <span className="font-medium text-right text-sm">English, Hindi, Marathi, Urdu,<br/>Arabic (Quranic)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-background/80 p-6 backdrop-blur-sm">
                      <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Education</h4>
                      <ul className="space-y-4">
                        <li className="flex gap-3">
                          <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-medium">B.C.A</p>
                            <p className="text-xs text-muted-foreground">Pursuing</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-8 h-8 rounded bg-violet-500/20 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-violet-400" />
                          </div>
                          <div>
                            <p className="font-medium">ADFA</p>
                            <p className="text-xs text-muted-foreground">Advanced Diploma in Financial Accounting & Auditing</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">MSCIT (84%) | H.S.C (2008) | S.S.C (2006)</p>
                            <p className="text-xs text-muted-foreground">Amravati Board</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6">Core Values</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {VALUES.map((val, i) => {
                  const Icon = val.icon;
                  return (
                    <div key={i} className="glass-panel p-4 rounded-xl text-center hover:-translate-y-1 transition-transform cursor-default border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 group">
                      <div className="w-10 h-10 mx-auto rounded-full bg-background flex items-center justify-center mb-3 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-shadow">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <p className="text-sm font-medium">{val.label}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
