
import { Link } from "react-router-dom";
import { NavItem } from "./types";

interface NavbarMainNavProps {
  items: NavItem[];
}

export function NavbarMainNav({ items }: NavbarMainNavProps) {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {items.map((item) => (
        <Link 
          key={item.href}
          to={item.href}
          className="text-foreground/80 hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
