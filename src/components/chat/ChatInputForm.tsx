
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ChatInputForm = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  isLoading 
}: ChatInputFormProps) => {
  return (
    <form onSubmit={handleSendMessage} className="flex w-full gap-2">
      <Input 
        placeholder="Tapez votre message..." 
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={isLoading}
        className="border-agrimarket-lightGreen focus-visible:ring-agrimarket-green"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !input.trim()}
        className="bg-agrimarket-green hover:bg-agrimarket-darkGreen"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInputForm;
