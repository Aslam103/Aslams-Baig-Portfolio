export interface Post {
  id: string
  title: string
  summary: string
  image: string // relative to public/ (e.g. /images/your-file.jpg)
  link?: string
}

export const posts: Post[] = [
  {
    id: "twg-45days",
    title: "From Zero to Digital Professional — 45 Days",
    summary:
      "A practical, hands-on bootcamp covering computer basics, office productivity, internet & cyber safety, AI fundamentals, data analysis, and a capstone project. Designed for beginners and career changers — includes projects, certifications, and placement assistance.",
    image: "/images/twg-45days.jpg",
    link: undefined,
  },
  {
    id: "twg-future-ready",
    title: "Future-Ready Skills — 5 Industry-Focused Courses",
    summary:
      "Five targeted programs: ICFAI (computer + AI foundations), FAME (finance & accounting), DBAI (digital branding), DAAI (data analytics), and SPARK (software programming). Each course includes modules, practical projects and job-ready outcomes.",
    image: "/images/twg-future-ready.jpg",
    link: undefined,
  },
]
