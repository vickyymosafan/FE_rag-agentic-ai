"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { ActivityBar } from "@/components/layout/activity-bar"
import { StatusBar } from "@/components/layout/status-bar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Activity Bar — 48px icon strip (hidden on mobile) */}
      <ActivityBar />

      {/* Sidebar — collapsible panel */}
      <AppSidebar />

      {/* Main content area */}
      <SidebarInset className="flex flex-col min-w-0">
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
        <StatusBar />
      </SidebarInset>
    </div>
  )
}
