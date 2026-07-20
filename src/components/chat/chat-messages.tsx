"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { WelcomeScreen } from "./welcome-screen";
import { UserMessage } from "./user-message";
import { AIMessage } from "./ai-message";
import { LoadingMessage } from "./loading-message";
import type { ChatMessage } from "@/lib/chat-context";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onQuerySelect: (query: string) => void;
}

export function ChatMessages({ messages, isLoading, onQuerySelect }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollFAB, setShowScrollFAB] = useState(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollFAB(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const showWelcome = messages.length === 0 && !isLoading;

  if (showWelcome) {
    return <WelcomeScreen onQuerySelect={onQuerySelect} />;
  }

  return (
    <div className="relative flex-1 h-full overflow-hidden flex flex-col">
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4 pb-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => {
              if (msg.role === "user") {
                return (
                  <UserMessage
                    key={msg.id}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                );
              }
              return (
                <AIMessage
                  key={msg.id}
                  {...msg}
                />
              );
            })}
            {isLoading && <LoadingMessage key="loading" />}
          </AnimatePresence>
          <div ref={bottomRef} className="h-4 w-full" />
        </div>
      </ScrollArea>

      {showScrollFAB && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <Button
            size="icon"
            className="w-8 h-8 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
            onClick={scrollToBottom}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
