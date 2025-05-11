
import { Bot, XCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const AssistantButton = ({ isOpen, onClick }: AssistantButtonProps) => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full p-4 h-16 w-16 flex items-center justify-center shadow-lg z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-pulse"
      onClick={onClick}
    >
      {isOpen ? <XCircle size={26} /> : <Sparkles size={26} />}
    </Button>
  );
};

export default AssistantButton;
