"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

const MarkdownRenderer = dynamic(
  () => import("./renderer").then((m) => m.MarkdownRenderer),
  {
    loading: () => (
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    ),
    ssr: false,
  }
)

export function MarkdownContent({ content }: { content: string }) {
  const [key] = useState(0)
  return <MarkdownRenderer key={key} content={content} />
}
