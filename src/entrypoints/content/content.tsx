import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDeepgram } from "@/hooks/use-deepgram";
import { openrouterService } from "@/services/openrouter-service";

const Content = () => {
  const {
    isRecording,
    transcriptEntries,
    pendingTranscript,
    updateTranscriptEntry,
  } = useDeepgram();

  const questionEntries = transcriptEntries.filter((entry) => entry.isQuestion);

  useEffect(() => {
    questionEntries.forEach((entry) => {
      if (!entry.aiAnswer && entry.questionCount) {
        openrouterService(entry.transcriptText).then((answer) => {
          updateTranscriptEntry(entry.questionCount!, answer);
        });
      }
    });
  }, [questionEntries, updateTranscriptEntry]);

  return (
    <section className="grid grid-cols-[1fr_auto_2fr] h-[464px]">
      <ScrollArea className="p-1 overflow-hidden h-[464px]">
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
              {entry.transcriptText}&nbsp;
              {entry.isQuestion ? (
                <span className="px-1 text-xs bg-primary">
                  Q{entry.questionCount}
                </span>
              ) : (
                <span className="px-1 text-xs">(Skip)</span>
              )}
            </p>
          ))}
          {pendingTranscript ? (
            <p className="p-1 text-xs text-secondary/70 bg-primary/30">
              {pendingTranscript}
            </p>
          ) : (
            <p className="p-1 text-xs text-secondary bg-primary/30">
              {!isRecording && (
                <>
                  Transcribing
                  <span className="animate-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </ScrollArea>
      <Separator className="w-[2px]" orientation="vertical" />
      <ScrollArea className="p-1 overflow-hidden h-[464px]">
        <div className="flex flex-col gap-4">
          {questionEntries.map((entry, index) => (
            <div
              key={entry.questionCount || index}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-row items-center gap-x-1">
                <span className="px-1 text-xs text-secondary bg-primary">
                  Q{entry.questionCount}
                </span>
                <p className="text-xs text-secondary">{entry.transcriptText}</p>
              </div>
              <div className="text-base text-balance text-secondary">
                {entry.aiAnswer ? (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      ol: ({ node, ...props }) => (
                        <ol className="ml-4 list-decimal" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="ml-4 list-disc" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                    }}
                  >
                    {entry.aiAnswer}
                  </Markdown>
                ) : (
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Content;
