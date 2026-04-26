// Browser-side persistent storage for admin-managed documents.
//
// Metadata lives in localStorage (small JSON). Uploaded file blobs live in
// IndexedDB (handles large PDFs/PPTs without hitting localStorage's ~5MB cap).
//
// Static documents from src/data/documents.ts remain the canonical seed.
// Admin-added documents are stored here and MERGED into the public site.

import type { DocumentItem, DocumentType } from "@/data/documents";

const META_KEY = "mab.portfolio.adminDocs.v1";
const DB_NAME = "mab-portfolio-files";
const DB_VERSION = 1;
const STORE_NAME = "files";

export type AccessLevel = "public" | "private";

export interface AdminDocument extends Omit<DocumentItem, "access"> {
  access: AccessLevel;
  source: "admin";
  createdAt: number;
  updatedAt: number;
  fileName?: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface DocumentInput {
  title: string;
  description: string;
  category: string;
  type: DocumentType;
  access: AccessLevel;
}

const events = new EventTarget();
export const DOC_STORE_EVENT = "documents-changed";

function emitChange() {
  events.dispatchEvent(new Event(DOC_STORE_EVENT));
}

export function subscribe(listener: () => void): () => void {
  events.addEventListener(DOC_STORE_EVENT, listener);
  return () => events.removeEventListener(DOC_STORE_EVENT, listener);
}

// ---------- Metadata (localStorage) ----------

function readAllMeta(): AdminDocument[] {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as AdminDocument[];
  } catch {
    return [];
  }
}

function writeAllMeta(docs: AdminDocument[]) {
  localStorage.setItem(META_KEY, JSON.stringify(docs));
  emitChange();
}

export function listAdminDocuments(): AdminDocument[] {
  return readAllMeta().sort((a, b) => b.updatedAt - a.updatedAt);
}

// ---------- Files (IndexedDB) ----------

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function putBlob(id: string, blob: Blob): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, id);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function getBlob(id: string): Promise<Blob | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => {
      db.close();
      resolve((req.result as Blob | undefined) ?? null);
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}

async function deleteBlob(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

// ---------- Public API ----------

const ACCEPTED_MIME = new Set([
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

const ACCEPTED_EXT = [".pdf", ".ppt", ".pptx"];

export function validateFile(file: File): { ok: boolean; reason?: string } {
  const name = file.name.toLowerCase();
  const extOk = ACCEPTED_EXT.some((e) => name.endsWith(e));
  const mimeOk = ACCEPTED_MIME.has(file.type) || file.type === "";
  if (!extOk || !mimeOk) {
    return {
      ok: false,
      reason: "Only PDF, PPT, and PPTX files are allowed.",
    };
  }
  if (file.size > 50 * 1024 * 1024) {
    return { ok: false, reason: "File is larger than 50 MB." };
  }
  return { ok: true };
}

function generateId(): string {
  return `doc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export interface CreateDocumentArgs extends DocumentInput {
  file: File;
}

export async function createDocument(args: CreateDocumentArgs): Promise<AdminDocument> {
  const validation = validateFile(args.file);
  if (!validation.ok) throw new Error(validation.reason ?? "Invalid file.");

  const id = generateId();
  await putBlob(id, args.file);

  const now = Date.now();
  const doc: AdminDocument = {
    id,
    title: args.title.trim(),
    description: args.description.trim(),
    fileUrl: `idb:${id}`, // sentinel handled by buildFileUrl()
    thumbnail: "",
    category: args.category.trim(),
    type: args.type,
    access: args.access,
    source: "admin",
    createdAt: now,
    updatedAt: now,
    fileName: args.file.name,
    mimeType: args.file.type || (args.type === "pdf" ? "application/pdf" : ""),
    sizeBytes: args.file.size,
  };

  const all = readAllMeta();
  all.push(doc);
  writeAllMeta(all);
  return doc;
}

export interface UpdateDocumentArgs extends DocumentInput {
  id: string;
  file?: File | null; // optional replacement
}

export async function updateDocument(args: UpdateDocumentArgs): Promise<AdminDocument> {
  const all = readAllMeta();
  const idx = all.findIndex((d) => d.id === args.id);
  if (idx === -1) throw new Error("Document not found.");
  const existing = all[idx]!;

  let fileName = existing.fileName;
  let mimeType = existing.mimeType;
  let sizeBytes = existing.sizeBytes;

  if (args.file) {
    const validation = validateFile(args.file);
    if (!validation.ok) throw new Error(validation.reason ?? "Invalid file.");
    await putBlob(existing.id, args.file);
    fileName = args.file.name;
    mimeType = args.file.type || mimeType;
    sizeBytes = args.file.size;
  }

  const updated: AdminDocument = {
    ...existing,
    title: args.title.trim(),
    description: args.description.trim(),
    category: args.category.trim(),
    type: args.type,
    access: args.access,
    updatedAt: Date.now(),
    fileName,
    mimeType,
    sizeBytes,
  };
  all[idx] = updated;
  writeAllMeta(all);
  return updated;
}

export async function deleteDocument(id: string): Promise<void> {
  const all = readAllMeta();
  const next = all.filter((d) => d.id !== id);
  writeAllMeta(next);
  try {
    await deleteBlob(id);
  } catch {
    // best-effort
  }
}

export async function getDocumentBlobUrl(id: string): Promise<string | null> {
  const blob = await getBlob(id);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

// Convert any document item with an `idb:` sentinel into a usable blob URL.
// Returns the original fileUrl for non-IDB entries, or null on lookup failure.
export async function resolveFileUrl(fileUrl: string): Promise<string | null> {
  if (!fileUrl.startsWith("idb:")) return fileUrl;
  const id = fileUrl.slice(4);
  return getDocumentBlobUrl(id);
}
