import { browser } from "#imports";

export default defineBackground(() => {
  const offscreen = async () => {
    const contexts = await browser.runtime.getContexts({
      contextTypes: [browser.runtime.ContextType.OFFSCREEN_DOCUMENT],
      documentUrls: [browser.runtime.getURL("/offscreen.html")],
    });
    if (contexts.length === 0) {
      await browser.offscreen.createDocument({
        url: "/offscreen.html",
        reasons: [browser.offscreen.Reason.USER_MEDIA],
        justification: "Persist tab capture.",
      });
    }
  };

  browser.runtime.onMessage.addListener(async (message) => {
    if (message.type === "start-tab-capture") {
      await offscreen();
      browser.tabCapture.getMediaStreamId(
        { targetTabId: message.tabId },
        (streamId: string) => {
          browser.runtime
            .sendMessage({
              type: "offscreen-start-tab-capture",
              streamId,
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    }
    if (message.type === "display-transcript") {
      const activeTabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (activeTabs[0]?.id) {
        try {
          await browser.tabs.sendMessage(activeTabs[0].id, message);
        } catch (error) {
          console.error("Message not delivered: ", error);
        }
      } else {
        console.warn("No active tab found to deliver the message.");
      }
    }
    if (message.type === "stop-tab-capture") {
      await browser.offscreen.closeDocument();
    }
  });
});
