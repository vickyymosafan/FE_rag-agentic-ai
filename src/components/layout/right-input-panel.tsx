"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Loader2, X } from "lucide-react"
import { useState } from "react"
import { useFileUpload, type FileAttachment } from "@/lib/use-file-upload"

interface RightInputPanelProps {
  onSend: (query: string, file?: FileAttachment) => void
  isLoading: boolean
}

export function RightInputPanel({ onSend, isLoading }: RightInputPanelProps) {
  const [input, setInput] = useState("")
  const { file, error, inputRef, selectFile, removeFile, handleFileChange } = useFileUpload()

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input.trim(), file ?? undefined)
    setInput("")
    removeFile()
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
      {file && (
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted text-xs">
          <Paperclip className="size-3 text-muted-foreground" />
          <span className="truncate">{file.name}</span>
          <span className="text-muted-foreground shrink-0">
            ({(file.size / 1024).toFixed(1)}KB)
          </span>
          <Button variant="ghost" size="icon" className="size-4 ml-auto" onClick={removeFile}>
            <X className="size-3" />
          </Button>
        </div>
      )}
      {error && <p className="text-[10px] text-destructive">{error}</p>}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8" disabled={isLoading} onClick={selectFile}>
            <Paperclip className="size-4" />
          </Button>
          <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
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
