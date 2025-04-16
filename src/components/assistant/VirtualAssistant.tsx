
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, XCircle, SendHorizontal, Plus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/models/Message";
import { Intent, getStoredIntents, getStoredAnalytics, saveAnalytics } from "@/models/Intent";
import { getAdvancedAIResponse } from "@/utils/nlpUtils";
import ChatWindow from "./ChatWindow";
import QuickReplies from "./QuickReplies";

const VirtualAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [intents] = useState<Intent[]>(getStoredIntents());
  const [sessionActive, setSessionActive] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const { toast } = useToast();

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: 'Bună ziua! Sunt asistentul virtual Business Buddy AI. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?',
          sender: 'assistant',
          timestamp: new Date(),
        }
      ]);
    }
  }, [messages.length]);

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

  const handleSendMessage = () => {
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
    setInputMessage("");
    
    // Simulate AI thinking and typing
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
    setInputMessage(message);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  const startNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: 'Bună ziua! Sunt asistentul virtual Business Buddy AI. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?',
        sender: 'assistant',
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <>
      {/* Chat button - fixed on the bottom right */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 flex items-center justify-center shadow-lg z-50 bg-gradient-to-r from-primary to-primary/80"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XCircle size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 flex flex-col rounded-lg shadow-xl z-50 bg-background border overflow-hidden">
          <ChatWindow 
            messages={messages} 
            isTyping={isTyping} 
            onSendMessage={handleSendMessage}
            onNewChat={startNewChat}
            inputValue={inputMessage}
            onInputChange={setInputMessage}
          />
        </div>
      )}
    </>
  );
};

export default VirtualAssistant;
