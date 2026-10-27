"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "cn";
import { toast } from "sonner";

export function UploadZone() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      toast.success(`${e.dataTransfer.files.length} file(s) uploaded (demo)`);
    }
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
        dragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            toast.success(`${e.target.files.length} file(s) uploaded (demo)`);
            e.target.value = "";
          }
        }}
        accept=".pdf,.doc,.docx,.txt,.md,.csv"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            Drop files here or <span className="text-primary">browse</span>
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, DOCX, TXT, MD, CSV up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
