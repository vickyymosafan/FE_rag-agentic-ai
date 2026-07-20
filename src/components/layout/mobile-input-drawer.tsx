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
import { Send, MessageSquarePlus, Loader2 } from "lucide-react"

interface MobileInputDrawerProps {
  onSend: (query: string) => void
  isLoading: boolean
}

export function MobileInputDrawer({ onSend, isLoading }: MobileInputDrawerProps) {
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input.trim())
    setInput("")
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
            className="min-h-[100px] resize-none"
            disabled={isLoading}
            autoFocus
          />
          <Button
            className="w-full gap-2"
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
      </DrawerContent>
    </Drawer>
  )
}
