"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, Search, Pencil } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

interface Document {
  id: string
  name: string
  type: string
  pages: number
  chunks: number
  status: "indexed" | "processing" | "failed"
  uploadedAt: string
}

const initialDocuments: Document[] = [
  { id: "1", name: "Panduan TA SI 2026", type: "PDF", pages: 45, chunks: 128, status: "indexed", uploadedAt: "2026-07-19" },
  { id: "2", name: "Panduan KP SI 2026", type: "PDF", pages: 52, chunks: 156, status: "indexed", uploadedAt: "2026-07-19" },
  { id: "3", name: "Panduan KKN SI 2026", type: "DOCX", pages: 30, chunks: 89, status: "indexed", uploadedAt: "2026-07-19" },
  { id: "4", name: "Kurikulum SI 2026", type: "DOCX", pages: 17, chunks: 52, status: "indexed", uploadedAt: "2026-07-19" },
]

function EditableName({ doc, onRename }: { doc: Document; onRename: (id: string, name: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(doc.name)
  const inputRef = useRef<HTMLInputElement>(null)

  const save = () => {
    const trimmed = value.trim()
    if (trimmed && trimmed !== doc.name) {
      onRename(doc.id, trimmed)
    } else {
      setValue(doc.name)
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => { if (e.key === "Enter") { save() }; if (e.key === "Escape") { setValue(doc.name); setEditing(false) } }}
        className="h-7 text-sm"
        autoFocus
      />
    )
  }

  return (
    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setEditing(true)}>
      <FileText className="size-4 text-muted-foreground shrink-0" />
      <span>{doc.name}</span>
      <Pencil className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [search, setSearch] = useState("")

  const filtered = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
    toast.success("Document deleted")
  }

  const handleRename = (id: string, name: string) => {
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, name } : d)))
    toast.success("Document renamed")
  }

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const file = form.get("file") as File | null

    const schema = z.object({
      file: z
        .instanceof(File)
        .refine((f) => ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type), "Hanya PDF dan DOCX yang didukung.")
        .refine((f) => f.size > 0, "File tidak boleh kosong")
        .refine((f) => f.size < 10 * 1024 * 1024, "File maksimal 10MB"),
    })

    const result = schema.safeParse({ file })
    if (!result.success) {
      toast.error(result.error.issues[0].message)
      return
    }

    toast.success("Upload started. Document will be indexed shortly.")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Document Management</h1>
          <p className="text-sm text-muted-foreground">
            Upload and manage academic documents
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="flex items-center gap-3">
            <Input type="file" accept=".pdf,.docx" className="flex-1" name="file" />
            <Button type="submit" className="gap-2">
              <Upload className="size-4" />
              Upload
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: PDF, DOCX (max 10MB)
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Type</th>
              <th className="text-left p-3 font-medium">Pages</th>
              <th className="text-left p-3 font-medium">Chunks</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Uploaded</th>
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => (
              <tr key={doc.id} className="border-b last:border-0">
                <td className="p-3">
                  <EditableName doc={doc} onRename={handleRename} />
                </td>
                <td className="p-3 text-muted-foreground">{doc.type}</td>
                <td className="p-3 text-muted-foreground">{doc.pages}</td>
                <td className="p-3 text-muted-foreground">{doc.chunks}</td>
                <td className="p-3">
                  <Badge
                    variant={
                      doc.status === "indexed"
                        ? "default"
                        : doc.status === "processing"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-[10px]"
                  >
                    {doc.status}
                  </Badge>
                </td>
                <td className="p-3 text-muted-foreground">{doc.uploadedAt}</td>
                <td className="p-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
