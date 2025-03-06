
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleViewDemo = () => {
    toast({
      title: "Demo Access",
      description: "A demo link has been sent to your email.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Header with login/register buttons */}
      <div className="container mx-auto px-4 py-4 flex justify-end space-x-4">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-4">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2">Customer</h1>
        <h1 className="text-4xl font-bold mb-6">Retention Platform</h1>
        
        <p className="max-w-xl text-gray-600 mb-8">
          Transform your business with our powerful analytics. Track, analyze 
          and improve your customer metrics in real-time.
        </p>
        
        <div className="flex flex-col gap-4 items-center">
          <Link to="/register">
            <Button className="px-8 py-6 text-lg flex items-center gap-2">
              Start Now 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="text-gray-600"
            onClick={handleViewDemo}
          >
            View Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
