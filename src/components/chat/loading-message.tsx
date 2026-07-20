"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingMessage() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mr-auto max-w-[60%]"
    >
      <div className="bg-card rounded-2xl rounded-tl-sm p-4 space-y-3 border">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </motion.div>
  )
}
