
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useChat();

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        className={`text-lg px-4 py-1 rounded-full ${
          mode === "sweetTalk" 
            ? "text-primary font-semibold" 
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => setMode("sweetTalk")}
      >
        <Heart className={`h-5 w-5 mr-2 ${
          mode === "sweetTalk" ? "fill-primary" : ""
        }`} />
        <span>Sweet Talk</span>
      </Button>

      <Button
        variant="default"
        size="sm"
        className={`text-lg px-4 py-1 rounded-full ${
          mode === "roleplay" 
            ? "bg-secondary text-white font-semibold" 
            : "bg-muted text-muted-foreground hover:bg-secondary/80 hover:text-white"
        }`}
        onClick={() => setMode("roleplay")}
      >
        <Sparkles className="h-5 w-5 mr-2" />
        <span>Roleplay</span>
      </Button>
    </div>
  );
};

export default ModeToggle;
