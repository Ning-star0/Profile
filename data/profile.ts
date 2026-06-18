import type { LucideIcon } from "lucide-react";
import { Camera, Code2, Cpu, Database, Lightbulb, Mail, Network, UserRound } from "lucide-react";

export const profile = {
  siteName: "Ning Personal Portfolio",
  name: "Ning",
  role: "CS Student",
  tagline: "A bright portfolio where ideas grow into systems.",
  hero: {
    title: "Ning",
    subtitle: "Computer Science Student · AI Infra Learner",
    body: "Building the future,\none line of code, one system at a time.",
    primaryCta: {
      label: "View Projects",
      href: "/projects",
    },
    secondaryCta: {
      label: "About Me",
      href: "/about",
    },
  },
  about:
    "I am a computer science student focused on systems, software development, and AI infrastructure. I care about building practical projects, understanding how computers work, and creating meaningful digital experiences.",
  vision: "Build strong foundations.\nCreate real projects.\nMove toward AI infrastructure.",
  life: "Beyond code - moments, ideas, and quiet inspiration.",
  contact: "Let's connect and build together.",
};

export const focusCard = {
  label: "CURRENT FOCUS",
  title: "AI Infrastructure & Systems",
  items: [
    { icon: Network, label: "Distributed Systems" },
    { icon: Cpu, label: "LLM Inference" },
    { icon: Database, label: "Performance Engineering" },
  ],
};

export const recentProjectCard = {
  label: "RECENT PROJECT",
  title: "NebulaDB",
  description: "A cloud-native vector database with high performance",
  tags: ["Go", "Rust", "Docker", "K8s"],
};

export type DockItem = {
  body: string;
  href: string;
  icon: LucideIcon;
  title: string;
};

export const dockItems: DockItem[] = [
  {
    href: "/about",
    icon: UserRound,
    title: "About Me",
    body: "My background, interests, and values.",
  },
  {
    href: "/projects",
    icon: Code2,
    title: "Projects",
    body: "Things I've built and what I'm building.",
  },
  {
    href: "/vision",
    icon: Lightbulb,
    title: "Vision",
    body: "Ideas, beliefs, and the future I want to create.",
  },
  {
    href: "/life",
    icon: Camera,
    title: "Life",
    body: "Beyond code - moments that inspire me.",
  },
  {
    href: "/contact",
    icon: Mail,
    title: "Contact",
    body: "Connect and build together.",
  },
];
