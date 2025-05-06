import { create } from "zustand";

export const useDeepgramStore = create<DeepgramStoreI>((set) => ({
  finalTranscript: "",
  partialTranscript: "",
  isRecording: false,
  setFinalTranscript: (update) =>
    set((state) => ({ finalTranscript: update(state.finalTranscript) })),
  setPartialTranscript: (text) => set({ partialTranscript: text }),
  setIsRecording: (isRecording) => set({ isRecording }),
  clearTranscripts: () => set({ finalTranscript: "", partialTranscript: "" }),
}));
