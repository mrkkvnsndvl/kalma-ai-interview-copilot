interface TranscriptStoreI {
  transcriptEntries: { text: string; isQuestion: boolean; qNumber?: number }[];
  textBuffer: string;
  lastCommittedLength: number;
  questionCount: number;
  addTranscriptEntry: (entry: {
    text: string;
    isQuestion: boolean;
    qNumber?: number;
  }) => void;
  updateTextBuffer: (text: string) => void;
  setLastCommittedLength: (length: number) => void;
  incrementQuestionCount: () => void;
  resetTranscriptStore: () => void;
}
