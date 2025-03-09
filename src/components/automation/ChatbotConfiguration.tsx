
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Plus, Trash2, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Intent {
  id: string;
  name: string;
  category: "banking" | "logistics";
  trainingPhrases: string[];
  response: string;
}

const ChatbotConfiguration = () => {
  const { toast } = useToast();
  const [intents, setIntents] = useState<Intent[]>([
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
  ]);
  
  const [currentIntent, setCurrentIntent] = useState<Intent | null>(null);
  const [newPhrase, setNewPhrase] = useState("");
  const [isAddingPhrase, setIsAddingPhrase] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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

  const handleSaveIntent = () => {
    if (!currentIntent || !currentIntent.name || !currentIntent.response) {
      toast({
        title: "Eroare",
        description: "Completați toate câmpurile obligatorii",
        variant: "destructive"
      });
      return;
    }

    if (currentIntent.trainingPhrases.length < 2) {
      toast({
        title: "Eroare",
        description: "Adăugați cel puțin 2 fraze de antrenament",
        variant: "destructive"
      });
      return;
    }

    const updatedIntents = intents.some(intent => intent.id === currentIntent.id)
      ? intents.map(intent => intent.id === currentIntent.id ? currentIntent : intent)
      : [...intents, currentIntent];

    setIntents(updatedIntents);
    setCurrentIntent(null);
    
    toast({
      title: "Intent salvat",
      description: "Intent-ul a fost salvat cu succes",
    });
  };

  const handleAddPhrase = () => {
    if (!newPhrase.trim() || !currentIntent) return;
    
    setCurrentIntent({
      ...currentIntent,
      trainingPhrases: [...currentIntent.trainingPhrases, newPhrase.trim()]
    });
    
    setNewPhrase("");
    setIsAddingPhrase(false);
  };

  const handleRemovePhrase = (phrase: string) => {
    if (!currentIntent) return;
    
    setCurrentIntent({
      ...currentIntent,
      trainingPhrases: currentIntent.trainingPhrases.filter(p => p !== phrase)
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot size={20} />
              Intents
            </CardTitle>
            <CardDescription>
              Configurează intențiile utilizatorilor pentru banking și logistică
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {intents.map((intent) => (
                <div 
                  key={intent.id}
                  className="flex items-center justify-between p-3 rounded-md border cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleEditIntent(intent)}
                >
                  <div className="flex-1">
                    <p className="font-medium">{intent.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {intent.category === "banking" ? "Banking" : "Logistică"} • {intent.trainingPhrases.length} fraze
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteIntent(intent.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAddNewIntent}>
              <Plus size={16} className="mr-2" /> Adaugă Intent Nou
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={20} />
              Conectare AI
            </CardTitle>
            <CardDescription>
              Conectează chatbot-ul la un serviciu AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={isConnected ? "default" : "outline"} 
                  className="flex items-center gap-2"
                  onClick={handleConnectAI}
                  disabled={isConnected}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100">
                    <svg width="14" height="14" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 0.5C7.875 0.5 0 8.375 0 18C0 27.625 7.875 35.5 17.5 35.5C27.125 35.5 35 27.625 35 18C35 8.375 27.125 0.5 17.5 0.5ZM25.8562 14.5312L23.582 25.582C23.4059 26.5211 22.559 26.8867 21.7645 26.4477L17.3828 23.2688L15.2734 25.2879C15.0781 25.4832 14.9121 25.6492 14.5312 25.6492L14.7945 21.1875L23.0215 13.6719C23.3188 13.4086 22.9523 13.2621 22.559 13.525L12.0883 19.8535L7.75391 18.4746C6.83008 18.1715 6.8082 17.2188 7.9375 16.7797L24.5234 10.1621C25.3027 9.85898 25.9898 10.5719 25.8562 14.5312Z" fill="#229ED9" />
                    </svg>
                  </div>
                  Telegram
                </Button>
                <Button 
                  variant={isConnected ? "default" : "outline"} 
                  className="flex items-center gap-2"
                  onClick={handleConnectAI}
                  disabled={isConnected}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5096-2.6067-1.4998z" fill="#7B12C3" />
                    </svg>
                  </div>
                  Discord
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={isConnected ? "default" : "outline"} 
                  className="flex items-center gap-2" 
                  onClick={handleConnectAI}
                  disabled={isConnected}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <svg width="16" height="16" viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" fill="#25D366"/>
                    </svg>
                  </div>
                  WhatsApp
                </Button>
                <Button 
                  variant={isConnected ? "default" : "outline"} 
                  className="flex items-center gap-2" 
                  onClick={handleConnectAI}
                  disabled={isConnected}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.2416 9.54253C21.6428 7.13195 20.1184 5.26813 18.0722 4.18417C18.9161 5.38365 19.4638 6.73649 19.6947 8.14162C19.0958 7.46186 18.4969 6.782 17.809 6.19252C14.2912 2.9957 8.92455 2.90523 5.31584 5.89679C1.70713 8.88835 1.2484 13.7019 4.21833 18.0215C7.18826 22.3411 12.6068 24.0244 17.5333 22.1606C17.9911 21.977 18.4041 21.7934 18.8171 21.5192C19.9635 20.8394 21.0121 19.9301 21.873 18.8683C23.5051 16.513 23.9269 13.6114 22.6827 10.904C22.5607 10.5846 22.4119 10.0635 22.2416 9.54253ZM19.4086 17.1348C18.8171 18.1287 17.9015 18.9728 16.6758 19.4939C15.174 20.1511 13.5971 20.3573 12.0401 20.0378C9.89346 19.6293 8.07935 18.4298 6.731 16.4555C5.15673 14.1229 4.58356 11.9122 5.0517 9.36947C5.48253 7.1367 6.8677 5.40064 8.92455 4.27781C9.20082 4.09687 9.46802 3.91592 9.75869 3.76822C10.0307 3.61131 10.3028 3.48679 10.5748 3.37142C13.6156 2.43987 16.5722 3.00619 19.0512 5.29398C19.0056 5.29398 18.9713 5.29398 18.9256 5.29398C15.3621 5.29398 12.4831 8.19917 12.4831 11.7966C12.4831 15.3941 15.3621 18.2992 18.9256 18.2992C19.0758 18.2992 19.2322 18.2992 19.4086 18.2766V17.1348Z" fill="#41416E"/>
                    </svg>
                  </div>
                  Slack
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {currentIntent ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {currentIntent.id !== "" ? "Editare Intent" : "Adăugare Intent Nou"}
              </CardTitle>
              <CardDescription>
                Configurează detaliile pentru acest intent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="intent-name" className="text-sm font-medium">
                    Nume Intent*
                  </label>
                  <Input
                    id="intent-name"
                    placeholder="Ex: check_order_status"
                    value={currentIntent.name}
                    onChange={(e) => setCurrentIntent({...currentIntent, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Categorie*
                  </label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="banking"
                        checked={currentIntent.category === "banking"}
                        onChange={() => setCurrentIntent({...currentIntent, category: "banking"})}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="banking">Banking</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="logistics"
                        checked={currentIntent.category === "logistics"}
                        onChange={() => setCurrentIntent({...currentIntent, category: "logistics"})}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="logistics">Logistică</label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium flex justify-between">
                    <span>Fraze de Antrenament*</span>
                    <span className="text-xs text-muted-foreground">Minim 2 fraze</span>
                  </label>
                  
                  <div className="border rounded-md p-3">
                    {currentIntent.trainingPhrases.length > 0 ? (
                      <div className="space-y-2">
                        {currentIntent.trainingPhrases.map((phrase, index) => (
                          <div key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                            <span>{phrase}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemovePhrase(phrase)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground p-4">
                        Nu există fraze de antrenament.
                      </div>
                    )}

                    {isAddingPhrase ? (
                      <div className="mt-2 flex gap-2">
                        <Input
                          placeholder="Adaugă o frază nouă"
                          value={newPhrase}
                          onChange={(e) => setNewPhrase(e.target.value)}
                        />
                        <Button variant="outline" onClick={() => setIsAddingPhrase(false)}>
                          Anulează
                        </Button>
                        <Button onClick={handleAddPhrase}>
                          Adaugă
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full mt-2" 
                        onClick={() => setIsAddingPhrase(true)}
                      >
                        <Plus size={16} className="mr-2" /> Adaugă Frază
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="response" className="text-sm font-medium">
                    Răspuns*
                  </label>
                  <Textarea
                    id="response"
                    placeholder="Ex: Comanda este în depozitul nostru. Va fi expediată mâine."
                    value={currentIntent.response}
                    onChange={(e) => setCurrentIntent({...currentIntent, response: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentIntent(null)}>
                Anulează
              </Button>
              <Button onClick={handleSaveIntent}>
                <Save size={16} className="mr-2" /> Salvează Intent
              </Button>
            </CardFooter>
          </Card>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ChatbotConfiguration;
