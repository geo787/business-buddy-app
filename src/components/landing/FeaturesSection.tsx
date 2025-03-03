
import { BarChart3, Users, RefreshCw } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our powerful tools help businesses of all sizes track and improve customer retention.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={BarChart3}
            title="Track Metrics"
            description="Monitor key retention metrics and customer activity in real-time with detailed analytics."
          />
          
          <FeatureCard 
            icon={Users}
            title="Analyze Trends"
            description="Gain valuable insights from customer behavior patterns and market trends."
          />
          
          <FeatureCard 
            icon={RefreshCw}
            title="Improve Retention"
            description="Take action with data-driven strategies designed to boost customer satisfaction and loyalty."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
