import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Youtube, Instagram, Facebook, ArrowUpRight, QrCode } from "lucide-react";
import QRCode from "qrcode";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { socialLinks, SocialPlatform } from "@/data/socialLinks";
import { qrLinks } from "@/data/qrLinks";

const PLATFORM_CONFIG: Record<SocialPlatform, { icon: React.ElementType; color: string; bg: string; borderHover: string }> = {
  github: { icon: Github, color: "text-foreground", bg: "bg-white/5", borderHover: "hover:border-white/30" },
  youtube: { icon: Youtube, color: "text-red-500", bg: "bg-red-500/10", borderHover: "hover:border-red-500/40" },
  instagram: { icon: Instagram, color: "text-pink-500", bg: "bg-pink-500/10", borderHover: "hover:border-pink-500/40" },
  facebook: { icon: Facebook, color: "text-blue-500", bg: "bg-blue-500/10", borderHover: "hover:border-blue-500/40" }
};

export function SocialEcosystem() {
  return (
    <section id="social" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Connect & Content Ecosystem
            </h2>
            <div className="w-20 h-1 bg-cyan-500 rounded mx-auto mb-6" />
            <p className="text-muted-foreground">Long-form teaching, short-form motivation, and code experiments — all in one ecosystem.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {socialLinks.map((link, idx) => {
            const config = PLATFORM_CONFIG[link.platform];
            const Icon = config.icon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`glass-panel h-full flex flex-col border-white/5 ${config.borderHover} transition-all duration-300 group`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${config.color}`} />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-full opacity-50 group-hover:opacity-100 hover:bg-white/10"
                        onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1">{link.label}</h3>
                    {link.handle && (
                      <p className="text-sm font-mono text-muted-foreground mb-3">{link.handle}</p>
                    )}
                    
                    <p className="text-sm text-foreground/80 mb-6 flex-1">
                      {link.description}
                    </p>
                    
                    <Button 
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 mt-auto"
                      onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                    >
                      {link.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* QR Codes Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <QrCode className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Quick Connect
            </h3>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {qrLinks.map((link, idx) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-panel border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-white p-3 rounded-xl mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <QRCodeCanvas url={link.useWindowLocation ? '' : link.url} useWindowLocation={link.useWindowLocation} />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{link.label}</h4>
                  <button 
                    onClick={() => {
                      const url = link.useWindowLocation ? window.location.href : link.url;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    Open Link <ArrowUpRight className="w-3 h-3" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function QRCodeCanvas({ url, useWindowLocation }: { url: string; useWindowLocation?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const finalUrl = useWindowLocation ? window.location.href : url;
      QRCode.toCanvas(canvasRef.current, finalUrl, {
        width: 140,
        margin: 1,
        color: {
          dark: '#0f172a', // Dark slate
          light: '#ffffff' // White bg
        }
      }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [url, useWindowLocation]);

  return <canvas ref={canvasRef} className="block rounded-md" />;
}