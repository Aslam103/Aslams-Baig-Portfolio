// Centralized document data. All UI in the Resources section renders from this.
// To add a new document: append an entry below. To replace a placeholder file,
// update the `fileUrl` to a real public URL (PDF) or PPT/PPTX URL.
//
// Special fileUrl tokens:
//   ""               -> Not yet uploaded. Card shows "Coming soon" state.
//   "dynamic:resume" -> Generated on demand via src/lib/generateResume.ts.

export type DocumentType = "pdf" | "ppt";

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnail: string;
  category: string;
  type: DocumentType;
  access: "public";
}

export const documents: DocumentItem[] = [
  {
    id: "ats-resume",
    title: "ATS-Optimized Resume",
    description:
      "Modern, ATS-friendly resume generated live from this portfolio's data — always up to date.",
    fileUrl: "dynamic:resume",
    thumbnail: "",
    category: "Resume",
    type: "pdf",
    access: "public",
  },
  {
    id: "ai-course-curriculum",
    title: "AI Foundations Curriculum",
    description:
      "Module-by-module breakdown of the AI Foundations track, including labs, capstone projects, and assessment rubrics.",
    fileUrl: "",
    thumbnail: "",
    category: "Curriculum",
    type: "pdf",
    access: "public",
  },
  {
    id: "data-analytics-roadmap",
    title: "Data Analytics Roadmap",
    description:
      "Structured 12-week path from Excel & Power BI fundamentals to dashboard storytelling and KPI design.",
    fileUrl: "",
    thumbnail: "",
    category: "Roadmap",
    type: "pdf",
    access: "public",
  },
  {
    id: "fullstack-learning-path",
    title: "Full Stack Learning Path",
    description:
      "Progression map covering Java fundamentals, MERN stack, deployment workflows, and AI-pair-programming.",
    fileUrl: "",
    thumbnail: "",
    category: "Roadmap",
    type: "pdf",
    access: "public",
  },
  {
    id: "n8n-automation-playbook",
    title: "n8n + Docker Automation Playbook",
    description:
      "Slides covering self-hosted n8n setup, common workflow patterns, and webhook-based AI automations.",
    fileUrl: "",
    thumbnail: "",
    category: "Slides",
    type: "ppt",
    access: "public",
  },
  {
    id: "power-bi-cheatsheet",
    title: "Power BI Quick-Reference Cheat Sheet",
    description:
      "Concise reference for DAX patterns, model design, visuals, and dashboard performance tips.",
    fileUrl: "",
    thumbnail: "",
    category: "Cheat Sheet",
    type: "pdf",
    access: "public",
  },
  {
    id: "ai-tools-comparison",
    title: "AI Tools Comparison Deck",
    description:
      "Side-by-side review of ChatGPT, GitHub Copilot, and Windsurf for educators, students, and builders.",
    fileUrl: "",
    thumbnail: "",
    category: "Slides",
    type: "ppt",
    access: "public",
  },
];

export const documentCategories = Array.from(
  new Set(documents.map((d) => d.category))
).sort();

export const documentTypes: DocumentType[] = ["pdf", "ppt"];
