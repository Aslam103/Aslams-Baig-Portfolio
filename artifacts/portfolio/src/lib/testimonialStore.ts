// Browser-side persistent storage for admin-managed testimonials.
// Static testimonials from src/data/testimonials.ts remain the canonical seed.
// Admin-added/edited testimonials are stored here and MERGED into the public site.

import type { Testimonial } from "@/data/testimonials";

const META_KEY = "mab.portfolio.adminTestimonials.v1";

export interface AdminTestimonial extends Testimonial {
  source: "admin";
  createdAt: number;
  updatedAt: number;
}

const events = new EventTarget();
export const TESTIMONIALS_EVENT = "testimonials-changed";

function emitChange() {
  events.dispatchEvent(new Event(TESTIMONIALS_EVENT));
}

export function subscribe(listener: () => void): () => void {
  events.addEventListener(TESTIMONIALS_EVENT, listener);
  return () => events.removeEventListener(TESTIMONIALS_EVENT, listener);
}

function readAllMeta(): AdminTestimonial[] {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as AdminTestimonial[];
  } catch {
    return [];
  }
}

function writeAllMeta(testimonials: AdminTestimonial[]) {
  localStorage.setItem(META_KEY, JSON.stringify(testimonials));
  emitChange();
}

export function listAdminTestimonials(): AdminTestimonial[] {
  return readAllMeta().sort((a, b) => b.updatedAt - a.updatedAt);
}

function generateId(): string {
  return `testimonial_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export interface CreateTestimonialArgs {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  course: string;
}

export async function createTestimonial(args: CreateTestimonialArgs): Promise<AdminTestimonial> {
  if (!args.name.trim() || !args.content.trim()) {
    throw new Error("Name and content are required.");
  }

  const id = generateId();
  const now = Date.now();
  const testimonial: AdminTestimonial = {
    id,
    name: args.name.trim(),
    role: args.role.trim(),
    company: args.company.trim(),
    content: args.content.trim(),
    rating: Math.min(Math.max(args.rating, 1), 5),
    image: args.image.trim(),
    course: args.course.trim(),
    source: "admin",
    createdAt: now,
    updatedAt: now,
  };

  const all = readAllMeta();
  all.push(testimonial);
  writeAllMeta(all);
  return testimonial;
}

export interface UpdateTestimonialArgs extends CreateTestimonialArgs {
  id: string;
}

export async function updateTestimonial(args: UpdateTestimonialArgs): Promise<AdminTestimonial> {
  const all = readAllMeta();
  const idx = all.findIndex((t) => t.id === args.id);
  if (idx === -1) throw new Error("Testimonial not found.");

  const existing = all[idx]!;
  const updated: AdminTestimonial = {
    ...existing,
    name: args.name.trim(),
    role: args.role.trim(),
    company: args.company.trim(),
    content: args.content.trim(),
    rating: Math.min(Math.max(args.rating, 1), 5),
    image: args.image.trim(),
    course: args.course.trim(),
    updatedAt: Date.now(),
  };
  all[idx] = updated;
  writeAllMeta(all);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const all = readAllMeta();
  const next = all.filter((t) => t.id !== id);
  writeAllMeta(next);
}
