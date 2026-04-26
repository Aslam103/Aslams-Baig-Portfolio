import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileX, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "./DocumentCard";
import {
  documents as staticDocuments,
  documentTypes,
  type DocumentItem,
  type DocumentType,
} from "@/data/documents";
import { listAdminDocuments, subscribe } from "@/lib/documentStore";

type CategoryFilter = "all" | string;
type TypeFilter = "all" | DocumentType;

export function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [pendingNotice, setPendingNotice] = useState<string | null>(null);
  const [adminDocs, setAdminDocs] = useState(() => listAdminDocuments());

  useEffect(() => {
    const unsub = subscribe(() => setAdminDocs(listAdminDocuments()));
    return () => {
      unsub();
    };
  }, []);

  // Merge built-in + admin (public only) into the public document list.
  const documents: DocumentItem[] = useMemo(() => {
    const adminPublic: DocumentItem[] = adminDocs
      .filter((d) => d.access === "public")
      .map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        fileUrl: d.fileUrl,
        thumbnail: d.thumbnail,
        category: d.category,
        type: d.type,
        access: "public",
      }));
    return [...adminPublic, ...staticDocuments];
  }, [adminDocs]);

  const documentCategories = useMemo(
    () => Array.from(new Set(documents.map((d) => d.category))).sort(),
    [documents],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      const matchesCategory = category === "all" || d.category === category;
      const matchesType = typeFilter === "all" || d.type === typeFilter;
      return matchesQuery && matchesCategory && matchesType;
    });
  }, [documents, query, category, typeFilter]);

  const handleUnavailable = (doc: DocumentItem) => {
    setPendingNotice(`"${doc.title}" will be published soon.`);
    window.setTimeout(() => setPendingNotice(null), 3000);
  };

  const totalCount = documents.length;
  const showingCount = filtered.length;
  const hasActiveFilters = query !== "" || category !== "all" || typeFilter !== "all";

  return (
    <section id="resources" className="py-24 relative bg-black/20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
          >
            Documents <span className="text-cyan-400">/</span> Resources
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-cyan-500 rounded mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
            Browse curated PDF and slide resources covering AI, data analytics,
            full stack development, and automation. Search, filter, view in a new
            tab, or download.
          </p>
        </div>

        {/* Toolbar */}
        <div className="glass-panel rounded-2xl border border-white/10 p-4 md:p-5 mb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or description…"
                className="pl-9 bg-black/30 border-white/10 focus-visible:border-cyan-500/40 focus-visible:ring-cyan-500/20"
                data-testid="input-search-resources"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 text-muted-foreground"
                  aria-label="Clear search"
                  data-testid="btn-clear-search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Type filter */}
            <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by type">
              <FilterChip
                active={typeFilter === "all"}
                onClick={() => setTypeFilter("all")}
                testId="filter-type-all"
              >
                All Types
              </FilterChip>
              {documentTypes.map((t) => (
                <FilterChip
                  key={t}
                  active={typeFilter === t}
                  onClick={() => setTypeFilter(t)}
                  testId={`filter-type-${t}`}
                >
                  {t.toUpperCase()}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <FilterChip
              active={category === "all"}
              onClick={() => setCategory("all")}
              testId="filter-category-all"
            >
              All Categories
            </FilterChip>
            {documentCategories.map((c) => (
              <FilterChip
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
                testId={`filter-category-${c.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {c}
              </FilterChip>
            ))}
          </div>

          {/* Status row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span data-testid="text-results-count">
              Showing <span className="text-cyan-300 font-semibold">{showingCount}</span> of{" "}
              <span className="text-foreground/80">{totalCount}</span> resources
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setTypeFilter("all");
                }}
                className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
                data-testid="btn-reset-filters"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Coming-soon notice */}
        <AnimatePresence>
          {pendingNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 px-4 py-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm text-center"
              data-testid="text-pending-notice"
            >
              {pendingNotice}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc, idx) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                index={idx}
                onUnavailable={handleUnavailable}
              />
            ))}
          </div>
        ) : (
          <div
            className="glass-panel rounded-2xl border border-white/10 p-12 text-center"
            data-testid="text-empty-state"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <FileX className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resources match your filters</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Try a different search term, category, or file type.
            </p>
            <Button
              variant="outline"
              className="border-white/10"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setTypeFilter("all");
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testId: string;
}

function FilterChip({ active, onClick, children, testId }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all duration-200 ${
        active
          ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
