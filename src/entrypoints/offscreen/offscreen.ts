import { browser } from "#imports";

import { deepgramService } from "@/services/deepgram-service";

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type !== "offscreen-start-tab-capture") {
    return;
  }
  try {
    await deepgramService(message.streamId, (transcript, isFinal) => {
      browser.runtime
        .sendMessage({
          type: "display-transcript",
          transcript,
          isFinal,
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch (error) {
    console.error(error);
  }
});
