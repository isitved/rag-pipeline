import { ChatSession, Document } from "@/lib/types";

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Product Requirements Document.pdf",
    type: "application/pdf",
    size: 2458624,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "ready",
    chunks: 42,
  },
  {
    id: "doc-2",
    name: "API Documentation.md",
    type: "text/markdown",
    size: 128432,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "ready",
    chunks: 15,
  },
  {
    id: "doc-3",
    name: "Technical Architecture.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 892416,
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: "ready",
    chunks: 28,
  },
];

export const mockChatSession: ChatSession = {
  id: "session-1",
  title: "General Questions",
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  messages: [
    {
      id: "msg-1",
      role: "assistant",
      content: "Hi! Upload documents and ask me anything about them. I'll cite relevant passages from your documents.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
  ],
};

export function generateMockResponse(query: string): string {
  const responses = [
    "Based on your documents, I found relevant information. The key points are covered across multiple sections.\n\nKey highlights:\n- The system follows a modular architecture with clear separation of concerns\n- Authentication uses token-based auth with role-based access control\n- The API follows RESTful conventions with proper versioning",
    "Looking at the uploaded documents, the answer is in section 3.2. The implementation requires:\n\n1. Setting up the environment variables as specified\n2. Following the deployment checklist in the docs\n3. Configuring the database connections\n\nWould you like me to elaborate on any of these points?",
    "I found this information in your PRD. The product aims to solve [specific use case] by providing [key features]. The main constraints mentioned are timeline, budget, and technical feasibility.\n\nFrom the architecture doc, the recommended approach uses a microservices pattern with event-driven communication between components.",
    "According to the API documentation, you can authenticate by sending a POST request to /auth/login with your credentials. The response includes an access token that should be included in subsequent requests via the Authorization header.\n\nRate limits apply: 100 requests per minute for authenticated users.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
