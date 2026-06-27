import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  addProject,
  addSection,
  clearAdminToken,
  deleteProject,
  deleteSection,
  getAdminContent,
  hasAdminToken,
  loginAdmin,
  publishDraft,
  reorderSections,
  resetLayout,
  saveDraft,
  setAdminToken,
  updateProject,
  updateSection,
  uploadImage,
} from "@/lib/cms-api";
import type { PortfolioContent, PortfolioSection, ProjectCard } from "@/lib/cms-types";
import { DynamicPortfolio } from "@/components/portfolio/DynamicPortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function createLocalSection(type: PortfolioSection["type"]): PortfolioSection {
  return {
    id: `section-${crypto.randomUUID()}`,
    type,
    title: `New ${type} section`,
    subtitle: "",
    content: "",
    visible: true,
    order: 0,
    align: "left",
    size: "md",
    imageUrl: "",
    icon: "",
    cards: [],
    items: [],
    links: [],
  };
}

function createLocalProject(): ProjectCard {
  return {
    id: `project-${crypto.randomUUID()}`,
    title: "New project",
    description: "",
    url: "",
    imageUrl: "",
    logo: "🚀",
  };
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setAdminToken(username, password);
      await loginAdmin();
      onSuccess();
    } catch {
      clearAdminToken();
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-slate-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-6 p-8 rounded-2xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-sm text-slate-400">Access portfolio management panel</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Username</Label>
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder-slate-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold h-11"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Login to Admin Panel"}
        </Button>

        {/* Help Text */}
        <p className="text-xs text-slate-500 text-center">
          💡 Configure credentials in <code className="text-cyan-400 bg-slate-800 px-2 py-1 rounded">.env</code> file
        </p>
      </form>
    </div>
  );
}

function SectionEditor({
  section,
  onPatch,
  onUploadImage,
  onDelete,
  onAddProject,
  onProjectPatch,
  onProjectDelete,
}: {
  section: PortfolioSection;
  onPatch: (patch: Partial<PortfolioSection>) => void;
  onUploadImage: (file: File) => Promise<void>;
  onDelete: () => void;
  onAddProject: () => void;
  onProjectPatch: (projectId: string, patch: Partial<ProjectCard>) => void;
  onProjectDelete: (projectId: string) => void;
}) {
  return (
    <div className="space-y-4 p-4 rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Edit Section: {section.title}</h3>
        <Button variant="destructive" onClick={onDelete}>
          Delete Section
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={section.title}
            onChange={(event) => onPatch({ title: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Subtitle</Label>
          <Input
            value={section.subtitle}
            onChange={(event) => onPatch({ subtitle: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Icon (emoji or short text)</Label>
          <Input
            value={section.icon}
            onChange={(event) => onPatch({ icon: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <Input value={section.type} disabled />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <Textarea
          rows={4}
          value={section.content}
          onChange={(event) => onPatch({ content: event.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label>Alignment</Label>
          <Select
            value={section.align}
            onValueChange={(value: PortfolioSection["align"]) => onPatch({ align: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Size</Label>
          <Select
            value={section.size}
            onValueChange={(value: PortfolioSection["size"]) => onPatch({ size: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Visible</Label>
          <div className="h-10 px-3 flex items-center rounded-md border border-white/10">
            <Switch
              checked={section.visible}
              onCheckedChange={(checked) => onPatch({ visible: checked })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input
          value={section.imageUrl}
          onChange={(event) => onPatch({ imageUrl: event.target.value })}
          placeholder="Paste image URL or upload below"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void onUploadImage(file);
            }
          }}
        />
      </div>

      {(section.type === "skills" || section.type === "custom") && (
        <div className="space-y-2">
          <Label>List Items (one per line)</Label>
          <Textarea
            rows={4}
            value={section.items.join("\n")}
            onChange={(event) =>
              onPatch({
                items: event.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      )}

      {section.type === "contact" && (
        <div className="space-y-2">
          <Label>Contact Links (label|url per line)</Label>
          <Textarea
            rows={4}
            value={section.links.map((link) => `${link.label}|${link.url}`).join("\n")}
            onChange={(event) =>
              onPatch({
                links: event.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => {
                    const [label, url] = line.split("|");
                    return { label: label?.trim() ?? "Link", url: url?.trim() ?? "" };
                  }),
              })
            }
          />
        </div>
      )}

      {section.type === "projects" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Project Cards</Label>
            <Button onClick={onAddProject}>Add Project Card</Button>
          </div>
          {section.cards.map((card) => (
            <div key={card.id} className="p-3 rounded-md border border-white/10 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  value={card.title}
                  onChange={(event) =>
                    onProjectPatch(card.id, { title: event.target.value })
                  }
                  placeholder="Project title"
                />
                <Input
                  value={card.logo}
                  onChange={(event) =>
                    onProjectPatch(card.id, { logo: event.target.value })
                  }
                  placeholder="Logo/icon"
                />
                <Input
                  value={card.url}
                  onChange={(event) =>
                    onProjectPatch(card.id, { url: event.target.value })
                  }
                  placeholder="Project URL"
                  className="md:col-span-2"
                />
                <Input
                  value={card.imageUrl}
                  onChange={(event) =>
                    onProjectPatch(card.id, { imageUrl: event.target.value })
                  }
                  placeholder="Image URL"
                  className="md:col-span-2"
                />
              </div>
              <Textarea
                rows={2}
                value={card.description}
                onChange={(event) =>
                  onProjectPatch(card.id, { description: event.target.value })
                }
                placeholder="Project description"
              />
              <Button variant="destructive" onClick={() => onProjectDelete(card.id)}>
                Remove Card
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(hasAdminToken());
  const [draft, setDraft] = useState<PortfolioContent | null>(null);
  const [published, setPublished] = useState<PortfolioContent | null>(null);
  const [analytics, setAnalytics] = useState<{ views: number; projectClicks: number }>({
    views: 0,
    projectClicks: 0,
  });
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showPreview, setShowPreview] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);

  const selectedSection = useMemo(() => {
    if (!draft || !selectedSectionId) return null;
    return draft.sections.find((section) => section.id === selectedSectionId) ?? null;
  }, [draft, selectedSectionId]);

  const loadContent = async () => {
    const result = await getAdminContent();
    setDraft(result.draft);
    setPublished(result.published);
    setAnalytics(result.analytics);
    if (!selectedSectionId && result.draft.sections[0]) {
      setSelectedSectionId(result.draft.sections[0].id);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    void loadContent().catch(() => {
      clearAdminToken();
      setAuthenticated(false);
    });
  }, [authenticated]);

  if (!authenticated) {
    return <LoginScreen onSuccess={() => setAuthenticated(true)} />;
  }

  if (!draft || !published) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
        Loading admin dashboard...
      </div>
    );
  }

  const setDraftSection = async (sectionId: string, patch: Partial<PortfolioSection>) => {
    const nextDraft: PortfolioContent = {
      ...draft,
      sections: draft.sections.map((section) =>
        section.id === sectionId ? { ...section, ...patch } : section,
      ),
    };
    setDraft(nextDraft);
    await updateSection(sectionId, patch);
  };

  const handleUploadImage = async (sectionId: string, file: File) => {
    const uploaded = await uploadImage(file);
    await setDraftSection(sectionId, { imageUrl: uploaded.url });
    setMessage("Image uploaded successfully.");
  };

  const handleSaveDraft = async () => {
    await saveDraft(draft);
    setMessage("Draft saved.");
  };

  const handlePublish = async () => {
    const response = await publishDraft();
    setPublished(response.content);
    setMessage("Draft published to live portfolio.");
  };

  const handleReset = async () => {
    const response = await resetLayout();
    setDraft(response.content);
    setPublished(response.content);
    setSelectedSectionId(response.content.sections[0]?.id ?? null);
    setMessage("Layout reset to defaults.");
  };

  const handleAddSection = async (type: PortfolioSection["type"]) => {
    const section = createLocalSection(type);
    await addSection(section);
    await loadContent();
    setSelectedSectionId(section.id);
    setMessage(`Added ${type} section.`);
  };

  const handleDeleteSection = async (sectionId: string) => {
    await deleteSection(sectionId);
    await loadContent();
    setMessage("Section deleted.");
  };

  const handleReorder = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    // Drag-drop reorder in memory first, then persist order through API.
    const ordered = [...draft.sections].sort((a, b) => a.order - b.order);
    const dragIndex = ordered.findIndex((item) => item.id === dragId);
    const targetIndex = ordered.findIndex((item) => item.id === targetId);
    if (dragIndex < 0 || targetIndex < 0) return;
    const [moved] = ordered.splice(dragIndex, 1);
    ordered.splice(targetIndex, 0, moved);
    const nextDraft = {
      ...draft,
      sections: ordered.map((item, index) => ({ ...item, order: index })),
    };
    setDraft(nextDraft);
    await reorderSections(nextDraft.sections.map((item) => item.id));
    setDragId(null);
  };

  const handleAddProject = async (sectionId: string) => {
    const card = createLocalProject();
    await addProject(sectionId, card);
    await loadContent();
    setMessage("Project card added.");
  };

  const handleProjectPatch = async (
    sectionId: string,
    cardId: string,
    patch: Partial<ProjectCard>,
  ) => {
    const nextDraft: PortfolioContent = {
      ...draft,
      sections: draft.sections.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          cards: section.cards.map((card) =>
            card.id === cardId ? { ...card, ...patch } : card,
          ),
        };
      }),
    };
    setDraft(nextDraft);
    await updateProject(sectionId, cardId, patch);
  };

  const handleProjectDelete = async (sectionId: string, cardId: string) => {
    await deleteProject(sectionId, cardId);
    await loadContent();
    setMessage("Project card removed.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Back to Portfolio</Link>
            </Button>
            <h1 className="font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview((value) => !value)}>
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button onClick={handlePublish}>Publish</Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset Layout
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                clearAdminToken();
                setAuthenticated(false);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-4">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
            <h2 className="font-semibold">Sections</h2>
            <div className="space-y-2">
              {[...draft.sections]
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <button
                    key={section.id}
                    draggable
                    onDragStart={() => setDragId(section.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => void handleReorder(section.id)}
                    className={`w-full p-2 rounded-md text-left border ${
                      selectedSectionId === section.id
                        ? "border-cyan-400 bg-cyan-500/20"
                        : "border-white/10 bg-black/20"
                    }`}
                    onClick={() => setSelectedSectionId(section.id)}
                  >
                    <p className="font-medium">{section.title}</p>
                    <p className="text-xs opacity-70">
                      {section.type} | {section.visible ? "Visible" : "Hidden"}
                    </p>
                  </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["hero", "about", "projects", "skills", "contact", "custom"] as const).map(
                (type) => (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => void handleAddSection(type)}
                  >
                    + {type}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm space-y-1">
            <h2 className="font-semibold">Analytics</h2>
            <p>Views: {analytics.views}</p>
            <p>Project clicks: {analytics.projectClicks}</p>
          </div>

          {message && (
            <p className="text-sm text-emerald-300 p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
              {message}
            </p>
          )}
        </aside>

        <section className="space-y-6">
          {selectedSection ? (
            <SectionEditor
              section={selectedSection}
              onPatch={(patch) => void setDraftSection(selectedSection.id, patch)}
              onUploadImage={(file) => handleUploadImage(selectedSection.id, file)}
              onDelete={() => void handleDeleteSection(selectedSection.id)}
              onAddProject={() => void handleAddProject(selectedSection.id)}
              onProjectPatch={(projectId, patch) =>
                void handleProjectPatch(selectedSection.id, projectId, patch)
              }
              onProjectDelete={(projectId) =>
                void handleProjectDelete(selectedSection.id, projectId)
              }
            />
          ) : (
            <p className="opacity-80">Select a section to start editing.</p>
          )}

          {showPreview && (
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="px-4 py-2 bg-black/40 border-b border-white/10 text-sm font-medium">
                Live Preview (Draft)
              </div>
              {/* Preview helps validate edits before hitting Publish. */}
              <DynamicPortfolio content={draft} compact />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
