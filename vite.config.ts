import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
     hmr: {
      host: 'it-otdel.space', // Укажи свой домен
    },
    allowedHosts: ["it-otdel.space"],
    host: true,
    port: 5173,
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
