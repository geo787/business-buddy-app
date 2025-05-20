
import React from "react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onViewDemo: () => void;
}

const HeroSection = ({ onViewDemo }: HeroSectionProps) => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Leverage AI-powered tools to understand, engage, and retain your customers more effectively than ever before.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button size="lg" onClick={onViewDemo} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md">
              Watch Demo
            </Button>
            <Button size="lg" variant="outline" className="border-blue-400 hover:border-purple-500 transition-all duration-300">
              Start Free Trial
            </Button>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
          <div className="relative z-10 rounded-xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Business professional using Business Buddy" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
