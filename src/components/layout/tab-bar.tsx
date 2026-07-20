"use client";

import { useChat } from "@/lib/chat-context";
import { Plus, X } from "lucide-react";
import { MouseEvent } from "react";

export function TabBar() {
  const { sessions, activeSessionId, switchSession, closeSession, createSession } = useChat();

  const handleClose = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    closeSession(id);
  };

  return (
    <div className="flex h-[35px] items-end bg-tab-bar overflow-x-auto border-b border-border [&::-webkit-scrollbar]:hidden shrink-0 w-full">
      {sessions.map((session) => {
        const isActive = session.id === activeSessionId;
        return (
          <div
            key={session.id}
            onClick={() => switchSession(session.id)}
            className={`group relative flex h-[35px] min-w-fit items-center px-3 cursor-pointer text-[12px] border-r border-border transition-colors ${
              isActive
                ? "bg-tab-active text-tab-active-foreground tab-active-indicator"
                : "bg-tab-bar text-tab-bar-foreground hover:bg-accent"
            }`}
          >
            <span className="truncate max-w-[150px] pr-2 select-none">
              {session.title || "New Chat"}
            </span>
            <button
              onClick={(e) => handleClose(e, session.id)}
              className={`flex items-center justify-center size-5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
      
      <button
        onClick={() => createSession()}
        className="flex h-[35px] w-[35px] items-center justify-center text-tab-bar-foreground hover:bg-accent transition-colors shrink-0"
        aria-label="New Session"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
