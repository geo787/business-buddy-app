
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-9xl font-bold text-muted-foreground/30">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button 
        onClick={() => navigate("/")}
        variant="default"
        className="mt-8 gap-2"
      >
        <Home size={16} />
        <span>Go Home</span>
      </Button>
    </div>
  );
};

export default NotFound;
