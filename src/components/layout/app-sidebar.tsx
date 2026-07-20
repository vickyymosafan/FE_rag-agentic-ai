"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, History, Search, FolderOpen } from "lucide-react"
import { FileTree } from "@/components/layout/file-tree"
import { SearchPanel } from "@/components/layout/search-panel"
import { CollectionList } from "@/components/layout/collection-list"
import { ChatHistory } from "@/components/layout/chat-history"
import { useSession } from "next-auth/react"

export function AppSidebar() {
  const { data: session } = useSession()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center gap-2 px-3 py-2">
        <SidebarTrigger />
        <span className="text-sm font-semibold truncate group-data-[collapsible=icon]:hidden">
          RAG Academic
        </span>
      </SidebarHeader>

      <SidebarContent>
        <Tabs defaultValue="history" className="flex flex-col h-full">
          <TabsList className="mx-2 grid grid-cols-4">
            <TabsTrigger value="files" title="Files">
              <FileText className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="history" title="History">
              <History className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="search" title="Search">
              <Search className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="collections" title="Collections">
              <FolderOpen className="size-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="flex-1 px-1">
            <ScrollArea className="h-full">
              <SidebarGroup>
                <SidebarGroupLabel>Documents</SidebarGroupLabel>
                <SidebarGroupContent>
                  <FileTree />
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="history" className="flex-1">
            <ChatHistory />
          </TabsContent>

          <TabsContent value="search" className="flex-1">
            <SearchPanel />
          </TabsContent>

          <TabsContent value="collections" className="flex-1 px-1">
            <CollectionList />
          </TabsContent>
        </Tabs>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm">
              <Avatar className="size-5">
                <AvatarFallback className="text-[10px]">
                  {session?.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs truncate">
                {session?.user?.name ?? "Guest"}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
