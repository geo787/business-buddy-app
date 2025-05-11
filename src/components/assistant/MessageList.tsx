
import { Bot, User, Sparkles } from "lucide-react";
import { Message } from "@/models/Message";
import { forwardRef, ForwardedRef } from "react";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = forwardRef(({ messages, isTyping }: MessageListProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 mb-4 ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.sender === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
          )}
          
          <div
            className={`max-w-[85%] p-4 rounded-lg ${
              message.sender === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
            }`}
          >
            {message.content}
          </div>
          
          {message.sender === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <User size={16} />
            </div>
          )}
        </div>
      ))}
      
      {isTyping && (
        <div className="flex gap-3 mb-4 justify-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg rounded-tl-none max-w-[85%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={ref} />
    </>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
