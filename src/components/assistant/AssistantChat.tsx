
import { Button } from "@/components/ui/button";
import { XCircle, Plus, Sparkles } from "lucide-react";
import { Message } from "@/models/Message";
import ChatWindow from "./ChatWindow";
import QuickReplies from "./QuickReplies";

interface AssistantChatProps {
  isMobile: boolean;
  messages: Message[];
  isTyping: boolean;
  inputMessage: string;
  followUpQuestions: string[];
  onSendMessage: () => void;
  onInputChange: (value: string) => void;
  onNewChat: () => void;
  onFollowUpClick: (message: string) => void;
  showQuickReplies: boolean;
  toggleQuickReplies: () => void;
  handleQuickReply: (message: string) => void;
}

const AssistantChat = ({
  isMobile,
  messages,
  isTyping,
  inputMessage,
  followUpQuestions,
  onSendMessage,
  onInputChange,
  onNewChat,
  onFollowUpClick,
  showQuickReplies,
  toggleQuickReplies,
  handleQuickReply
}: AssistantChatProps) => {
  return (
    <>
      <div className={`fixed ${isMobile ? 'bottom-[88px] left-3 right-3' : 'bottom-24 right-6 w-[450px]'} flex flex-col rounded-lg shadow-xl z-50 bg-background border overflow-hidden max-h-[80vh]`}>
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-20">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleQuickReplies}
          >
            {showQuickReplies ? <XCircle size={16} /> : <Plus size={16} />}
          </Button>
          
          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
            <Sparkles size={14} className="text-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Business Buddy AI</span>
            <span className="text-xs bg-primary/10 px-1.5 py-0.5 rounded-full text-primary">GPT-4</span>
          </div>
        </div>
        
        <ChatWindow 
          messages={messages} 
          isTyping={isTyping} 
          onSendMessage={onSendMessage}
          onNewChat={onNewChat}
          inputValue={inputMessage}
          onInputChange={onInputChange}
          followUpQuestions={followUpQuestions}
          onFollowUpClick={onFollowUpClick}
        />
      </div>

      {showQuickReplies && (
        <div className={`fixed ${isMobile ? 'bottom-[88px] left-3' : 'bottom-24 left-6'} z-50`}>
          <QuickReplies onSelectReply={handleQuickReply} />
        </div>
      )}
    </>
  );
};

export default AssistantChat;
