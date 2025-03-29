
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModeToggle from "./ModeToggle";

const Header: React.FC = () => {
  const { clearMessages } = useChat();

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 p-4 flex items-center justify-between fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-sm">A</span>
        </div>
        <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          SweetPlay
        </h1>
      </div>

      <div className="flex items-center space-x-1">
        <ModeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={clearMessages}>
              Clear Chat
            </DropdownMenuItem>
            <DropdownMenuItem>
              About
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
