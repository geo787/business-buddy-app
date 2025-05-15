
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserTab {
  id: string;
  title: string;
  icon?: string;
  isActive: boolean;
}

const BrowserTabsBar = () => {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: "1", title: "Free AI Automation", icon: "", isActive: false },
    { id: "2", title: "How to Build", icon: "", isActive: false },
    { id: "3", title: "Documents", icon: "", isActive: false },
    { id: "4", title: "Message primary", icon: "", isActive: false },
    { id: "5", title: "bolt.new", icon: "", isActive: false },
    { id: "6", title: "business-buddy", icon: "", isActive: true },
    { id: "7", title: "business-buddy", icon: "", isActive: false },
    { id: "8", title: "DeepSeek", icon: "", isActive: false },
    { id: "9", title: "Developer Roadmaps", icon: "", isActive: false },
  ]);

  const handleCloseTab = (id: string) => {
    setTabs(tabs.filter(tab => tab.id !== id));
  };

  const handleAddTab = () => {
    const newTab = {
      id: `${tabs.length + 1}-${Date.now()}`,
      title: "New Tab",
      isActive: false
    };
    
    setTabs([...tabs, newTab]);
  };

  const handleActivateTab = (id: string) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === id
    })));
  };

  return (
    <div className="bg-[#e9eaed] flex items-center w-full overflow-x-auto scrollbar-none border-b border-gray-300">
      {tabs.map((tab) => (
        <div 
          key={tab.id}
          onClick={() => handleActivateTab(tab.id)}
          className={cn(
            "flex items-center gap-2 py-1.5 px-3 min-w-[120px] max-w-[180px] border-r border-gray-300 cursor-pointer group relative",
            tab.isActive ? "bg-white" : "hover:bg-gray-100"
          )}
        >
          {tab.icon && (
            <img src={tab.icon} alt="" className="w-4 h-4" />
          )}
          <span className="truncate text-xs">{tab.title}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleCloseTab(tab.id);
            }}
            className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-full p-0.5"
          >
            <X size={12} />
          </button>
        </div>
      ))}
      
      <button 
        onClick={handleAddTab}
        className="p-2 hover:bg-gray-100"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default BrowserTabsBar;
