import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path, { resolve } from "path";
import fs from "fs";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    hmr: {
      clientPort: 5173,
    },
    allowedHosts: ["it-otdel.space"],
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "certs", "localhost+2-key.pem")
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, "certs", "localhost+2.pem")
      ),
    },
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
