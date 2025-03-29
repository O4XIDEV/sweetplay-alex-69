
import React, { useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import MessageBubble from "./MessageBubble";
import ScenarioSelector from "./ScenarioSelector";
import { Loader2 } from "lucide-react";

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
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-start mb-4">
            <div className="h-8 w-8 flex items-center justify-center mr-2">
              <div className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              </div>
            </div>
            <div className="bg-card px-4 py-2 rounded-lg text-muted-foreground max-w-[80%]">
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
