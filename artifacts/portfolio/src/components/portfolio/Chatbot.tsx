import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChatMessage, sendMessageToAI } from "@/lib/chatbot";

const SUGGESTIONS = [
  "Tell me about TWG International",
  "What courses do you offer?",
  "Show me your key projects",
  "What's your teaching approach?",
  "What are you building right now?",
  "How do I connect?"
];

export function ChatbotSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I'm the AI assistant for Mirza Aslam Baig. I can tell you about his work at TWG International, course offerings, learning paths, achievements, and systems. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const hasWebhook = !!import.meta.env.VITE_N8N_WEBHOOK_URL;

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableNode = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableNode) {
        scrollableNode.scrollTop = scrollableNode.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const reply = await sendMessageToAI(text, messages);
    
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  return (
    <section id="chatbot" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Bot className="w-8 h-8 text-cyan-400" />
              AI Assistant
            </h2>
            <p className="text-muted-foreground mt-2">Ask me anything about Aslam's portfolio, courses, and experience.</p>
          </div>
          <Badge variant="outline" className={`w-fit px-3 py-1 ${hasWebhook ? 'border-green-500/50 text-green-400' : 'border-muted text-muted-foreground'}`}>
            {hasWebhook ? (
              <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Connected to n8n</span>
            ) : (
              <span className="flex items-center gap-2"><Bot className="w-3 h-3" /> Local Mode</span>
            )}
          </Badge>
        </div>

        <Card className="glass-panel border-cyan-500/20 overflow-hidden flex flex-col h-[650px] bg-black/40">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-2xl max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-violet-600 text-white rounded-tr-sm shadow-md" 
                      : "bg-white/5 border border-white/10 text-foreground rounded-tl-sm backdrop-blur-sm"
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  
                  {msg.role === "user" && (
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0 border border-violet-500/30">
                      <User className="w-5 h-5 text-violet-400" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-foreground rounded-tl-sm flex items-center gap-3 backdrop-blur-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    <span className="text-sm text-muted-foreground font-medium">AI is thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="flex flex-wrap gap-2 mb-4">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  disabled={isLoading}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 text-left"
                  data-testid={`btn-suggestion-${i}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-3"
            >
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="bg-black/40 border-white/10 focus-visible:ring-cyan-500 h-12 text-base"
                disabled={isLoading}
                data-testid="input-chatbot"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white h-12 px-6 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
                data-testid="btn-chatbot-send"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}