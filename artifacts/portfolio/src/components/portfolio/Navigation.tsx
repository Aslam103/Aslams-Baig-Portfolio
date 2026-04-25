import { useState, useEffect } from "react";
import { Menu, Sun, Moon, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Role", href: "#current-role" },
  { label: "Courses", href: "#courses" },
  { label: "Experience", href: "#experience" },
  { label: "Innovation", href: "#innovation" },
  { label: "Documents", href: "#documents" },
  { label: "AI Chat", href: "#chatbot" },
  { label: "Connect", href: "#contact" },
];

export function Navigation({ dashboardMode, setDashboardMode }: { dashboardMode: boolean, setDashboardMode: (v: boolean) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(root.classList.contains("dark"));
  };

  const toggleDashboardMode = () => {
    setDashboardMode(!dashboardMode);
    document.body.classList.toggle("dashboard-mode");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="#top" 
          onClick={(e) => handleNavClick(e, '#top')}
          className="text-xl font-bold tracking-tighter flex items-center gap-2 group"
          data-testid="link-home"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-mono text-sm shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
            MB
          </div>
          <span className="hidden sm:inline-block">M. Aslam Baig</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4">
            {NAV_LINKS.map(link => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors font-medium"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-2"></div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDashboardMode}
              className={dashboardMode ? "text-cyan-400 bg-cyan-400/10" : "text-muted-foreground"}
              title="Toggle Dashboard View"
              data-testid="btn-dashboard-mode"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-muted-foreground"
              title="Toggle Theme"
              data-testid="btn-theme-toggle"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} data-testid="btn-theme-toggle-mobile">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="btn-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-panel w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-10">
                {NAV_LINKS.map(link => (
                  <a 
                    key={link.href} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-medium text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-border my-2"></div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2" 
                  onClick={toggleDashboardMode}
                  data-testid="btn-dashboard-mode-mobile"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {dashboardMode ? "Exit Dashboard Mode" : "Dashboard Mode"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
