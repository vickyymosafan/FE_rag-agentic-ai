"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/layout/theme-provider"

export function UserMessage({ content }: { content: string }) {
  const { prefersReducedMotion } = useTheme()
  const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      className="ml-auto max-w-[75%]"
    >
      <div className="bg-muted rounded-2xl rounded-tr-sm px-4 py-3">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
      <div className="text-right mt-1">
        <span className="text-[11px] text-muted-foreground">{time}</span>
      </div>
    </motion.div>
  )
}
