import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          syncfusion: [
            "@syncfusion/ej2-base",
            "@syncfusion/ej2-react-schedule",
            "@syncfusion/ej2-buttons",
            "@syncfusion/ej2-calendars",
            "@syncfusion/ej2-dropdowns",
            "@syncfusion/ej2-inputs",
            "@syncfusion/ej2-navigations",
            "@syncfusion/ej2-popups",
          ],
        },
      },
    },
  },
});
