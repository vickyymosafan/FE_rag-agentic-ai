"use client";

import { useChat } from "@/lib/chat-context";
import { ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function BreadcrumbBar() {
  const { activeSession } = useChat();

  return (
    <div className="flex h-[22px] items-center px-3 bg-breadcrumb text-breadcrumb-foreground text-[11px] shrink-0 w-full overflow-hidden whitespace-nowrap">
      <div className="md:hidden flex items-center mr-2">
        <SidebarTrigger className="h-4 w-4" />
      </div>
      
      <span className="cursor-pointer hover:text-foreground transition-colors select-none">
        RAG Academic
      </span>
      
      <ChevronRight className="size-3 mx-1 opacity-50 shrink-0" />
      
      <span className="cursor-pointer hover:text-foreground transition-colors select-none truncate">
        {activeSession?.title || "New Chat"}
      </span>
    </div>
  );
}
