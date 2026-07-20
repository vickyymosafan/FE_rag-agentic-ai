"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delay={0}>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
