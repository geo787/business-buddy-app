
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { TopBarLogo } from "./topbar/TopBarLogo";
import { TopNavigation } from "./topbar/TopNavigation";
import { TopBarActions } from "./topbar/TopBarActions";
import { SectionNavigation } from "./topbar/SectionNavigation";
import { TopBarSearch } from "./topbar/TopBarSearch";
import { navItems, topNavItems } from "./topbar/TopBarData";

const TopBar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { collapsed, setCollapsed } = useSidebar();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleAssistant = () => {
    const event = new CustomEvent('toggle-assistant');
    window.dispatchEvent(event);
  };

  // Add action to topNavItems
  const topNavItemsWithActions = topNavItems.map(item => 
    item.title === "AI Assistant" 
      ? { ...item, action: toggleAssistant } 
      : item
  );

  return (
    <div className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
      {/* Top navigation bar */}
      <div className="border-b border-border/30 py-2 px-3 sm:px-4 md:px-8">
        <div className="flex items-center justify-between">
          <TopBarLogo isMobile={isMobile} toggleSidebar={toggleSidebar} />
          <TopNavigation items={topNavItemsWithActions} />
          <TopBarActions 
            theme={theme}
            toggleTheme={toggleTheme}
            showScrollTop={showScrollTop}
            scrollToTop={scrollToTop}
            isMobile={isMobile}
            toggleAssistant={toggleAssistant}
          />
        </div>
      </div>
      
      {/* Secondary navigation - showing main sections */}
      <div className="py-2 sm:py-3 px-3 sm:px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* This empty div maintains spacing when sidebar toggle is hidden */}
            {!isMobile && <div className="w-10"></div>}
            
            {/* Desktop Navigation Menu - Displayed on non-mobile screens */}
            {!isMobile && <SectionNavigation items={navItems} />}
          </div>

          <div className="flex items-center gap-2">
            <TopBarSearch />
            
            {/* Show these only on mobile or when not already in top nav */}
            {isMobile && (
              <>
                <TopBarActions 
                  theme={theme}
                  toggleTheme={toggleTheme}
                  showScrollTop={showScrollTop}
                  scrollToTop={scrollToTop}
                  isMobile={isMobile}
                  toggleAssistant={toggleAssistant}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
