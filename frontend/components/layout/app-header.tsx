"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import { mockDocuments } from "@/lib/mock/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppHeader() {
  const readyDocs = mockDocuments.filter((d) => d.status === "ready").length;

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-medium">Chat with Documents</h1>
        <Badge variant="secondary" className="gap-1">
          <FileText className="h-3 w-3" />
          {readyDocs} document{readyDocs !== 1 ? "s" : ""} ready
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button nativeButton={false} size="sm" variant="outline" className="gap-2" render={<Link href="/documents" />}>
          <Plus className="h-4 w-4" />
          Upload Documents
        </Button>
      </div>
    </header>
  );
}
