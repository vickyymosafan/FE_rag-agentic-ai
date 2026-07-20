"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Send, MessageSquarePlus, Loader2, Paperclip, X } from "lucide-react"
import { useFileUpload, type FileAttachment } from "@/lib/use-file-upload"

interface MobileInputDrawerProps {
  onSend: (query: string, file?: FileAttachment, model?: string) => void
  isLoading: boolean
}

export function MobileInputDrawer({ onSend, isLoading }: MobileInputDrawerProps) {
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)
  const { file, error, inputRef, selectFile, removeFile, handleFileChange } = useFileUpload()

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input.trim(), file ?? undefined)
    setInput("")
    removeFile()
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center">
        <MessageSquarePlus className="size-6" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-sm">Ask RAG Academic</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-8 space-y-3">
          <Textarea
            placeholder="Ask about TA/KP/KKN/Kurikulum..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSend()
              }
            }}
            className="min-h-[100px] resize-none"
            disabled={isLoading}
            autoFocus
          />
          {file && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-muted text-xs">
              <Paperclip className="size-3 text-muted-foreground" />
              <span className="truncate">{file.name}</span>
              <Button variant="ghost" size="icon" className="size-4 ml-auto" onClick={removeFile}>
                <X className="size-3" />
              </Button>
            </div>
          )}
          {error && <p className="text-[10px] text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={selectFile} disabled={isLoading}>
              <Paperclip className="size-4" />
            </Button>
            <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileChange} />
            <Button
              className="flex-1 gap-2"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {isLoading ? "Thinking..." : "Send"}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
