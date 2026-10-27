"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DocumentUpload } from "@/components/upload/document-upload";
import { mockDocuments } from "@/lib/mock/data";
import { formatFileSize } from "@/lib/utils/format";
import { FileText, Search, Trash2, MoreVertical, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

function formatDateSafe(date: string | Date): string {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
  } catch {
    return "";
  }
}

export function DocumentsList() {
  const [search, setSearch] = useState("");
  const [docs] = useState(mockDocuments);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (name: string) => {
    toast.success(`Deleted ${name}`);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Documents</h2>
            <p className="text-sm text-muted-foreground">
              Upload and manage documents for chat
            </p>
          </div>
          <DocumentUpload />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredDocs.length} document{filteredDocs.length !== 1 ? "s" : ""}
            </p>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="transition-shadow hover:shadow-sm">
                <CardContent className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>{mounted ? formatDateSafe(doc.uploadedAt) : ""}</span>
                      {doc.chunks && (
                        <>
                          <span>•</span>
                          <span>{doc.chunks} chunks</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge variant={doc.status === "ready" ? "secondary" : "outline"}>
                    {doc.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8" />}>
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(doc.name)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredDocs.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No documents found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
