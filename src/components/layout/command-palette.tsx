"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import {
  MessageSquare,
  FileText,
  Search,
  LogIn,
  BarChart3,
} from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()

  const run = (action: () => void) => {
    action()
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => run(() => router.push("/chat"))}>
            <MessageSquare className="size-4 mr-2" />
            <span>Go to Chat</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/login"))}>
            <LogIn className="size-4 mr-2" />
            <span>Go to Login</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/admin/documents"))}>
            <FileText className="size-4 mr-2" />
            <span>Manage Documents</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/admin/usage"))}>
            <BarChart3 className="size-4 mr-2" />
            <span>View Usage</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => document.querySelector<HTMLTextAreaElement>("textarea")?.focus())}>
            <Search className="size-4 mr-2" />
            <span>Focus Query Input</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
