
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/models/Message";

export const useAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: `🤖 Bună ziua! Sunt **AI Assistant**, asistentul tău inteligent pentru orice problemă!

✨ **Ce pot să fac pentru tine:**
• Răspund la întrebări complexe și îți ofer soluții
• Te ajut cu planificarea, strategiile și deciziile
• Analizez probleme și găsesc soluții creative
• Te asist cu business, tehnologie, educație
• Îți ofer sfaturi personalizate și practice

Cum te pot ajuta astăzi? Spune-mi orice problemă ai! 💡`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      
      setFollowUpQuestions([
        "Ajută-mă să rezolv o problemă 🎯",
        "Vreau sfaturi și idei creative 💡",
        "Cum pot să îmbunătățesc ceva? ⚡"
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isOpen && !sessionActive) {
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    const currentInput = inputMessage;
    setInputMessage("");
    setShowQuickReplies(false);
    
    try {
      // Send the conversation history for context
      const conversationHistory = messages.slice(-10); // Last 10 messages for context
      
      const response = await fetch('https://xvufajrfsggkfegoctpv.supabase.co/functions/v1/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'Îmi pare rău, nu am putut procesa cererea.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setFollowUpQuestions(data.followUp || []);
      
      toast({
        title: "✨ Răspuns generat cu AI",
        description: "Asistentul Business Buddy a analizat cererea ta",
        duration: 2000,
      });
      
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Îmi pare rău, am întâmpinat o problemă tehnică. Asigură-te că ai configurat corect API key-ul OpenAI și încearcă din nou.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Eroare de conectare",
        description: "Nu am putut contacta serviciul AI. Verifică configurația.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsTyping(false);
    }
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
        content: `🤖 Bună ziua! Sunt **AI Assistant**, asistentul tău inteligent pentru orice problemă!

✨ **Ce pot să fac pentru tine:**
• Răspund la întrebări complexe și îți ofer soluții
• Te ajut cu planificarea, strategiile și deciziile
• Analizez probleme și găsesc soluții creative
• Te asist cu business, tehnologie, educație
• Îți ofer sfaturi personalizate și practice

Cum te pot ajuta astăzi? Spune-mi orice problemă ai! 💡`,
        sender: 'assistant',
        timestamp: new Date(),
      }
    ]);
    setShowQuickReplies(false);
    
    setFollowUpQuestions([
      "Ajută-mă să rezolv o problemă 🎯",
      "Vreau sfaturi și idei creative 💡", 
      "Cum pot să îmbunătățesc ceva? ⚡"
    ]);
    
    setSessionActive(true);
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
