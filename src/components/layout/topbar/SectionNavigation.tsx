
import { Link } from "react-router-dom";
import { Home, Users, BarChart3, Truck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

interface SectionNavigationProps {
  items: NavItem[];
}

export function SectionNavigation({ items }: SectionNavigationProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link to={item.path}>
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "flex items-center gap-1.5",
                location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
              )}>
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
