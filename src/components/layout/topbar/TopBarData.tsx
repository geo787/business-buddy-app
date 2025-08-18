
import { Home, Users, BarChart3, Truck, CreditCard, Brain, FolderOpen } from "lucide-react";

// Navigation items data
export const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: Home },
  { title: "Customers", path: "/customers", icon: Users },
  { title: "Analytics", path: "/analytics", icon: BarChart3 },
  { title: "Logistics", path: "/logistics", icon: Truck },
  { title: "Finance", path: "/finance", icon: CreditCard },
  { title: "Business Buddy", path: "/business-buddy", icon: Brain },
  { title: "Proiectele Mele", path: "/my-projects", icon: FolderOpen },
];

export const topNavItems = [
  { title: "Start Here", path: "/" },
  { title: "Resources", path: "/resources" },
  { title: "AI Assistant", path: "#", action: undefined },
  { title: "Support", path: "/support" },
];
