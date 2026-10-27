"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileText, MessageSquare, Plus, Sparkles } from "lucide-react";

const navigation = [
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Documents", href: "/documents", icon: FileText },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-72 flex-col border-r bg-card">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold">DocChat</span>
        </div>
      </div>
      <Separator />
      <div className="p-3">
        <Button className="w-full justify-start gap-2" size="sm">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2">
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <Separator className="my-3" />
        <div className="px-2 py-1">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Recent Chats</p>
          <div className="space-y-1">
            {["Product Requirements", "API Questions", "Architecture Review"].map((chat) => (
              <button
                key={chat}
                className="w-full truncate rounded-lg px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {chat}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
