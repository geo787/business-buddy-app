
import { Button } from "@/components/ui/button";
import { XCircle, Plus } from "lucide-react";
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
      <div className={`fixed ${isMobile ? 'bottom-[88px] left-3 right-3' : 'bottom-24 right-6 w-96'} flex flex-col rounded-lg shadow-xl z-50 bg-background border overflow-hidden`}>
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
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 left-2 h-8 w-8 p-0 rounded-full"
          onClick={toggleQuickReplies}
        >
          {showQuickReplies ? <XCircle size={16} /> : <Plus size={16} />}
        </Button>
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
