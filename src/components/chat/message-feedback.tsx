"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MessageFeedbackProps {
  messageId: string
}

export function MessageFeedback({ messageId }: MessageFeedbackProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  const sendFeedback = (type: "up" | "down") => {
    setFeedback(type)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787"}/api/rag/feedback`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, feedback: type }),
      }
    ).catch(() => {})
  }

  return (
    <div className="flex items-center gap-1 mt-2">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-6", feedback === "up" && "text-green-500")}
          onClick={() => feedback !== "up" && sendFeedback("up")}
        >
          <ThumbsUp className="size-3" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-6", feedback === "down" && "text-red-500")}
          onClick={() => feedback !== "down" && sendFeedback("down")}
        >
          <ThumbsDown className="size-3" />
        </Button>
      </motion.div>
    </div>
  )
}
