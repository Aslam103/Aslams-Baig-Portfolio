import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { SiWhatsapp, SiYoutube, SiInstagram } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" />
          <p className="text-muted-foreground">Available for mentoring, consulting, and collaboration.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-panel h-full border-cyan-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href="mailto:mbaslambaig9@gmail.com" className="text-lg font-medium hover:text-cyan-400 transition-colors break-all">
                        mbaslambaig9@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-500/20">
                      <Phone className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="text-lg font-medium">+91 9423292087</p>
                      <p className="text-lg font-medium">+91 7387292087</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="text-lg font-medium">Hyderabad, India</p>
                      <p className="text-sm text-muted-foreground">(Originally from Old Hakeempet, TS)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <Card className="glass-panel flex-1 border-white/5">
              <CardContent className="p-8 flex flex-col justify-center h-full">
                <h3 className="text-xl font-bold mb-6">Quick Connect</h3>
                
                <Button 
                  className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white border-none justify-between px-6 mb-4"
                  onClick={() => window.open('https://wa.me/919423292087', '_blank')}
                  data-testid="btn-whatsapp"
                >
                  <span className="flex items-center gap-3">
                    <SiWhatsapp className="w-6 h-6" /> WhatsApp Me
                  </span>
                  <ArrowUpRight className="w-5 h-5 opacity-70" />
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-12 border-white/10 hover:bg-white/5 hover:text-[#FF0000]"
                    onClick={() => window.open('#', '_blank')}
                    data-testid="btn-youtube"
                  >
                    <SiYoutube className="w-5 h-5 mr-2 text-[#FF0000]" /> YouTube
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 border-white/10 hover:bg-white/5 hover:text-[#E1306C]"
                    onClick={() => window.open('#', '_blank')}
                    data-testid="btn-instagram"
                  >
                    <SiInstagram className="w-5 h-5 mr-2 text-[#E1306C]" /> Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-md py-8 relative z-10">
      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-mono font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-4">
          MB
        </div>
        <h3 className="text-lg font-bold mb-1">Mirza Aslam Bismillah Baig</h3>
        <p className="text-sm text-muted-foreground mb-6">AI Educator • System Builder • Mentor</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
          <a href="#about" className="hover:text-cyan-400 transition-colors" data-testid="footer-link-about">About</a>
          <a href="#courses" className="hover:text-cyan-400 transition-colors" data-testid="footer-link-courses">Courses</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors" data-testid="footer-link-experience">Experience</a>
          <a href="#documents" className="hover:text-cyan-400 transition-colors" data-testid="footer-link-documents">Documents</a>
          <a href="#chatbot" className="hover:text-cyan-400 transition-colors" data-testid="footer-link-chat">AI Chat</a>
        </div>
        
        <div className="text-xs text-muted-foreground opacity-60">
          © {new Date().getFullYear()} Mirza Aslam Baig. All rights reserved. <br/>
          Built for the AI era.
        </div>
      </div>
    </footer>
  );
}
