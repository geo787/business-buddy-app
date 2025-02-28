
import { useState, useEffect } from "react";
import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
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

const TopBar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { collapsed, setCollapsed } = useSidebar();
  const isMobile = useIsMobile();

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

  return (
    <div className="border-b border-border/40 py-2 sm:py-3 px-3 sm:px-4 md:px-8 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2" aria-label="Toggle menu">
            <Menu size={18} />
          </Button>
        )}
        
        <div className="flex items-center gap-4 max-w-md w-full lg:w-72">
          <div className="relative w-full hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 bg-background border-muted w-full" 
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
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
  );
};

export default TopBar;
