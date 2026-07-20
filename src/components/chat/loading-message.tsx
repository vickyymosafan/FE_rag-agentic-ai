"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";

export function LoadingMessage() {
  const { prefersReducedMotion } = useTheme();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-[60%] mr-auto w-full mb-4"
    >
      <Card className="rounded-2xl rounded-tl-sm p-4 space-y-4 bg-card border shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Bot className="w-4 h-4" />
          </div>
          <Badge variant="secondary" className="text-[10px] font-medium">RAG Academic</Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center h-4">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 bg-primary/50 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground italic">Analyzing documents...</span>
        </div>

        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </Card>
    </motion.div>
  );
}
