
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useChat();

  return (
    <div className="flex rounded-full bg-muted/50 p-1">
      <Button
        variant={mode === "sweetTalk" ? "default" : "ghost"}
        size="sm"
        className={`rounded-full px-4 py-1 ${
          mode === "sweetTalk" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:bg-muted"
        }`}
        onClick={() => setMode("sweetTalk")}
      >
        <Heart className="h-4 w-4 mr-2" />
        <span>Sweet Talk</span>
      </Button>

      <Button
        variant={mode === "roleplay" ? "default" : "ghost"}
        size="sm"
        className={`rounded-full px-4 py-1 ${
          mode === "roleplay" 
            ? "bg-secondary text-secondary-foreground" 
            : "text-muted-foreground hover:bg-muted"
        }`}
        onClick={() => setMode("roleplay")}
      >
        <Sparkles className="h-4 w-4 mr-2" />
        <span>Roleplay</span>
      </Button>
    </div>
  );
};

export default ModeToggle;
