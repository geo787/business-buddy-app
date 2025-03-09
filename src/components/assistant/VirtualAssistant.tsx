
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

interface SampleResponse {
  keywords: string[];
  response: string;
  type: 'banking' | 'logistics' | 'general';
}

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

  // Sample responses database
  const sampleResponses: SampleResponse[] = [
    {
      keywords: ['profit', 'ultimele', 'luni'],
      response: 'Profitul tău a fost de 45.000 RON în ultimele 3 luni. Poți vedea graficul detaliat accesând secțiunea Analytics din dashboard.',
      type: 'banking'
    },
    {
      keywords: ['flux', 'numerar', 'optimizez'],
      response: 'Pentru optimizarea fluxului de numerar, vă recomand: 1) Monitorizarea zilnică a intrărilor și ieșirilor, 2) Implementarea unor termene de plată mai scurte pentru clienți, 3) Negocierea termenelor mai lungi cu furnizorii. Doriți un raport detaliat despre fluxul actual?',
      type: 'banking'
    },
    {
      keywords: ['comanda', 'unde', 'tracking'],
      response: 'Comanda #1234 este în tranzit către București. Timp estimat de sosire: 2 ore. Puteți urmări în timp real poziția pe hartă din secțiunea Comenzi.',
      type: 'logistics'
    },
    {
      keywords: ['cost', 'transport', 'reduc'],
      response: 'Analizând datele dvs. de transport, puteți reduce costurile cu aproximativ 20% folosind ruta alternativă prin Ploiești și consolidând livrările de marți și joi. Doriți să generez un raport detaliat?',
      type: 'logistics'
    },
    {
      keywords: ['raport', 'cheltuieli', 'generează'],
      response: 'Am generat un raport detaliat al cheltuielilor pentru ultima lună. Cele mai mari cheltuieli au fost pentru logistică (35%) și personal (28%). Raportul complet este disponibil în dashboard-ul dvs.',
      type: 'banking'
    }
  ];

  // Function to get AI response based on user input
  const getAIResponse = (userMessage: string): string => {
    const messageLower = userMessage.toLowerCase();
    
    // Check for matching keywords in sample responses
    for (const sample of sampleResponses) {
      if (sample.keywords.some(keyword => messageLower.includes(keyword.toLowerCase()))) {
        return sample.response;
      }
    }
    
    // Default response if no keywords match
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
    }, 1500);
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

  return (
    <>
      {/* Chat button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 flex items-center justify-center shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XCircle size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-xl h-[500px] flex flex-col">
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
                      : 'bg-gray-100 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
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
        <div className="fixed bottom-24 left-6 flex flex-col space-y-2">
          <Card className="p-4 shadow-lg cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-2" onClick={() => {
              setInputMessage("Cum pot optimiza fluxul de numerar?");
              handleSendMessage();
            }}>
              <TrendingUp className="text-primary" size={20} />
              <span className="text-sm">Optimizare flux numerar</span>
            </div>
          </Card>
          
          <Card className="p-4 shadow-lg cursor-pointer hover:bg-gray-50 transition-all">  
            <div className="flex items-center gap-2" onClick={() => {
              setInputMessage("Generează un raport de cheltuieli");
              handleSendMessage();
            }}>
              <BarChart3 className="text-primary" size={20} />
              <span className="text-sm">Raport cheltuieli</span>
            </div>
          </Card>
          
          <Card className="p-4 shadow-lg cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-2" onClick={() => {
              setInputMessage("Unde este comanda #1234?");
              handleSendMessage();
            }}>
              <Truck className="text-primary" size={20} />
              <span className="text-sm">Tracking comandă</span>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default VirtualAssistant;
