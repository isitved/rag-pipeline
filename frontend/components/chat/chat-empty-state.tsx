import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

export function ChatEmptyState() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Chat with your documents</h2>
          <p className="text-sm text-muted-foreground">
            Upload documents and ask questions. Get answers with citations from your files.
          </p>
        </div>
        <div className="grid gap-2">
          <Card className="transition-shadow hover:shadow-sm">
            <CardContent className="flex items-center gap-3 p-3 text-left">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Upload Documents</p>
                <p className="text-xs text-muted-foreground">
                  Add PDFs, Word, TXT, or Markdown files
                </p>
              </div>
              <Button nativeButton={false} size="sm" variant="outline" render={<Link href="/documents" />}>
                Upload
              </Button>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-sm">
            <CardContent className="flex items-center gap-3 p-3 text-left">
              <MessageSquare className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Start a conversation</p>
                <p className="text-xs text-muted-foreground">
                  Ask questions about your uploaded documents
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
