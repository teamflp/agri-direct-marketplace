
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/services/chat-service';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
        <Avatar className={`mt-0.5 ${message.role === 'user' ? 'bg-agrimarket-orange' : 'bg-agrimarket-green'}`}>
          {message.role === 'user' ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </Avatar>
        
        <div>
          <div 
            className={`rounded-lg px-3 py-2 text-sm ${
              message.role === 'user' 
                ? 'bg-agrimarket-orange text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.content}
          </div>
          <div className={`text-xs mt-1 text-gray-500 ${message.role === 'user' ? 'text-right' : ''}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
