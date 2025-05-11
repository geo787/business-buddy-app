
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/models/Message";
import { Intent, getStoredIntents, getStoredAnalytics, saveAnalytics } from "@/models/Intent";
import { getAdvancedAIResponse } from "@/utils/nlpUtils";
import { getConversationContext, generateFollowUpQuestions } from "@/utils/chatUtils";

export const useAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [intents] = useState<Intent[]>(getStoredIntents());
  const [sessionActive, setSessionActive] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const { toast } = useToast();
  
  const conversationContextRef = useRef<string[]>([]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: 'Bună ziua! Sunt asistentul virtual Business Buddy AI. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      
      setFollowUpQuestions([
        "Vreau să verific statusul financiar",
        "Cum optimizez fluxul de numerar?",
        "Am nevoie de ajutor cu logistica"
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isOpen && !sessionActive) {
      const analytics = getStoredAnalytics();
      analytics.sessionsCount = (analytics.sessionsCount || 0) + 1;
      analytics.lastSessionDate = new Date();
      saveAnalytics(analytics);
      setSessionActive(true);
    }
  }, [isOpen, sessionActive]);

  useEffect(() => {
    const handleToggleAssistant = () => {
      setIsOpen(prev => !prev);
    };
    
    window.addEventListener('toggle-assistant', handleToggleAssistant);
    return () => window.removeEventListener('toggle-assistant', handleToggleAssistant);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      conversationContextRef.current = getConversationContext(
        messages.map(m => ({ content: m.content, sender: m.sender as 'user' | 'assistant' }))
      );
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setInputMessage("");
    setShowQuickReplies(false);
    
    const conversationContext = conversationContextRef.current;
    
    const wordCount = inputMessage.split(/\s+/).length;
    const baseDelay = 800;
    const wordsPerSecondFactor = 100;
    const thinkingDelay = Math.min(baseDelay + wordCount * wordsPerSecondFactor, 3000);
    
    setTimeout(() => {
      const { response, matchedIntent } = getAdvancedAIResponse(
        inputMessage, 
        intents, 
        conversationContext
      );
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      const newFollowUps = generateFollowUpQuestions(response, matchedIntent);
      setFollowUpQuestions(newFollowUps);
      
      if (matchedIntent) {
        toast({
          title: "Intent identificat",
          description: `Asistentul a identificat intent-ul: ${matchedIntent.name}`,
          duration: 3000,
        });
      }
    }, thinkingDelay);
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
    setShowQuickReplies(false);
    conversationContextRef.current = [];
    
    setFollowUpQuestions([
      "Vreau să verific statusul financiar",
      "Cum optimizez fluxul de numerar?",
      "Am nevoie de ajutor cu logistica"
    ]);
    
    const analytics = getStoredAnalytics();
    analytics.sessionsCount = (analytics.sessionsCount || 0) + 1;
    analytics.lastSessionDate = new Date();
    saveAnalytics(analytics);
  };

  const toggleQuickReplies = () => {
    setShowQuickReplies(!showQuickReplies);
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    messages,
    isTyping,
    inputMessage,
    followUpQuestions,
    showQuickReplies,
    handleSendMessage,
    setInputMessage,
    startNewChat,
    handleQuickReply,
    toggleQuickReplies,
    toggleAssistant
  };
};
