"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bookmark, GraduationCap, Briefcase, Users, BookOpen } from "lucide-react"

const collections = [
  {
    name: "Syarat Akademik",
    icon: GraduationCap,
    queries: ["Syarat pendaftaran TA", "IPK minimal", "SKS yang harus ditempuh"],
  },
  {
    name: "Panduan KP",
    icon: Briefcase,
    queries: ["Cara daftar KP", "Syarat KP semester genap", "Format laporan KP"],
  },
  {
    name: "Panduan KKN",
    icon: Users,
    queries: ["Jadwal KKN 2026", "Syarat KKN", "Lokasi KKN"],
  },
  {
    name: "Kurikulum",
    icon: BookOpen,
    queries: ["Mata kuliah semester 1", "Struktur kurikulum", "Mata kuliah pilihan"],
  },
]

export function CollectionList() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 px-2">
        {collections.map((col) => {
          const Icon = col.icon
          return (
            <div key={col.name}>
              <div className="flex items-center gap-1.5 py-1">
                <Icon className="size-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">{col.name}</span>
              </div>
              <div className="flex flex-wrap gap-1 pl-5">
                {col.queries.map((q) => (
                  <Badge
                    key={q}
                    variant="secondary"
                    className="text-[10px] cursor-pointer hover:bg-accent"
                  >
                    {q}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
