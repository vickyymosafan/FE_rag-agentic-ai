"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/layout/theme-provider";
import { GraduationCap, Briefcase, Users, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  queries: string[];
};

const CATEGORIES: Category[] = [
  {
    id: "ta",
    name: "Syarat Akademik",
    icon: <GraduationCap className="w-4 h-4" />,
    queries: ["Syarat daftar TA", "Format proposal TA", "Batas SKS TA"]
  },
  {
    id: "kp",
    name: "Panduan KP",
    icon: <Briefcase className="w-4 h-4" />,
    queries: ["Syarat daftar KP", "Logbook KP", "Seminar KP"]
  },
  {
    id: "kkn",
    name: "Panduan KKN",
    icon: <Users className="w-4 h-4" />,
    queries: ["Syarat SKS KKN", "Jadwal KKN", "Laporan KKN"]
  },
  {
    id: "kurikulum",
    name: "Kurikulum",
    icon: <BookOpen className="w-4 h-4" />,
    queries: ["Mata kuliah wajib", "SKS kelulusan", "Mata kuliah pilihan"]
  }
];

export function CollectionList({ onQuerySelect }: { onQuerySelect: (q: string) => void }) {
  return (
    <div className="py-2 space-y-1">
      {CATEGORIES.map(cat => (
        <CollectionItem key={cat.id} category={cat} onQuerySelect={onQuerySelect} />
      ))}
    </div>
  );
}

function CollectionItem({ category, onQuerySelect }: { category: Category, onQuerySelect: (q: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { prefersReducedMotion } = useTheme();

  return (
    <div>
      <div
        className="flex items-center px-3 py-1.5 cursor-pointer vscode-hover text-sidebar-foreground group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="mr-1 opacity-70 group-hover:opacity-100"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.div>
        <div className="mr-2 opacity-70 group-hover:opacity-100">{category.icon}</div>
        <span className="text-[12px] font-medium flex-1 truncate">{category.name}</span>
        <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-background/50">
          {category.queries.length}
        </Badge>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? false : { height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-9 pr-3 pb-2 pt-1 flex flex-wrap gap-1.5">
              {category.queries.map((q, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] cursor-pointer hover:bg-accent font-normal text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuerySelect(q);
                  }}
                >
                  {q}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
