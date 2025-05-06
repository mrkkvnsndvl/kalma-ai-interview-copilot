interface DeepgramStoreI {
  finalTranscript: string;
  partialTranscript: string;
  isRecording: boolean;
  setFinalTranscript: (update: (prev: string) => string) => void;
  setPartialTranscript: (text: string) => void;
  setIsRecording: (isRecording: boolean) => void;
  clearTranscripts: () => void;
}