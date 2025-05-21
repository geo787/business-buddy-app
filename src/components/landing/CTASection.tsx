
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  const benefits = [
    "30-day free trial with full access",
    "No credit card required to start",
    "Dedicated support team",
    "Easy integration with existing systems"
  ];

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-4">
          Get Started Today
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Transform Your Customer Retention?
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-4">
          Join thousands of businesses that have already improved their customer retention metrics with our platform.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto gap-2 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Start Free Trial <ArrowRight size={16} />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/customers")}
            className="w-full sm:w-auto font-semibold"
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
