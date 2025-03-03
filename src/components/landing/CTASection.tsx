
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/30">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Retention?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of businesses that have already improved their customer retention metrics with our platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="gap-2 font-semibold"
          >
            Get Started <ArrowRight size={16} />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/customers")}
            className="font-semibold"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
