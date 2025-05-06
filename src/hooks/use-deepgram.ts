import { useEffect } from "react";
import { browser } from "#imports";
import { useDeepgramStore } from "@/stores/deepgram-store";

export const useDeepgram = () => {
  const setFinalTranscript = useDeepgramStore((state) => state.setFinalTranscript);
  const setPartialTranscript = useDeepgramStore((state) => state.setPartialTranscript);
  const setIsRecording = useDeepgramStore((state) => state.setIsRecording);
  const finalTranscript = useDeepgramStore((state) => state.finalTranscript);
  const partialTranscript = useDeepgramStore((state) => state.partialTranscript);
  const isRecording = useDeepgramStore((state) => state.isRecording);

  useEffect(() => {
    const listener = (msg: any) => {
      if (msg.type !== "transcription-update") return;
      const { transcript, isFinal } = msg;
      if (isFinal) {
        setFinalTranscript((prev) => prev + transcript + " ");
        setPartialTranscript("");
      } else {
        setPartialTranscript(transcript);
      }
    };
    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, [setFinalTranscript, setPartialTranscript]);

  const combinedTranscript = `${finalTranscript} ${partialTranscript}`.trim();

  return {
    startCapture: async (streamId: string) => {
      setIsRecording(true);
    },
    isRecording,
    transcript: combinedTranscript,
  };
};
