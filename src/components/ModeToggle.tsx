
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Heart, TheatreMask } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useChat();

  return (
    <div className="flex rounded-full bg-muted p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={mode === "sweetTalk" ? "default" : "ghost"}
            size="sm"
            className={`rounded-full px-3 ${
              mode === "sweetTalk" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setMode("sweetTalk")}
          >
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">Sweet Talk</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Switch to Sweet Talk mode for loving conversation</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={mode === "roleplay" ? "default" : "ghost"}
            size="sm"
            className={`rounded-full px-3 ${
              mode === "roleplay" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setMode("roleplay")}
          >
            <TheatreMask className="h-4 w-4 mr-1" />
            <span className="text-xs">Roleplay</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Switch to Roleplay mode for immersive scenarios</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ModeToggle;
