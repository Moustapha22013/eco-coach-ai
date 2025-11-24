export type MessageRole = 'user' | 'assistant' | 'system' | 'data';

export interface Message {
  id: string;
  role: MessageRole;
  content?: string; // Old API
  parts?: Array<{ // New API
    type: string;
    text?: string;
    toolCallId?: string;
    [key: string]: any;
  }>;
  createdAt?: Date;
  toolInvocations?: Array<{ // Legacy support
    toolCallId: string;
    toolName: string;
    args: any;
    result?: any;
  }>;
}

export interface EcoScoreReport {
  score: number;
  recommendations: string[];
  breakdown: {
    category: string;
    points: number;
    maxPoints: number;
    feedback: string;
  }[];
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  report: EcoScoreReport | null;
}
