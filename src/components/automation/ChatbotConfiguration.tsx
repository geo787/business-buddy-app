
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareText, ChartBar, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Intent, getStoredIntents } from "@/models/Intent";
import IntentList from "./IntentList";
import AIConnector from "./AIConnector";
import IntentForm from "./IntentForm";
import ChatbotPreview from "./ChatbotPreview";
import IntentAnalytics from "./chatbot/IntentAnalytics";
import NLPConfiguration from "./chatbot/NLPConfiguration";

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

  // Prepare data for analytics
  const intentUsageData = intents.map(intent => ({
    name: intent.name,
    value: intent.usageCount || 0
  }));

  const categoryData = Object.entries(
    intents.reduce((acc, intent) => {
      const category = intent.category === "banking" ? "Banking" : "Logistică";
      acc[category] = (acc[category] || 0) + (intent.usageCount || 0);
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

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
        <IntentAnalytics 
          intentUsageData={intentUsageData}
          categoryData={categoryData}
        />
      </TabsContent>
      
      <TabsContent value="nlp">
        <NLPConfiguration />
      </TabsContent>
    </Tabs>
  );
};

export default ChatbotConfiguration;
