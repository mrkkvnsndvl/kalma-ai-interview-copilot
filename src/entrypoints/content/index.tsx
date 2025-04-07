import "@/styles/globals.css";

import ReactDOM from "react-dom/client";

import ContentLayout from "@/layouts/content-layout";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "kalma-ai-interview-copilot",
      position: "overlay",
      anchor: "html",
      append: "first",
      zIndex: 99999999,

      onMount: (container) => {
        const content = document.createElement("div");
        container.append(content);
        const root = ReactDOM.createRoot(content);
        root.render(<ContentLayout />);
        return root;
      },

      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
