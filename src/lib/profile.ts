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
} as const;

export function profileAsText(): string {
  return `Name: ${profile.name}

Roles:
${profile.roles.map((r) => `- ${r}`).join("\n")}

Experience:
${profile.experience.map((e) => `- ${e.org} — ${e.title}`).join("\n")}

Skills:
${profile.skills.map((s) => `- ${s}`).join("\n")}

Projects:
${profile.projects.map((p) => `- ${p}`).join("\n")}

Interests:
${profile.interests.map((i) => `- ${i}`).join("\n")}`;
}
