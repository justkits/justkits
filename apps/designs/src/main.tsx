import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@justkits/design-foundations/reset.css";
import "@justkits/motion/keyframes.css";

const root = document.getElementById("root")!; // NOSONAR

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
