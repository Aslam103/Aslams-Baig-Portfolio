import { personalInfo } from "./personalInfo";

export interface ResumeSection {
  heading: string;
}

export interface ResumeExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ResumeProjectEntry {
  name: string;
  stack: string;
  bullets: string[];
}

export interface ResumeEducationEntry {
  degree: string;
  institution: string;
  detail?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    github: string;
    company: string;
  };
  summary: string;
  coreCompetencies: string[];
  technicalSkills: { group: string; items: string[] }[];
  experience: ResumeExperienceEntry[];
  projects: ResumeProjectEntry[];
  education: ResumeEducationEntry[];
  certifications: string[];
  languages: string[];
}

// ATS-optimized resume content. Keywords surfaced for: AI Educator,
// Data Analytics, Full Stack Development, Automation (n8n, Docker),
// Excel, Power BI, Teaching & Training.
export const resumeData: ResumeData = {
  name: personalInfo.name,
  title: "AI Educator | System Builder | Course Designer",
  contact: {
    location: personalInfo.location,
    phone: personalInfo.private.phone,
    email: personalInfo.private.email,
    github: "github.com/Aslam103",
    company: `${personalInfo.company.name} (${personalInfo.company.parent})`,
  },
  summary:
    "AI Educator, System Builder, and Course Designer with 13+ years of experience designing technology curricula, mentoring learners, and shipping automation systems. Specialized in integrating AI tools, data analytics, and full stack development into outcome-driven training programs. Proven record building and delivering courses across AI, Data Analytics, Full Stack Java, MERN, Power BI, Excel, and Financial Analysis. Hands-on with n8n + Docker automation, dashboard design, and scalable learning operations. Currently leading technical training and learning systems at TWG International (Technoworld Group), Hyderabad.",
  coreCompetencies: [
    "AI-Integrated Curriculum Design",
    "Data Analytics & Dashboarding",
    "Full Stack Development Training (Java / MERN)",
    "Workflow Automation (n8n, Docker)",
    "Power BI & Advanced Excel",
    "Financial Analysis & Accounting Operations",
    "Mentorship & Cohort Management",
    "Technical Content Creation & Video Production",
  ],
  technicalSkills: [
    {
      group: "AI & Automation",
      items: [
        "ChatGPT",
        "GitHub Copilot",
        "Windsurf",
        "n8n",
        "Docker",
        "Webhook Workflows",
        "AI Resume Parsing",
        "Conversational AI / Chatbots",
      ],
    },
    {
      group: "Data & Analytics",
      items: [
        "Power BI",
        "Advanced Excel",
        "DAX",
        "Data Visualization",
        "SQL Basics",
        "KPI Dashboards",
        "Financial Reporting",
      ],
    },
    {
      group: "Development",
      items: [
        "Java (OOP)",
        "Spring Fundamentals",
        "MERN Stack",
        "React",
        "Node.js",
        "REST APIs",
        "HTML / CSS",
        "Frontend Development",
        "Deployment Workflows",
      ],
    },
    {
      group: "Operations & Tools",
      items: [
        "Tally",
        "FOCUS 9",
        "Reconciliation",
        "VS Code",
        "Git / GitHub",
        "Notion",
        "Google Workspace",
      ],
    },
    {
      group: "Teaching & Content",
      items: [
        "Curriculum Architecture",
        "Cohort Mentoring",
        "Technical Writing",
        "Video Production",
        "Long-form Content",
        "Public Speaking",
        "Counseling",
      ],
    },
  ],
  experience: [
    {
      role: "Lead Trainer — Technical Education & Learning Systems",
      company: "TWG International (Technoworld Group)",
      location: "Abids, Hyderabad",
      period: "Current",
      bullets: [
        "Design and deliver outcome-driven technical training across AI, Data Analytics, Full Stack Java/MERN, Power BI, Advanced Excel, and Financial Analysis.",
        "Architect modular curricula that integrate AI tooling (ChatGPT, Copilot, Windsurf) into hands-on labs and capstone projects.",
        "Mentor multi-cohort learners on real-world projects, tracking progress with structured rubrics and dashboards.",
        "Build internal automation workflows on n8n + Docker to streamline cohort onboarding, content publishing, and reporting.",
        "Translate complex technical concepts into clear, job-ready learning paths used by students entering AI, analytics, and full stack roles.",
      ],
    },
    {
      role: "Educator, Mentor & Operations Lead",
      company: "Zakat Center & Independent Programs",
      location: "Hyderabad",
      period: "Earlier roles",
      bullets: [
        "Trained learners on Computer Foundation, AI literacy, Tally, FOCUS 9, and reconciliation workflows used in real accounting operations.",
        "Implemented operational workflows that improved reconciliation accuracy by ~20% and reduced reporting cycle time.",
        "Designed structured counseling programs for learners and parents, improving cohort engagement and retention.",
        "Produced educational long-form content and video material for distribution across YouTube channels (Apex Aslam, Pages of Impact).",
      ],
    },
  ],
  projects: [
    {
      name: "AI Resume Parser System",
      stack: "VS Code, Windsurf, GitHub Copilot, ChatGPT, Node tooling",
      bullets: [
        "Built an AI-assisted resume parser that converts unstructured resumes into structured, searchable JSON for fast shortlisting.",
        "Implemented prompt engineering and validation logic to maintain consistency across diverse resume formats.",
      ],
    },
    {
      name: "AI Chatbot System",
      stack: "n8n, Docker, Webhook Automation, Knowledge Base",
      bullets: [
        "Designed a 24/7 conversational support system to handle repetitive student queries and route complex cases to humans.",
        "Self-hosted n8n + Docker stack for repeatable deployment and full data control.",
      ],
    },
    {
      name: "Course Ecosystem Builder",
      stack: "Modular Curriculum Design, AI Tooling, Structured Assessments",
      bullets: [
        "Built a modular learning system spanning AI, Data Analytics, and Full Stack tracks with measurable progression outcomes.",
        "Replaced siloed course delivery with cross-domain learning paths from Beginner to Expert.",
      ],
    },
    {
      name: "Data Analytics Training System",
      stack: "Excel, Power BI, Real-world Datasets, KPI Dashboards",
      bullets: [
        "Created a dataset-driven cohort program where learners ship working dashboards by week 6.",
        "Bridged tool fluency with business storytelling using real reporting scenarios.",
      ],
    },
    {
      name: "Full Stack Learning System",
      stack: "Java, Spring Concepts, MERN, Deployment Workflows",
      bullets: [
        "Built end-to-end build-deploy training cycles with code review gates to drive job-ready outcomes.",
        "Integrated AI-pair-programming workflows into the curriculum to model modern industry practice.",
      ],
    },
  ],
  education: [
    { degree: "Bachelor of Computer Applications (B.C.A)", institution: "Pursuing", detail: "Continuous learner" },
    { degree: "MSCIT", institution: "Maharashtra State Certificate in IT", detail: "Score: 84%" },
    { degree: "ADFA", institution: "Advanced Diploma in Financial Accounting", detail: "Certified" },
  ],
  certifications: [
    "MSCIT — 84%",
    "ADFA — Advanced Diploma in Financial Accounting",
    "Continuous learner across AI, Data Analytics, and Full Stack programs",
  ],
  languages: ["English", "Hindi", "Marathi", "Urdu", "Arabic (Quranic)"],
};
