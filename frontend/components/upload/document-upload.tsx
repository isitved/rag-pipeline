"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X } from "lucide-react";
import { cn } from "cn";
import { toast } from "sonner";
import { formatFileSize } from "@/lib/utils/format";

interface UploadingFile {
  file: File;
  progress: number;
  status: "uploading" | "processing" | "done";
}

export function DocumentUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadingFile[]>([]);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = (fileList: File[]) => {
    const newFiles = fileList.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((uf, idx) => simulateUpload(files.length + idx));
    toast.success(`${fileList.length} file${fileList.length > 1 ? "s" : ""} added`);
  };

  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) => {
          const updated = [...prev];
          if (updated[index]) {
            updated[index] = { ...updated[index], progress: 100, status: "processing" };
          }
          return updated;
        });
        setTimeout(() => {
          setFiles((prev) => {
            const updated = [...prev];
            if (updated[index]) {
              updated[index] = { ...updated[index], status: "done" };
            }
            return updated;
          });
          toast.success("Document processed and ready");
        }, 800);
      } else {
        setFiles((prev) => {
          const updated = [...prev];
          if (updated[index]) {
            updated[index] = { ...updated[index], progress: Math.min(progress, 99) };
          }
          return updated;
        });
      }
    }, 200);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
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
                if (e.target.files) {
                  handleFiles(Array.from(e.target.files));
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
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uf, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-3 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <File className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{uf.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uf.file.size)}
                    </p>
                  </div>
                  {uf.status === "uploading" && (
                    <div className="space-y-1">
                      <Progress value={uf.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">Uploading...</p>
                    </div>
                  )}
                  {uf.status === "processing" && (
                    <p className="text-xs text-muted-foreground">Processing document...</p>
                  )}
                  {uf.status === "done" && (
                    <p className="text-xs text-green-600 dark:text-green-500">Ready</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
