import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    proxy: {
      "/ws": {
        target: "wss://it-otdel.space",
        changeOrigin: true,
        ws: true,
        secure: true,
      },
    },

    allowedHosts: ["it-otdel.space"],
    host: true,
    port: 5173,
    hmr: false,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
});
