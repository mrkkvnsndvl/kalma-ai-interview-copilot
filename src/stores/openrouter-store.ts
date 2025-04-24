import { create } from "zustand";

interface OpenRouterStore {
  answers: Record<number, string>;
  isLoading: boolean;
  error: string | null;
  setAnswer: (questionNumber: number, answer: string) => void;
  setIsLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
}

const useOpenRouterStore = create<OpenRouterStore>((set) => ({
  answers: {},
  isLoading: false,
  error: null,
  setAnswer: (questionNumber, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionNumber]: answer },
      error: null,
    })),
  setIsLoading: (status) => set({ isLoading: status }),
  setError: (error) => set({ error }),
}));

export default useOpenRouterStore;
