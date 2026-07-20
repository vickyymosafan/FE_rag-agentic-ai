"use client"

import { Badge } from "@/components/ui/badge"

export function StatusBar() {
  return (
    <div className="flex items-center justify-between h-6 px-3 text-[11px] text-muted-foreground bg-sidebar border-t select-none">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="h-4 text-[10px] px-1 rounded-sm">
          ASI 0.00
        </Badge>
        <span>⚡ Gemini 2.5 Flash</span>
      </div>
      <div className="flex items-center gap-3">
        <span>📄 0 sources</span>
        <span>🎯 0.00</span>
      </div>
    </div>
  )
}
