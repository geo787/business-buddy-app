
import { useAssistant } from "@/hooks/use-assistant";
import { useIsMobile } from "@/hooks/use-mobile";
import AssistantButton from "./AssistantButton";
import AssistantChat from "./AssistantChat";

const VirtualAssistant = () => {
  const isMobile = useIsMobile();
  const { 
    isOpen, 
    messages, 
    isTyping, 
    inputMessage, 
    followUpQuestions,
    showQuickReplies,
    handleSendMessage, 
    setInputMessage, 
    startNewChat,
    handleQuickReply,
    toggleQuickReplies,
    toggleAssistant
  } = useAssistant();

  return (
    <>
      <AssistantButton isOpen={isOpen} onClick={toggleAssistant} />

      {isOpen && (
        <AssistantChat
          isMobile={isMobile}
          messages={messages}
          isTyping={isTyping}
          inputMessage={inputMessage}
          followUpQuestions={followUpQuestions}
          onSendMessage={handleSendMessage}
          onInputChange={setInputMessage}
          onNewChat={startNewChat}
          onFollowUpClick={handleQuickReply}
          showQuickReplies={showQuickReplies}
          toggleQuickReplies={toggleQuickReplies}
          handleQuickReply={handleQuickReply}
        />
      )}
    </>
  );
};

export default VirtualAssistant;
