import { create } from "zustand";

interface TranscriptEntry {
  text: string;
  isQuestion: boolean;
  qNumber?: number;
  detection?: QuestionIndicator;
}

interface DeepgramStore {
  transcriptEntries: TranscriptEntry[];
  questionCount: number;
  isCapturing: boolean;
  textBuffer: string;
  mediaStream: MediaStream | null;
  addTranscriptEntry: (
    text: string,
    isQuestion: boolean,
    detection?: QuestionIndicator
  ) => void;
  appendToBuffer: (text: string) => void;
  createTranscriptFromBuffer: () => void;
  skipBuffer: () => void;
  setIsCapturing: (status: boolean) => void;
  resetTranscript: () => void;
  setMediaStream: (stream: MediaStream | null) => void;
}

const useDeepgramStore = create<DeepgramStore>((set) => ({
  transcriptEntries: [],
  questionCount: 0,
  isCapturing: false,
  textBuffer: "",
  mediaStream: null,
  appendToBuffer: (text) =>
    set((state) => ({ textBuffer: state.textBuffer + " " + text.trim() })),
  createTranscriptFromBuffer: () =>
    set((state) => {
      if (!state.textBuffer.trim()) return state;

      const newEntry: TranscriptEntry = {
        text: state.textBuffer.trim(),
        isQuestion: true,
        qNumber: state.questionCount + 1,
      };

      return {
        transcriptEntries: [...state.transcriptEntries, newEntry],
        questionCount: state.questionCount + 1,
        textBuffer: "",
      };
    }),
  skipBuffer: () =>
    set((state) => {
      if (!state.textBuffer.trim()) return state;

      const newEntry: TranscriptEntry = {
        text: state.textBuffer.trim(),
        isQuestion: false, // Mark as not a question to show (Skip)
      };

      return {
        transcriptEntries: [...state.transcriptEntries, newEntry],
        textBuffer: "",
      };
    }),
  addTranscriptEntry: (text, isQuestion, detection) =>
    set((state) => {
      const newEntry: TranscriptEntry = { text, isQuestion, detection };
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
  setMediaStream: (stream) => set({ mediaStream: stream }),
  resetTranscript: () =>
    set({
      transcriptEntries: [],
      questionCount: 0,
      textBuffer: "",
      mediaStream: null,
    }),
}));

export default useDeepgramStore;
