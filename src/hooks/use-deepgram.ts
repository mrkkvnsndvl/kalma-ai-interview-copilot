import { useEffect } from "react";
import { deepgram } from "@/services/deepgram";
import useTranscriptStore from "@/stores/deepgram-store";

const DEEPGRAM_KEY = import.meta.env.WXT_DEEPGRAM_API_KEY;

const useDeepgram = () => {
  const { appendToBuffer, setIsCapturing } = useTranscriptStore();

  useEffect(() => {
    let cleanup: () => void;

    const handleTranscript = (text: string) => {
      appendToBuffer(text);
    };

    const startTranscription = async () => {
      try {
        cleanup = await deepgram(DEEPGRAM_KEY, handleTranscript, (error) => {
          console.error("Deepgram error:", error);
          setIsCapturing(false);
        });
        setIsCapturing(true);
      } catch (error) {
        console.error("Transcription failed:", error);
        setIsCapturing(false);
      }
    };

    startTranscription();
    return () => {
      cleanup?.();
      setIsCapturing(false);
    };
  }, [appendToBuffer, setIsCapturing]);
};

export default useDeepgram;
