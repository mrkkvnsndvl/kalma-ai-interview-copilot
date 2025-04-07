import { create } from "zustand";

interface DragState {
  isDragging: boolean;
  position: { x: number; y: number };
  elementRef: HTMLDivElement | null;
  setIsDragging: (isDragging: boolean) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setElementRef: (ref: HTMLDivElement | null) => void;
}

export const useDragStore = create<DragState>((set) => ({
  isDragging: false,
  position: { x: 0, y: 0 },
  elementRef: null,
  setIsDragging: (isDragging) => set({ isDragging }),
  setPosition: (position) => set({ position }),
  setElementRef: (ref) => set({ elementRef: ref }),
}));
