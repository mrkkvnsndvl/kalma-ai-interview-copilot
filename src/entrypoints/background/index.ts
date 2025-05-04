export default defineBackground(() => {
  async function setupOffscreen() {
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
    }
  }

  browser.runtime.onMessage.addListener(async (msg) => {
    if (msg.type === "start-capture") {
      await setupOffscreen();

      const streamId = await new Promise<string>((resolve) => {
        browser.tabCapture.getMediaStreamId(
          { targetTabId: msg.tabId },
          (streamId) => resolve(streamId)
        );
      });

      browser.runtime.sendMessage({
        type: "offscreen-start-capture",
        streamId,
      });
    }

    if (msg.type === "stop-capture") {
      await browser.offscreen.closeDocument();
    }
  });
});
