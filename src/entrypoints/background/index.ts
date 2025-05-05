import { Browser, browser } from "#imports";

export default defineBackground(() => {
  async function setupOffscreen() {
    const offscreenUrl = browser.runtime.getURL("/offscreen.html");
    const contexts = await browser.runtime.getContexts({
      contextTypes: [
        "OFFSCREEN_DOCUMENT" as unknown as Browser.runtime.ContextType,
      ],
      documentUrls: [offscreenUrl],
    });
    if (contexts.length === 0) {
      await browser.offscreen.createDocument({
        url: "/offscreen.html",
        reasons: ["USER_MEDIA"],
        justification: "Continue capturing tab audio after popup closes",
      });
    }
  }

  browser.runtime.onMessage.addListener(async (msg) => {
    if (msg.type === "start-capture") {
      await setupOffscreen();
      browser.tabCapture.getMediaStreamId(
        { targetTabId: msg.tabId },
        (streamId: string) => {
          browser.runtime.sendMessage({
            type: "offscreen-start-capture",
            streamId,
          });
        }
      );
    }
    if (msg.type === "stop-capture") {
      await browser.offscreen.closeDocument();
    }
    if (msg.type === "transcription-update") {
      const activeTabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (activeTabs[0]?.id) {
        browser.tabs.sendMessage(activeTabs[0].id, msg);
      }
    }
  });
});
