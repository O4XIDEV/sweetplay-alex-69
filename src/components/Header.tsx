
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import ModeToggle from "./ModeToggle";

const Header: React.FC = () => {
  return (
    <header className="bg-background px-4 py-3 fixed top-0 left-0 w-full z-10 border-b border-border/30">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-primary">
            SweetPlay
          </h1>
        </div>
        
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
