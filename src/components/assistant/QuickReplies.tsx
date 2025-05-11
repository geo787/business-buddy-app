
import { Card } from "@/components/ui/card";
import { TrendingUp, BarChart3, Truck } from "lucide-react";

interface QuickReply {
  icon: React.ReactNode;
  text: string;
  message: string;
}

interface QuickRepliesProps {
  onSelectReply: (message: string) => void;
}

const QuickReplies = ({ onSelectReply }: QuickRepliesProps) => {
  const quickReplies: QuickReply[] = [
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

  return (
    <div className="flex flex-col space-y-2">
      {quickReplies.map((reply, index) => (
        <Card 
          key={index}
          className="p-4 shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          onClick={() => onSelectReply(reply.message)}
        >
          <div className="flex items-center gap-2">
            {reply.icon}
            <span className="text-sm">{reply.text}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickReplies;
