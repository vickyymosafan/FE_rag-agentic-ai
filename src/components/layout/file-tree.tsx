"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, FileText, File, FolderOpen, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

interface TreeNode {
  name: string
  type: "file" | "folder"
  children?: TreeNode[]
  icon?: string
}

const documentTree: TreeNode[] = [
  {
    name: "Panduan TA SI 2026",
    type: "file",
    icon: "📄",
  },
  {
    name: "Panduan KP SI 2026",
    type: "file",
    icon: "📄",
  },
  {
    name: "Panduan KKN SI 2026",
    type: "file",
    icon: "📄",
  },
  {
    name: "Kurikulum SI 2026",
    type: "folder",
    children: [
      { name: "Kurikulum Inti.pdf", type: "file", icon: "📄" },
      { name: "Mata Kuliah Pilihan.pdf", type: "file", icon: "📄" },
      { name: "Struktur Kurikulum.pdf", type: "file", icon: "📄" },
    ],
  },
  {
    name: "Formulir Akademik",
    type: "folder",
    children: [
      { name: "Form Pendaftaran TA.docx", type: "file", icon: "📝" },
      { name: "Form Bimbingan KP.docx", type: "file", icon: "📝" },
    ],
  },
]

function TreeItem({
  node,
  depth = 0,
}: {
  node: TreeNode
  depth?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const isFolder = node.type === "folder"

  return (
    <div>
      <button
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 w-full px-2 py-1 text-xs rounded-sm hover:bg-accent text-left",
          depth > 0 && "pl-8"
        )}
      >
        {isFolder ? (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
          </motion.div>
        ) : (
          <span className="w-3 shrink-0" />
        )}
        {isFolder ? (
          isOpen ? (
            <FolderOpen className="size-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <Folder className="size-3.5 shrink-0 text-muted-foreground" />
          )
        ) : (
          <span className="text-xs">{node.icon ?? "📄"}</span>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      <AnimatePresence>
        {isOpen && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {node.children.map((child, i) => (
              <TreeItem key={i} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FileTree() {
  return (
    <div className="space-y-0.5">
      {documentTree.map((node, i) => (
        <TreeItem key={i} node={node} />
      ))}
    </div>
  )
}
