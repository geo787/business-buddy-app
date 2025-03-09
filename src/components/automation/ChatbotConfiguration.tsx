
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Intent, getStoredIntents } from "@/models/Intent";
import IntentList from "./IntentList";
import AIConnector from "./AIConnector";
import IntentForm from "./IntentForm";
import ChatbotPreview from "./ChatbotPreview";

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
      response: ""
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
      ? intents.map(i => i.id === intent.id ? intent : i)
      : [...intents, intent];

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
  );
};

export default ChatbotConfiguration;
