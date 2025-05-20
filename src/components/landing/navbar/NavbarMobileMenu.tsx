
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, MessageSquare, ChevronDown, ArrowRight, Book, Github, HelpCircle, Lightbulb, Settings } from "lucide-react";
import { NavItem, TopNavItem } from "./types";

interface NavbarMobileMenuProps {
  navItems: NavItem[];
  topNavItems: TopNavItem[];
  onViewDemo?: () => void;
  onToggleAssistant?: () => void;
}

export function NavbarMobileMenu({
  navItems,
  topNavItems,
  onViewDemo,
  onToggleAssistant
}: NavbarMobileMenuProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ArrowRight':
        return <ArrowRight size={18} />;
      case 'Book':
        return <Book size={18} />;
      case 'Lightbulb':
        return <Lightbulb size={18} />;
      case 'HelpCircle':
        return <HelpCircle size={18} />;
      case 'Settings':
        return <Github size={18} />; // Using Github icon for the Settings slot
      default:
        return null;
    }
  };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="py-4">
          <div className="flex flex-col gap-4 pt-8">
            {/* Top navigation items in mobile menu */}
            <h3 className="font-semibold mb-2">Main Navigation</h3>
            {topNavItems.map((item) => (
              <div key={item.label}>
                {item.action ? (
                  <Button 
                    onClick={onToggleAssistant}
                    variant="ghost"
                    className="text-foreground/80 hover:text-primary transition-colors py-2 flex items-center justify-between w-full"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && getIcon(item.icon)}
                      {item.label}
                    </span>
                  </Button>
                ) : (
                  item.href.startsWith('http') ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors py-2 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && getIcon(item.icon)}
                        {item.label}
                      </span>
                      {item.children && <ChevronDown size={16} />}
                    </a>
                  ) : (
                    <Link 
                      to={item.href}
                      className="text-foreground/80 hover:text-primary transition-colors py-2 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && getIcon(item.icon)}
                        {item.label}
                      </span>
                      {item.children && <ChevronDown size={16} />}
                    </Link>
                  )
                )}
                
                {item.children && (
                  <div className="ml-4 border-l border-border pl-4 mt-1 space-y-2">
                    {item.children.map((child) => (
                      <Link 
                        key={child.label}
                        to={child.href}
                        className="text-foreground/70 hover:text-primary transition-colors py-1 block"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="border-t my-4" />
            
            {/* Original navigation items */}
            {navItems.map((item) => (
              <Link 
                key={item.href}
                to={item.href}
                className="text-foreground/80 hover:text-primary transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            
            <div className="border-t my-4" />
            
            {onToggleAssistant && (
              <Button 
                variant="outline"
                onClick={onToggleAssistant}
                className="w-full justify-start gap-2"
              >
                <MessageSquare size={18} />
                <span>Demo</span>
              </Button>
            )}
            
            {onViewDemo && (
              <Button 
                variant="outline"
                onClick={onViewDemo}
                className="w-full justify-start"
              >
                Demo
              </Button>
            )}
            
            <Link to="/login" className="w-full">
              <Button className="w-full justify-start gap-2">
                <LogIn size={18} />
                <span>Login</span>
              </Button>
            </Link>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              asChild
            >
              <a 
                href="https://github.com/open-source/business-buddy" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
