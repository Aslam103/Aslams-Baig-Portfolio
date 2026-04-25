import { motion } from "framer-motion";
import { FileText, Download, Lock, FileArchive, Library } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadResumePdf } from "@/lib/generateResume";

interface DocItem {
  title: string;
  description: string;
  type: string;
  size: string;
  status: "available" | "coming_soon";
  icon: typeof FileText;
}

const DOCUMENTS: DocItem[] = [
  {
    title: "ATS Resume",
    description:
      "Modern, ATS-optimized resume. Generated on demand from live data — always up to date.",
    type: "PDF",
    size: "On-demand",
    status: "available",
    icon: FileText,
  },
  {
    title: "Certificates",
    description: "Digital copies of MSCIT, ADFA, and other certifications.",
    type: "Archive",
    size: "--",
    status: "coming_soon",
    icon: Library,
  },
  {
    title: "Course Curriculum List",
    description: "Detailed syllabi for all offered courses.",
    type: "PDF",
    size: "--",
    status: "coming_soon",
    icon: FileText,
  },
  {
    title: "Project Portfolio",
    description: "Case studies of AI systems and n8n + Docker automations.",
    type: "PDF",
    size: "--",
    status: "coming_soon",
    icon: FileArchive,
  },
  {
    title: "Achievement Proofs",
    description: "Letters of recommendation and impact metrics.",
    type: "PDF",
    size: "--",
    status: "coming_soon",
    icon: Library,
  },
];

export function Documents() {
  return (
    <section id="documents" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
          >
            Documents & Downloads
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-violet-500 rounded mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
            Download a clean, ATS-optimized resume generated directly from this portfolio's live data.
            More document downloads will be added soon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, idx) => {
            const Icon = doc.icon;
            const isAvailable = doc.status === "available";

            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card
                  className={`glass-panel h-full flex flex-col ${
                    isAvailable
                      ? "border-cyan-500/20 hover:border-cyan-500/40"
                      : "border-white/5 opacity-80"
                  } transition-all duration-300`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isAvailable
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {!isAvailable && (
                        <div className="px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-white/5 text-muted-foreground flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Coming Soon
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-4">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/70">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 gap-3">
                    {isAvailable ? (
                      <Button
                        variant="default"
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
                        onClick={() => downloadResumePdf()}
                        data-testid="btn-download-resume"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Resume
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full cursor-not-allowed opacity-50 bg-white/5"
                        disabled
                      >
                        Not Yet Available
                      </Button>
                    )}
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
