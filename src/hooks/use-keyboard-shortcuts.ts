"use client"

import { useEffect } from "react"
import { useSidebar } from "@/components/ui/sidebar"

interface ShortcutHandlers {
  onCommandPalette?: () => void
  onSearchFocus?: () => void
  onCloseChat?: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const { toggleSidebar } = useSidebar()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.metaKey || e.ctrlKey

      if (isCtrl && e.key === "k") {
        e.preventDefault()
        handlers.onCommandPalette?.()
      } else if (isCtrl && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      } else if (isCtrl && e.key === "w") {
        e.preventDefault()
        handlers.onCloseChat?.()
      } else if (isCtrl && e.shiftKey && e.key === "F") {
        e.preventDefault()
        handlers.onSearchFocus?.()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlers, toggleSidebar])
}
