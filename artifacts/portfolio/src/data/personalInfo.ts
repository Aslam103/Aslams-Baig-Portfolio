export const personalInfo = {
  name: "Mirza Aslam Baig",
  shortName: "M. Aslam Baig",
  monogram: "MAB",
  location: "Hyderabad, India",
  company: { name: "TWG International", parent: "Technoworld Group", url: "https://technoworldgroup.com", area: "Abids, Hyderabad" },
  roles: ["AI Educator", "System Builder", "Course Designer"],
  tagline: "Learn → Apply → Transform",
  yearsExperience: 13,
  // PRIVATE — only consumed by Contact reveal dialog
  private: {
    phonePrimary: "+91 7387292087",
    phoneSecondary: "+91 9423292087",
    email: "mbaslambaig9@gmail.com",
    whatsapp: "919423292087",
  },
} as const;
