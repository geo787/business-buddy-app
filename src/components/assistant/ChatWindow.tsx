
import { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { Message } from "@/models/Message";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}

const ChatWindow = ({ messages, isTyping, onSendMessage }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="fixed bottom-24 right-6 w-96 shadow-xl h-[500px] flex flex-col z-50">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center gap-2">
          <Bot size={20} />
          Business Buddy Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} isTyping={isTyping} ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t">
        <ChatInput onSendMessage={onSendMessage} />
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
