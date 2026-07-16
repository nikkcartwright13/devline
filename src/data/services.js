export const SERVICE_CATEGORIES = [
  {
    key: "programmers",
    icon: "Code2",
    services: [
      { slug: "web", icon: "Globe" },
      { slug: "mobile", icon: "Smartphone" },
      { slug: "devops", icon: "Workflow" },
      { slug: "infra", icon: "Cloud" },
      { slug: "analytics", icon: "TrendingUp" },
      { slug: "support", icon: "LifeBuoy" },
    ],
  },
  {
    key: "jsm",
    icon: "Ticket",
    services: [
      { slug: "clickup", icon: "ListChecks" },
      { slug: "jsmPortal", icon: "Ticket" },
      { slug: "jira", icon: "Kanban" },
      { slug: "slack", icon: "MessageSquare" },
    ],
  },
  {
    key: "designers",
    icon: "Palette",
    services: [
      { slug: "figma", icon: "Frame" },
      { slug: "photoshop", icon: "Image" },
      { slug: "illustrator", icon: "PenTool" },
      { slug: "premiere", icon: "Clapperboard" },
    ],
  },
  {
    key: "marketers",
    icon: "Megaphone",
    services: [
      { slug: "metaMarketing", icon: "Megaphone" },
      { slug: "seo", icon: "SearchCheck" },
    ],
  },
];

export const SERVICES = SERVICE_CATEGORIES.flatMap((c) => c.services);
