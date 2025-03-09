
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save } from "lucide-react";
import { Intent } from "@/models/Intent";

interface IntentFormProps {
  currentIntent: Intent;
  onSave: (intent: Intent) => void;
  onCancel: () => void;
}

const IntentForm = ({ currentIntent, onSave, onCancel }: IntentFormProps) => {
  const [intent, setIntent] = useState<Intent>(currentIntent);
  const [newPhrase, setNewPhrase] = useState("");
  const [isAddingPhrase, setIsAddingPhrase] = useState(false);

  const handleAddPhrase = () => {
    if (!newPhrase.trim()) return;
    
    setIntent({
      ...intent,
      trainingPhrases: [...intent.trainingPhrases, newPhrase.trim()]
    });
    
    setNewPhrase("");
    setIsAddingPhrase(false);
  };

  const handleRemovePhrase = (phrase: string) => {
    setIntent({
      ...intent,
      trainingPhrases: intent.trainingPhrases.filter(p => p !== phrase)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {intent.id !== "" ? "Editare Intent" : "Adăugare Intent Nou"}
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
              value={intent.name}
              onChange={(e) => setIntent({...intent, name: e.target.value})}
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
                  checked={intent.category === "banking"}
                  onChange={() => setIntent({...intent, category: "banking"})}
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="banking">Banking</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="logistics"
                  checked={intent.category === "logistics"}
                  onChange={() => setIntent({...intent, category: "logistics"})}
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
              {intent.trainingPhrases.length > 0 ? (
                <div className="space-y-2">
                  {intent.trainingPhrases.map((phrase, index) => (
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
              value={intent.response}
              onChange={(e) => setIntent({...intent, response: e.target.value})}
              rows={4}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Anulează
        </Button>
        <Button onClick={() => onSave(intent)}>
          <Save size={16} className="mr-2" /> Salvează Intent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntentForm;
