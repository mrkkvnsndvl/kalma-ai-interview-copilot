import { DeepgramStore } from "@/stores/deepgram-store";

export const useDeepgram = () => {
  const setFinalTranscript = DeepgramStore((state) => state.setFinalTranscript);
  const setInterimTranscript = DeepgramStore(
    (state) => state.setInterimTranscript
  );
  const setIsRecording = DeepgramStore((state) => state.setIsRecording);
  const finalTranscript = DeepgramStore((state) => state.finalTranscript);
  const interimTranscript = DeepgramStore((state) => state.interimTranscript);
  const isRecording = DeepgramStore((state) => state.isRecording);
  const transcriptEntries = DeepgramStore((state) => state.transcriptEntries);
  const pendingTranscript = DeepgramStore((state) => state.pendingTranscript);
  const committedTranscriptLength = DeepgramStore(
    (state) => state.committedTranscriptLength
  );
  const nextQuestionIndex = DeepgramStore((state) => state.nextQuestionIndex);
  const addTranscriptEntry = DeepgramStore((state) => state.addTranscriptEntry);
  const setPendingTranscript = DeepgramStore(
    (state) => state.setPendingTranscript
  );
  const setCommittedTranscriptLength = DeepgramStore(
    (state) => state.setCommittedTranscriptLength
  );
  const incrementQuestionIndex = DeepgramStore(
    (state) => state.incrementQuestionIndex
  );
  const updateTranscriptEntry = DeepgramStore(
    (state) => state.updateTranscriptEntry
  );

  useEffect(() => {
    const listener = (message: any) => {
      if (message.type !== "display-transcript") return;
      const { transcript, isFinal } = message;
      if (isFinal) {
        setFinalTranscript((prev) => prev + transcript + " ");
        setInterimTranscript("");
      } else {
        setInterimTranscript(transcript);
      }
    };
    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, [setFinalTranscript, setInterimTranscript]);

  const combinedTranscript = `${finalTranscript} ${interimTranscript}`.trim();
  useEffect(() => {
    setPendingTranscript(
      combinedTranscript.substring(committedTranscriptLength)
    );
  }, [combinedTranscript, committedTranscriptLength, setPendingTranscript]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!pendingTranscript.trim()) return;
      if (e.key === "ArrowLeft") {
        addTranscriptEntry({
          transcriptText: pendingTranscript,
          isQuestion: false,
        });
        setCommittedTranscriptLength(combinedTranscript.length);
        setPendingTranscript("");
      } else if (e.key === "ArrowRight") {
        addTranscriptEntry({
          transcriptText: pendingTranscript,
          isQuestion: true,
          questionCount: nextQuestionIndex,
        });
        incrementQuestionIndex();
        setCommittedTranscriptLength(combinedTranscript.length);
        setPendingTranscript("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    pendingTranscript,
    combinedTranscript,
    nextQuestionIndex,
    addTranscriptEntry,
    setCommittedTranscriptLength,
    setPendingTranscript,
    incrementQuestionIndex,
  ]);

  return {
    startCapture: async () => setIsRecording(true),
    isRecording,
    transcriptEntries,
    pendingTranscript,
    updateTranscriptEntry,
    nextQuestionIndex,
  };
};
