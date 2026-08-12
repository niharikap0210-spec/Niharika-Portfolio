import React from "react";
import ReactDOM from "react-dom/client";
import "./lib/gsap"; // registers GSAP plugins + global ScrollTrigger config (must run first)
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
