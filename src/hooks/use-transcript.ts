import { useEffect } from 'react';

import { useTranscriptStore } from '@/stores/transcript-store';

export const useTranscript = (transcript: string) => {
  const {
    textBuffer,
    lastCommittedLength,
    transcriptEntries,
    questionCount,
    addTranscriptEntry,
    updateTextBuffer,
    setLastCommittedLength,
    incrementQuestionCount,
  } = useTranscriptStore();

  useEffect(() => {
    updateTextBuffer(transcript.substring(lastCommittedLength));
  }, [transcript, lastCommittedLength, updateTextBuffer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (textBuffer.trim() === "") return;
      if (e.key === "ArrowLeft") {
        const entry = { text: textBuffer, isQuestion: false };
        addTranscriptEntry(entry);
        setLastCommittedLength(transcript.length);
        updateTextBuffer("");
      } else if (e.key === "ArrowRight") {
        const entry = {
          text: textBuffer,
          isQuestion: true,
          qNumber: questionCount,
        };
        addTranscriptEntry(entry);
        incrementQuestionCount();
        setLastCommittedLength(transcript.length);
        updateTextBuffer("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    textBuffer,
    transcript,
    questionCount,
    addTranscriptEntry,
    updateTextBuffer,
    setLastCommittedLength,
    incrementQuestionCount,
  ]);

  return { transcriptEntries, textBuffer };
};
