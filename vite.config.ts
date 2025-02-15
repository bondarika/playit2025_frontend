import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    allowedHosts: ["it-otdel.space"],
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: "wss", // Используем WebSocket через HTTPS
      host: "it-otdel.space",
      port: 443, // HTTPS-порт
      clientPort: 443,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
});

