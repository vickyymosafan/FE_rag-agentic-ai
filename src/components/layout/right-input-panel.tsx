"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Loader2 } from "lucide-react"
import { useState } from "react"

interface RightInputPanelProps {
  onSend: (query: string) => void
  isLoading: boolean
}

export function RightInputPanel({ onSend, isLoading }: RightInputPanelProps) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input.trim())
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <div className="flex-1" />
      <Textarea
        placeholder="Ask about TA/KP/KKN/Kurikulum..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-[80px] resize-none"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8" disabled={isLoading}>
            <Paperclip className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            📄 0 sources
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            🎯 0.00
          </Badge>
          <Button size="sm" className="h-8 gap-1" onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}
