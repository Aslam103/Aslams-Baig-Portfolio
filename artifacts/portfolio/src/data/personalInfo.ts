export const personalInfo = {
  name: "Mirza Aslam Baig",
  shortName: "M. Aslam Baig",
  monogram: "MAB",
  location: "Old City, Hyderabad, India",
  company: { name: "TWG International", parent: "Technoworld Group", url: "https://technoworldgroup.com", area: "Abids, Hyderabad" },
  roles: ["AI Educator", "System Builder", "Course Designer"],
  tagline: "Learn → Apply → Transform",
  yearsExperience: 13,
  // PRIVATE — only consumed by Contact reveal dialog
  private: {
    phone: "+91 7387292087",
    phoneDigits: "917387292087",
    email: "mbaslambaig9@gmail.com",
    whatsapp: "917387292087",
  },
} as const;
