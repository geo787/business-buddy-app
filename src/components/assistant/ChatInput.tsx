
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  value: string;
  onChange: (value: string) => void;
}

const ChatInput = ({ onSendMessage, value, onChange }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isThinking, setIsThinking] = useState(false);
  
  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSendMessage = () => {
    if (!value.trim()) return;
    onSendMessage(value);
    
    // Show brief thinking animation
    setIsThinking(true);
    setTimeout(() => setIsThinking(false), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full gap-2 items-center relative">
      <Input
        placeholder="Scrieți un mesaj..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 pr-10 bg-white border-gray-300 focus-visible:ring-blue-500"
        ref={inputRef}
      />
      <Button 
        onClick={handleSendMessage} 
        className="absolute right-0 top-0 h-full px-3 bg-transparent hover:bg-transparent text-gray-500"
        disabled={!value.trim() || isThinking}
      >
        {isThinking ? 
          <Sparkles size={20} className="text-blue-500 animate-pulse" /> : 
          <SendHorizontal size={20} className={value.trim() ? "text-blue-500" : "text-gray-300"} />
        }
      </Button>
    </div>
  );
};

export default ChatInput;
