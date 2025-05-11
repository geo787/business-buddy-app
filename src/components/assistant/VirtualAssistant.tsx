
import { useAssistant } from "@/hooks/use-assistant";
import { useIsMobile } from "@/hooks/use-mobile";
import AssistantButton from "./AssistantButton";
import AssistantChat from "./AssistantChat";
import { useEffect } from "react";

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

  // Auto-open the assistant when the page loads
  useEffect(() => {
    // Short delay to ensure the page has loaded fully
    const timer = setTimeout(() => {
      if (!isOpen) {
        toggleAssistant();
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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
