export interface Project {
  id: string;
  title: string;
  summary: string;
  tools: string[];
  problem: string;
  impact: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "ai-resume-parser",
    title: "AI Resume Parser System",
    summary: "Automated resume screening utilizing advanced AI parsing to standardize and search applicant data.",
    tools: ["VS Code", "Windsurf", "Copilot", "ChatGPT", "Node tooling"],
    problem: "Manual resume screening is slow and inconsistent.",
    impact: "Structured parsing turns unstructured resumes into searchable, comparable JSON for fast shortlisting.",
    tags: ["AI", "Automation", "HR Tech"]
  },
  {
    id: "ai-chatbot-system",
    title: "AI Chatbot System",
    summary: "24/7 conversational support bot built on automated workflows and integrated knowledge base.",
    tools: ["n8n", "Docker", "webhook automation", "knowledge base"],
    problem: "Repetitive student queries and 1:many support load.",
    impact: "24/7 conversational support with workflow handoff to humans.",
    tags: ["Chatbot", "n8n", "Student Support"]
  },
  {
    id: "course-ecosystem",
    title: "Course Ecosystem Builder",
    summary: "A modular curriculum engine designed for progressive learning and measurable outcomes.",
    tools: ["Modular curriculum design", "AI tooling", "structured assessments"],
    problem: "Courses delivered as silos with no progression.",
    impact: "Cross-domain learning paths with measurable outcomes.",
    tags: ["Curriculum", "Education", "Systems"]
  },
  {
    id: "data-analytics",
    title: "Data Analytics Training System",
    summary: "Hands-on data analytics training focusing on real-world business context and dashboard creation.",
    tools: ["Excel", "Power BI", "real-world datasets", "dashboards"],
    problem: "Learners memorize tools without business context.",
    impact: "Dataset-driven cohorts that ship dashboards by week 6.",
    tags: ["Data Analytics", "Power BI", "Training"]
  },
  {
    id: "full-stack-learning",
    title: "Full Stack Learning System",
    summary: "End-to-end full stack development training designed for job readiness and code review.",
    tools: ["Java", "Spring concepts", "MERN", "deployment workflows"],
    problem: "Fragmented full-stack tutorials don't translate to job readiness.",
    impact: "End-to-end build-deploy cycles with code review gates.",
    tags: ["Full Stack", "Java", "MERN"]
  }
];