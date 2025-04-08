import { create } from "zustand";

interface MinimizeState {
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
}

export const useMinimizeStore = create<MinimizeState>((set) => ({
  isMinimized: false,
  setIsMinimized: (isMinimized) => set({ isMinimized }),
}));
