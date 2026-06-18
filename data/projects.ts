export type Project = {
  description: string;
  href: string;
  slug: string;
  tags: string[];
  title: string;
};

export const projects: Project[] = [
  {
    title: "AI Stock Insight Platform",
    slug: "ai-stock-insight-platform",
    description:
      "An AI-powered stock insight platform with watchlists, news analysis, decision history, and portfolio management.",
    href: "/projects#ai-stock-insight-platform",
    tags: ["AI", "Systems", "Data"],
  },
  {
    title: "K12 AI Learning Assistant",
    slug: "k12-ai-learning-assistant",
    description:
      "An AI learning system with OCR recognition, AI explanation, wrong-question book, and learning reports.",
    href: "/projects#k12-ai-learning-assistant",
    tags: ["Education", "AI", "Product"],
  },
  {
    title: "Ning Personal Portfolio",
    slug: "ning-personal-portfolio",
    description:
      "A bright interactive portfolio website combining natural visual design, motion, and personal project presentation.",
    href: "/projects#ning-personal-portfolio",
    tags: ["Next.js", "Design", "Motion"],
  },
];
