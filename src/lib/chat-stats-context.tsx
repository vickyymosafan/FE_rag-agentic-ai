"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatStats {
  asiScore: number
  confidence: number
  sourcesCount: number
  model: string
  cacheHit: boolean
}

const defaultStats: ChatStats = {
  asiScore: 0,
  confidence: 0,
  sourcesCount: 0,
  model: "Gemini 2.5 Flash",
  cacheHit: false,
}

const ChatStatsContext = createContext<{
  stats: ChatStats
  setStats: (s: ChatStats) => void
}>({ stats: defaultStats, setStats: () => {} })

export function ChatStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ChatStats>(defaultStats)
  return (
    <ChatStatsContext.Provider value={{ stats, setStats }}>
      {children}
    </ChatStatsContext.Provider>
  )
}

export function useChatStats() {
  return useContext(ChatStatsContext)
}
