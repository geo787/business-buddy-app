
import { NavItem, TopNavItem } from "./types";

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const topNavItems: TopNavItem[] = [
  { label: "Start Here", href: "/start" },
  { 
    label: "Roadmaps", 
    href: "#",
    children: [
      { label: "Frontend", href: "/roadmaps/frontend" },
      { label: "Backend", href: "/roadmaps/backend" },
      { label: "DevOps", href: "/roadmaps/devops" },
      { label: "Full Stack", href: "/roadmaps/fullstack" },
    ]
  },
  { 
    label: "AI Tutor", 
    href: "/ai-tutor" 
  },
  { 
    label: "Teams", 
    href: "/teams" 
  },
];
