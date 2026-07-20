"use client"

import { AnimatePresence } from "framer-motion"
import { UserMessage } from "./user-message"
import { AIMessage } from "./ai-message"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample messages for Phase 1 demo
const sampleMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "Bagaimana syarat pendaftaran TA untuk semester genap 2026?",
  },
  {
    id: "2",
    role: "assistant" as const,
    content:
      "Berdasarkan dokumen **Panduan TA SI 2026** pasal 3 ayat 2:\n\n> Mahasiswa dapat mendaftarkan proposal TA pada semester genap dengan syarat:\n> • IPK ≥ 2.75\n> • Telah lulus ≥ 110 SKS\n> • Tidak ada nilai E\n\nUntuk informasi lebih lanjut, silakan hubungi koordinator TA.",
    citations: [{ docName: "Panduan TA SI 2026", page: 45 }],
    confidence: 0.92,
    asiScore: 0.88,
    reasoningPath: [
      "Query classified as: text",
      "Rewritten: 'Syarat pendaftaran TA'",
      "Hybrid retrieval: vector 0.82 + BM25 0.74",
      "Self-critic score: 0.88 (pass)",
    ],
  },
]

export function ChatMessages() {
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-4 p-4">
        <AnimatePresence mode="popLayout">
          {sampleMessages.map((msg) =>
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
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
}
