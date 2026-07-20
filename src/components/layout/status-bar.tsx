"use client"

import { useSession } from "next-auth/react"

interface StatusBarProps {
  asiScore?: number
  model?: string
  sources?: number
  confidence?: number
  cacheHit?: boolean
}

export function StatusBar({
  asiScore = 0,
  model = "Gemini 2.5 Flash",
  sources = 0,
  confidence = 0,
  cacheHit = false,
}: StatusBarProps) {
  const { data: session } = useSession()

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
        <span>ASI {asiScore.toFixed(2)}</span>
        <span>⚡ {model}</span>
        <span>📄 {sources} sources</span>
        <span>🎯 {confidence.toFixed(2)}</span>
        {cacheHit && <span>⚡ Cache</span>}
      </div>
    </div>
  )
}
