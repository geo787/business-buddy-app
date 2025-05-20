
import { NavItem, TopNavItem } from "./types";
import { ArrowRight, Book, Github, HelpCircle, Lightbulb, Settings } from "lucide-react";

export const navItems: NavItem[] = [
  { label: "Resources", href: "/resources" },
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
    label: "Resources", 
    href: "/resources",
    icon: "Book",
    children: [
      { label: "Installation", href: "/resources/installation" },
      { label: "API Reference", href: "/resources/api" },
      { label: "Examples", href: "/resources/examples" },
      { label: "Contributing", href: "/resources/contributing" },
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
