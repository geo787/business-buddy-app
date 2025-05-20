
import { NavItem, TopNavItem } from "./types";
import { Book, HelpCircle, Lightbulb, Settings } from "lucide-react";

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const topNavItems: TopNavItem[] = [
  { 
    label: "Start Here", 
    href: "/start",
    icon: "ArrowRight"
  },
  { 
    label: "Resources", 
    href: "/resources",
    icon: "Book",
    children: [
      { label: "Frontend", href: "/roadmaps/frontend" },
      { label: "Backend", href: "/roadmaps/backend" },
      { label: "DevOps", href: "/roadmaps/devops" },
      { label: "Full Stack", href: "/roadmaps/fullstack" },
    ]
  },
  { 
    label: "AI Assistant", 
    href: "#",
    icon: "Lightbulb",
    action: true
  },
  { 
    label: "Support", 
    href: "/support",
    icon: "HelpCircle" 
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "Settings"
  }
];
