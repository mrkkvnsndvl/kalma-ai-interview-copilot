interface DragStoreI {
  isDragging: boolean;
  position: { x: number; y: number };
  elementRef: HTMLDivElement | null;
  setIsDragging: (isDragging: boolean) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setElementRef: (ref: HTMLDivElement | null) => void;
}
