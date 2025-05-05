import React, { useEffect, useState } from "react";
import { browser } from "#imports";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptionUpdateMessage {
  type: "transcription-update";
  transcript: string;
  isFinal: boolean;
}

const Content: React.FC = () => {
  const [finalTranscript, setFinalTranscript] = useState<string>("");
  const [partialTranscript, setPartialTranscript] = useState<string>("");

  useEffect(() => {
    const listener = (msg: any) => {
      if (msg.type !== "transcription-update") return;
      const { transcript, isFinal } = msg as TranscriptionUpdateMessage;
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
  }, []);

  const displayTranscript = (finalTranscript + partialTranscript).trim();

  return (
    <section className="grid grid-cols-3">
      <ScrollArea className="p-1 h-[346px] overflow-hidden">
        <div className="flex flex-col gap-1">
          <p
            id="transcript"
            className="p-1 text-xs text-secondary bg-primary/30"
          >
            {displayTranscript || "Transcribing..."}
          </p>
        </div>
      </ScrollArea>
      <ScrollArea className="col-span-2 p-1 h-[346px] overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-x-1">
            <span className="px-1 text-[10px] text-secondary bg-primary">
              Q1
            </span>
            <p className="text-xs text-secondary">
              What is your strength and weaknesses?
            </p>
          </div>
          <p className="text-sm text-balance text-secondary">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima,
            perferendis saepe! Dolorem nulla expedita tempore ullam tempora
            provident deleniti nobis.
          </p>
        </div>
      </ScrollArea>
    </section>
  );
};

export default Content;
