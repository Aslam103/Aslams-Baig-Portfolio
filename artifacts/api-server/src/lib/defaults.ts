import type { PortfolioContent, PortfolioSection } from "../types/portfolio";

function now() {
  return new Date();
}

function section(
  id: string,
  type: PortfolioSection["type"],
  order: number,
  seed?: Partial<PortfolioSection>,
): PortfolioSection {
  return {
    id,
    type,
    title: "",
    subtitle: "",
    content: "",
    visible: true,
    order,
    align: "left",
    size: "md",
    imageUrl: "",
    icon: "",
    cards: [],
    items: [],
    links: [],
    ...seed,
  };
}

export function getDefaultPortfolioContent(): PortfolioContent {
  return {
    theme: "dark",
    updatedAt: now(),
    sections: [
      section("hero", "hero", 0, {
        title: "Mirza Aslam Baig",
        subtitle: "AI Educator | System Builder",
        content:
          "I build practical, real-world learning systems for AI, data, and full-stack development.",
        align: "center",
        size: "lg",
      }),
      section("about", "about", 1, {
        title: "About",
        content:
          "I help students and teams learn by building production-style projects with clear outcomes.",
      }),
      section("projects", "projects", 2, {
        title: "Projects",
        subtitle: "Featured work",
        cards: [
          {
            id: "project-1",
            title: "AI Resume Parser",
            description:
              "Automated resume parsing and skill extraction workflow with AI scoring.",
            url: "https://example.com",
            imageUrl: "",
            logo: "🤖",
          },
          {
            id: "project-2",
            title: "Learning Automation Suite",
            description:
              "Course operations automation with workflow orchestration and learner analytics.",
            url: "https://example.com",
            imageUrl: "",
            logo: "⚙️",
          },
        ],
      }),
      section("skills", "skills", 3, {
        title: "Skills",
        items: [
          "React + TypeScript",
          "Node.js + Express",
          "Supabase",
          "Automation Workflows",
          "AI-Assisted Learning Systems",
        ],
      }),
      section("contact", "contact", 4, {
        title: "Contact",
        content: "Let us collaborate on scalable education and automation systems.",
        links: [
          { label: "Email", url: "mailto:mbaslambaig9@gmail.com" },
          { label: "LinkedIn", url: "https://www.linkedin.com" },
          { label: "GitHub", url: "https://github.com/Aslam103" },
        ],
      }),
    ],
  };
}
