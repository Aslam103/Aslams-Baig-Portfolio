export type SectionType =
  | "hero"
  | "about"
  | "projects"
  | "skills"
  | "contact"
  | "custom";

export type AlignType = "left" | "center" | "right";
export type SizeType = "sm" | "md" | "lg";
export type ThemeType = "light" | "dark";

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  logo: string;
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface PortfolioSection {
  id: string;
  type: SectionType;
  title: string;
  subtitle: string;
  content: string;
  visible: boolean;
  order: number;
  align: AlignType;
  size: SizeType;
  imageUrl: string;
  icon: string;
  cards: ProjectCard[];
  items: string[];
  links: ContactLink[];
}

export interface PortfolioContent {
  theme: ThemeType;
  sections: PortfolioSection[];
  updatedAt?: string;
}

export interface AnalyticsSummary {
  views: number;
  projectClicks: number;
}

export interface PublicContentResponse {
  content: PortfolioContent;
  analytics: AnalyticsSummary;
}

export interface AdminContentResponse {
  draft: PortfolioContent;
  published: PortfolioContent;
  analytics: AnalyticsSummary;
}
