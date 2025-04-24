import { create } from "zustand";

export const useMinimizeStore = create<MinimizeStateI>((set) => ({
  isMinimized: false,
  setIsMinimized: (isMinimized) => set({ isMinimized }),
}));
