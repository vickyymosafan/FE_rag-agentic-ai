"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/theme-provider";
import { ChevronRight, FileText, FileSpreadsheet, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Node = {
  id: string;
  name: string;
  type: "file" | "folder";
  ext?: "pdf" | "docx";
  children?: Node[];
};

const treeData: Node[] = [
  { id: "1", name: "Panduan TA SI 2026", type: "file", ext: "pdf" },
  { id: "2", name: "Panduan KP SI 2026", type: "file", ext: "pdf" },
  { id: "3", name: "Panduan KKN SI 2026", type: "file", ext: "pdf" },
  {
    id: "4", name: "Kurikulum SI 2026", type: "folder", children: [
      { id: "4-1", name: "Kurikulum Inti.pdf", type: "file", ext: "pdf" },
      { id: "4-2", name: "Mata Kuliah Pilihan.pdf", type: "file", ext: "pdf" },
      { id: "4-3", name: "Struktur Kurikulum.pdf", type: "file", ext: "pdf" },
    ]
  },
  {
    id: "5", name: "Formulir Akademik", type: "folder", children: [
      { id: "5-1", name: "Form Pendaftaran TA.docx", type: "file", ext: "docx" },
      { id: "5-2", name: "Form Bimbingan KP.docx", type: "file", ext: "docx" },
    ]
  }
];

export function FileTree() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="py-2">
      {treeData.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          selectedFile={selectedFile}
          onSelect={setSelectedFile}
        />
      ))}
    </div>
  );
}

function TreeItem({
  node,
  depth,
  selectedFile,
  onSelect
}: {
  node: Node;
  depth: number;
  selectedFile: string | null;
  onSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { prefersReducedMotion } = useTheme();

  const isFolder = node.type === "folder";
  const isSelected = selectedFile === node.id;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(node.id);
    }
  };

  const Icon = () => {
    if (isFolder) {
      return isOpen ? (
        <FolderOpen className="w-3.5 h-3.5 mr-1 text-sidebar-foreground/70" />
      ) : (
        <Folder className="w-3.5 h-3.5 mr-1 text-sidebar-foreground/70" />
      );
    }
    if (node.ext === "pdf") {
      return <FileText className="w-3.5 h-3.5 mr-1 text-red-400" />;
    }
    if (node.ext === "docx") {
      return <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-blue-400" />;
    }
    return <FileText className="w-3.5 h-3.5 mr-1 text-sidebar-foreground/70" />;
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={cn(
          "flex items-center px-2 py-1 cursor-pointer select-none text-[12px] group vscode-hover transition-colors",
          isSelected ? "vscode-selected text-tab-active-foreground font-medium" : "text-sidebar-foreground",
          depth > 0 && "indent-guide relative"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <span className="w-4 h-4 flex items-center justify-center opacity-80 group-hover:opacity-100 shrink-0">
          {isFolder && (
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </span>
        <Icon />
        <span className="truncate">{node.name}</span>
      </div>

      {isFolder && node.children && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children.map((child) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  selectedFile={selectedFile}
                  onSelect={onSelect}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
