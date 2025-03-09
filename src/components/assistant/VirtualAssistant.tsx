
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizontal, Bot, XCircle, BarChart3, TrendingUp, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Intent {
  id: string;
  name: string;
  category: "banking" | "logistics";
  trainingPhrases: string[];
  response: string;
}

// Get intents from localStorage or use defaults
const getStoredIntents = (): Intent[] => {
  const storedIntents = localStorage.getItem('chatbot-intents');
  if (storedIntents) {
    return JSON.parse(storedIntents);
  }
  return [
    {
      id: "1",
      name: "check_order_status",
      category: "logistics",
      trainingPhrases: [
        "Unde este comanda mea?",
        "Status pentru comanda #123"
      ],
      response: "Comanda este în depozitul nostru. Va fi expediată mâine."
    },
    {
      id: "2",
      name: "check_profit",
      category: "banking",
      trainingPhrases: [
        "Cât a fost profitul în ultimele 3 luni?",
        "Arată-mi profitul trimestrial"
      ],
      response: "Profitul tău a fost de 45.000 RON în ultimele 3 luni. Poți vedea graficul detaliat accesând secțiunea Analytics din dashboard."
    }
  ];
};

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
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [intents] = useState<Intent[]>(getStoredIntents());

  // Function to find matching intent based on user input
  const findMatchingIntent = (userMessage: string): Intent | null => {
    const messageLower = userMessage.toLowerCase();
    
    for (const intent of intents) {
      for (const phrase of intent.trainingPhrases) {
        if (messageLower.includes(phrase.toLowerCase()) || 
            getLevenshteinDistance(messageLower, phrase.toLowerCase()) < 3) {
          return intent;
        }
      }
    }
    
    return null;
  };

  // Simple Levenshtein distance implementation for fuzzy matching
  const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) {
      matrix[i][0] = i;
    }
    
    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,        // deletion
          matrix[i][j - 1] + 1,        // insertion
          matrix[i - 1][j - 1] + cost  // substitution
        );
      }
    }
    
    return matrix[a.length][b.length];
  };

  // Function to get AI response based on user input
  const getAIResponse = (userMessage: string): string => {
    const matchingIntent = findMatchingIntent(userMessage);
    
    if (matchingIntent) {
      return matchingIntent.response;
    }
    
    // Default response if no intent matches
    return "Îmi pare rău, nu am suficiente informații pentru a răspunde la această întrebare specifică. Vă pot ajuta cu informații despre fluxul de numerar, rapoarte financiare, tracking de comenzi sau optimizare de costuri.";
  };

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
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick reply shortcuts
  const quickReplies = [
    {
      icon: <TrendingUp className="text-primary" size={20} />,
      text: "Optimizare flux numerar",
      message: "Cum pot optimiza fluxul de numerar?"
    },
    {
      icon: <BarChart3 className="text-primary" size={20} />,
      text: "Raport cheltuieli",
      message: "Generează un raport de cheltuieli"
    },
    {
      icon: <Truck className="text-primary" size={20} />,
      text: "Tracking comandă",
      message: "Unde este comanda #1234?"
    }
  ];

  const handleQuickReply = (message: string) => {
    setInputMessage(message);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Chat button - fixed on the automation page */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 flex items-center justify-center shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XCircle size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-xl h-[500px] flex flex-col z-50">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="flex items-center gap-2">
              <Bot size={20} />
              Business Buddy Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div ref={messagesEndRef} />
          </CardContent>
          
          <CardFooter className="p-4 pt-2 border-t">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Scrieți un mesaj..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="px-3">
                <SendHorizontal size={20} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Quick shortcuts */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 flex flex-col space-y-2 z-50">
          {quickReplies.map((reply, index) => (
            <Card 
              key={index}
              className="p-4 shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              onClick={() => handleQuickReply(reply.message)}
            >
              <div className="flex items-center gap-2">
                {reply.icon}
                <span className="text-sm">{reply.text}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default VirtualAssistant;
