
import { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";
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
  followUpQuestions?: string[];
  onFollowUpClick?: (question: string) => void;
}

const ChatWindow = ({ 
  messages, 
  isTyping, 
  onSendMessage, 
  onNewChat, 
  inputValue, 
  onInputChange,
  followUpQuestions = [],
  onFollowUpClick
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="flex flex-col h-full border-none shadow-none">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles size={18} />
            Business Buddy Assistant
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-white/20" 
            onClick={onNewChat}
          >
            <Bot size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh] h-[400px]">
        <MessageList messages={messages} isTyping={isTyping} ref={messagesEndRef} />
      </CardContent>
      
      {/* Follow-up suggestions */}
      {followUpQuestions && followUpQuestions.length > 0 && !isTyping && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {followUpQuestions.map((question, index) => (
              <button
                key={index}
                className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-800 text-sm py-1 px-3 rounded-full transition-colors border border-blue-200"
                onClick={() => onFollowUpClick && onFollowUpClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <CardFooter className="p-4 pt-2 border-t bg-gray-50">
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
