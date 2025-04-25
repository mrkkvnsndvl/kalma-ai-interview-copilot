import "@/styles/globals.css";

import ReactDOM from "react-dom/client";
import { browser } from "wxt/browser";

import ContentLayout from "@/layouts/content-layout";

export default defineContentScript({
  matches: [
    "*://workspace.google.com/*",
    "*://*.zoom.us/*",
    "*://teams.live.com/*",
  ],

  cssInjectionMode: "ui",

  async main(ctx) {
    let isMounted = false;

    const ui = await createShadowRootUi(ctx, {
      name: "kalma-ai-interview-copilot",
      position: "overlay",
      anchor: "html",
      append: "first",
      zIndex: 99999,

      onMount: (container) => {
        const content = document.createElement("div");
        container.append(content);
        const root = ReactDOM.createRoot(content);
        root.render(
          <ContentLayout
            onClose={() => {
              ui.remove();
              isMounted = false;
            }}
          />
        );
        return root;
      },

      onRemove: (root) => {
        root?.unmount();
        isMounted = false;
      },
    });

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "MOUNT_COPILOT_UI" && !isMounted) {
        ui.mount();
        isMounted = true;
      }
    });
  },
});
