import { AppSidebar } from "@/components/layout/app-sidebar"
import { StatusBar } from "@/components/layout/status-bar"
import { SidebarInset } from "@/components/ui/sidebar"
import { ChatStatsProvider } from "@/lib/chat-stats-context"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChatStatsProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
          <StatusBar />
        </SidebarInset>
      </div>
    </ChatStatsProvider>
  )
}
