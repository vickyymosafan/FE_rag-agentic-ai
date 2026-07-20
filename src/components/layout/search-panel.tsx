"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Search } from "lucide-react"

const documents = [
  { name: "Panduan TA SI 2026", match: "ta tugas akhir skripsi" },
  { name: "Panduan KP SI 2026", match: "kp kerja praktek magang" },
  { name: "Panduan KKN SI 2026", match: "kkn kuliah kerja nyata" },
  { name: "Kurikulum SI 2026", match: "kurikulum mata kuliah semester" },
  { name: "Form Pendaftaran TA", match: "form pendaftaran ta tugas akhir" },
  { name: "Form Bimbingan KP", match: "form bimbingan kp kerja praktek" },
]

export function SearchPanel() {
  const [query, setQuery] = useState("")

  const filtered = query
    ? documents.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.match.includes(query.toLowerCase())
      )
    : []

  return (
    <div className="flex flex-col h-full">
      <div className="relative px-2 pb-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-7 pr-2 py-1.5 text-xs rounded-md border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          autoFocus
        />
      </div>
      <ScrollArea className="flex-1">
        {query && filtered.length === 0 && (
          <p className="text-xs text-muted-foreground px-2">
            No documents found
          </p>
        )}
        {filtered.map((doc) => (
          <button
            key={doc.name}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded-sm hover:bg-accent text-left"
          >
            <FileText className="size-3 shrink-0 text-muted-foreground" />
            <span className="truncate">{doc.name}</span>
          </button>
        ))}
        {!query && (
          <p className="text-xs text-muted-foreground px-2 pt-1">
            Ketik untuk mencari dokumen akademik
          </p>
        )}
      </ScrollArea>
    </div>
  )
}
