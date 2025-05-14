
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, Search, Sun, Moon, Menu, ArrowUp, Bot, Home, Users, BarChart3, Truck, CreditCard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
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

  const goToSettings = () => {
    navigate('/settings');
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

  const navItems = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { title: "Customers", path: "/customers", icon: Users },
    { title: "Analytics", path: "/analytics", icon: BarChart3 },
    { title: "Logistics", path: "/logistics", icon: Truck },
    { title: "Finance", path: "/finance", icon: CreditCard },
  ];
  
  const topNavItems = [
    { title: "Start Here", path: "/" },
    { title: "Resources", path: "/resources" },
    { title: "AI Assistant", path: "#", action: toggleAssistant },
    { title: "Support", path: "/support" },
  ];

  return (
    <div className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
      {/* Top navigation bar */}
      <div className="border-b border-border/30 py-2 px-3 sm:px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2" aria-label="Toggle menu">
                <Menu size={18} />
              </Button>
            )}
            
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">BB</span>
            </div>
            <h2 className="font-bold text-lg tracking-tight hidden sm:block">Business Buddy</h2>
          </div>

          {/* Desktop top navigation links */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {topNavItems.map((item) => (
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

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-muted" 
              aria-label="Search"
            >
              <Search size={18} />
            </Button>

            <Button onClick={toggleTheme} variant="ghost" size="icon" className="hover:bg-muted" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted relative hidden sm:flex" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="User profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-medium cursor-pointer">
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation - showing main sections */}
      <div className="py-2 sm:py-3 px-3 sm:px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* This empty div maintains spacing when sidebar toggle is hidden */}
            {!isMobile && <div className="w-10"></div>}
            
            {/* Desktop Navigation Menu - Displayed on non-mobile screens */}
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
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
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-8 bg-background border-muted w-full max-w-[200px]" 
              />
            </div>
            
            {/* Show these only on mobile or when not already in top nav */}
            {isMobile && (
              <>
                <Button 
                  onClick={toggleAssistant} 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-muted relative"
                  aria-label="Assistant AI"
                >
                  <Bot size={18} />
                </Button>
                
                <Button 
                  onClick={goToSettings} 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-muted" 
                  aria-label="Go to Settings"
                >
                  <Settings size={18} />
                </Button>
              </>
            )}

            {!isMobile && (
              <Button 
                onClick={goToSettings} 
                variant="ghost" 
                size="icon" 
                className="hover:bg-muted" 
                aria-label="Go to Settings"
              >
                <Settings size={18} />
              </Button>
            )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
