
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Intent, getStoredIntents } from "@/models/Intent";
import IntentList from "./IntentList";
import AIConnector from "./AIConnector";
import IntentForm from "./IntentForm";
import ChatbotPreview from "./ChatbotPreview";
import ChatAnalytics from "./ChatAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, MessageSquareText, Network } from "lucide-react";

const ChatbotConfiguration = () => {
  const { toast } = useToast();
  const [intents, setIntents] = useState<Intent[]>(getStoredIntents());
  const [currentIntent, setCurrentIntent] = useState<Intent | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatbot-intents', JSON.stringify(intents));
  }, [intents]);

  const handleAddNewIntent = () => {
    const newIntent: Intent = {
      id: Date.now().toString(),
      name: "",
      category: "banking",
      trainingPhrases: [],
      response: "",
      usageCount: 0
    };
    setCurrentIntent(newIntent);
  };

  const handleEditIntent = (intent: Intent) => {
    setCurrentIntent({...intent});
  };

  const handleDeleteIntent = (id: string) => {
    setIntents(intents.filter(intent => intent.id !== id));
    if (currentIntent?.id === id) {
      setCurrentIntent(null);
    }
    
    toast({
      title: "Intent șters",
      description: "Intent-ul a fost șters cu succes",
    });
  };

  const handleSaveIntent = (intent: Intent) => {
    if (!intent.name || !intent.response) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive"
      });
      return;
    }

    if (intent.trainingPhrases.length < 2) {
      toast({
        title: "Eroare",
        description: "Adăugați cel puțin 2 fraze de antrenament",
        variant: "destructive"
      });
      return;
    }

    const updatedIntents = intents.some(i => i.id === intent.id)
      ? intents.map(i => i.id === intent.id ? {...intent, usageCount: i.usageCount || 0} : i)
      : [...intents, {...intent, usageCount: 0}];

    setIntents(updatedIntents);
    setCurrentIntent(null);
    
    toast({
      title: "Intent salvat",
      description: "Intent-ul a fost salvat cu succes",
    });
  };

  const handleConnectAI = () => {
    setIsConnected(true);
    toast({
      title: "Conectat cu succes",
      description: "Chatbot-ul a fost conectat la serviciul AI",
    });
  };

  return (
    <Tabs defaultValue="intents" className="w-full space-y-6">
      <TabsList className="w-full grid grid-cols-3 mb-4">
        <TabsTrigger value="intents" className="flex items-center gap-2">
          <MessageSquareText className="h-4 w-4" /> Intents
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <ChartBar className="h-4 w-4" /> Analytics
        </TabsTrigger>
        <TabsTrigger value="nlp" className="flex items-center gap-2">
          <Network className="h-4 w-4" /> NLP Configuration
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="intents">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <IntentList 
              intents={intents} 
              onEdit={handleEditIntent} 
              onDelete={handleDeleteIntent} 
              onAddNew={handleAddNewIntent} 
            />
            <AIConnector isConnected={isConnected} onConnect={handleConnectAI} />
          </div>

          <div className="lg:col-span-2">
            {currentIntent ? (
              <IntentForm 
                currentIntent={currentIntent} 
                onSave={handleSaveIntent} 
                onCancel={() => setCurrentIntent(null)} 
              />
            ) : (
              <ChatbotPreview />
            )}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="analytics">
        <ChatAnalytics />
      </TabsContent>
      
      <TabsContent value="nlp">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <IntentList 
              intents={intents} 
              onEdit={handleEditIntent} 
              onDelete={handleDeleteIntent} 
              onAddNew={handleAddNewIntent} 
            />
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Entity Extraction</h2>
                <p className="text-muted-foreground mb-4">
                  Chatbot-ul poate extrage automat următoarele entități din mesajele utilizatorilor:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">Order Numbers</span>
                    <span className="text-sm">Exemplu: #123456</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">Dates</span>
                    <span className="text-sm">Exemplu: 15/03/2023</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded mr-2">Currency Values</span>
                    <span className="text-sm">Exemplu: 1500 RON</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Intent Matching</h2>
                <p className="text-muted-foreground mb-4">
                  Sistemul utilizează o abordare avansată de potrivire a intent-urilor bazată pe:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">1</div>
                    <div>
                      <span className="font-medium">Tokenizare</span>
                      <p className="text-sm text-muted-foreground">Împărțirea textului în cuvinte și prelucrarea pentru a elimina semnele de punctuație.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">2</div>
                    <div>
                      <span className="font-medium">Vectorizare</span>
                      <p className="text-sm text-muted-foreground">Transformarea textului în vectori pentru comparație matematică.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mr-2 mt-0.5">3</div>
                    <div>
                      <span className="font-medium">Similaritate Cosinus</span>
                      <p className="text-sm text-muted-foreground">Calcularea similarității dintre mesajul utilizatorului și frazele de antrenament.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ChatbotConfiguration;
