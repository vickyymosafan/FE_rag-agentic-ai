"use client";

import { useChat } from "@/lib/chat-context";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTree } from "./file-tree";
import { SearchPanel } from "./search-panel";
import { ChatHistory } from "./chat-history";
import { CollectionList } from "./collection-list";

export function AppSidebar() {
  const { activePanel } = useChat();

  const getTitle = () => {
    switch (activePanel) {
      case "files": return "EXPLORER";
      case "history": return "CHAT HISTORY";
      case "search": return "SEARCH";
      case "collections": return "COLLECTIONS";
      default: return "";
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="group-data-[collapsible=icon]:hidden px-3 py-2 border-b border-border/10">
        <h2 className="text-[11px] font-semibold tracking-wider uppercase text-sidebar-foreground/70">
          {getTitle()}
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {activePanel === "files" && <FileTree />}
          {activePanel === "history" && <ChatHistory />}
          {activePanel === "search" && <SearchPanel />}
          {activePanel === "collections" && (
            <CollectionList onQuerySelect={() => {}} />
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
