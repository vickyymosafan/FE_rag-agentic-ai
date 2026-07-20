"use client";

import { useChat } from "@/lib/chat-context";
import { useSession } from "next-auth/react";
import { useTheme } from "@/components/layout/theme-provider";
import {
  FileText,
  MessageSquare,
  Search,
  FolderOpen,
  Settings,
  Sun,
  Moon,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ActivityBar() {
  const { activePanel, setActivePanel } = useChat();
  const { data: session } = useSession();
  const { theme, toggle } = useTheme();

  const topItems = [
    { id: "files" as const, icon: FileText, label: "Explorer" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "history" as const, icon: MessageSquare, label: "Chat History" },
    { id: "collections" as const, icon: FolderOpen, label: "Collections" },
  ];

  return (
    <TooltipProvider delay={0}>
      <div className="w-[48px] h-full flex flex-col items-center bg-activity-bar text-activity-bar-foreground py-2 gap-0.5 shrink-0 z-20">
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger
                onClick={() => setActivePanel(item.id)}
                className={`relative flex items-center justify-center w-12 h-12 vscode-hover transition-colors ${
                  isActive
                    ? "text-white activity-indicator"
                    : "opacity-80 hover:opacity-100 text-activity-bar-foreground"
                }`}
                aria-label={item.label}
              >
                <Icon className="size-6 stroke-[1.5]" />
              </TooltipTrigger>
              <TooltipContent side="right" className="text-[12px]">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}

        <div className="mt-auto flex flex-col items-center gap-0.5 w-full">
          <Tooltip>
            <TooltipTrigger
              onClick={() => setActivePanel("settings")}
              className={`relative flex items-center justify-center w-12 h-12 vscode-hover transition-colors ${
                activePanel === "settings"
                  ? "text-white activity-indicator"
                  : "opacity-80 hover:opacity-100 text-activity-bar-foreground"
              }`}
              aria-label="Settings"
            >
              <Settings className="size-6 stroke-[1.5]" />
            </TooltipTrigger>
            <TooltipContent side="right" className="text-[12px]">
              Settings
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={toggle}
              className="relative flex items-center justify-center w-12 h-12 opacity-80 hover:opacity-100 transition-colors vscode-hover text-activity-bar-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="size-6 stroke-[1.5]" />
              ) : (
                <Moon className="size-6 stroke-[1.5]" />
              )}
            </TooltipTrigger>
            <TooltipContent side="right" className="text-[12px]">
              Toggle Theme
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="relative flex items-center justify-center w-12 h-12 opacity-80 hover:opacity-100 transition-colors vscode-hover">
              <Avatar className="size-8">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? "User"}
                />
                <AvatarFallback className="bg-transparent text-activity-bar-foreground">
                  <User className="size-5 stroke-[1.5]" />
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-[12px]">
              {session?.user?.name ?? "Account"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
