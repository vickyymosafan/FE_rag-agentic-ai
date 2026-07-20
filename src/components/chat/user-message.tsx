"use client";

import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";

interface UserMessageProps {
  content: string;
  timestamp: number;
  onEdit?: () => void;
}

export function UserMessage({ content, timestamp, onEdit }: UserMessageProps) {
  const { prefersReducedMotion } = useTheme();

  const formattedTime = new Date(timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[75%] ml-auto w-full mb-4 group"
    >
      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
        <div className="text-sm whitespace-pre-wrap">{content}</div>
      </div>
      <div className="flex justify-end items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
        {onEdit && (
          <button
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground flex items-center justify-center p-1 rounded hover:bg-muted"
            aria-label="Edit message"
          >
            <Pencil className="w-3 h-3" />
          </button>
        )}
        <span>{formattedTime}</span>
      </div>
    </motion.div>
  );
}
