import { create } from "zustand";

export const useMinimizeStore = create<MinimizeStoreI>((set) => ({
  isMinimized: false,
  setIsMinimized: (isMinimized) => set({ isMinimized }),
}));
