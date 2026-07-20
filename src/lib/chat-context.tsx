"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
  citations?: { docName: string; page: number }[]
  confidence?: number
  asiScore?: number
  reasoningPath?: string[]
  model?: string
  cacheHit?: boolean
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export interface ChatStats {
  asiScore: number
  confidence: number
  sourcesCount: number
  model: string
  cacheHit: boolean
  responseTime?: number
}

export type SidebarPanel = "files" | "history" | "search" | "collections" | "settings"

interface ChatContextValue {
  /* Sessions */
  sessions: ChatSession[]
  activeSessionId: string
  activeSession: ChatSession
  createSession: () => string
  switchSession: (id: string) => void
  closeSession: (id: string) => void
  renameSession: (id: string, title: string) => void

  /* Messages */
  messages: ChatMessage[]
  addMessage: (msg: ChatMessage) => void
  clearMessages: () => void

  /* Stats */
  stats: ChatStats
  setStats: (s: ChatStats) => void

  /* UI State */
  activePanel: SidebarPanel
  setActivePanel: (p: SidebarPanel) => void
  rightPanelCollapsed: boolean
  setRightPanelCollapsed: (c: boolean) => void
}

/* ═══════════════════════════════════════════
   Defaults
   ═══════════════════════════════════════════ */

const defaultStats: ChatStats = {
  asiScore: 0,
  confidence: 0,
  sourcesCount: 0,
  model: "Gemini 2.5 Flash",
  cacheHit: false,
}

function createDefaultSession(): ChatSession {
  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Selamat datang di **RAG Academic AI**. Saya dapat membantu menjawab pertanyaan tentang panduan akademik: **TA**, **KP**, **KKN**, dan **Kurikulum** SI 2026.\n\nSilakan ketik pertanyaan Anda atau pilih topik di panel kanan.",
        timestamp: Date.now(),
        confidence: 1,
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

/* ═══════════════════════════════════════════
   Persistence helpers
   ═══════════════════════════════════════════ */

const STORAGE_KEY = "rag-chat-sessions"

function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ChatSession[]
  } catch {}
  return []
}

function saveSessions(sessions: ChatSession[]) {
  if (typeof window === "undefined") return
  try {
    /* Keep max 20 sessions to prevent localStorage bloat */
    const trimmed = sessions.slice(0, 20)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {}
}

/* ═══════════════════════════════════════════
   Context
   ═══════════════════════════════════════════ */

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string>("")
  const [stats, setStats] = useState<ChatStats>(defaultStats)
  const [activePanel, setActivePanel] = useState<SidebarPanel>("history")
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    const loaded = loadSessions()
    if (loaded.length > 0) {
      setSessions(loaded)
      setActiveSessionId(loaded[0].id)
    } else {
      const initial = createDefaultSession()
      setSessions([initial])
      setActiveSessionId(initial.id)
    }
    setHydrated(true)
  }, [])

  /* Persist whenever sessions change */
  useEffect(() => {
    if (hydrated) saveSessions(sessions)
  }, [sessions, hydrated])

  /* Derived: active session */
  const activeSession =
    sessions.find((s) => s.id === activeSessionId) ??
    sessions[0] ??
    createDefaultSession()

  const messages = activeSession.messages

  /* Session operations */
  const createSession = useCallback((): string => {
    const session = createDefaultSession()
    setSessions((prev) => [session, ...prev])
    setActiveSessionId(session.id)
    setStats(defaultStats)
    return session.id
  }, [])

  const switchSession = useCallback((id: string) => {
    setActiveSessionId(id)
    setStats(defaultStats)
  }, [])

  const closeSession = useCallback(
    (id: string) => {
      setSessions((prev) => {
        const next = prev.filter((s) => s.id !== id)
        if (next.length === 0) {
          const fresh = createDefaultSession()
          setActiveSessionId(fresh.id)
          return [fresh]
        }
        if (id === activeSessionId) {
          setActiveSessionId(next[0].id)
        }
        return next
      })
    },
    [activeSessionId]
  )

  const renameSession = useCallback((id: string, title: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title } : s))
    )
  }, [])

  /* Message operations */
  const addMessage = useCallback(
    (msg: ChatMessage) => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? {
                ...s,
                messages: [...s.messages, msg],
                updatedAt: Date.now(),
                /* Auto-title from first user message */
                title:
                  s.title === "New Chat" && msg.role === "user"
                    ? msg.content.slice(0, 40) + (msg.content.length > 40 ? "..." : "")
                    : s.title,
              }
            : s
        )
      )
    },
    [activeSessionId]
  )

  const clearMessages = useCallback(() => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, messages: [], updatedAt: Date.now(), title: "New Chat" }
          : s
      )
    )
    setStats(defaultStats)
  }, [activeSessionId])

  /* Don't render children until hydrated to prevent SSR mismatch */
  if (!hydrated) {
    return null
  }

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeSessionId,
        activeSession,
        createSession,
        switchSession,
        closeSession,
        renameSession,
        messages,
        addMessage,
        clearMessages,
        stats,
        setStats,
        activePanel,
        setActivePanel,
        rightPanelCollapsed,
        setRightPanelCollapsed,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error("useChat must be used within ChatProvider")
  return ctx
}

/* Re-export for backward compat — status bar, etc. */
export function useChatStats() {
  const { stats, setStats } = useChat()
  return { stats, setStats }
}
