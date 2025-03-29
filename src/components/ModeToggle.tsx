
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Heart, Sparkles } from "lucide-react";

interface ModeToggleProps {
  isMobile?: boolean;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isMobile = false }) => {
  const { mode, setMode } = useChat();

  return (
    <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as "sweetTalk" | "roleplay")}>
      <ToggleGroupItem 
        value="sweetTalk" 
        className={`px-2 py-1 md:px-3 md:py-1.5 rounded-l-full text-sm md:text-base border-r ${
          mode === "sweetTalk" 
            ? "bg-primary text-white" 
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Heart className={`h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 ${
          mode === "sweetTalk" ? "fill-white" : ""
        }`} />
        <span>{isMobile ? "" : "Sweet Talk"}</span>
      </ToggleGroupItem>
      
      <ToggleGroupItem 
        value="roleplay" 
        className={`px-2 py-1 md:px-3 md:py-1.5 rounded-r-full text-sm md:text-base ${
          mode === "roleplay" 
            ? "bg-secondary text-white" 
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
        <span>{isMobile ? "" : "Roleplay"}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ModeToggle;
