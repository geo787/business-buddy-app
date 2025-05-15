
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface TopBarLogoProps {
  isMobile: boolean;
  toggleSidebar: () => void;
}

export function TopBarLogo({ isMobile, toggleSidebar }: TopBarLogoProps) {
  return (
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
  );
}
