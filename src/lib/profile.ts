export const profile = {
  name: "Abdisalan Ali",
  roles: [
    "Corporate Head of Digital Transformation & ICT at Asal Media Corporation",
    "IT Project Manager",
    "Former CTO in media systems",
  ],
  experience: [
    {
      org: "Asal Media Corporation",
      location: "Mogadishu, Somalia",
      type: "Full-time",
      roles: [
        {
          title: "Corporate Head of Digital Transformation & ICT",
          period: "Dec 2025 – Present",
          description: "Owns enterprise digital and ICT strategy, governance, and delivery.",
        },
        {
          title: "Project & Change Manager",
          period: "Mar 2024 – Dec 2025",
          description: "Led cross-functional change and delivered ERP and ICT upgrades.",
        },
      ],
    },
    {
      org: "Nasiye",
      location: "Mogadishu, Somalia",
      roles: [
        {
          title: "Executive Committee Member for Digital & Technology",
          period: "Dec 2024 – Present",
          type: "Part-time",
          description: "Board-level technology advisory and digital strategy.",
        },
        {
          title: "Chief Technology Officer",
          period: "Sep 2022 – Dec 2024",
          type: "Full-time",
          description: "Led all technology operations and digital infrastructure.",
        },
      ],
    },
    {
      org: "Salaam Group",
      location: "Djibouti",
      roles: [
        {
          title: "Network & Enterprise Security Architect",
          period: "Apr 2018 – Jan 2024",
          type: "Full-time",
          description: "Led architecture for Zero Trust, network segmentation, IAM/MFA, encryption, SIEM, and EDR.",
        },
      ],
    },
    {
      org: "Hormuud Telecom Somalia Inc.",
      location: "Mogadishu, Somalia",
      roles: [
        {
          title: "Network Engineer",
          period: "Apr 2016 – Apr 2018",
          type: "Full-time",
          description: "Implemented and maintained network infrastructure and security controls.",
        },
        {
          title: "Network Support Engineer",
          period: "Nov 2015 – Apr 2016",
          type: "Full-time",
          description: "Provided Tier-2 network support and troubleshooting.",
        },
        {
          title: "System Engineering Intern",
          period: "Jul 2015 – Oct 2015",
          type: "Apprenticeship",
          description: "Assisted with server, network, and systems administration.",
        },
        {
          title: "IT Trainee / Junior",
          period: "Jul 2014 – Jul 2015",
          type: "Internship",
          description: "Entry-level IT support and learning rotation.",
        },
      ],
    },
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
    {
      category: "AI Engineering",
      items: [
        "AI Customer Support Chatbot",
        "AI Business Automation Platform",
        "AI Portfolio Assistant",
        "Social Media AI Monitoring System",
        "AI Content Generation Platform",
        "Intelligent Document Processing System",
        "AI Task Management System",
        "HRM System with AI Features",
      ],
    },
    {
      category: "Network & Cybersecurity Engineering",
      items: [
        "Enterprise Network Infrastructure Deployment",
        "Network Security Architecture Implementation",
        "Firewall & VPN Security Solutions",
        "Cybersecurity Risk Assessment",
        "PCI DSS Compliance Program",
        "Cloud Security Implementation",
        "Identity & Access Management (IAM)",
        "Disaster Recovery & Business Continuity Planning",
      ],
    },
  ],
  interests: [
    "Fintech innovation",
    "AI systems",
    "Automation",
    "Sports & technology",
  ],
  contact: {
    title: "CTO",
    company: "Asal Media Corporation",
    location: "Mogadishu, Somalia",
    website: "asalmediacorp.com",
    email: "abdisalan@asalmediacorp.com",
    linkedin: "https://www.linkedin.com/in/abdialiarale/",
    instagram: "https://www.instagram.com/abdiarle",
  },
  education: [
    {
      institution: "Hayaan Secondary School",
      degree: "High School Certificate, Science",
      years: "2009 – 2014",
      grade: "",
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
${profile.experience.map((e) =>
  e.roles.map((r) => `- ${e.org} — ${r.title} (${r.period}): ${r.description}`).join("\n")
).join("\n")}

Education:
${profile.education.map((e) => `- ${e.institution}: ${e.degree} (${e.years})${e.grade ? `, ${e.grade}` : ""}`).join("\n")}

Certifications:
${profile.certifications.map((c) => `- ${c.name} — ${c.issuer} (${c.issued})`).join("\n")}

Skills:
${profile.skills.map((s) => `- ${s}`).join("\n")}

Projects:
${profile.projects.map((cat) => `${cat.category}:\n${cat.items.map((p) => `  - ${p}`).join("\n")}`).join("\n\n")}

Interests:
${profile.interests.map((i) => `- ${i}`).join("\n")}`;
}
