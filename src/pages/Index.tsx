
import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import DemoDialog from "@/components/landing/DemoDialog";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleViewDemo = () => {
    setShowDemoModal(true);
  };

  const toggleAssistant = () => {
    // Use custom event to toggle virtual assistant
    window.dispatchEvent(new Event('toggle-assistant'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <Navbar onViewDemo={handleViewDemo} onToggleAssistant={toggleAssistant} />
      </div>

      <HeroSection onViewDemo={handleViewDemo} />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />

      <DemoDialog 
        open={showDemoModal} 
        onOpenChange={setShowDemoModal}
      />
    </div>
  );
};

export default Index;
