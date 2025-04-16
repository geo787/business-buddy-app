
import { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Plus } from "lucide-react";
import { Message } from "@/models/Message";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Button } from "@/components/ui/button";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}

const ChatWindow = ({ 
  messages, 
  isTyping, 
  onSendMessage, 
  onNewChat, 
  inputValue, 
  onInputChange 
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="bg-primary text-white py-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot size={20} />
            Business Buddy Assistant
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-primary/20" 
            onClick={onNewChat}
          >
            <Plus size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} isTyping={isTyping} ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t">
        <ChatInput 
          onSendMessage={onSendMessage} 
          value={inputValue}
          onChange={onInputChange}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
