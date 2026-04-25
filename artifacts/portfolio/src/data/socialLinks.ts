import type { LucideIcon } from "lucide-react";
export type SocialPlatform = "github" | "youtube" | "instagram" | "facebook";
export interface SocialLink {
  platform: SocialPlatform;
  label: string;          // display name e.g. "Apex Aslam"
  handle?: string;        // @apex_aslam
  url: string;
  description: string;    // 1 short line
  cta: string;            // "Visit", "Subscribe", "Follow"
}
export const socialLinks: SocialLink[] = [
  { platform: "github", label: "Aslam103", handle: "@Aslam103", url: "https://github.com/Aslam103", description: "Code, automation experiments, and learning artifacts.", cta: "Visit Profile" },
  { platform: "youtube", label: "Apex Aslam", handle: "@apex_aslam", url: "https://youtube.com/@apex_aslam", description: "Long-form teaching, course walkthroughs, and AI tooling demos.", cta: "Subscribe" },
  { platform: "youtube", label: "Pages of Impact", handle: "@pagesofimpact", url: "https://youtube.com/@pagesofimpact", description: "Mindset, growth, and learning systems content.", cta: "Subscribe" },
  { platform: "instagram", label: "Pages of Impact", handle: "@pages_of_impact", url: "https://www.instagram.com/pages_of_impact", description: "Short-form learning and motivation.", cta: "Follow" },
  { platform: "facebook", label: "Facebook · Channel 1", url: "https://www.facebook.com/share/18gqSwo21u/", description: "Community posts and updates.", cta: "Visit" },
  { platform: "facebook", label: "Facebook · Channel 2", url: "https://www.facebook.com/share/1BvmkzrijK/", description: "Community posts and updates.", cta: "Visit" },
  { platform: "facebook", label: "Facebook · Channel 3", url: "https://www.facebook.com/share/1H7jpfgson/", description: "Community posts and updates.", cta: "Visit" },
];