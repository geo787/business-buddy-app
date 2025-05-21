
import { BarChart3, Users, RefreshCw, Bot, LineChart, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-secondary/30 dark:from-background dark:to-secondary/10">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-3">
            Our Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Our Platform
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Our powerful tools help businesses of all sizes track and improve customer retention.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard 
            icon={BarChart3}
            title="Track Metrics"
            description="Monitor key retention metrics and customer activity in real-time with detailed analytics."
          />
          
          <FeatureCard 
            icon={Bot}
            title="AI Assistant"
            description="Utilize AI-powered insights to predict customer behavior and prevent churn before it happens."
          />
          
          <FeatureCard 
            icon={Users}
            title="Customer Segments"
            description="Group customers based on behavior, preferences, and engagement levels for targeted strategies."
          />

          <FeatureCard 
            icon={LineChart}
            title="Performance Tracking"
            description="Visualize customer journey and conversion metrics to identify improvement opportunities."
          />
          
          <FeatureCard 
            icon={RefreshCw}
            title="Retention Strategies"
            description="Implement proven strategies to boost customer satisfaction and build long-term loyalty."
          />
          
          <FeatureCard 
            icon={Zap}
            title="Automation Tools"
            description="Automate personalized customer engagements based on behavior triggers and AI predictions."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
