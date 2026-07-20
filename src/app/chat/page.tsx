import { ChatMessages } from "@/components/chat/chat-messages"
import { RightInputPanel } from "@/components/layout/right-input-panel"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-12 px-4 border-b">
        <SidebarTrigger className="md:hidden" />
        <div className="text-xs text-muted-foreground ml-auto">
          Panduan TA SI 2026 · Panduan KP SI 2026 · Panduan KKN SI 2026 · Kurikulum SI 2026
        </div>
      </div>

      <ResizablePanelGroup
        orientation="horizontal"
        className="flex-1"
      >
        <ResizablePanel defaultSize={65} minSize={35}>
          <ChatMessages />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={35}
          minSize={25}
          maxSize={45}
          collapsible
          className="hidden md:block"
        >
          <RightInputPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
