"use client"

import { useSession } from "next-auth/react"
import { ThemeToggle } from "./theme-toggle"
import { useChatStats } from "@/lib/chat-stats-context"

export function StatusBar() {
  const { data: session } = useSession()
  const { stats } = useChatStats()

  return (
    <div className="flex items-center justify-between h-6 px-3 text-[11px] text-white bg-[var(--status-bar)] select-none">
      <div className="flex items-center gap-3">
        <span className="font-medium">RAG Academic</span>
        {session?.user?.name && (
          <span className="opacity-80">
            {session.user.name}
            {session.user.role === "admin" && " (Admin)"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span>ASI {stats.asiScore.toFixed(2)}</span>
        <span>⚡ {stats.model}</span>
        <span>📄 {stats.sourcesCount} sources</span>
        <span>🎯 {stats.confidence.toFixed(2)}</span>
        {stats.cacheHit && <span>⚡ Cache</span>}
        <ThemeToggle />
      </div>
    </div>
  )
}
