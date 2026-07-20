"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { MarkdownContent } from "./markdown/markdown-content"
import { MessageFeedback } from "./message-feedback"

interface AIMessageProps {
  id: string
  content: string
  citations?: { docName: string; page: number }[]
  confidence?: number
  asiScore?: number
  reasoningPath?: string[]
}

export function AIMessage({
  id,
  content,
  citations = [],
  confidence = 0,
  asiScore = 0,
  reasoningPath = [],
}: AIMessageProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mr-auto max-w-[80%]"
    >
      <Card className="rounded-2xl rounded-tl-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            🤖 RAG Academic
          </Badge>
        </div>

        <div className="text-sm leading-relaxed [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_table]:w-full [&_th]:text-left [&_th]:p-2 [&_th]:bg-muted [&_td]:p-2 [&_td]:border-t [&_tr]:border-border [&_table]:border-collapse">
          <MarkdownContent content={content} />
        </div>

        {citations.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {citations.map((cite, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] cursor-pointer hover:bg-accent transition-colors"
                onClick={() => {
                  const el = document.querySelector(`[data-message-id="${id}"]`)
                  el?.scrollIntoView({ behavior: "smooth", block: "center" })
                  el?.classList.add("ring-2", "ring-primary", "ring-offset-2")
                  setTimeout(() => el?.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 2000)
                }}
              >
                {cite.docName}, Hal {cite.page}
              </Badge>
            ))}
          </div>
        )}

        {reasoningPath.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
              <ChevronDown className="size-3" />
              Reasoning Path
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {reasoningPath.map((step, i) => (
                <p key={i} className="text-[11px] text-muted-foreground">
                  • {step}
                </p>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex items-center justify-between pt-1 border-t">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>📄 {citations.length} sources</span>
            <span>🎯 {confidence.toFixed(2)}</span>
            <span>⚡ Gemini 2.5 Flash</span>
          </div>
          <MessageFeedback messageId={id} />
        </div>
      </Card>
    </motion.div>
  )
}
