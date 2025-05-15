
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Home, Star, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserAddressBarProps {
  currentUrl?: string;
}

const BrowserAddressBar = ({ currentUrl = "business-buddy-app.lovable.app/dashboard" }: BrowserAddressBarProps) => {
  const [isSecure, setIsSecure] = useState(true);
  
  return (
    <div className="bg-[#f1f3f4] py-2 px-3 flex items-center gap-2 border-b border-gray-300">
      <div className="flex items-center gap-1">
        <button className="p-1 rounded-full hover:bg-gray-200" aria-label="Back">
          <ArrowLeft size={16} className="text-gray-500" />
        </button>
        <button className="p-1 rounded-full hover:bg-gray-200" aria-label="Forward">
          <ArrowRight size={16} className="text-gray-500" />
        </button>
        <button className="p-1 rounded-full hover:bg-gray-200" aria-label="Reload">
          <RotateCcw size={16} className="text-gray-500" />
        </button>
        <button className="p-1 rounded-full hover:bg-gray-200" aria-label="Home">
          <Home size={16} className="text-gray-500" />
        </button>
      </div>
      
      <div className="flex-1 max-w-[800px] mx-auto">
        <div className="flex items-center rounded-full bg-white border border-transparent hover:border-gray-300 px-3 py-1.5">
          {isSecure && (
            <div className="flex items-center mr-2 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          )}
          <div className="flex-1 text-sm text-gray-700 truncate">
            {currentUrl}
          </div>
          <div className="text-gray-400 ml-2 cursor-pointer">
            <Star size={16} />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5">
        <button className="p-1 rounded-full hover:bg-gray-200" aria-label="Profile">
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700 font-medium">
            U
          </div>
        </button>
        <button className="p-1 rounded-full hover:bg-gray-200" aria-label="More">
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default BrowserAddressBar;
