
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
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 mr-2 mt-1 border border-primary/20 flex-shrink-0">
          <AvatarImage src="/lovable-uploads/624a3e22-88e3-42bc-8da6-c6d619d9c10a.png" alt="Alex" />
          <AvatarFallback className="bg-primary/20"></AvatarFallback>
        </Avatar>
      )}

      <div className={cn("max-w-[80%] sm:max-w-[70%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl mb-1",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-card text-card-foreground rounded-bl-sm"
          )}
          dir={containsArabic ? "rtl" : "ltr"}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <div
          className={cn(
            "text-xs text-muted-foreground",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formattedTime}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-9 w-9 ml-2 mt-1 border border-primary/20 flex-shrink-0">
          <AvatarImage src="/lovable-uploads/0aa33a32-a44c-4cc6-a1d7-a00829a8b8ef.png" alt="You" />
          <AvatarFallback className="bg-primary/20"></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
