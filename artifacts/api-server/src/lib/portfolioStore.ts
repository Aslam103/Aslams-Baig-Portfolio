import { getSupabaseClient, isSupabaseConfigured } from "@workspace/db";
import { getDefaultPortfolioContent } from "./defaults";
import type {
  AnalyticsSummary,
  PortfolioContent,
  PortfolioSection,
} from "../types/portfolio";
import fs from "node:fs/promises";
import path from "node:path";

const TABLE_NAME = "portfolio_state";
const STATE_KEY = "main";
const LOCAL_STATE_FILE = path.resolve(import.meta.dirname, "../../local-state.json");

export interface PortfolioStateRecord {
  key: string;
  draft: PortfolioContent;
  published: PortfolioContent;
  analytics: AnalyticsSummary;
}

function getDefaultState(): PortfolioStateRecord {
  const defaults = getDefaultPortfolioContent();
  return {
    key: STATE_KEY,
    draft: defaults,
    published: defaults,
    analytics: {
      views: 0,
      projectClicks: 0,
    },
  };
}

function toStateRecord(value: unknown): PortfolioStateRecord {
  return JSON.parse(JSON.stringify(value)) as PortfolioStateRecord;
}

export function normalizeContent(content: PortfolioContent): PortfolioContent {
  const sortedSections = [...content.sections]
    .sort((a, b) => a.order - b.order)
    .map((section, index) => ({ ...section, order: index }));

  return {
    ...content,
    sections: sortedSections,
    updatedAt: new Date(),
  };
}

// Local file-based fallback
async function readLocalState(): Promise<PortfolioStateRecord | null> {
  try {
    const data = await fs.readFile(LOCAL_STATE_FILE, "utf-8");
    return JSON.parse(data) as PortfolioStateRecord;
  } catch {
    return null;
  }
}

async function writeLocalState(state: PortfolioStateRecord): Promise<void> {
  await fs.writeFile(LOCAL_STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

async function upsertState(next: PortfolioStateRecord) {
  if (!isSupabaseConfigured()) {
    // Use local file fallback
    await writeLocalState(next);
    return next;
  }

  const client = getSupabaseClient();
  if (!client) {
    // Fallback to local if client is null
    await writeLocalState(next);
    return next;
  }

  const table = client.from(TABLE_NAME as never) as any;
  const { data, error } = await table
    .upsert(
      {
        key: next.key,
        draft: next.draft,
        published: next.published,
        analytics: next.analytics,
      },
      { onConflict: "key" },
    )
    .select("*")
    .single();

  if (error) {
    throw new Error(
      `Supabase upsert failed (${TABLE_NAME}). Ensure table exists and credentials have write access. ${error.message}`,
    );
  }

  return toStateRecord(data);
}

export async function getOrCreatePortfolioState() {
  if (!isSupabaseConfigured()) {
    // Use local file fallback
    const local = await readLocalState();
    if (local) {
      return local;
    }
    const defaultState = getDefaultState();
    await writeLocalState(defaultState);
    return defaultState;
  }

  const client = getSupabaseClient();
  if (!client) {
    // Fallback to local if client is null
    const local = await readLocalState();
    if (local) {
      return local;
    }
    const defaultState = getDefaultState();
    await writeLocalState(defaultState);
    return defaultState;
  }

  const table = client.from(TABLE_NAME as never) as any;
  const { data, error } = await table
    .select("*")
    .eq("key", STATE_KEY)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Supabase read failed (${TABLE_NAME}). Ensure table exists and credentials are valid. ${error.message}`,
    );
  }

  if (data) {
    return toStateRecord(data);
  }

  return upsertState(getDefaultState());
}

export async function setDraft(draft: PortfolioContent) {
  const current = await getOrCreatePortfolioState();
  return upsertState({
    ...current,
    draft: normalizeContent(draft),
  });
}

export async function setPublished(published: PortfolioContent) {
  const current = await getOrCreatePortfolioState();
  return upsertState({
    ...current,
    published: normalizeContent(published),
  });
}

export async function setDraftAndPublished(content: PortfolioContent) {
  const normalized = normalizeContent(content);
  const current = await getOrCreatePortfolioState();
  return upsertState({
    ...current,
    draft: normalized,
    published: normalized,
  });
}

export async function incrementAnalytics(field: keyof AnalyticsSummary) {
  const current = await getOrCreatePortfolioState();
  return upsertState({
    ...current,
    analytics: {
      ...current.analytics,
      [field]: (current.analytics[field] ?? 0) + 1,
    },
  });
}

export function findSection(sections: PortfolioSection[], sectionId: string) {
  return sections.find((section) => section.id === sectionId);
}
