"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={toggle}
        className="flex items-center justify-center size-10 rounded-sm hover:bg-white/10 transition-colors"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? (
          <Moon className="size-[18px]" />
        ) : (
          <Sun className="size-[18px]" />
        )}
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {theme === "light" ? "Dark Theme" : "Light Theme"}
      </TooltipContent>
    </Tooltip>
  )
}
