"use client";

import { useState, useRef } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Paperclip, Send, X, File, Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Syarat daftar TA",
  "Format proposal KP",
  "Batas SKS KKN",
  "Mata kuliah wajib"
];

export function MobileInputDrawer({ onSend, isLoading }: { onSend: (q: string, f?: File) => void, isLoading?: boolean }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim() && !file) return;
    onSend(input, file || undefined);
    setInput("");
    setFile(null);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-xl bg-primary hover:bg-primary/90 z-50 md:hidden p-0">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 bg-background">
        <DrawerTitle className="sr-only">Query Input</DrawerTitle>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground">Ask AI</span>
            <Badge variant="outline" className="text-[9px] h-4 px-1 flex gap-1 font-normal bg-accent">
              <Sparkles className="w-2.5 h-2.5" /> Gemini
            </Badge>
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-3 mb-1 no-scrollbar">
          {SUGGESTIONS.map(s => (
            <Badge
              key={s}
              variant="outline"
              className="text-[11px] whitespace-nowrap cursor-pointer hover:bg-accent font-normal py-1"
              onClick={() => { setInput(s); setOpen(false); onSend(s); }}
            >
              {s}
            </Badge>
          ))}
        </div>

        {file && (
          <div className="mb-3 p-2 bg-accent/50 border border-border rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <File className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-[12px] truncate">{file.name}</span>
            </div>
            <button onClick={() => setFile(null)} className="p-1 hover:bg-background rounded-sm">
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        )}

        <div className="relative bg-background rounded-md border border-border focus-within:ring-1 focus-within:ring-ring flex flex-col shadow-sm">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu..."
            className="min-h-[80px] resize-none border-0 focus-visible:ring-0 text-[13px] p-3 bg-transparent"
          />
          <div className="flex items-center justify-between p-2 border-t border-border bg-muted/20">
            <input type="file" ref={fileInputRef} className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => fileInputRef.current?.click()}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading || (!input.trim() && !file)} onClick={handleSend}>
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
