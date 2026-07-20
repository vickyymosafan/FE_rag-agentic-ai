"use client"

import { useState, useEffect, type ComponentPropsWithoutRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

function CodeBlock({ className, children }: { className?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  const lang = className?.replace("language-", "") ?? ""
  const code = String(children).replace(/\n$/, "")

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-3">
      <div className="flex items-center justify-between bg-muted px-4 py-1.5 rounded-t-lg border-b text-[11px] text-muted-foreground">
        <span>{lang || "code"}</span>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copy}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </Button>
      </div>
      <pre className="bg-[#1e1e1e] p-4 rounded-b-lg overflow-x-auto text-[13px] font-mono leading-[1.6]">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

function ImageViewer({ src, alt }: ComponentPropsWithoutRef<"img">) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-64 rounded-lg border object-contain cursor-pointer my-2 hover:opacity-90 transition-opacity"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <img src={src} alt={alt} className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      )}
    </>
  )
}

let shikiPlugin: ((...args: any[]) => any) | null = null

export function MarkdownRenderer({ content }: { content: string }) {
  const [ready, setReady] = useState(!!shikiPlugin)

  useEffect(() => {
    if (shikiPlugin) return
    ;(async () => {
      const { createHighlighter, createJavaScriptRegexEngine } = await import("shiki")
      const { default: rehypeShikiFromHighlighter } = await import("@shikijs/rehype/core")
      const highlighter = await createHighlighter({
        themes: ["dark-plus"],
        langs: ["javascript", "typescript", "python", "bash", "json", "sql", "html", "css", "xml", "text"],
        engine: createJavaScriptRegexEngine(),
      })
      shikiPlugin = rehypeShikiFromHighlighter(highlighter, { theme: "dark-plus" })
      setReady(true)
    })()
  }, [])

  if (!ready) {
    return <span className="text-sm whitespace-pre-wrap">{content}</span>
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[() => shikiPlugin!]}
      components={{
        pre: ({ children }) => <>{children}</>,
        img: ImageViewer,
        code: ({ className, children, ...props }) => {
          const isBlock = className?.startsWith("language-")
          if (isBlock) {
            return <CodeBlock className={className}>{children}</CodeBlock>
          }
          return (
            <code
              className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
              {...props}
            >
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
