
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
import { Button } from "@/components/ui/button";

interface TopNavigationItem {
  title: string;
  path: string;
  action?: () => void;
}

interface TopNavigationProps {
  items: TopNavigationItem[];
}

export function TopNavigation({ items }: TopNavigationProps) {
  return (
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.action ? (
                <Button 
                  onClick={item.action} 
                  variant="ghost"
                  className={navigationMenuTriggerStyle()}
                >
                  {item.title}
                </Button>
              ) : (
                <Link to={item.path}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
