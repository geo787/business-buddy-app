
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, XCircle, SendHorizontal, Plus } from "lucide-react";
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
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: 'Bună ziua! Sunt asistentul virtual Business Buddy. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?',
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
    
    // Focus the input when opening
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
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
    setInputMessage(message);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  const startNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: 'Bună ziua! Sunt asistentul virtual Business Buddy. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?',
        sender: 'assistant',
        timestamp: new Date(),
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          <div className="bg-primary text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">Business Buddy Assistant</h3>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-primary-foreground/20" 
                onClick={startNewChat}
                title="Conversație nouă"
              >
                <Plus size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-primary-foreground/20" 
                onClick={() => setIsOpen(false)}
              >
                <XCircle size={18} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]" ref={chatWindowRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t">
            <QuickReplies onSelectReply={handleQuickReply} />
            
            <div className="flex gap-2 mt-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Scrieți un mesaj..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <Button 
                onClick={handleSendMessage} 
                className="px-3"
                disabled={!inputMessage.trim()}
              >
                <SendHorizontal size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VirtualAssistant;
