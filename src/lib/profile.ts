export const profile = {
  name: "Abdisalan Ali",
  roles: [
    "Corporate Head of Digital Transformation & ICT at Asal Media Corporation",
    "IT Project Manager",
    "Former CTO in media systems",
  ],
  experience: [
    { org: "Salaam Group", title: "Fintech Operations Lead" },
    { org: "Nasiye TV", title: "IT Project Manager" },
    { org: "JiilMedia", title: "Project Manager" },
    { org: "Asal Corporate", title: "Technical / CTO-level work" },
  ],
  skills: [
    "Fintech systems & operations",
    "Digital transformation strategy",
    "IT project management (Agile, ERP systems)",
    "ICT infrastructure & networking",
    "AI system design (LLM-based tools)",
    "Digital Transformation & ICT Coordination",
    "Business Process Improvement",
    "ERP / System Upgrade Coordination",
    "KPI Tracking & Reporting",
    "Basic Web Systems & API Integration",
    "SQL & Data Handling Basics",
    "AI Tools & Workflow Automation",
    "Team & Stakeholder Coordination",
  ],
  projects: [
    "HRM system development",
    "Payroll automation system",
    "KPI tracking system / dashboards",
    "Digital transformation systems for media",
    "ERP implementation (Odoo)",
  ],
  interests: [
    "Fintech innovation",
    "AI systems",
    "Automation",
    "Sports & technology",
  ],
  education: [
    {
      institution: "Hayaan Secondary School",
      degree: "High School Certificate, Science",
      years: "2009 – 2014",
    },
    {
      institution: "University of Somalia (UNISO)",
      degree: "Bachelor of Science in Computer Science",
      years: "2015 – 2019",
      grade: "4.00 GPA",
    },
    {
      institution: "Lincoln University College",
      degree: "Master of Business Administration (MBA) in Project Management",
      years: "2023 – 2024",
      grade: "3.7 GPA",
    },
  ],
  certifications: [
    { name: "Google Cybersecurity Professional Certificate", issuer: "Google", issued: "Nov 2023" },
    { name: "Introduction to Data Science", issuer: "365 Data Science", issued: "Oct 2024", credentialId: "CC-AD357DEAEB" },
    { name: "Learning AI Through Visualization", issuer: "Columbia+", issued: "May 2025", credentialId: "144516191" },
    { name: "Microsoft AI & ML Engineering", issuer: "Microsoft AI", issued: "Aug 2025", credentialId: "YSL5FKYDGBKY" },
    { name: "Introduction to Artificial Intelligence (AI)", issuer: "Alison", issued: "Aug 2025", credentialId: "7285-51979400" },
    { name: "Project Management Principles and Practices Specialization", issuer: "UC Irvine", issued: "Jun 2023", credentialId: "L3F67CPHAQUT" },
    { name: "Google Data Analytics Specialization", issuer: "Google", issued: "Oct 2022", credentialId: "PZD7WLXJAWLP" },
    { name: "Fortinet Network Security Specialization", issuer: "Fortinet", issued: "Dec 2024", credentialId: "Q3SPZ505EHP8" },
    { name: "Talking to AI: Prompt Engineering for Project Managers", issuer: "Project Management Institute", issued: "Oct 2025" },
    { name: "ISO/IEC:2022 Information Security Associate", issuer: "SkillFront", issued: "Feb 2025" },
    { name: "Cyber Incident Response Specialization", issuer: "Infosec Train", issued: "Dec 2024", credentialId: "KIE9EGL9KW65" },
    { name: "DevOps on AWS Specialization", issuer: "Amazon Web Services (AWS)", issued: "Dec 2023", credentialId: "HQCUBA87K75D" },
  ],
} as const;

export function profileAsText(): string {
  return `Name: ${profile.name}

Roles:
${profile.roles.map((r) => `- ${r}`).join("\n")}

Experience:
${profile.experience.map((e) => `- ${e.org} — ${e.title}`).join("\n")}

Education:
${profile.education.map((e) => `- ${e.institution}: ${e.degree} (${e.years})${e.grade ? `, ${e.grade}` : ""}`).join("\n")}

Certifications:
${profile.certifications.map((c) => `- ${c.name} — ${c.issuer} (${c.issued})`).join("\n")}

Skills:
${profile.skills.map((s) => `- ${s}`).join("\n")}

Projects:
${profile.projects.map((p) => `- ${p}`).join("\n")}

Interests:
${profile.interests.map((i) => `- ${i}`).join("\n")}`;
}
