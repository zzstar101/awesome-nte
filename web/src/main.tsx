import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import logoSvg from "@repo/assets/logo.svg";
import "@/styles/index.css";
import { App } from "@/App";

// Wire the bespoke Mint Ghost-Cat SVG logo as site favicon.
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/svg+xml";
favicon.href = logoSvg;
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
