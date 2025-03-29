
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
  roleplayScenarios
} from "../data/sampleMessages";
import { generateResponseWithGemini } from "../utils/geminiApi";
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

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // Prepare conversation history for Gemini API
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));
      
      conversationHistory.push({
        role: "user",
        content: text,
      });
      
      // Generate AI response using Gemini API
      const aiResponse = await generateResponseWithGemini(
        mode, 
        scenarioSelected?.id,
        conversationHistory
      );
      
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        description: "There was an error generating a response. Please try again.",
      });
    } finally {
      setIsTyping(false);
    }
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

  const selectScenario = async (scenario: RoleplayScenario | null) => {
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
        
        generateResponseWithGemini(mode, scenario.id, [
          { role: "assistant", content: newAIMessage.text }
        ])
        .then(aiResponse => {
          const firstRoleplayMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: aiResponse,
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, firstRoleplayMessage]);
        })
        .catch(error => {
          console.error("Error generating initial roleplay message:", error);
          toast({
            description: "There was an error starting the roleplay. Please try again.",
          });
        })
        .finally(() => {
          setIsTyping(false);
        });
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
