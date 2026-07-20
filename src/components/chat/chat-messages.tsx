"use client"

import { AnimatePresence } from "framer-motion"
import { UserMessage } from "./user-message"
import { AIMessage } from "./ai-message"
import { LoadingMessage } from "./loading-message"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: { docName: string; page: number }[]
  confidence?: number
  asiScore?: number
  reasoningPath?: string[]
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-4 p-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserMessage key={msg.id} content={msg.content} />
            ) : (
              <AIMessage
                key={msg.id}
                content={msg.content}
                citations={msg.citations}
                confidence={msg.confidence}
                asiScore={msg.asiScore}
                reasoningPath={msg.reasoningPath}
              />
            )
          )}
          {isLoading && <LoadingMessage />}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
}
