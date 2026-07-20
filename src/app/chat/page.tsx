"use client"

import { useCallback } from "react"
import { useChat, type ChatMessage } from "@/lib/chat-context"
import { ChatMessages } from "@/components/chat/chat-messages"
import { RightInputPanel } from "@/components/layout/right-input-panel"
import { MobileInputDrawer } from "@/components/layout/mobile-input-drawer"
import { CommandPalette } from "@/components/layout/command-palette"
import { ErrorBoundary } from "@/components/layout/error-boundary"
import { TabBar } from "@/components/layout/tab-bar"
import { BreadcrumbBar } from "@/components/layout/breadcrumb-bar"
import type { FileAttachment } from "@/lib/use-file-upload"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { useIsMobile } from "@/hooks/use-mobile"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useState } from "react"

export default function ChatPage() {
  const isMobile = useIsMobile()
  const [commandOpen, setCommandOpen] = useState(false)
  const {
    addMessage,
    clearMessages,
    setStats,
    rightPanelCollapsed,
    messages,
  } = useChat()
  const [isLoading, setIsLoading] = useState(false)

  useKeyboardShortcuts({
    onCommandPalette: () => setCommandOpen(true),
    onCloseChat: clearMessages,
  })

  const handleSend = useCallback(
    async (query: string, file?: FileAttachment, model?: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: file ? `${query}\n\n[Attached: ${file.name}]` : query,
        timestamp: Date.now(),
      }
      addMessage(userMsg)
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
        const proxyUrl =
          process.env.NEXT_PUBLIC_PROXY_URL ?? "/api/rag/query"
        const res = await fetch(proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        const data = await res.json()

        const confidence = data.confidence ?? 0
        const asiScore = data.asiScore ?? 0
        const citations = data.citations ?? []
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data.answer ??
            "Maaf, saya tidak dapat menemukan jawaban dari dokumen yang tersedia.",
          timestamp: Date.now(),
          citations,
          confidence,
          asiScore,
          reasoningPath: data.reasoningPath ?? [],
          model: model ?? "Gemini 2.5 Flash",
          cacheHit: data.cacheHit ?? false,
        }
        addMessage(assistantMsg)
        setStats({
          asiScore,
          confidence,
          sourcesCount: citations.length,
          model: model ?? "Gemini 2.5 Flash",
          cacheHit: data.cacheHit ?? false,
        })
      } catch {
        const errorMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Terjadi kesalahan saat menghubungi server. Silakan coba lagi.",
          timestamp: Date.now(),
          confidence: 0,
        }
        addMessage(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [addMessage, setStats]
  )

  const handleQuerySelect = useCallback(
    (query: string) => {
      handleSend(query)
    },
    [handleSend]
  )

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full bg-editor">
        {/* Tab Bar + Breadcrumb — hidden on mobile */}
        <div className="hidden md:block">
          <TabBar />
          <BreadcrumbBar />
        </div>

        {/* Main content */}
        {isMobile ? (
          <div className="flex-1 flex flex-col min-h-0">
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              onQuerySelect={handleQuerySelect}
            />
            <MobileInputDrawer onSend={handleSend} isLoading={isLoading} />
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={65} minSize={40}>
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                onQuerySelect={handleQuerySelect}
              />
            </ResizablePanel>
            {!rightPanelCollapsed && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={35}
                  minSize={25}
                  maxSize={45}
                  collapsible
                >
                  <RightInputPanel
                    onSend={handleSend}
                    isLoading={isLoading}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        )}

        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      </div>
    </ErrorBoundary>
  )
}
