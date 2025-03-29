
import React from "react";
import { Message } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  isLatest: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLatest }) => {
  const isUser = message.sender === "user";
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Check if message contains Arabic text
  const containsArabic = /[\u0600-\u06FF]/.test(message.text);

  return (
    <div
      className={cn(
        "flex w-full mb-3 sm:mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 mr-2 mt-1 border border-accent/20 flex-shrink-0 shadow-sm">
          <AvatarImage src="/lovable-uploads/624a3e22-88e3-42bc-8da6-c6d619d9c10a.png" alt="Alex" />
          <AvatarFallback className="bg-primary/20"></AvatarFallback>
        </Avatar>
      )}

      <div className={cn("max-w-[75%] sm:max-w-[70%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm sm:text-base mb-1 shadow-sm",
            isUser
              ? "message-bubble-user text-primary-foreground rounded-br-sm"
              : "message-bubble-bot text-card-foreground rounded-bl-sm"
          )}
          dir={containsArabic ? "rtl" : "ltr"}
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <div
          className={cn(
            "text-[10px] sm:text-xs text-muted-foreground",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formattedTime}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ml-2 mt-1 border border-secondary/20 flex-shrink-0 shadow-sm">
          <AvatarImage src="/lovable-uploads/0aa33a32-a44c-4cc6-a1d7-a00829a8b8ef.png" alt="You" />
          <AvatarFallback className="bg-secondary/20"></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
