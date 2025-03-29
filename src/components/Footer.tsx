
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Footer: React.FC = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, isTyping } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <footer className="bg-card/80 backdrop-blur-md border-t border-border/50 p-2 sm:p-3 fixed bottom-0 left-0 w-full z-10">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            ref={inputRef}
            type="text"
            placeholder={isTyping ? "أليكس عم يكتب..." : "اكتب رسالة..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-muted/50 border-muted mr-2 rounded-full focus-visible:ring-primary text-sm sm:text-base h-10 sm:h-12"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!message.trim() || isTyping}
            className={`rounded-full h-10 w-10 sm:h-12 sm:w-12 ${
              message.trim() && !isTyping
                ? "bg-primary hover:bg-primary/90"
                : "bg-muted/50 text-muted-foreground"
            }`}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
