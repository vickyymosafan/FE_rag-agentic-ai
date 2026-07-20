"use client"

import { useState, useCallback } from "react"
import { ChatMessages } from "@/components/chat/chat-messages"
import { RightInputPanel } from "@/components/layout/right-input-panel"
import { MobileInputDrawer } from "@/components/layout/mobile-input-drawer"
import { CommandPalette } from "@/components/layout/command-palette"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: { docName: string; page: number }[]
  confidence?: number
  asiScore?: number
  reasoningPath?: string[]
}

export default function ChatPage() {
  const isMobile = useIsMobile()
  const [commandOpen, setCommandOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Selamat datang di RAG Academic AI. Saya dapat membantu menjawab pertanyaan tentang panduan TA, KP, KKN, dan Kurikulum SI 2026. Silakan tanyakan apa pun!",
      confidence: 1,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  useKeyboardShortcuts({
    onCommandPalette: () => setCommandOpen(true),
  })

  const handleSend = useCallback(async (query: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: query,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787"}/api/rag/query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, userId: "anonymous" }),
        }
      )
      const data = await res.json()

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer ?? "Maaf, saya tidak dapat menemukan jawaban dari dokumen yang tersedia.",
        citations: data.citations ?? [],
        confidence: data.confidence ?? 0,
        asiScore: data.asiScore ?? 0,
        reasoningPath: data.reasoningPath ?? [],
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Terjadi kesalahan saat menghubungi server. Silakan coba lagi.",
        confidence: 0,
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-12 px-4 border-b">
        <SidebarTrigger className="md:hidden" />
        <div className="text-[11px] text-muted-foreground ml-auto hidden sm:block">
          Panduan TA SI 2026 · Panduan KP SI 2026 · Panduan KKN SI 2026 · Kurikulum SI 2026
        </div>
      </div>

      {isMobile ? (
        <div className="flex-1 flex flex-col min-h-0">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <MobileInputDrawer onSend={handleSend} isLoading={isLoading} />
        </div>
      ) : (
        <ResizablePanelGroup orientation="horizontal" className="flex-1">
          <ResizablePanel defaultSize={65} minSize={35}>
            <ChatMessages messages={messages} isLoading={isLoading} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={35}
            minSize={25}
            maxSize={45}
            collapsible
            className="hidden md:block"
          >
            <RightInputPanel onSend={handleSend} isLoading={isLoading} />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
