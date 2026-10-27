export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: "uploading" | "processing" | "ready" | "error";
  chunks?: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  citations?: Citation[];
}

export interface Citation {
  id: string;
  documentId: string;
  documentName: string;
  snippet: string;
  page?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}
