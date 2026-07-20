"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Bot, ChevronDown, FileText } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";
import { MarkdownContent } from "./markdown/markdown-content";
import { MessageFeedback } from "./message-feedback";

interface Citation {
  id: string;
  docName: string;
  page: number;
}

interface AIMessageProps {
  content: string;
  citations?: Citation[];
  reasoningPath?: string[];
  sourcesCount?: number;
  confidence?: string;
  model?: string;
  timestamp: string;
}

export function AIMessage({
  content,
  citations = [],
  reasoningPath = [],
  sourcesCount = 0,
  confidence = "N/A",
  model = "Gemini 2.5 Flash",
  timestamp,
}: AIMessageProps) {
  const { prefersReducedMotion } = useTheme();
  const [reasoningOpen, setReasoningOpen] = useState(false);

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[85%] mr-auto w-full mb-4"
    >
      <Card className="rounded-2xl rounded-tl-sm p-4 space-y-3 bg-card border shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Bot className="w-4 h-4" />
          </div>
          <Badge variant="secondary" className="text-[10px] font-medium">RAG Academic</Badge>
        </div>

        <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
          <MarkdownContent content={content} />
        </div>

        {citations.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {citations.map((cit) => (
              <Card
                key={cit.id}
                className="flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-muted transition-colors border"
                onClick={() => {
                  // TODO: handle scroll to citation highlight
                }}
              >
                <FileText className="w-3 h-3 text-muted-foreground" />
                <span className="text-[11px] font-medium truncate max-w-[150px]">{cit.docName}</span>
                <span className="text-[10px] text-muted-foreground">Hal {cit.page}</span>
              </Card>
            ))}
          </div>
        )}

        {reasoningPath.length > 0 && (
          <Collapsible open={reasoningOpen} onOpenChange={setReasoningOpen} className="pt-2">
            <CollapsibleTrigger className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              🔍 Reasoning Path ({reasoningPath.length} steps)
              <ChevronDown className={`w-3 h-3 transition-transform ${reasoningOpen ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <ol className="list-decimal list-inside space-y-1">
                {reasoningPath.map((step, idx) => (
                  <li key={idx} className="text-[11px] text-muted-foreground">{step}</li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex items-center justify-between pt-2 border-t mt-2">
          <div className="text-[10px] text-muted-foreground flex items-center gap-2">
            <span>📄 {sourcesCount} sources</span>
            <span>·</span>
            <span>🎯 {confidence}</span>
            <span>·</span>
            <span>⚡ {model}</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageFeedback />
            <span className="text-[10px] text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
