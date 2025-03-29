
import React, { useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import MessageBubble from "./MessageBubble";
import ScenarioSelector from "./ScenarioSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatInterface: React.FC = () => {
  const { messages, isTyping, mode, scenarioSelected } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Show scenario selector if in roleplay mode and no scenario selected
  if (mode === "roleplay" && !scenarioSelected) {
    return <ScenarioSelector />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4 pb-16 sm:pb-20 md:px-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full py-10">
            <p className="text-muted-foreground text-sm">ابدأ المحادثة مع اليكس!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))
        )}
        
        {isTyping && (
          <div className="flex items-start mb-4">
            <Avatar className="h-8 w-8 sm:h-9 sm:w-9 mr-2 mt-1 border border-primary/20 flex-shrink-0">
              <AvatarImage src="/lovable-uploads/624a3e22-88e3-42bc-8da6-c6d619d9c10a.png" alt="Alex" />
              <AvatarFallback className="bg-primary/20"></AvatarFallback>
            </Avatar>
            <div className="bg-card/50 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-bl-sm text-muted-foreground max-w-[80%]">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
