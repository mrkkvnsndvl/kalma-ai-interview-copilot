import { create } from "zustand";

interface TranscriptEntry {
  text: string;
  isQuestion: boolean;
  qNumber?: number;
}

interface DeepgramStore {
  transcriptEntries: TranscriptEntry[];
  questionCount: number;
  isCapturing: boolean;
  addTranscriptEntry: (text: string, isQuestion: boolean) => void;
  setIsCapturing: (status: boolean) => void;
  resetTranscript: () => void;
}

const useDeepgramStore = create<DeepgramStore>((set) => ({
  transcriptEntries: [],
  questionCount: 0,
  isCapturing: false,
  addTranscriptEntry: (text, isQuestion) =>
    set((state) => {
      const newEntry: TranscriptEntry = { text, isQuestion };
      if (isQuestion) {
        newEntry.qNumber = state.questionCount + 1;
        return {
          transcriptEntries: [...state.transcriptEntries, newEntry],
          questionCount: state.questionCount + 1,
        };
      }
      return { transcriptEntries: [...state.transcriptEntries, newEntry] };
    }),
  setIsCapturing: (status) => set({ isCapturing: status }),
  resetTranscript: () => set({ transcriptEntries: [], questionCount: 0 }),
}));

export default useDeepgramStore;
