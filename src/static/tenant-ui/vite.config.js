import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/static/",
  server: {
    proxy: {
      "/api": "http://0.0.0.0:8000",
    },
  },
});
