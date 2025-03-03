
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BarChart3, 
  Users, 
  RefreshCw, 
  CheckCircle, 
  ShieldCheck, 
  Clock 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
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
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our powerful tools help businesses of all sizes track and improve customer retention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-card/60 backdrop-blur shadow-md hover:shadow-lg transition-all hover:scale-105 duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Metrics</h3>
                <p className="text-muted-foreground">
                  Monitor key retention metrics and customer activity in real-time with detailed analytics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-card/60 backdrop-blur shadow-md hover:shadow-lg transition-all hover:scale-105 duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyze Trends</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights from customer behavior patterns and market trends.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-card/60 backdrop-blur shadow-md hover:shadow-lg transition-all hover:scale-105 duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Improve Retention</h3>
                <p className="text-muted-foreground">
                  Take action with data-driven strategies designed to boost customer satisfaction and loyalty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Benefits You Get</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock powerful insights and tools to transform your customer relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex items-start gap-4 p-4 hover:bg-secondary/20 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Increase Customer Lifetime Value</h3>
                <p className="text-muted-foreground">
                  Extend the relationship with your customers and maximize their value over time with targeted strategies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 hover:bg-secondary/20 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reduce Churn Rate</h3>
                <p className="text-muted-foreground">
                  Identify at-risk customers before they leave and implement effective retention campaigns.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 hover:bg-secondary/20 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time and Resources</h3>
                <p className="text-muted-foreground">
                  Automate customer analysis and get actionable insights without manual data processing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 hover:bg-secondary/20 rounded-lg transition-colors">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data-Driven Decisions</h3>
                <p className="text-muted-foreground">
                  Base your business strategies on real data, not guesswork, with comprehensive analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Customer Retention Platform. All rights reserved.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">Responsive Design</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">Dark Mode</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">Real-time Analytics</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">Customer Segmentation</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
