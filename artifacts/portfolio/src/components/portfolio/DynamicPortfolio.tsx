import { useMemo, useState } from "react";
import type { PortfolioContent, PortfolioSection, ProjectCard } from "@/lib/cms-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DynamicPortfolioProps {
  content: PortfolioContent;
  onProjectClick?: (card: ProjectCard) => void;
  compact?: boolean;
}

function classByAlign(align: PortfolioSection["align"]) {
  if (align === "center") return "text-center items-center";
  if (align === "right") return "text-right items-end";
  return "text-left items-start";
}

function classBySize(size: PortfolioSection["size"]) {
  if (size === "sm") return "max-w-3xl";
  if (size === "lg") return "max-w-6xl";
  return "max-w-5xl";
}

export function DynamicPortfolio({
  content,
  onProjectClick,
  compact = false,
}: DynamicPortfolioProps) {
  const [projectSearch, setProjectSearch] = useState("");
  const sections = useMemo(
    () =>
      [...content.sections]
        .filter((section) => section.visible)
        .sort((a, b) => a.order - b.order),
    [content.sections],
  );

  return (
    <div
      className={
        content.theme === "dark"
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }
    >
      {sections.map((section) => (
        <section
          key={section.id}
          className={`px-4 md:px-8 ${compact ? "py-8" : "py-16"} border-b ${
            content.theme === "dark" ? "border-white/10" : "border-black/10"
          }`}
          id={section.id}
        >
          <div className={`mx-auto flex flex-col gap-4 ${classByAlign(section.align)} ${classBySize(section.size)}`}>
            {!!section.icon && (
              <div className="text-4xl" aria-hidden>
                {section.icon}
              </div>
            )}
            {!!section.title && <h2 className="text-3xl font-bold">{section.title}</h2>}
            {!!section.subtitle && (
              <p className="text-lg opacity-80">{section.subtitle}</p>
            )}
            {!!section.content && <p className="opacity-90">{section.content}</p>}
            {!!section.imageUrl && (
              <img
                src={section.imageUrl}
                alt={section.title || "Section visual"}
                className="w-full max-h-[420px] object-cover rounded-xl border border-white/20"
              />
            )}

            {section.type === "skills" && section.items.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {section.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm border border-cyan-400/40 bg-cyan-500/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {section.type === "projects" && (
              <div className="w-full space-y-4">
                <div className="max-w-sm">
                  <Input
                    value={projectSearch}
                    onChange={(event) => setProjectSearch(event.target.value)}
                    placeholder="Search projects..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.cards
                    .filter((card) =>
                      `${card.title} ${card.description}`
                        .toLowerCase()
                        .includes(projectSearch.toLowerCase()),
                    )
                    .map((card) => (
                      <article
                        key={card.id}
                        className={`rounded-xl border p-4 flex flex-col gap-2 ${
                          content.theme === "dark"
                            ? "border-white/10 bg-white/5"
                            : "border-black/10 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xl">
                          <span>{card.logo || "🚀"}</span>
                          <h3 className="font-semibold">{card.title}</h3>
                        </div>
                        <p className="opacity-80">{card.description}</p>
                        {!!card.imageUrl && (
                          <img
                            src={card.imageUrl}
                            alt={card.title}
                            className="w-full h-44 object-cover rounded-md"
                          />
                        )}
                        {card.url && (
                          <Button
                            className="w-fit"
                            onClick={() => onProjectClick?.(card)}
                            asChild
                          >
                            <a href={card.url} target="_blank" rel="noreferrer">
                              Visit Project
                            </a>
                          </Button>
                        )}
                      </article>
                    ))}
                </div>
              </div>
            )}

            {section.type === "contact" && section.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {section.links.map((link) => (
                  <Button key={`${link.label}-${link.url}`} variant="outline" asChild>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
