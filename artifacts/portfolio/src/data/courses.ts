export type CourseCategory = "core" | "specialization" | "modular";

export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  keyTopics: string[];
  outcome: string;
  iconHint: string;
}

export const courses: Course[] = [
  {
    id: "icfai",
    name: "ICFAI — Computer Foundation with AI",
    category: "core",
    duration: "12 weeks",
    level: "Beginner",
    keyTopics: ["Computer fundamentals", "Office productivity", "Intro to AI tools", "Digital workflows", "Practical labs"],
    outcome: "Master computer basics and AI-driven workflows.",
    iconHint: "monitor"
  },
  {
    id: "fame",
    name: "FAME — Financial Analysis & Management Expert",
    category: "core",
    duration: "16 weeks",
    level: "Intermediate",
    keyTopics: ["Financial statements", "Ratio analysis", "Tally + FOCUS 9", "Reconciliation", "Business reporting"],
    outcome: "Manage full-cycle accounting and analytical reporting.",
    iconHint: "calculator"
  },
  {
    id: "data-analytics",
    name: "Data Analytics Program",
    category: "core",
    duration: "14 weeks",
    level: "Intermediate",
    keyTopics: ["Excel for analytics", "SQL basics", "Power BI dashboards", "Storytelling with data", "Cohort project"],
    outcome: "Create actionable data dashboards from raw datasets.",
    iconHint: "database"
  },
  {
    id: "full-stack",
    name: "Full Stack Java / MERN",
    category: "core",
    duration: "20 weeks",
    level: "Advanced",
    keyTopics: ["Java + OOP", "Spring fundamentals", "React + Node", "REST APIs", "Deployment"],
    outcome: "Deploy complete, end-to-end web applications.",
    iconHint: "code"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "specialization",
    duration: "10 weeks",
    level: "Intermediate",
    keyTopics: ["SEO/SEM", "Social Media", "Digital Literacy", "Campaigns"],
    outcome: "Execute multi-channel digital strategies.",
    iconHint: "globe"
  },
  {
    id: "graphic-design",
    name: "Graphic Designing",
    category: "specialization",
    duration: "8 weeks",
    level: "Beginner",
    keyTopics: ["Design principles", "Photoshop", "Illustrator", "Asset creation"],
    outcome: "Produce professional visual assets.",
    iconHint: "pen-tool"
  },
  {
    id: "adv-finance",
    name: "Advanced Finance",
    category: "specialization",
    duration: "12 weeks",
    level: "Advanced",
    keyTopics: ["Complex modeling", "Auditing", "Advanced reconciliation", "Financial strategy"],
    outcome: "Handle complex financial operations and strategies.",
    iconHint: "trending-up"
  },
  {
    id: "power-bi",
    name: "Power BI",
    category: "modular",
    duration: "4 weeks",
    level: "Intermediate",
    keyTopics: ["Data modeling", "DAX essentials", "Interactive dashboards", "Publishing & sharing"],
    outcome: "Build and share interactive business dashboards.",
    iconHint: "pie-chart"
  },
  {
    id: "frontend",
    name: "Frontend Development",
    category: "modular",
    duration: "6 weeks",
    level: "Beginner",
    keyTopics: ["HTML/CSS basics", "JavaScript fundamentals", "Responsive design", "UI components"],
    outcome: "Build responsive, interactive web interfaces.",
    iconHint: "layout"
  },
  {
    id: "vibe",
    name: "VIBE — Visual Identity, Branding & Experience",
    category: "modular",
    duration: "4 weeks",
    level: "Beginner",
    keyTopics: ["Brand foundations", "Color & type systems", "Logo & identity", "Asset kit delivery"],
    outcome: "Design cohesive brand identities and assets.",
    iconHint: "sparkles"
  }
];