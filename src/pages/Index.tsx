
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Header with login button */}
      <div className="container mx-auto px-4 py-4 flex justify-end">
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <img 
          src="/lovable-uploads/780c12b9-63d2-49df-bf17-c8f6a083cbd0.png" 
          alt="Business Buddy Logo" 
          className="w-24 h-24 mb-4 object-contain" 
        />
        <h1 className="text-4xl font-bold mb-2">Customer</h1>
        <h1 className="text-4xl font-bold mb-6">Retention Platform</h1>
        
        <p className="max-w-xl text-gray-600 mb-8">
          Transform your business with our powerful analytics. Track, analyze 
          and improve your customer metrics in real-time.
        </p>
        
        <div className="flex flex-col gap-4 items-center">
          <Link to="/login">
            <Button className="px-8 py-6 text-lg flex items-center gap-2">
              Start Now 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </Link>
          
          <Button variant="ghost" className="text-gray-600">
            View Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
