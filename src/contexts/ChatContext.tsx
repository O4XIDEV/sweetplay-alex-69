
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
      // Initialize with Arabic greeting
      const initialGreeting: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "مرحباً! كيف حالك اليوم؟ أنا أليكس وأنا هنا للتحدث معك.",
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
      setScenarioSelected(null);
    } else {
      // Initialize roleplay with Arabic prompt
      const initialRoleplayMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "أهلاً! يسعدني أن نبدأ سيناريو لعب أدوار معاً. هل ترغب في اختيار سيناريو من القائمة؟",
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
        description: "حدث خطأ في إنشاء الرد. يرجى المحاولة مرة أخرى.",
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
        text: "مرحباً من جديد! كيف يمكنني مساعدتك اليوم؟",
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
    } else {
      const initialRoleplayMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: "دعنا نبدأ سيناريو جديد. ما الذي ترغب في تجربته؟",
        timestamp: new Date(),
      };
      setMessages([initialRoleplayMessage]);
    }
    
    toast({
      description: "تم مسح سجل المحادثة.",
    });
  };

  const selectScenario = async (scenario: RoleplayScenario | null) => {
    setScenarioSelected(scenario);
    
    if (scenario) {
      // Create an Arabic version of the scenario description
      setIsTyping(true);
      
      try {
        // Generate an Arabic introduction to the scenario
        const scenarioPrompt = `أنت أليكس في سيناريو لعب أدوار. قم بتقديم وصف لهذا السيناريو باللغة العربية بطريقة جذابة ورومانسية (2-3 جمل): ${scenario.title} - ${scenario.description}`;
        
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
              description: "حدث خطأ في بدء لعب الأدوار. يرجى المحاولة مرة أخرى.",
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
          description: "حدث خطأ في تحميل السيناريو. يرجى المحاولة مرة أخرى.",
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
