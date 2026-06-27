import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicPortfolio } from "@/components/portfolio/DynamicPortfolio";
import { getPublicContent, trackProjectClick, trackView } from "@/lib/cms-api";
import type { AnalyticsSummary, PortfolioContent } from "@/lib/cms-types";

export default function Home() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const result = await getPublicContent();
        if (!mounted) return;
        setContent(result.content);
        setAnalytics(result.analytics);
        setLoading(false);
        void trackView();
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : "Failed to load portfolio");
        setLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleTheme = () => {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        theme: current.theme === "dark" ? "light" : "dark",
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
        <p className="animate-pulse">Loading portfolio...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen grid place-items-center p-8 text-center bg-slate-950 text-slate-100">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Portfolio failed to load</h1>
          <p className="opacity-80">{error}</p>
          <p className="text-sm opacity-70">
            Start the API server and verify MongoDB connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold">Dynamic Portfolio CMS</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={toggleTheme}>
              {content.theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </>
              )}
            </Button>
            <Button asChild>
              <Link to="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      <DynamicPortfolio
        content={content}
        onProjectClick={() => {
          void trackProjectClick();
        }}
      />

      <footer className="px-4 py-6 text-sm text-center border-t border-white/10">
        Views: {analytics?.views ?? 0} | Project Clicks: {analytics?.projectClicks ?? 0}
      </footer>
    </div>
  );
}
