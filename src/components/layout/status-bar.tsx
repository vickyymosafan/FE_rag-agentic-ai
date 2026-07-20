"use client";

import { useSession } from "next-auth/react";
import { useChatStats } from "@/lib/chat-context";
import { GitBranch } from "lucide-react";

export function StatusBar() {
  const { stats } = useChatStats();
  const { data: session } = useSession();

  const asiScore = (stats?.asiScore ?? 0).toFixed(2);
  const confidence = (stats?.confidence ?? 0).toFixed(2);
  const model = stats?.model ?? "Gemini 2.5 Flash";
  const sourcesCount = stats?.sourcesCount ?? 0;
  const cacheHit = stats?.cacheHit ?? false;

  return (
    <div className="flex h-[22px] w-full items-center px-2 bg-status-bar text-status-bar-foreground text-[11px] select-none shrink-0 overflow-hidden">
      <div className="flex items-center h-full">
        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors gap-1">
          <GitBranch className="size-3" />
          <span>main</span>
        </div>

        <div className="status-separator" />

        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors">
          <span>🎯 ASI {asiScore}</span>
        </div>

        <div className="status-separator" />

        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors">
          <span>⚠ 0</span>
        </div>
      </div>

      <div className="flex items-center h-full ml-auto">
        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors">
          <span>⚡ {model}</span>
        </div>

        <div className="status-separator" />

        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors">
          <span>📄 {sourcesCount} sources</span>
        </div>

        <div className="status-separator" />

        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors">
          <span>🎯 {confidence}</span>
        </div>

        {cacheHit && (
          <>
            <div className="status-separator" />
            <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors text-[#89D185]">
              <span>⚡ Cached</span>
            </div>
          </>
        )}

        <div className="status-separator" />

        <div className="flex items-center px-1.5 py-0 h-full hover:bg-white/10 cursor-default rounded-sm transition-colors max-w-[120px]">
          <span className="truncate">{session?.user?.name || "Guest"}</span>
        </div>
      </div>
    </div>
  );
}
