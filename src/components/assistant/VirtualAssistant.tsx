
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/models/Message";
import { Intent, getStoredIntents, getStoredAnalytics, saveAnalytics } from "@/models/Intent";
import { getAdvancedAIResponse } from "@/utils/nlpUtils";
import ChatWindow from "./ChatWindow";
import QuickReplies from "./QuickReplies";

const VirtualAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bună ziua! Sunt asistentul virtual Business Buddy. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?',
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const [intents] = useState<Intent[]>(getStoredIntents());
  const [sessionActive, setSessionActive] = useState(false);

  // Start a new session when the chat is opened
  useEffect(() => {
    if (isOpen && !sessionActive) {
      const analytics = getStoredAnalytics();
      analytics.sessionsCount = (analytics.sessionsCount || 0) + 1;
      analytics.lastSessionDate = new Date();
      saveAnalytics(analytics);
      setSessionActive(true);
    }
  }, [isOpen, sessionActive]);

  const handleSendMessage = (inputMessage: string) => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI thinking and typing with slightly longer timeout for more complex processing
    setTimeout(() => {
      const { response, matchedIntent } = getAdvancedAIResponse(inputMessage, intents);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Show toast notification when matched to an intent
      if (matchedIntent) {
        toast({
          title: "Intent identificat",
          description: `Asistentul a identificat intent-ul: ${matchedIntent.name}`,
          duration: 3000,
        });
      }
    }, 1200);
  };

  const handleQuickReply = (message: string) => {
    setTimeout(() => {
      handleSendMessage(message);
    }, 100);
  };

  return (
    <>
      {/* Chat button - fixed on the automation page */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 flex items-center justify-center shadow-lg z-50 bg-gradient-to-r from-primary to-primary/80"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XCircle size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <>
          <ChatWindow 
            messages={messages} 
            isTyping={isTyping} 
            onSendMessage={handleSendMessage} 
          />
          <QuickReplies onSelectReply={handleQuickReply} />
        </>
      )}
    </>
  );
};

export default VirtualAssistant;
