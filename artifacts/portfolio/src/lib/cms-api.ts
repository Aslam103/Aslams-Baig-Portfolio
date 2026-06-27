import type {
  AdminContentResponse,
  PortfolioContent,
  PortfolioSection,
  PublicContentResponse,
  ProjectCard,
} from "./cms-types";

const apiBase =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:8787/api";

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("admin_basic_token");
  if (!token) return {};
  return { Authorization: `Basic ${token}` };
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  useAuth = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (useAuth) {
    const authHeader = getAuthHeader().Authorization;
    if (authHeader) {
      headers.set("Authorization", authHeader);
    }
  }

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export function setAdminToken(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  localStorage.setItem("admin_basic_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("admin_basic_token");
}

export function hasAdminToken() {
  return Boolean(localStorage.getItem("admin_basic_token"));
}

export async function loginAdmin() {
  return request<{ ok: true }>("/admin/login", { method: "POST" }, true);
}

export async function getPublicContent() {
  return request<PublicContentResponse>("/content");
}

export async function getAdminContent() {
  return request<AdminContentResponse>("/admin/content", undefined, true);
}

export async function saveDraft(content: PortfolioContent) {
  return request<{ ok: true; content: PortfolioContent }>(
    "/admin/content",
    {
      method: "PUT",
      body: JSON.stringify({ content }),
    },
    true,
  );
}

export async function publishDraft() {
  return request<{ ok: true; content: PortfolioContent }>(
    "/admin/publish",
    { method: "POST" },
    true,
  );
}

export async function resetLayout() {
  return request<{ ok: true; content: PortfolioContent }>(
    "/admin/reset",
    { method: "POST" },
    true,
  );
}

export async function addSection(section: Partial<PortfolioSection>) {
  return request<{ ok: true }>("/admin/sections", {
    method: "POST",
    body: JSON.stringify({ section }),
  }, true);
}

export async function updateSection(sectionId: string, section: Partial<PortfolioSection>) {
  return request<{ ok: true }>(
    `/admin/sections/${sectionId}`,
    {
      method: "PUT",
      body: JSON.stringify({ section }),
    },
    true,
  );
}

export async function deleteSection(sectionId: string) {
  return request<void>(`/admin/sections/${sectionId}`, { method: "DELETE" }, true);
}

export async function reorderSections(sectionIds: string[]) {
  return request<{ ok: true }>(
    "/admin/sections/reorder",
    {
      method: "POST",
      body: JSON.stringify({ sectionIds }),
    },
    true,
  );
}

export async function addProject(sectionId: string, card: Partial<ProjectCard>) {
  return request<{ ok: true }>(
    `/admin/projects/${sectionId}`,
    {
      method: "POST",
      body: JSON.stringify({ card }),
    },
    true,
  );
}

export async function updateProject(
  sectionId: string,
  cardId: string,
  card: Partial<ProjectCard>,
) {
  return request<{ ok: true }>(
    `/admin/projects/${sectionId}/${cardId}`,
    {
      method: "PUT",
      body: JSON.stringify({ card }),
    },
    true,
  );
}

export async function deleteProject(sectionId: string, cardId: string) {
  return request<void>(`/admin/projects/${sectionId}/${cardId}`, { method: "DELETE" }, true);
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`${apiBase}/admin/upload-image`, {
    method: "POST",
    headers: new Headers(getAuthHeader()),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Image upload failed (${response.status})`);
  }
  return (await response.json()) as { ok: true; url: string };
}

export async function trackView() {
  await request<void>("/analytics/view", { method: "POST" });
}

export async function trackProjectClick() {
  await request<void>("/analytics/click", { method: "POST" });
}
