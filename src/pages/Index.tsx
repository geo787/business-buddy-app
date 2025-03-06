
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
      {/* Header with logo and login/register buttons */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#2563EB" />
              <path d="M30 30H50C61 30 70 39 70 50C70 61 61 70 50 70H30V30Z" fill="white"/>
              <path d="M50 50H70V70H50V50Z" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-xl text-blue-600">BUSINESS BUDDY</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-4">
          <div className="h-20 w-20 bg-blue-600 rounded-md flex items-center justify-center overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#2563EB" />
              <path d="M30 30H50C61 30 70 39 70 50C70 61 61 70 50 70H30V30Z" fill="white"/>
              <path d="M50 50H70V70H50V50Z" fill="white"/>
            </svg>
          </div>
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
