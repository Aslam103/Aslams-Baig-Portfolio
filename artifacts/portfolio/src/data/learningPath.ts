export interface LearningStage {
  stage: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  program: string;
  description: string;
}

export const learningPath: LearningStage[] = [
  {
    stage: "Beginner",
    program: "ICFAI",
    description: "Computer foundations + AI literacy"
  },
  {
    stage: "Intermediate",
    program: "FAME",
    description: "Finance + analytics fundamentals"
  },
  {
    stage: "Advanced",
    program: "Data Analytics",
    description: "Dashboards + business storytelling"
  },
  {
    stage: "Expert",
    program: "Full Stack / AI Systems",
    description: "Build, deploy, automate"
  }
];