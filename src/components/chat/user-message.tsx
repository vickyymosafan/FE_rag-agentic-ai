"use client"

import { motion } from "framer-motion"

export function UserMessage({ content }: { content: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="ml-auto max-w-[75%]"
    >
      <div className="bg-muted rounded-2xl rounded-tr-sm px-4 py-3">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
      <div className="text-right mt-1">
        <span className="text-[11px] text-muted-foreground">14:30</span>
      </div>
    </motion.div>
  )
}
