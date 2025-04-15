import "@/styles/globals.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@/components/shared/theme-provider";
import PopupLayout from "@/layouts/popup-layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <PopupLayout />
    </ThemeProvider>
  </React.StrictMode>
);
