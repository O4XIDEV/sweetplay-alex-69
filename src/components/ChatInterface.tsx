
import React, { useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import MessageBubble from "./MessageBubble";
import ScenarioSelector from "./ScenarioSelector";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatInterface: React.FC = () => {
  const { messages, isTyping, mode, scenarioSelected } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show scenario selector if in roleplay mode and no scenario selected
  if (mode === "roleplay" && !scenarioSelected) {
    return <ScenarioSelector />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
      <div className="max-w-2xl mx-auto">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">Start chatting with Alex!</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-start mb-6">
            <Avatar className="h-10 w-10 mr-2 mt-1 border-2 border-primary/20 flex-shrink-0">
              <AvatarImage src="/lovable-uploads/624a3e22-88e3-42bc-8da6-c6d619d9c10a.png" alt="Alex" />
              <AvatarFallback className="bg-primary/20"></AvatarFallback>
            </Avatar>
            <div className="bg-card/50 px-4 py-2 rounded-2xl rounded-bl-sm text-muted-foreground max-w-[80%]">
              <p className="text-sm">Alex is typing...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
