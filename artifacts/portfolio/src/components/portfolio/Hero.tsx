import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, MessageSquare, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.BASE_URL}documents/Aslam_Resume.pdf`;
    link.download = "Aslam_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="top" className="min-h-[100dvh] flex items-center justify-center pt-20 pb-10 relative overflow-hidden">
      {/* Ambient background textures */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex">
              <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/30 px-4 py-1.5 text-sm font-mono tracking-wide">
                <Terminal className="w-4 h-4 mr-2 inline" />
                SYSTEM STATUS: ONLINE
              </Badge>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Mirza Aslam <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600">Baig</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
              AI Educator | Course Designer | Mentor | Content Creator | System Builder
            </h2>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm inline-block max-w-fit">
              <p className="font-mono text-sm tracking-widest text-gold-400 uppercase opacity-80" style={{ color: 'hsl(45 80% 60%)' }}>
                Learn → Apply → Transform
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button 
                onClick={() => scrollTo("#chatbot")} 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all h-12 px-8"
                data-testid="btn-hero-chat"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI
              </Button>
              <Button 
                onClick={() => window.open(`${import.meta.env.BASE_URL}documents/Aslam_Resume.pdf`, "_blank")} 
                variant="outline" 
                size="lg" 
                className="border-white/20 hover:bg-white/10 h-12 px-8"
                data-testid="btn-hero-resume"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Resume
              </Button>
              <Button 
                onClick={handleDownloadCV} 
                variant="ghost" 
                size="lg" 
                className="text-muted-foreground hover:text-foreground h-12 px-6"
                data-testid="btn-hero-download"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for mentoring
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                Based in Hyderabad, India
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-violet-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
              
              <div className="absolute inset-12 rounded-full overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
                {/* Hero Avatar Image */}
                <img 
                  src={`${import.meta.env.BASE_URL}src/assets/hero-avatar.png`} 
                  alt="MAB AI Avatar" 
                  className="w-full h-full object-cover opacity-90 mix-blend-screen"
                  onError={(e) => {
                     // Fallback if image fails to load
                     e.currentTarget.style.display = 'none';
                     e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-cyan-900', 'to-violet-900');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
            
            {/* Floating indicator chips */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-10 glass-panel px-4 py-2 rounded-lg flex items-center gap-3 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-400 font-bold text-xs">13+</span>
              </div>
              <span className="text-sm font-medium text-foreground">Years Exp.</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 -right-4 glass-panel px-4 py-2 rounded-lg flex items-center gap-3 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-sm font-medium text-foreground">System Builder</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Needed to avoid undefined error
import { Sparkles } from "lucide-react";
