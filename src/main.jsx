import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerLicense } from "@syncfusion/ej2-base";
import App from "./App";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import "./styles/global.css";

const SYNCFUSION_RUNTIME_KEY = "__legends_syncfusion_runtime_ready__";
const syncfusionLicense =
  import.meta.env.VITE_SYNCFUSION_KEY ||
  import.meta.env.VITE_SYNCFUSION_LICENSE_KEY;

if (typeof window !== "undefined" && !window[SYNCFUSION_RUNTIME_KEY]) {
  if (syncfusionLicense) {
    registerLicense(syncfusionLicense);
  } else if (import.meta.env.DEV) {
    console.warn("Syncfusion license key is not set");
  }
  window[SYNCFUSION_RUNTIME_KEY] = true;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
