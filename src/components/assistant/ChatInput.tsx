
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  value: string;
  onChange: (value: string) => void;
}

const ChatInput = ({ onSendMessage, value, onChange }: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = () => {
    if (!value.trim()) return;
    onSendMessage(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full gap-2">
      <Input
        placeholder="Scrieți un mesaj..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
        ref={inputRef}
      />
      <Button 
        onClick={handleSendMessage} 
        className="px-3"
        disabled={!value.trim()}
      >
        <SendHorizontal size={20} />
      </Button>
    </div>
  );
};

export default ChatInput;
