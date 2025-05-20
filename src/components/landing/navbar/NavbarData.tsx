
import { NavItem, TopNavItem } from "./types";
import { ArrowRight, Book, Code, Github, HelpCircle, Lightbulb, Settings } from "lucide-react";

export const navItems: NavItem[] = [
  { label: "Documentation", href: "/docs" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "Contribute", href: "#contribute" }
];

export const topNavItems: TopNavItem[] = [
  { 
    label: "Get Started", 
    href: "/start",
    icon: "ArrowRight"
  },
  { 
    label: "Documentation", 
    href: "/docs",
    icon: "Book",
    children: [
      { label: "Installation", href: "/docs/installation" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Examples", href: "/docs/examples" },
      { label: "Contributing", href: "/docs/contributing" },
    ]
  },
  { 
    label: "Demo", 
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
    label: "GitHub",
    href: "https://github.com/open-source/business-buddy",
    icon: "Settings"
  }
];
