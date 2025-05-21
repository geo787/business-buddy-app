
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onViewDemo: () => void;
}

const HeroSection = ({ onViewDemo }: HeroSectionProps) => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-4">
            Business Buddy - AI Customer Retention
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Solutions for Customer Retention
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Leverage AI-powered tools to understand, engage, and retain your customers more effectively than ever before.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              onClick={onViewDemo} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md text-lg"
            >
              Watch Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-400 hover:border-purple-500 transition-all duration-300 gap-2 text-lg"
            >
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative mx-auto md:mx-0 max-w-md md:max-w-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-50 blur-xl"></div>
          <div className="relative z-10 rounded-xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Business professional using Business Buddy" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
          </div>
          <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">AM</div>
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">RK</div>
              </div>
              <span className="text-xs md:text-sm font-medium">
                <span className="text-green-600 dark:text-green-400">+27%</span> Customer Retention
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
