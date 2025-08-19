
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
    label: "Dashboard", 
    href: "/dashboard",
    icon: "ArrowRight"
  },
  { 
    label: "Tools", 
    href: "/business-buddy",
    icon: "Book",
    children: [
      { label: "Business Buddy", href: "/business-buddy" },
      { label: "My Projects", href: "/my-projects" },
      { label: "Analytics", href: "/analytics" },
      { label: "Automation", href: "/automation" },
    ]
  },
  { 
    label: "AI Assistant", 
    href: "#",
    icon: "Lightbulb",
    action: true
  },
  { 
    label: "Settings", 
    href: "/settings",
    icon: "HelpCircle" 
  },
  {
    label: "GitHub",
    href: "https://github.com/open-source/business-buddy",
    icon: "Settings"
  }
];
