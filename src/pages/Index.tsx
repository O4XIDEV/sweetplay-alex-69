
import React from "react";
import { ChatProvider } from "@/contexts/ChatContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";

const Index: React.FC = () => {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        <Header />
        <main className="flex-1 pt-14 sm:pt-16 pb-14 sm:pb-16 flex flex-col overflow-hidden">
          <ChatInterface />
        </main>
        <Footer />
      </div>
    </ChatProvider>
  );
};

export default Index;
