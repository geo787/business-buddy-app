
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Plus, Trash2 } from "lucide-react";
import { Intent } from "@/models/Intent";

interface IntentListProps {
  intents: Intent[];
  onEdit: (intent: Intent) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const IntentList = ({ intents, onEdit, onDelete, onAddNew }: IntentListProps) => {
  return (
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
              onClick={() => onEdit(intent)}
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
                  onDelete(intent.id);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onAddNew}>
          <Plus size={16} className="mr-2" /> Adaugă Intent Nou
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntentList;
