
export type ChatMode = "sweetTalk" | "roleplay";

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  description: string;
}

export interface ChatContextType {
  messages: Message[];
  mode: ChatMode;
  isTyping: boolean;
  setMode: (mode: ChatMode) => void;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  scenarioSelected: RoleplayScenario | null;
  selectScenario: (scenario: RoleplayScenario | null) => void;
}
