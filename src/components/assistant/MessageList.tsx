
import { Bot } from "lucide-react";
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
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-primary text-white rounded-tr-none'
                : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
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
