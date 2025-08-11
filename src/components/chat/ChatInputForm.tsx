
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
  characterCount?: number;
  maxLength?: number;
  isMessageTooLong?: boolean;
}

const ChatInputForm = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  isLoading,
  characterCount = 0,
  maxLength = 2000,
  isMessageTooLong = false
}: ChatInputFormProps) => {
  const progressPercentage = (characterCount / maxLength) * 100;
  const isNearLimit = progressPercentage >= 90;

  return (
    <div className="w-full space-y-2">
      {/* Character counter */}
      {characterCount > 0 && (
        <div className="flex justify-end">
          <span className={`text-xs ${
            isMessageTooLong 
              ? 'text-red-500 font-semibold' 
              : isNearLimit 
                ? 'text-orange-500 font-medium' 
                : 'text-gray-500'
          }`}>
            {characterCount}/{maxLength}
          </span>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="flex w-full gap-2">
        <Input 
          placeholder="Tapez votre message..." 
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
          className={`border-agrimarket-lightGreen focus-visible:ring-agrimarket-green ${
            isMessageTooLong ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !input.trim() || isMessageTooLong}
          className="bg-agrimarket-green hover:bg-agrimarket-darkGreen"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInputForm;
