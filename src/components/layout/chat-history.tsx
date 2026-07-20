"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { History, Trash2, MessageSquare } from "lucide-react"

interface HistoryItem {
  query: string
  time: string
  id: string
}

export function ChatHistory() {
  const [items, setItems] = useState<HistoryItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("chatHistory")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const clearAll = () => {
    setItems([])
    localStorage.removeItem("chatHistory")
  }

  return (
    <div className="flex flex-col h-full">
      {items.length > 0 && (
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="text-[10px] text-muted-foreground">{items.length} queries</span>
          <Button variant="ghost" size="icon" className="size-5" onClick={clearAll} title="Clear history">
            <Trash2 className="size-3" />
          </Button>
        </div>
      )}
      <ScrollArea className="flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
            <MessageSquare className="size-6" />
            <p className="text-xs">Belum ada riwayat percakapan</p>
            <p className="text-[10px]">Tanyakan sesuatu untuk memulai</p>
          </div>
        ) : (
          <div className="space-y-0.5 px-1">
            {items.map((item) => (
              <button
                key={item.id}
                className="flex items-start gap-2 w-full px-2 py-1.5 text-xs rounded-sm hover:bg-accent text-left"
              >
                <History className="size-3 shrink-0 mt-0.5 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="truncate">{item.query}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export function addToHistory(query: string) {
  const stored = localStorage.getItem("chatHistory")
  const items: HistoryItem[] = stored ? JSON.parse(stored) : []
  items.unshift({
    id: crypto.randomUUID(),
    query,
    time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  })
  localStorage.setItem("chatHistory", JSON.stringify(items.slice(0, 50)))
}
