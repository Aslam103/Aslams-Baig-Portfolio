export interface SystemInnovation {
  title: string;
  description: string;
  iconHint: string;
  subBullets?: string[];
}

export const systems: SystemInnovation[] = [
  {
    title: "Chatbot Architecture",
    description: "n8n webhook → router → KB → handoff",
    iconHint: "message-square"
  },
  {
    title: "n8n Workflows",
    description: "course ops, student onboarding, content publishing",
    iconHint: "workflow"
  },
  {
    title: "Docker Setup",
    description: "self-hosted services for repeatable training",
    iconHint: "server"
  },
  {
    title: "Automation Logic",
    description: "operations + accounting workflows from Tally/FOCUS 9",
    iconHint: "settings"
  },
  {
    title: "Learning Systems",
    description: "modular curriculum engine + outcome tracking",
    iconHint: "graduation-cap"
  }
];