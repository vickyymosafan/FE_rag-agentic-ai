"use client";

import { useChat } from "@/lib/chat-context";
import { MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ChatHistory() {
  const { sessions, activeSessionId, switchSession, closeSession } = useChat();

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center opacity-70">
        <MessageSquare className="w-8 h-8 mb-3 opacity-50" />
        <p className="text-[12px] text-sidebar-foreground">No chat history</p>
        <p className="text-[10px] text-muted-foreground mt-1">Start a new conversation</p>
      </div>
    );
  }

  // Simplified grouping for now (all in one list or just render sessions)
  return (
    <div className="py-2">
      <div className="px-3 py-1 text-[11px] font-semibold text-sidebar-foreground/50 uppercase">
        Recent
      </div>
      <div className="flex flex-col mt-1">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              "group flex items-center justify-between px-3 py-1.5 cursor-pointer text-[12px] vscode-hover transition-colors",
              activeSessionId === session.id ? "vscode-selected text-tab-active-foreground" : "text-sidebar-foreground"
            )}
            onClick={() => switchSession(session.id)}
          >
            <div className="flex items-center gap-2 truncate">
              <MessageSquare className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span className="truncate">{session.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeSession(session.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
