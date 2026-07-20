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

interface AIMessageProps {
  content: string
  citations?: { docName: string; page: number }[]
  confidence?: number
  asiScore?: number
  reasoningPath?: string[]
}

export function AIMessage({
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

        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        {citations.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {citations.map((cite, i) => (
              <Badge key={i} variant="outline" className="text-[10px]">
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

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1 border-t">
          <span>📄 {citations.length} sources</span>
          <span>🎯 {confidence.toFixed(2)}</span>
          <span>⚡ Gemini 2.5 Flash</span>
        </div>
      </Card>
    </motion.div>
  )
}
