
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ChatInterface from './ChatInterface';
import { cn } from '@/lib/utils';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation pour attirer l'attention
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 10000);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <>
      {/* Version desktop */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <div className="relative">
          {isOpen ? (
            <div className="absolute bottom-0 right-0 mb-20 w-[400px]">
              <div className="rounded-lg shadow-2xl">
                <div className="flex justify-end bg-agrimarket-green text-white p-2 rounded-t-lg">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-agrimarket-darkGreen"
                  >
                    <X size={20} />
                  </Button>
                </div>
                <ChatInterface compact={true} />
              </div>
            </div>
          ) : null}
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "rounded-full w-16 h-16 shadow-lg bg-agrimarket-green hover:bg-agrimarket-darkGreen transition-all duration-300",
              isAnimating && "animate-pulse scale-110"
            )}
          >
            <MessageCircle size={28} className="text-white" />
          </Button>
        </div>
      </div>

      {/* Version mobile - utilise le composant Drawer */}
      <div className="fixed bottom-16 right-6 z-50 md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              className={cn(
                "rounded-full w-14 h-14 shadow-lg bg-agrimarket-green hover:bg-agrimarket-darkGreen transition-all duration-300",
                isAnimating && "animate-pulse scale-110"
              )}
            >
              <MessageCircle size={24} className="text-white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] rounded-t-xl">
            <div className="px-4 pb-4 pt-2 h-full flex flex-col">
              <ChatInterface compact={true} className="border-0 shadow-none" />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default FloatingChatButton;
