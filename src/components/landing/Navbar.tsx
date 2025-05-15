
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { NavbarDesktopNav } from "./navbar/NavbarDesktopNav";
import { NavbarAuthButtons } from "./navbar/NavbarAuthButtons";
import { NavbarMobileMenu } from "./navbar/NavbarMobileMenu";
import { NavbarMainNav } from "./navbar/NavbarMainNav";
import { NavbarActionButtons } from "./navbar/NavbarActionButtons";
import { navItems, topNavItems } from "./navbar/NavbarData";

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

  return (
    <div className="w-full">
      {/* Top navigation - inspired by roadmap.sh */}
      <div className={`w-full py-2 transition-all duration-200 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/80"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <NavbarBrand />

          {/* Desktop top navigation */}
          <NavbarDesktopNav items={topNavItems} />

          {/* Authentication buttons */}
          <NavbarAuthButtons />

          {/* Mobile hamburger menu */}
          <NavbarMobileMenu 
            navItems={navItems} 
            topNavItems={topNavItems} 
            onViewDemo={onViewDemo} 
            onToggleAssistant={onToggleAssistant} 
          />
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
          <NavbarMainNav items={navItems} />
          
          {/* Action Buttons */}
          <NavbarActionButtons 
            onToggleAssistant={onToggleAssistant} 
            onViewDemo={onViewDemo} 
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
