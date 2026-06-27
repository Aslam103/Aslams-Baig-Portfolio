import { Award, Shield, Star, Calendar, ExternalLink } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "2024",
    credentialId: "AZ-104-2024",
    status: "active",
    badge: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&h=100&fit=crop",
    skills: ["Azure AI", "Machine Learning", "Cloud Computing"]
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAA-2024",
    status: "active",
    badge: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    skills: ["AWS", "Cloud Architecture", "DevOps"]
  },
  {
    id: 3,
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2023",
    credentialId: "GOOGLE-DA-2023",
    status: "active",
    badge: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    skills: ["Data Analysis", "SQL", "Tableau", "R Programming"]
  },
  {
    id: 4,
    title: "MongoDB Certified Developer",
    issuer: "MongoDB Inc.",
    date: "2023",
    credentialId: "MDB-CERT-2023",
    status: "active",
    badge: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop",
    skills: ["MongoDB", "NoSQL", "Database Design"]
  },
  {
    id: 5,
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2023",
    credentialId: "DCA-2023",
    status: "active",
    badge: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=100&h=100&fit=crop",
    skills: ["Docker", "Containerization", "DevOps"]
  },
  {
    id: 6,
    title: "n8n Certified Automation Expert",
    issuer: "n8n GmbH",
    date: "2024",
    credentialId: "N8N-CERT-2024",
    status: "active",
    badge: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop",
    skills: ["n8n", "Workflow Automation", "API Integration"]
  }
];

const achievements = [
  {
    id: 1,
    title: "500+ Students Trained",
    description: "Successfully mentored over 500 students across various technical domains",
    icon: "users",
    value: "500+",
    category: "teaching"
  },
  {
    id: 2,
    title: "95% Course Completion Rate",
    description: "Students consistently complete courses with high engagement",
    icon: "target",
    value: "95%",
    category: "success"
  },
  {
    id: 3,
    title: "50+ Corporate Clients",
    description: "Trained professionals from leading companies across industries",
    icon: "building",
    value: "50+",
    category: "business"
  },
  {
    id: 4,
    title: "12 Active Automation Workflows",
    description: "Built and maintain complex n8n automation systems",
    icon: "zap",
    value: "12",
    category: "technical"
  },
  {
    id: 5,
    title: "4.9/5 Average Rating",
    description: "Consistently high student satisfaction and feedback",
    icon: "star",
    value: "4.9/5",
    category: "recognition"
  },
  {
    id: 6,
    title: "6 Course Specializations",
    description: "Comprehensive curriculum covering AI, Data, Full Stack, and more",
    icon: "book",
    value: "6",
    category: "education"
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and key achievements that validate expertise and impact
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="glass-panel rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={cert.badge}
                      alt={`${cert.issuer} badge`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{cert.issuer}</h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        cert.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                      {cert.status}
                    </div>
                  </div>
                </div>

                <h5 className="font-semibold mb-2 leading-tight">{cert.title}</h5>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{cert.date}</span>
                  <span className="text-cyan-400">•</span>
                  <span className="font-mono text-xs">{cert.credentialId}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded text-xs border border-violet-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="glass-panel rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                  {achievement.icon === 'users' && <Award className="w-8 h-8 text-cyan-400" />}
                  {achievement.icon === 'target' && <Award className="w-8 h-8 text-violet-400" />}
                  {achievement.icon === 'building' && <Shield className="w-8 h-8 text-green-400" />}
                  {achievement.icon === 'zap' && <Star className="w-8 h-8 text-yellow-400" />}
                  {achievement.icon === 'star' && <Star className="w-8 h-8 text-orange-400" />}
                  {achievement.icon === 'book' && <Shield className="w-8 h-8 text-blue-400" />}
                </div>

                <div className="text-3xl font-bold text-cyan-400 mb-2">{achievement.value}</div>
                <h4 className="font-semibold mb-2">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>

                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 ${
                  achievement.category === 'teaching' && 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                } ${
                  achievement.category === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30'
                } ${
                  achievement.category === 'business' && 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                } ${
                  achievement.category === 'technical' && 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                } ${
                  achievement.category === 'recognition' && 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                } ${
                  achievement.category === 'education' && 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {achievement.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Continuous Learning Journey</h3>
            <p className="text-muted-foreground mb-6">
              These certifications represent ongoing commitment to staying current with the latest technologies
              and teaching methodologies. New certifications are regularly added as technology evolves.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                🔄 Continuous Learning
              </span>
              <span className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm border border-violet-500/30">
                📈 Skill Development
              </span>
              <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                🏆 Industry Recognition
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}