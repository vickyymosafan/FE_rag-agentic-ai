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
import {
  FileText,
  History,
  Search,
  FolderOpen,
  Settings,
} from "lucide-react"
import { FileTree } from "@/components/layout/file-tree"
import { useSession } from "next-auth/react"

const historyItems = [
  { query: "Syarat pendaftaran TA", time: "5m ago" },
  { query: "Berapa SKS yang harus ditempuh?", time: "1h ago" },
  { query: "Jadwal KKN 2026", time: "3h ago" },
  { query: "Syarat KP semester genap", time: "1d ago" },
]

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

          <TabsContent value="history" className="flex-1 px-2">
            <ScrollArea className="h-full">
              <SidebarGroup>
                <SidebarGroupLabel>Chat History</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {historyItems.map((item) => (
                      <SidebarMenuItem key={item.query}>
                        <SidebarMenuButton className="text-xs">
                          <History className="size-3.5 shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="truncate">{item.query}</span>
                            <span className="text-[10px] text-muted-foreground">
                              {item.time}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="search" className="flex-1 px-2">
            <div className="text-xs text-muted-foreground p-2">
              Search across documents...
            </div>
          </TabsContent>

          <TabsContent value="collections" className="flex-1 px-2">
            <div className="text-xs text-muted-foreground p-2">
              Saved query collections
            </div>
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
