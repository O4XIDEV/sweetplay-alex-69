
import React from "react";
import ModeToggle from "./ModeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-background px-4 py-3 fixed top-0 left-0 w-full z-10 border-b border-border/30">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary font-playfair">
            SweetPlay
          </h1>
        </div>
        
        <ModeToggle isMobile={isMobile} />
      </div>
    </header>
  );
};

export default Header;
