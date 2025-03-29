
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import ModeToggle from "./ModeToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 p-4 fixed top-0 left-0 w-full z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SweetPlay
          </h1>
        </div>
        
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
