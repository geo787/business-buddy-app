
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto z-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6 text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Customer <span className="text-primary">Retention</span> Platform
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Transform your business with our powerful analytics. Track, analyze and improve your customer metrics in real-time.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/dashboard")}
                className="gap-2 font-semibold"
              >
                Start Now <ArrowRight size={16} />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/customers")}
                className="font-semibold"
              >
                View Demo
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center animate-fade-in">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                alt="Analytics Dashboard" 
                className="absolute -top-4 -right-4 w-full h-full object-cover rounded-xl shadow-lg transform rotate-3 scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
