
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { TopNavItem } from "./types";
import { ArrowRight, Book, HelpCircle, Lightbulb, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarDesktopNavProps {
  items: TopNavItem[];
  onToggleAssistant?: () => void;
}

export function NavbarDesktopNav({ items, onToggleAssistant }: NavbarDesktopNavProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ArrowRight':
        return <ArrowRight size={16} />;
      case 'Book':
        return <Book size={16} />;
      case 'Lightbulb':
        return <Lightbulb size={16} />;
      case 'HelpCircle':
        return <HelpCircle size={16} />;
      case 'Settings':
        return <Settings size={16} />;
      default:
        return null;
    }
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {items.map((item) => (
          item.action ? (
            <NavigationMenuItem key={item.label}>
              <Button 
                onClick={onToggleAssistant} 
                variant="ghost" 
                className={navigationMenuTriggerStyle()}
              >
                {item.icon && getIcon(item.icon)}
                <span className="ml-1">{item.label}</span>
              </Button>
            </NavigationMenuItem>
          ) : item.children ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger className="text-sm flex items-center gap-1">
                {item.icon && getIcon(item.icon)}
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={child.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{child.label}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              <Link to={item.href} className={cn(navigationMenuTriggerStyle(), "text-sm flex items-center gap-1")}>
                {item.icon && getIcon(item.icon)}
                {item.label}
              </Link>
            </NavigationMenuItem>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
