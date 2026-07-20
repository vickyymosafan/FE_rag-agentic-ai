"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const MOCK_RESULTS = [
  {
    doc: "Panduan TA SI 2026",
    matches: ["Proposal TA", "Batas waktu pengumpulan TA"],
  },
  {
    doc: "Kurikulum Inti",
    matches: ["Mata kuliah wajib TA", "SKS minimum TA"],
  },
];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  return (
    <div className="p-3 flex flex-col gap-3 h-full">
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="h-7 pl-7 text-[12px] bg-background border-border"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCaseSensitive(!caseSensitive)}
            className={`px-1.5 py-0.5 text-[10px] rounded border ${caseSensitive ? 'bg-tab-active border-blue-500' : 'bg-transparent border-transparent hover:bg-accent'}`}
            title="Match Case"
          >
            Aa
          </button>
          <button
            onClick={() => setWholeWord(!wholeWord)}
            className={`px-1.5 py-0.5 text-[10px] rounded border ${wholeWord ? 'bg-tab-active border-blue-500' : 'bg-transparent border-transparent hover:bg-accent'}`}
            title="Match Whole Word"
          >
            W
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!query ? (
          <div className="text-[11px] text-muted-foreground text-center mt-4">
            Type to search across documents
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-sidebar-foreground/70">Results</span>
              <Badge variant="secondary" className="text-[9px] h-4 px-1">
                {MOCK_RESULTS.length} docs
              </Badge>
            </div>
            {MOCK_RESULTS.map((res, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[11px] font-semibold text-sidebar-foreground/90 truncate">
                  {res.doc}
                </div>
                {res.matches.map((match, j) => (
                  <div key={j} className="text-[12px] text-muted-foreground pl-3 border-l border-border/50 truncate hover:bg-accent cursor-pointer px-2 py-0.5">
                    {match}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
