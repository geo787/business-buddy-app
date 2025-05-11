
import React from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onViewDemo: () => void;
}

const HeroSection = ({ onViewDemo }: HeroSectionProps) => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Smart Solutions
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Leverage AI-powered tools to understand, engage, and retain your customers more effectively than ever before.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={onViewDemo} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md">
            Watch Demo
          </Button>
          <Button size="lg" variant="outline" className="border-blue-400 hover:border-purple-500 transition-all duration-300">
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
