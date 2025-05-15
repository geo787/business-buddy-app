
import { Link } from "react-router-dom";
import { LogIn, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarActionButtonsProps {
  onToggleAssistant?: () => void;
  onViewDemo?: () => void;
}

export function NavbarActionButtons({ onToggleAssistant, onViewDemo }: NavbarActionButtonsProps) {
  return (
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
  );
}
