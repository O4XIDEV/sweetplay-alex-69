
import React from "react";
import ModeToggle from "./ModeToggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles } from "lucide-react";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-card/90 backdrop-blur-md px-4 py-3 fixed top-0 left-0 w-full z-10 border-b border-border/30">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair flex items-center">
            <span className="gradient-text">Sweet</span>
            <span className="text-accent">Play</span>
            <Sparkles className="h-4 w-4 ml-1 text-secondary" />
          </h1>
        </div>
        
        <ModeToggle isMobile={isMobile} />
      </div>
    </header>
  );
};

export default Header;
