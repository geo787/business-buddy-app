
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, RefreshCw } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 sm:p-8">
      <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Customer Retention
          <span className="text-primary"> Platform</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Track, analyze and improve your customer retention metrics with our powerful dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="gap-2 w-full sm:w-auto"
          >
            Go to Dashboard <ArrowRight size={16} className="ml-1" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/customers")}
            className="w-full sm:w-auto"
          >
            View Customers
          </Button>
        </div>
      </div>
      
      <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-5xl px-2">
        <div className="rounded-lg border bg-card p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow hover-scale">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Track Metrics</h3>
          <p className="text-muted-foreground text-sm sm:text-base">Monitor key retention metrics and customer activity in real-time.</p>
        </div>
        
        <div className="rounded-lg border bg-card p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow hover-scale">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Analyze Trends</h3>
          <p className="text-muted-foreground text-sm sm:text-base">Gain insights from detailed analytics and customer behavior patterns.</p>
        </div>
        
        <div className="rounded-lg border bg-card p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow hover-scale sm:col-span-2 md:col-span-1">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Improve Retention</h3>
          <p className="text-muted-foreground text-sm sm:text-base">Take action with data-driven strategies to boost customer retention.</p>
        </div>
      </div>

      <div className="mt-16 text-center w-full max-w-3xl">
        <p className="text-sm text-muted-foreground">
          Built with modern technology to help businesses of all sizes improve customer retention.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="px-3 py-1 bg-secondary rounded-full text-xs">Responsive Design</span>
          <span className="px-3 py-1 bg-secondary rounded-full text-xs">Dark Mode</span>
          <span className="px-3 py-1 bg-secondary rounded-full text-xs">Real-time Analytics</span>
          <span className="px-3 py-1 bg-secondary rounded-full text-xs">Customer Segmentation</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
