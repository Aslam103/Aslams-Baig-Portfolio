import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, Presentation, Sparkles, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DocumentItem } from "@/data/documents";
import { downloadResumePdf, generateResumePdf } from "@/lib/generateResume";
import { getDocumentBlobUrl } from "@/lib/documentStore";

interface DocumentCardProps {
  doc: DocumentItem;
  index?: number;
  onUnavailable?: (doc: DocumentItem) => void;
}

const TYPE_META: Record<
  DocumentItem["type"],
  { label: string; icon: typeof FileText; gradient: string; tint: string }
> = {
  pdf: {
    label: "PDF",
    icon: FileText,
    gradient: "from-rose-500/30 via-fuchsia-500/20 to-cyan-500/20",
    tint: "text-rose-300 bg-rose-500/15 border-rose-500/30",
  },
  ppt: {
    label: "PPT",
    icon: Presentation,
    gradient: "from-amber-500/30 via-orange-500/20 to-violet-500/20",
    tint: "text-amber-300 bg-amber-500/15 border-amber-500/30",
  },
};

function isDynamicResume(url: string) {
  return url === "dynamic:resume";
}

function isIdbFile(url: string) {
  return url.startsWith("idb:");
}

function isUnavailable(url: string) {
  return !url || url === "#";
}

async function resolveBlobUrl(fileUrl: string): Promise<string | null> {
  if (!isIdbFile(fileUrl)) return fileUrl;
  return getDocumentBlobUrl(fileUrl.slice(4));
}

export function DocumentCard({ doc, index = 0, onUnavailable }: DocumentCardProps) {
  const meta = TYPE_META[doc.type];
  const Icon = meta.icon;
  const dynamic = isDynamicResume(doc.fileUrl);
  const unavailable = !dynamic && !isIdbFile(doc.fileUrl) && isUnavailable(doc.fileUrl);

  const handleView = async () => {
    if (dynamic) {
      const blob = generateResumePdf().output("blob");
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      return;
    }
    if (unavailable) {
      onUnavailable?.(doc);
      return;
    }
    const url = await resolveBlobUrl(doc.fileUrl);
    if (!url) {
      onUnavailable?.(doc);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    if (isIdbFile(doc.fileUrl)) setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const handleDownload = async () => {
    if (dynamic) {
      downloadResumePdf();
      return;
    }
    if (unavailable) {
      onUnavailable?.(doc);
      return;
    }
    const url = await resolveBlobUrl(doc.fileUrl);
    if (!url) {
      onUnavailable?.(doc);
      return;
    }
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.rel = "noopener noreferrer";
    if (!isIdbFile(doc.fileUrl)) a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (isIdbFile(doc.fileUrl)) setTimeout(() => URL.revokeObjectURL(url), 5_000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
    >
      <Card
        className="glass-panel h-full flex flex-col border-white/10 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] transition-all duration-300 group"
        data-testid={`card-document-${doc.id}`}
      >
        {/* Thumbnail */}
        <CardHeader className="p-0">
          <div
            className={`relative aspect-[16/9] rounded-t-xl overflow-hidden bg-gradient-to-br ${meta.gradient}`}
          >
            {doc.thumbnail ? (
              <img
                src={doc.thumbnail}
                alt={doc.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              // Loading / fallback preview
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
                <div className="w-16 h-16 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-white/70">
                  {doc.category}
                </span>
              </div>
            )}

            {/* Type badge */}
            <div
              className={`absolute top-3 right-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded border ${meta.tint} backdrop-blur-md`}
              data-testid={`badge-type-${doc.id}`}
            >
              {meta.label}
            </div>

            {/* Dynamic / coming-soon ribbon */}
            {dynamic && (
              <div className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded border border-cyan-400/40 bg-cyan-500/15 text-cyan-200 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live
              </div>
            )}
            {unavailable && (
              <div className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded border border-white/20 bg-black/40 text-white/80 backdrop-blur-md flex items-center gap-1">
                <Clock className="w-3 h-3" /> Coming Soon
              </div>
            )}
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="p-5 flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-violet-500/30 bg-violet-500/10 text-violet-300"
              data-testid={`badge-category-${doc.id}`}
            >
              {doc.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-cyan-300 transition-colors">
            {doc.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {doc.description}
          </p>
        </CardContent>

        {/* Actions */}
        <CardFooter className="p-5 pt-0 gap-2">
          <Button
            variant="outline"
            className="flex-1 border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-200"
            onClick={handleView}
            disabled={unavailable}
            data-testid={`btn-view-${doc.id}`}
          >
            <ExternalLink className="w-4 h-4 mr-2" /> View
          </Button>
          <Button
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
            onClick={handleDownload}
            disabled={unavailable}
            data-testid={`btn-download-${doc.id}`}
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
