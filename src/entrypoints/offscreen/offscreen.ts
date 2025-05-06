import { browser } from "#imports";

import { startDeepgramCapture } from "@/services/deepgram";

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.type !== "offscreen-start-capture") return;
  try {
    await startDeepgramCapture(msg.streamId, (transcript, isFinal) => {
      browser.runtime
        .sendMessage({
          type: "transcription-update",
          transcript,
          isFinal,
        })
        .catch((error) => {
          console.warn("sendMessage from offscreen failed: ", error);
        });
    });
  } catch (error) {
    console.error("Deepgram capture error:", error);
  }
});
