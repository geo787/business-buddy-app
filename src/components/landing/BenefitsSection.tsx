
import { CheckCircle, ShieldCheck, Clock, BarChart3 } from "lucide-react";
import BenefitItem from "./BenefitItem";

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">The Benefits You Get</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Unlock powerful insights and tools to transform your customer relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <BenefitItem 
            icon={CheckCircle}
            title="Increase Customer Lifetime Value"
            description="Extend the relationship with your customers and maximize their value over time with targeted strategies."
          />
          
          <BenefitItem 
            icon={ShieldCheck}
            title="Reduce Churn Rate"
            description="Identify at-risk customers before they leave and implement effective retention campaigns."
          />
          
          <BenefitItem 
            icon={Clock}
            title="Save Time and Resources"
            description="Automate customer analysis and get actionable insights without manual data processing."
          />
          
          <BenefitItem 
            icon={BarChart3}
            title="Data-Driven Decisions"
            description="Base your business strategies on real data, not guesswork, with comprehensive analytics."
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
