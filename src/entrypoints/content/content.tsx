import { AudioLinesIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import useDeepgram from "@/hooks/use-deepgram";
import useTranscriptStore from "@/stores/deepgram-store";

const Content = () => {
  useDeepgram();
  const { transcriptEntries, isCapturing } = useTranscriptStore();

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
                {entry.text}
                {entry.isQuestion ? (
                  <span className="px-1 text-[10px] bg-primary">
                    Q{entry.qNumber}
                  </span>
                ) : (
                  <span className="px-1">(Skip)</span>
                )}
              </p>
            ))}
            {transcriptEntries.length === 0 && (
              <p className="p-1 text-xs text-secondary bg-primary/30">
                Transcribing...
              </p>
            )}
          </div>
        </ScrollArea>
        <div className="p-1 place-content-end">
          <p className="flex flex-row items-center p-1 text-[10px] bg-primary text-secondary">
            <AudioLinesIcon className="w-3 h-3 mr-1" />
            Audio: <span>{isCapturing ? "Current page" : "Not capturing"}</span>
          </p>
        </div>
      </div>
      <ScrollArea className="col-span-2 p-1 h-[346px] overflow-hidden">
        <div className="flex flex-col gap-4">
          {transcriptEntries
            .filter((entry) => entry.isQuestion)
            .map((entry) => (
              <div key={entry.qNumber} className="flex flex-col gap-2">
                <div className="flex items-center gap-x-1">
                  <span className="px-1 text-[10px] text-secondary bg-primary">
                    Q{entry.qNumber}
                  </span>
                  <p className="text-xs text-secondary">{entry.text}</p>
                </div>
                <p className="text-sm text-balance text-secondary">
                  Sample answer for question {entry.qNumber}...
                </p>
              </div>
            ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Content;
