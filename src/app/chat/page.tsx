"use client"

import { useState, useCallback } from "react"
import { ChatMessages } from "@/components/chat/chat-messages"
import { RightInputPanel } from "@/components/layout/right-input-panel"
import { MobileInputDrawer } from "@/components/layout/mobile-input-drawer"
import { CommandPalette } from "@/components/layout/command-palette"
import { ErrorBoundary } from "@/components/layout/error-boundary"
import { addToHistory } from "@/components/layout/chat-history"
import type { FileAttachment } from "@/lib/use-file-upload"
import { useChatStats } from "@/lib/chat-stats-context"
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

  const { setStats } = useChatStats()

  useKeyboardShortcuts({
    onCommandPalette: () => setCommandOpen(true),
    onCloseChat: () => setMessages([]),
  })

  const handleSend = useCallback(async (query: string, file?: FileAttachment, model?: string) => {
    addToHistory(query)
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: file ? `${query}\n\n[Attached: ${file.name}]` : query,
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const body: Record<string, unknown> = { query, userId: "anonymous" }
      if (file) {
        body.fileName = file.name
        body.fileType = file.type
        body.fileData = file.base64
      }
      if (model) {
        body.model = model
      }
      const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL ?? "/api/rag/query"
      const res = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()

      const confidence = data.confidence ?? 0
      const asiScore = data.asiScore ?? 0
      const citations = data.citations ?? []
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer ?? "Maaf, saya tidak dapat menemukan jawaban dari dokumen yang tersedia.",
        citations,
        confidence,
        asiScore,
        reasoningPath: data.reasoningPath ?? [],
      }
      setMessages((prev) => [...prev, assistantMsg])
      setStats({
        asiScore,
        confidence,
        sourcesCount: citations.length,
        model: model ?? "Gemini 2.5 Flash",
        cacheHit: data.cacheHit ?? false,
      })
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}
