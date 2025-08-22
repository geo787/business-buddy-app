import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `🚀 Bună ziua! Sunt **Business Buddy AI**, asistentul tău virtual expert în business!

✨ **Ce pot să fac pentru tine:**
• Analizez situația financiară și fluxul de numerar
• Creez planuri de business și strategii de marketing  
• Optimizez operațiunile și logistica afacerii
• Validez idei de business noi
• Te ghidez prin antreprenoriat și managementul riscurilor

Cum te pot ajuta astăzi să-ți dezvolți afacerea? 💼`,
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('https://xvufajrfsggkfegoctpv.supabase.co/functions/v1/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages.slice(-10).map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
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
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'Îmi pare rău, nu am putut procesa cererea.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "✨ Răspuns generat cu AI",
        description: "Business Buddy a analizat cererea ta",
        duration: 2000,
      });
      
    } catch (error) {
      console.error('Eroare chat:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Îmi pare rău, am întâmpinat o problemă tehnică. Asigură-te că ai configurat corect API key-ul OpenAI și încearcă din nou.',
        role: 'assistant',
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
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className="flex-shrink-0">
                {message.role === 'user' ? (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
              <Card
                className={`${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-secondary-foreground" />
              </div>
              <Card className="bg-card">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">AI-ul gândește...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Scrie mesajul tău aici..."
          className="min-h-[60px] resize-none"
          disabled={isLoading}
        />
        <Button 
          onClick={sendMessage} 
          disabled={!input.trim() || isLoading}
          size="lg"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};