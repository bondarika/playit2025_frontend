import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path, { resolve } from "path";
import fs from "fs";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    allowedHosts: ["it-otdel.space"],
    https: {
      key: fs.readFileSync(
        path.resolve(
          __dirname,
          "/etc/letsencrypt/live/it-otdel.space/privkey.pem"
        )
      ),
      cert: fs.readFileSync(
        path.resolve(
          __dirname,
          "/etc/letsencrypt/live/it-otdel.space/fullchain.pem"
        )
      ),
    },
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
      host: "it-otdel.space",
      port: 5173,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
});
