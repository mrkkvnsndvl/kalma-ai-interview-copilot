import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeepgram } from "@/hooks/use-deepgram";
import { useTranscript } from "@/hooks/use-transcript";

const Content = () => {
  const { transcript, isRecording } = useDeepgram();
  const { transcriptEntries, textBuffer } = useTranscript(transcript);
  const questionEntries = transcriptEntries.filter((entry) => entry.isQuestion);

  return (
    <section className="grid grid-cols-3">
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
                <span className="px-1">(Skipped)</span>
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
              {isRecording ? "Transcribing..." : "Waiting for capture..."}
            </p>
          )}
        </div>
      </ScrollArea>
      <ScrollArea className="col-span-2 p-1 h-[346px] overflow-hidden">
        <div className="flex flex-col gap-4">
          {questionEntries.length === 0 && (
            <p className="text-xs text-secondary">No questions captured yet.</p>
          )}
          {questionEntries.map((entry, index) => (
            <div key={entry.qNumber || index} className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-x-1">
                <span className="px-1 text-[10px] text-secondary bg-primary">
                  Q{entry.qNumber}
                </span>
                <p className="text-xs text-secondary">{entry.text}</p>
              </div>
              <p className="text-sm text-balance text-secondary">
                AI answer to the question goes here.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Content;
