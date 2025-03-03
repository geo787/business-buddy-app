
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-12 px-4 md:min-h-[85vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto z-10 space-y-8 md:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-4 md:space-y-6 text-center lg:text-left animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Customer <span className="text-primary">Retention</span> Platform
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Transform your business with our powerful analytics. Track, analyze and improve your customer metrics in real-time.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
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
