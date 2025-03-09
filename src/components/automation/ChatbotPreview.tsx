
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const ChatbotPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot size={20} />
          Chatbot Business Buddy
        </CardTitle>
        <CardDescription>
          Configurează chatbot-ul pentru a răspunde la întrebările despre banking și logistică
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 bg-muted rounded-lg">
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 bg-primary rounded-full p-2 mt-1">
                <Bot size={16} className="text-primary-foreground" />
              </div>
              <div className="bg-primary/10 rounded-lg rounded-tl-none p-3">
                <p>Bună ziua! Sunt asistentul virtual Business Buddy. Cum vă pot ajuta astăzi cu finanțele sau logistica afacerii dumneavoastră?</p>
              </div>
            </div>
            
            <div className="flex justify-end mb-6">
              <div className="bg-primary rounded-lg rounded-tr-none p-3 text-primary-foreground max-w-[80%]">
                <p>Cât a fost profitul în ultimele 3 luni?</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 bg-primary rounded-full p-2 mt-1">
                <Bot size={16} className="text-primary-foreground" />
              </div>
              <div className="bg-primary/10 rounded-lg rounded-tl-none p-3">
                <p>Profitul tău a fost de 45.000 RON în ultimele 3 luni. Poți vedea graficul detaliat accesând secțiunea Analytics din dashboard.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Exemplu de conversație bazată pe intent-urile configurate</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Instrucțiuni de configurare:</div>
          <ol className="text-sm space-y-2 list-decimal pl-5">
            <li>Adăugați intent-uri pentru diferite tipuri de întrebări despre banking și logistică</li>
            <li>Pentru fiecare intent, adăugați cel puțin 2 fraze de antrenament</li>
            <li>Configurați un răspuns relevant pentru fiecare intent</li>
            <li>Conectați chatbot-ul la platforma de mesagerie preferată</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotPreview;
