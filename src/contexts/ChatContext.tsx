
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
import { generateResponseWithGemini, generateScenarioWithGemini } from "../utils/geminiApi";
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
      // Initialize with Lebanese greeting
      const initialGreeting: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "هلا حبيبي! كيفك؟ شو عم تعمل اليوم؟",
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
      setScenarioSelected(null);
    } else {
      // Initialize roleplay with Lebanese prompt
      const initialRoleplayMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "هلا فيك! بتحب نلعب سوا شي سيناريو حلو؟ اختار شي من القائمة يلا",
        timestamp: new Date(),
      };
      setMessages([initialRoleplayMessage]);
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
      // Pass the entire message history to maintain context
      const aiResponse = await generateResponseWithGemini(
        mode, 
        scenarioSelected?.id,
        [...messages, newUserMessage] // Include the new user message
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
        description: "في مشكلة صغيرة. بتقدر تعيد المحاولة؟",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearMessages = () => {
    if (mode === "sweetTalk") {
      const initialGreeting: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "هلا من جديد حبيبي! كيفك اليوم؟",
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
    } else {
      const initialRoleplayMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "يلا نبلش سيناريو جديد؟ شو بتحب نعمل سوا؟",
        timestamp: new Date(),
      };
      setMessages([initialRoleplayMessage]);
    }
    
    toast({
      description: "تم مسح المحادثة",
    });
  };

  const selectScenario = async (scenario: RoleplayScenario | null) => {
    setScenarioSelected(scenario);
    
    if (scenario) {
      // Create an Arabic version of the scenario description
      setIsTyping(true);
      
      try {
        // Generate a Lebanese introduction to the scenario
        const scenarioPrompt = `أنت أليكس، صديق وحبيب المستخدم. قدم وصف لهذا السيناريو باللهجة اللبنانية بطريقة طبيعية وعفوية كأنك تتحدث مع حبيبتك/حبيبك (جملة أو جملتين): ${scenario.title} - ${scenario.description}`;
        
        const arabicScenarioDescription = await generateScenarioWithGemini(scenarioPrompt);
        
        const newAIMessage: Message = {
          id: Date.now().toString(),
          sender: "ai",
          text: arabicScenarioDescription,
          timestamp: new Date(),
        };
        
        setMessages([newAIMessage]);
        
        // Add first roleplay message after a delay
        setTimeout(() => {
          generateResponseWithGemini(mode, scenario.id, [newAIMessage])
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
              description: "في مشكلة صغيرة. منعيد المحاولة؟",
            });
          })
          .finally(() => {
            setIsTyping(false);
          });
        }, 1000);
      } catch (error) {
        console.error("Error generating scenario description:", error);
        setIsTyping(false);
        toast({
          description: "في مشكلة صغيرة. منعيد المحاولة؟",
        });
      }
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
