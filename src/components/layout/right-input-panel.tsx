"use client";

import { useState, useRef } from "react";
import { useChat } from "@/lib/chat-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PanelRightClose, Paperclip, Send, X, File, Database, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Syarat daftar TA",
  "Format proposal KP",
  "Batas SKS KKN",
  "Mata kuliah wajib"
];

export function RightInputPanel({ onSend, isLoading }: { onSend: (q: string, file?: File, model?: string) => void; isLoading?: boolean }) {
  const { rightPanelCollapsed, setRightPanelCollapsed, stats } = useChat();
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState("gemini");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (rightPanelCollapsed) return null;

  const handleSend = () => {
    if (!input.trim() && !file) return;
    onSend(input, file || undefined, model);
    setInput("");
    setFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-[300px] border-l border-border bg-sidebar flex flex-col h-full shrink-0">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/70">Query Input</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-accent" onClick={() => setRightPanelCollapsed(true)}>
          <PanelRightClose className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col">
        {!input && !file && (
          <div className="mb-4">
            <div className="text-[10px] text-muted-foreground mb-2">Suggested</div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <Badge
                  key={s}
                  variant="outline"
                  className="text-[10px] font-normal cursor-pointer hover:bg-accent transition-colors py-1"
                  onClick={() => { setInput(s); onSend(s, undefined, model); }}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {file && (
          <div className="mb-2 p-2 bg-background border border-border rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <File className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-[11px] truncate">{file.name}</span>
            </div>
            <button onClick={() => setFile(null)} className="p-0.5 hover:bg-accent rounded-sm ml-2 shrink-0">
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        )}

        <div className="relative bg-background rounded-md border border-border focus-within:ring-1 focus-within:ring-ring transition-shadow flex flex-col">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan tentang TA/KP/KKN/Kurikulum..."
            className="min-h-[80px] resize-none border-0 focus-visible:ring-0 text-[12px] p-2 bg-transparent"
          />
          <div className="flex items-center justify-between p-2 border-t border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <input type="file" ref={fileInputRef} className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-3.5 w-3.5" />
              </Button>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-6 text-[10px] border-0 bg-transparent px-1 focus:ring-0 shadow-none hover:bg-accent w-auto space-x-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini" className="text-[11px]">Gemini Pro</SelectItem>
                  <SelectItem value="claude" className="text-[11px]">Claude 3</SelectItem>
                  <SelectItem value="gpt4" className="text-[11px]">GPT-4o</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              {stats.activeSources > 0 && (
                <Badge variant="outline" className="h-5 text-[9px] px-1.5 flex gap-1 font-normal bg-background">
                  <Database className="w-2.5 h-2.5" /> {stats.activeSources}
                </Badge>
              )}
              <Button size="icon" className="h-6 w-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading || (!input.trim() && !file)} onClick={handleSend}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground mt-2 text-right">
          Ctrl+Enter to send
        </div>
      </div>
    </div>
  );
}
