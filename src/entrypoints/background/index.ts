export default defineBackground(() => {
  async function setupOffscreen() {
    try {
      const offscreenUrl = browser.runtime.getURL("/offscreen.html");
      const existing = await browser.runtime.getContexts({
        contextTypes: ["OFFSCREEN_DOCUMENT" as Browser.runtime.ContextType],
        documentUrls: [offscreenUrl],
      });

      if (existing.length === 0) {
        await browser.offscreen.createDocument({
          url: "/offscreen.html",
          reasons: ["USER_MEDIA"],
          justification: "Continue capturing tab media after popup closes",
        });
        console.log("Offscreen document created.");
      } else {
        console.log("Offscreen document already exists.");
      }
    } catch (err) {
      console.error("Error setting up offscreen document:", err);
      throw new Error("Offscreen setup failed");
    }
  }

  browser.runtime.onMessage.addListener(async (msg) => {
    if (msg.type === "start-capture") {
      try {
        await setupOffscreen();

        const streamId = await new Promise<string>((resolve, reject) => {
          browser.tabCapture.getMediaStreamId(
            { targetTabId: msg.tabId },
            (streamId) => {
              if (browser.runtime.lastError) {
                reject(
                  new Error(
                    "Failed to get media stream ID: " +
                      browser.runtime.lastError.message
                  )
                );
              } else {
                resolve(streamId);
              }
            }
          );
        });

        await browser.runtime.sendMessage({
          type: "offscreen-start-capture",
          streamId,
        });

        await browser.runtime.sendMessage({ type: "offscreen-started" });
      } catch (err) {
        console.error("Failed to initiate capture process:", err);
        await browser.runtime.sendMessage({
          type: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }
  });
});
