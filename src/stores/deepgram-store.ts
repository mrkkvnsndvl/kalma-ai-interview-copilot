import { create } from "zustand";

export const DeepgramStore = create<DeepgramStore>((set) => ({
  finalTranscript: "",
  interimTranscript: "",
  isRecording: false,
  transcriptEntries: [],
  pendingTranscript: "",
  committedTranscriptLength: 0,
  nextQuestionIndex: 1,
  setFinalTranscript: (update) =>
    set((state) => ({ finalTranscript: update(state.finalTranscript) })),
  setInterimTranscript: (transcriptText: string) =>
    set({ interimTranscript: transcriptText }),
  setIsRecording: (isRecording: boolean) => set({ isRecording }),
  addTranscriptEntry: (entry) =>
    set((state) => ({
      transcriptEntries: [...state.transcriptEntries, entry],
    })),
  updateTranscriptEntry: (questionCount: number, answer: string) =>
    set((state) => ({
      transcriptEntries: state.transcriptEntries.map((entry) =>
        entry.questionCount === questionCount
          ? { ...entry, aiAnswer: answer }
          : entry
      ),
    })),
  setPendingTranscript: (transcriptText: string) =>
    set({ pendingTranscript: transcriptText }),
  setCommittedTranscriptLength: (length: number) =>
    set({ committedTranscriptLength: length }),
  incrementQuestionIndex: () =>
    set((state) => ({ nextQuestionIndex: state.nextQuestionIndex + 1 })),
}));
