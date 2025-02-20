import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    allowedHosts: ["it-otdel.space"],
    host: "it-otdel.space",
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

