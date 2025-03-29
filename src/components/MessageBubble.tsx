
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

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src="/lovable-uploads/624a3e22-88e3-42bc-8da6-c6d619d9c10a.png" alt="Alex" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}

      <div className="max-w-[80%]">
        <div
          className={cn(
            "px-4 py-2 rounded-lg mb-1",
            isUser
              ? "chat-bubble-user"
              : "chat-bubble-ai"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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
        <Avatar className="h-8 w-8 ml-2 mt-1">
          <AvatarImage src="/lovable-uploads/0aa33a32-a44c-4cc6-a1d7-a00829a8b8ef.png" alt="You" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
