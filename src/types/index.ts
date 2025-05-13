interface aiModelI {
  modelName: string;
  id: string;
}

interface ContentHeaderI {
  onClose?: () => void;
}

interface DragStoreI {
  isDragging: boolean;
  position: { x: number; y: number };
  elementRef: HTMLDivElement | null;
  setIsDragging: (isDragging: boolean) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setElementRef: (ref: HTMLDivElement | null) => void;
}

interface InterviewConfigurationI {
  jobTitle: string;
  jobDescription?: string;
  companyName?: string;
  resume?: string;
  openRouterAPIKey: string;
  aiModel: string;
  deepgramAPIKey: string;
}

interface MinimizeStoreI {
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
}

interface TranscriptEntry {
  transcriptText: string;
  isQuestion: boolean;
  questionCount?: number;
  aiAnswer?: string;
}

interface DeepgramStore {
  finalTranscript: string;
  interimTranscript: string;
  isRecording: boolean;
  transcriptEntries: TranscriptEntry[];
  pendingTranscript: string;
  committedTranscriptLength: number;
  nextQuestionIndex: number;
  setFinalTranscript: (update: (prev: string) => string) => void;
  setInterimTranscript: (transcriptText: string) => void;
  setIsRecording: (isRecording: boolean) => void;
  addTranscriptEntry: (entry: {
    transcriptText: string;
    isQuestion: boolean;
    questionCount?: number;
  }) => void;
  updateTranscriptEntry: (questionCount: number, answer: string) => void;
  setPendingTranscript: (transcriptText: string) => void;
  setCommittedTranscriptLength: (length: number) => void;
  incrementQuestionIndex: () => void;
}
