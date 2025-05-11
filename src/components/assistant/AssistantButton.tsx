
import { Bot, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const AssistantButton = ({ isOpen, onClick }: AssistantButtonProps) => {
  return (
    <Button
      className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 flex items-center justify-center shadow-lg z-50 bg-gradient-to-r from-primary to-primary/80"
      onClick={onClick}
    >
      {isOpen ? <XCircle size={24} /> : <Bot size={24} />}
    </Button>
  );
};

export default AssistantButton;
