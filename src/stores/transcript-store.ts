import { create } from "zustand";

export const useTranscriptStore = create<TranscriptStoreI>((set) => ({
  transcriptEntries: [],
  textBuffer: "",
  lastCommittedLength: 0,
  questionCount: 1,
  addTranscriptEntry: (entry) =>
    set((state) => ({
      transcriptEntries: [...state.transcriptEntries, entry],
    })),
  updateTextBuffer: (text) => set({ textBuffer: text }),
  setLastCommittedLength: (length) => set({ lastCommittedLength: length }),
  incrementQuestionCount: () =>
    set((state) => ({ questionCount: state.questionCount + 1 })),
  resetTranscriptStore: () =>
    set({
      transcriptEntries: [],
      textBuffer: "",
      lastCommittedLength: 0,
      questionCount: 1,
    }),
}));
