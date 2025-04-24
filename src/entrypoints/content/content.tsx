import { AudioLinesIcon, Loader2 } from "lucide-react";
import { useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import useDeepgram from "@/hooks/use-deepgram";
import useOpenRouter from "@/hooks/use-openrouter";
import useTranscriptStore from "@/stores/deepgram-store";
import useOpenRouterStore from "@/stores/openrouter-store";
import { Button } from "@/components/ui/button";

const Content = () => {
  useDeepgram();
  const {
    transcriptEntries,
    isCapturing,
    textBuffer,
    createTranscriptFromBuffer,
    skipBuffer,
  } = useTranscriptStore();

  const { getAnswer } = useOpenRouter();
  const { answers, isLoading, error } = useOpenRouterStore();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!textBuffer) return;

      if (e.key === "ArrowLeft") {
        skipBuffer();
      } else if (e.key === "ArrowRight") {
        handleGetAnswer();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [textBuffer, skipBuffer]);

  const handleGetAnswer = async () => {
    if (!textBuffer) return;
    const nextQuestionNumber =
      transcriptEntries.filter((entry) => entry.isQuestion).length + 1;
    // Create transcript entry first
    createTranscriptFromBuffer();
    // Then get the answer
    await getAnswer(textBuffer, nextQuestionNumber);
  };

  return (
    <section className="grid grid-cols-3">
      <div className="grid auto-rows-auto">
        <ScrollArea className="p-1 h-[346px] overflow-hidden">
          <div className="flex flex-col gap-1">
            {transcriptEntries.map((entry, index) => (
              <p
                key={index}
                className={`p-1 text-xs ${
                  entry.isQuestion
                    ? "text-secondary bg-primary/30"
                    : "text-secondary/70 bg-primary/30"
                }`}
              >
                {entry.text}&nbsp;
                {entry.isQuestion ? (
                  <span className="px-1 text-[10px] bg-primary">
                    Q{entry.qNumber}
                  </span>
                ) : (
                  <span className="px-1">(Skip)</span>
                )}
              </p>
            ))}
            {textBuffer && (
              <p className="p-1 text-xs text-secondary/70 bg-primary/30">
                {textBuffer} <span className="px-1">(Recording...)</span>
              </p>
            )}
            {transcriptEntries.length === 0 && !textBuffer && (
              <p className="p-1 text-xs text-secondary bg-primary/30">
                Transcribing...
              </p>
            )}
          </div>
        </ScrollArea>
        <div className="p-1 place-content-end">
          <p className="flex flex-row items-center p-1 text-[10px] bg-primary text-secondary">
            <AudioLinesIcon className="w-3 h-3 mr-1" />
            Audio:
            <span>&nbsp;{isCapturing ? "Current page" : "Not capturing"}</span>
          </p>
        </div>
      </div>
      <div className="grid auto-rows-auto col-span-2">
        <ScrollArea className="p-1 h-[346px] overflow-hidden">
          <div className="flex flex-col gap-4">
            {transcriptEntries
              .filter((entry) => entry.isQuestion)
              .map((entry) => (
                <div key={entry.qNumber} className="flex flex-col gap-2">
                  <div className="flex items-start gap-x-1">
                    <span className="px-1 text-[10px] text-secondary bg-primary">
                      Q{entry.qNumber}
                    </span>
                    <p className="text-xs text-secondary">{entry.text}</p>
                  </div>
                  {isLoading &&
                  entry.qNumber ===
                    transcriptEntries.filter((e) => e.isQuestion).length ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <p className="text-xs text-secondary">
                        Generating answer...
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-balance text-secondary">
                      {answers[entry.qNumber as number]}
                    </p>
                  )}
                </div>
              ))}
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </ScrollArea>
        <div className="p-1 place-content-end flex gap-2">
          <Button
            onClick={skipBuffer}
            disabled={!textBuffer}
            className="flex-1 text-[10px] cursor-pointer p-1 h-fit"
            variant="default"
          >
            Skip
          </Button>
          <Button
            onClick={handleGetAnswer}
            disabled={!textBuffer}
            className="flex-1 text-[10px] cursor-pointer p-1 h-fit"
            variant="ghost"
          >
            Get Answer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Content;
