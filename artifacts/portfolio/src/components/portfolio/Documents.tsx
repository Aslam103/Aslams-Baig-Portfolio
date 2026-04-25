import { motion } from "framer-motion";
import { FileText, Download, Eye, Lock, FileArchive, Library } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DOCUMENTS = [
  {
    title: "Standard Resume",
    description: "Compact 2-page overview of skills and experience.",
    type: "PDF",
    size: "124 KB",
    file: "Aslam_Resume.pdf",
    status: "available",
    icon: FileText
  },
  {
    title: "Expanded Biodata",
    description: "Detailed 3-page comprehensive professional history.",
    type: "PDF",
    size: "156 KB",
    file: "Aslam_Expanded_Resume.pdf",
    status: "available",
    icon: FileArchive
  },
  {
    title: "Certificates",
    description: "Digital copies of MSCIT, ADFA, and other certifications.",
    type: "Archive",
    size: "--",
    file: null,
    status: "coming_soon",
    icon: Library
  },
  {
    title: "Course Curriculum List",
    description: "Detailed syllabi for all offered courses.",
    type: "PDF",
    size: "--",
    file: null,
    status: "coming_soon",
    icon: FileText
  },
  {
    title: "Project Portfolio",
    description: "Case studies of web design and n8n automations.",
    type: "PDF",
    size: "--",
    file: null,
    status: "coming_soon",
    icon: FileArchive
  },
  {
    title: "Achievement Proofs",
    description: "Letters of recommendation and impact metrics.",
    type: "PDF",
    size: "--",
    file: null,
    status: "coming_soon",
    icon: Library
  }
];

export function Documents() {
  const handleDownload = (filename: string) => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.BASE_URL}documents/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (filename: string) => {
    window.open(`${import.meta.env.BASE_URL}documents/${filename}`, "_blank");
  };

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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS.map((doc, idx) => {
            const Icon = doc.icon;
            const isAvailable = doc.status === "available";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`glass-panel h-full flex flex-col ${isAvailable ? 'border-cyan-500/20 hover:border-cyan-500/40' : 'border-white/5 opacity-80'} transition-all duration-300`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isAvailable ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-muted-foreground'}`}>
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
                      <>
                        <Button 
                          variant="secondary" 
                          className="flex-1 bg-white/5 hover:bg-white/10"
                          onClick={() => handleView(doc.file!)}
                          data-testid={`btn-view-${doc.title.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View
                        </Button>
                        <Button 
                          variant="default" 
                          className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
                          onClick={() => handleDownload(doc.file!)}
                          data-testid={`btn-download-${doc.title.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" className="w-full cursor-not-allowed opacity-50 bg-white/5" disabled>
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
