
import { useState, useEffect } from "react";
import { Bell, Search, Sun, Moon, ArrowUp, Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TopBarUserMenu } from "./TopBarUserMenu";

interface TopBarActionsProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showScrollTop: boolean;
  scrollToTop: () => void;
  isMobile: boolean;
  toggleAssistant: () => void;
}

export function TopBarActions({ 
  theme, 
  toggleTheme, 
  showScrollTop, 
  scrollToTop, 
  isMobile, 
  toggleAssistant 
}: TopBarActionsProps) {
  const navigate = useNavigate();
  
  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="hover:bg-muted" 
        aria-label="Search"
      >
        <Search size={18} />
      </Button>

      <Button 
        onClick={toggleTheme} 
        variant="ghost" 
        size="icon" 
        className="hover:bg-muted" 
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="hover:bg-muted relative hidden sm:flex" 
        aria-label="Notifications"
      >
        <Bell size={18} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
      </Button>

      {/* Show these only on mobile or when not already in top nav */}
      {isMobile && (
        <Button 
          onClick={toggleAssistant} 
          variant="ghost" 
          size="icon" 
          className="hover:bg-muted relative"
          aria-label="Assistant AI"
        >
          <Bot size={18} />
        </Button>
      )}

      <Button 
        onClick={goToSettings} 
        variant="ghost" 
        size="icon" 
        className="hover:bg-muted" 
        aria-label="Go to Settings"
      >
        <Settings size={18} />
      </Button>

      {showScrollTop && (
        <Button 
          onClick={scrollToTop} 
          variant="ghost" 
          size="icon" 
          className="hover:bg-muted" 
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </Button>
      )}

      <TopBarUserMenu />
    </div>
  );
}
