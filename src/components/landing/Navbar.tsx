
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, MessageSquare } from "lucide-react";

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

  return (
    <nav 
      className={`py-4 sticky top-0 z-10 transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 pt-8">
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
