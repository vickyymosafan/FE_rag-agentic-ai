"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip } from "lucide-react"
import { useState } from "react"

export function RightInputPanel() {
  const [input, setInput] = useState("")

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <div className="flex-1" />
      <Textarea
        placeholder="Ask about TA/KP/KKN/Kurikulum..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[80px] resize-none"
      />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8">
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
          <Button size="sm" className="h-8 gap-1">
            <Send className="size-3.5" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
