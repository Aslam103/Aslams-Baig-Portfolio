export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  course: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Rahul Sharma",
    role: "Data Analytics Student",
    company: "Tech Corp",
    content: "Aslam's data analytics course transformed my career. From zero knowledge to creating production dashboards in 6 weeks. The practical approach and real-world projects made all the difference.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    course: "Data Analytics Program"
  },
  {
    id: "testimonial-2",
    name: "Priya Patel",
    role: "Full Stack Developer",
    company: "StartupXYZ",
    content: "The MERN stack course was exceptional. Aslam's teaching methodology - learn by building - helped me land my first developer job. The code reviews and mentorship were invaluable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    course: "Full Stack Java/MERN"
  },
  {
    id: "testimonial-3",
    name: "Amit Kumar",
    role: "AI Implementation Lead",
    company: "InnovateLabs",
    content: "Aslam's AI foundations course gave me the perfect blend of theory and practical implementation. Now leading AI initiatives at my company using the n8n workflows he taught.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    course: "AI Foundations"
  },
  {
    id: "testimonial-4",
    name: "Sneha Reddy",
    role: "Financial Analyst",
    company: "FinanceCorp",
    content: "The FAME course completely changed how I approach financial analysis. Excel automation and Tally integration skills I learned are now essential in my daily work.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    course: "FAME (Financial Analysis)"
  }
];
