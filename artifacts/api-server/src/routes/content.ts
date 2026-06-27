import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { Router, type IRouter, type Request } from "express";
import multer, { type StorageEngine } from "multer";
import { requireAdminAuth } from "../lib/auth";
import { getDefaultPortfolioContent } from "../lib/defaults";
import {
  findSection,
  getOrCreatePortfolioState,
  incrementAnalytics,
  normalizeContent,
  setDraft,
  setDraftAndPublished,
  setPublished,
} from "../lib/portfolioStore";
import type { PortfolioContent, PortfolioSection, ProjectCard } from "../types/portfolio";

const router: IRouter = Router();
const uploadDir = path.resolve(import.meta.dirname, "../../uploads");

const storage: StorageEngine = multer.diskStorage({
  destination: async (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

function parseContentPayload(payload: unknown): PortfolioContent {
  if (!payload || typeof payload !== "object") {
    throw new Error("Missing content payload.");
  }

  const parsed = payload as PortfolioContent;
  if (!Array.isArray(parsed.sections)) {
    throw new Error("sections must be an array.");
  }

  return normalizeContent(parsed);
}

router.get("/content", async (_req, res) => {
  const state = await getOrCreatePortfolioState();
  res.json({
    content: state.published,
    analytics: state.analytics,
  });
});

router.post("/analytics/view", async (_req, res) => {
  await incrementAnalytics("views");
  res.status(204).send();
});

router.post("/analytics/click", async (_req, res) => {
  await incrementAnalytics("projectClicks");
  res.status(204).send();
});

router.post("/admin/login", requireAdminAuth, (_req, res) => {
  res.json({ ok: true });
});

router.get("/admin/content", requireAdminAuth, async (_req, res) => {
  const state = await getOrCreatePortfolioState();
  res.json({
    draft: state.draft,
    published: state.published,
    analytics: state.analytics,
  });
});

router.put("/admin/content", requireAdminAuth, async (req, res) => {
  try {
    const content = parseContentPayload(req.body?.content);
    await setDraft(content);
    res.json({ ok: true, content });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid content payload.",
    });
  }
});

router.post("/admin/publish", requireAdminAuth, async (_req, res) => {
  const state = await getOrCreatePortfolioState();
  const published = normalizeContent(state.draft as PortfolioContent);
  await setPublished(published);
  res.json({ ok: true, content: published });
});

router.post("/admin/reset", requireAdminAuth, async (_req, res) => {
  const defaults = getDefaultPortfolioContent();
  await setDraftAndPublished(defaults);
  res.json({ ok: true, content: defaults });
});

router.post("/admin/upload-image", requireAdminAuth, upload.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No image uploaded." });
    return;
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({ ok: true, url });
});

router.delete("/admin/image", requireAdminAuth, async (req, res) => {
  const imageUrl = String(req.query.url ?? "");
  if (!imageUrl.startsWith("/uploads/")) {
    res.status(400).json({ message: "Invalid image url." });
    return;
  }
  const filename = imageUrl.replace("/uploads/", "");
  const fullPath = path.resolve(uploadDir, filename);
  try {
    await fs.unlink(fullPath);
  } catch {
    // Ignore missing file
  }
  res.status(204).send();
});

router.post("/admin/sections", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const section = req.body?.section as Partial<PortfolioSection>;
  if (!section || !section.type) {
    res.status(400).json({ message: "section payload is required." });
    return;
  }

  const next: PortfolioSection = {
    id: section.id ?? `section-${randomUUID()}`,
    type: section.type,
    title: section.title ?? "Untitled Section",
    subtitle: section.subtitle ?? "",
    content: section.content ?? "",
    visible: section.visible ?? true,
    order: state.draft.sections.length,
    align: section.align ?? "left",
    size: section.size ?? "md",
    imageUrl: section.imageUrl ?? "",
    icon: section.icon ?? "",
    cards: section.cards ?? [],
    items: section.items ?? [],
    links: section.links ?? [],
  };

  const updatedDraft = normalizeContent({
    ...state.draft,
    sections: [...state.draft.sections, next],
  } as PortfolioContent);

  await setDraft(updatedDraft);
  res.json({ ok: true, section: next, draft: updatedDraft });
});

router.put("/admin/sections/:sectionId", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const sectionId = String(req.params.sectionId);
  const current = findSection(state.draft.sections, sectionId);

  if (!current) {
    res.status(404).json({ message: "Section not found." });
    return;
  }

  const updates = req.body?.section as Partial<PortfolioSection>;
  const sections = state.draft.sections.map((section) =>
    section.id === sectionId ? { ...section, ...updates } : section,
  );

  const updatedDraft = normalizeContent({
    ...state.draft,
    sections,
  } as PortfolioContent);

  await setDraft(updatedDraft);
  res.json({ ok: true, draft: updatedDraft });
});

router.delete("/admin/sections/:sectionId", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const sectionId = String(req.params.sectionId);

  const sections = state.draft.sections.filter((section) => section.id !== sectionId);
  const updatedDraft = normalizeContent({
    ...state.draft,
    sections,
  } as PortfolioContent);

  await setDraft(updatedDraft);
  res.status(204).send();
});

router.post("/admin/sections/reorder", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const sectionIds = req.body?.sectionIds as string[] | undefined;
  if (!Array.isArray(sectionIds)) {
    res.status(400).json({ message: "sectionIds must be an array." });
    return;
  }

  const map = new Map(state.draft.sections.map((section) => [section.id, section]));
  const reordered = sectionIds
    .map((id) => map.get(id))
    .filter(Boolean)
    .map((section) => section as PortfolioSection);

  const untouched = state.draft.sections.filter(
    (section) => !sectionIds.includes(section.id),
  );

  const updatedDraft = normalizeContent({
    ...state.draft,
    sections: [...reordered, ...untouched],
  } as PortfolioContent);

  await setDraft(updatedDraft);
  res.json({ ok: true, draft: updatedDraft });
});

router.post("/admin/projects/:sectionId", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const sectionId = String(req.params.sectionId);
  const section = findSection(state.draft.sections, sectionId);
  if (!section) {
    res.status(404).json({ message: "Section not found." });
    return;
  }

  const card = req.body?.card as Partial<ProjectCard>;
  const nextCard: ProjectCard = {
    id: card.id ?? `project-${randomUUID()}`,
    title: card.title ?? "Untitled Project",
    description: card.description ?? "",
    url: card.url ?? "",
    imageUrl: card.imageUrl ?? "",
    logo: card.logo ?? "",
  };

  const sections = state.draft.sections.map((item) =>
    item.id === sectionId ? { ...item, cards: [...item.cards, nextCard] } : item,
  );
  const updatedDraft = normalizeContent({
    ...state.draft,
    sections,
  } as PortfolioContent);
  await setDraft(updatedDraft);
  res.json({ ok: true, card: nextCard, draft: updatedDraft });
});

router.put("/admin/projects/:sectionId/:cardId", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const sectionId = String(req.params.sectionId);
  const cardId = String(req.params.cardId);
  const updates = req.body?.card as Partial<ProjectCard>;

  const sections = state.draft.sections.map((section) => {
    if (section.id !== sectionId) return section;
    return {
      ...section,
      cards: section.cards.map((card) => (card.id === cardId ? { ...card, ...updates } : card)),
    };
  });

  const updatedDraft = normalizeContent({
    ...state.draft,
    sections,
  } as PortfolioContent);
  await setDraft(updatedDraft);
  res.json({ ok: true, draft: updatedDraft });
});

router.delete("/admin/projects/:sectionId/:cardId", requireAdminAuth, async (req, res) => {
  const state = await getOrCreatePortfolioState();
  const sectionId = String(req.params.sectionId);
  const cardId = String(req.params.cardId);

  const sections = state.draft.sections.map((section) => {
    if (section.id !== sectionId) return section;
    return {
      ...section,
      cards: section.cards.filter((card) => card.id !== cardId),
    };
  });

  const updatedDraft = normalizeContent({
    ...state.draft,
    sections,
  } as PortfolioContent);
  await setDraft(updatedDraft);
  res.status(204).send();
});

export default router;
