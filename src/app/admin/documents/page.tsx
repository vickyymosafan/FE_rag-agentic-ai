"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, Search } from "lucide-react"
import { toast } from "sonner"

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

  const handleUpload = () => {
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
          <div className="flex items-center gap-3">
            <Input type="file" accept=".pdf,.docx" className="flex-1" />
            <Button onClick={handleUpload} className="gap-2">
              <Upload className="size-4" />
              Upload
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: PDF, DOCX
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
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-muted-foreground" />
                    <span>{doc.name}</span>
                  </div>
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
