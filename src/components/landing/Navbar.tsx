
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, MessageSquare, ChevronDown } from "lucide-react";
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

interface NavbarProps {
  onViewDemo?: () => void;
  onToggleAssistant?: () => void;
}

const Navbar = ({ onViewDemo, onToggleAssistant }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];
  
  const topNavItems = [
    { label: "Start Here", href: "/start" },
    { 
      label: "Roadmaps", 
      href: "#",
      children: [
        { label: "Frontend", href: "/roadmaps/frontend" },
        { label: "Backend", href: "/roadmaps/backend" },
        { label: "DevOps", href: "/roadmaps/devops" },
        { label: "Full Stack", href: "/roadmaps/fullstack" },
      ]
    },
    { 
      label: "AI Tutor", 
      href: "/ai-tutor" 
    },
    { 
      label: "Teams", 
      href: "/teams" 
    },
  ];

  return (
    <div className="w-full">
      {/* Top navigation - inspired by roadmap.sh */}
      <div className={`w-full py-2 transition-all duration-200 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/80"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
              <MessageSquare className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-lg">Business Buddy</span>
          </Link>

          {/* Desktop top navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {topNavItems.map((item) => (
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className="text-sm">{item.label}</NavigationMenuTrigger>
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
                    <Link to={item.href} className={cn(navigationMenuTriggerStyle(), "text-sm")}>
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Authentication buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 pt-8">
                  {/* Top navigation items in mobile menu */}
                  <h3 className="font-semibold mb-2">Main Navigation</h3>
                  {topNavItems.map((item) => (
                    <div key={item.label}>
                      <Link 
                        to={item.href}
                        className="text-foreground/80 hover:text-primary transition-colors py-2 flex items-center justify-between"
                      >
                        {item.label}
                        {item.children && <ChevronDown size={16} />}
                      </Link>
                      
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
                      <span>Asistent</span>
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

                  <Link to="/register" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Original lower navigation bar */}
      <nav 
        className={`py-4 sticky top-0 z-10 transition-all duration-200 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:invisible">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-blue-600 rounded-md flex items-center justify-center">
              <MessageSquare className="text-white h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="font-bold text-lg md:text-xl">Business Buddy</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                to={item.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {onToggleAssistant && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onToggleAssistant}
                className="flex items-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Asistent</span>
              </Button>
            )}
            
            {onViewDemo && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onViewDemo}
              >
                Demo
              </Button>
            )}
            
            <Link to="/login">
              <Button variant="default" size="sm" className="gap-2">
                <LogIn size={16} />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
