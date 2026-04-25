import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Lock, CheckCircle2, Copy } from "lucide-react";
import { SiWhatsapp, SiYoutube, SiInstagram } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { personalInfo } from "@/data/personalInfo";

const PHONE_DISPLAY = personalInfo.private.phone;
const PHONE_DIGITS = personalInfo.private.phoneDigits;
const EMAIL = personalInfo.private.email;
const WHATSAPP_URL = `https://wa.me/${personalInfo.private.whatsapp}`;
const LOCATION = personalInfo.location;

export function Contact() {
  const [revealed, setRevealed] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" />
          <p className="text-muted-foreground">Available for mentoring, consulting, and collaboration.</p>
        </motion.div>

        <Card className="glass-panel border-cyan-500/20">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{LOCATION}</h3>
            <p className="text-muted-foreground mb-8">Languages: English, Hindi, Marathi, Urdu, Arabic (Quranic)</p>

            <Dialog onOpenChange={(open) => !open && setRevealed(false)}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-cyan-600 hover:bg-cyan-500 text-white h-14 px-8 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
                  data-testid="button-connect"
                >
                  <Lock className="w-5 h-5 mr-2" /> Connect & View Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel border-white/10 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center mb-2">Connect with Mirza</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  {/* WhatsApp is always accessible without blur */}
                  <Button 
                    className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white border-none justify-between px-6"
                    onClick={() => window.open(WHATSAPP_URL, '_blank')}
                    data-testid="btn-whatsapp"
                  >
                    <span className="flex items-center gap-3">
                      <SiWhatsapp className="w-6 h-6" /> WhatsApp Message
                    </span>
                    <ArrowUpRight className="w-5 h-5 opacity-70" />
                  </Button>

                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    {!revealed && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                        <Button 
                          onClick={() => setRevealed(true)}
                          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                          data-testid="button-reveal-contact"
                        >
                          <Lock className="w-4 h-4 mr-2" /> Reveal Email & Phone
                        </Button>
                      </div>
                    )}
                    
                    <div className={`p-6 space-y-4 transition-all duration-300 ${!revealed ? 'blur-md opacity-50 select-none' : ''}`}>
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email Address</div>
                        <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                          <span className="font-medium">{EMAIL}</span>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10" onClick={() => handleCopy(EMAIL, "email")} disabled={!revealed} data-testid="btn-copy-email">
                              {copiedField === "email" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 text-cyan-400" onClick={() => window.location.href = `mailto:${EMAIL}`} disabled={!revealed} data-testid="btn-mailto">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phone Number</div>
                        <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                          <span className="font-medium">{PHONE_DISPLAY}</span>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10" onClick={() => handleCopy(`+${PHONE_DIGITS}`, "phone")} disabled={!revealed} data-testid="btn-copy-phone">
                              {copiedField === "phone" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10 text-violet-400" onClick={() => window.location.href = `tel:+${PHONE_DIGITS}`} disabled={!revealed} data-testid="btn-call">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-md py-12 relative z-10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-4">
          MB
        </div>
        <h3 className="text-lg font-bold mb-1">Mirza Aslam Bismillah Baig</h3>
        <p className="text-sm text-muted-foreground mb-8">AI Educator • System Builder • Mentor</p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/10 rounded-full" onClick={() => window.open('#', '_blank')}>
            <SiYoutube className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/10 rounded-full" onClick={() => window.open('#', '_blank')}>
            <SiInstagram className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#courses" className="hover:text-cyan-400 transition-colors">Courses</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#chatbot" className="hover:text-cyan-400 transition-colors">AI Chat</a>
        </div>
        
        <div className="text-xs text-muted-foreground opacity-60 text-center">
          © {new Date().getFullYear()} Mirza Aslam Baig. All rights reserved. <br/>
          Built for the AI era.
        </div>
      </div>
    </footer>
  );
}
