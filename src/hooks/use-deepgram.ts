import { useEffect } from "react";

import { startDeepgramTranscription } from "@/services/deepgram";
import useTranscriptStore from "@/stores/deepgram-store";

const DEEPGRAM_KEY = import.meta.env.WXT_API_KEY;

const useDeepgram = () => {
  const { addTranscriptEntry, setIsCapturing } = useTranscriptStore();

  useEffect(() => {
    let cleanup: () => void;

    const handleTranscript = (text: string) => {
      const isQuestion = text.trim().endsWith("?");
      addTranscriptEntry(text, isQuestion);
    };

    const startTranscription = async () => {
      try {
        cleanup = await startDeepgramTranscription(
          DEEPGRAM_KEY,
          handleTranscript,
          (error) => {
            console.error("Deepgram error:", error);
            setIsCapturing(false);
          }
        );
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
  }, [addTranscriptEntry, setIsCapturing]);
};

export default useDeepgram;
