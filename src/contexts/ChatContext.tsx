
import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  ChatContextType, 
  ChatMode, 
  Message, 
  RoleplayScenario 
} from "../types";
import { 
  sweetTalkInitialMessages, 
  roleplayInitialMessages,
  generateAIResponse
} from "../data/sampleMessages";
import { useToast } from "@/components/ui/use-toast";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [messages, setMessages] = useState<Message[]>(sweetTalkInitialMessages);
  const [mode, setMode] = useState<ChatMode>("sweetTalk");
  const [isTyping, setIsTyping] = useState(false);
  const [scenarioSelected, setScenarioSelected] = useState<RoleplayScenario | null>(null);
  const { toast } = useToast();

  // Reset messages when mode changes
  useEffect(() => {
    if (mode === "sweetTalk") {
      setMessages(sweetTalkInitialMessages);
      setScenarioSelected(null);
    } else {
      setMessages(roleplayInitialMessages);
    }
  }, [mode]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(
        mode, 
        scenarioSelected?.id
      );
      
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const clearMessages = () => {
    if (mode === "sweetTalk") {
      setMessages(sweetTalkInitialMessages);
    } else {
      setMessages(roleplayInitialMessages);
    }
    
    toast({
      description: "Chat history cleared.",
    });
  };

  const selectScenario = (scenario: RoleplayScenario | null) => {
    setScenarioSelected(scenario);
    
    if (scenario) {
      const newAIMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: `Let's begin our "${scenario.title}" roleplay. ${scenario.description}`,
        timestamp: new Date(),
      };
      
      setMessages([newAIMessage]);
      
      // Add first roleplay message after a delay
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          const aiResponse = generateAIResponse(mode, scenario.id);
          
          const firstRoleplayMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: aiResponse,
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, firstRoleplayMessage]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        mode,
        isTyping,
        setMode: handleModeChange,
        sendMessage,
        clearMessages,
        scenarioSelected,
        selectScenario,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
