import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import fs from "fs";

// export default defineConfig({
//   plugins: [react(), svgr({})],
//   server: {
//     allowedHosts: ["it-otdel.space"],
//     host: true,
//     port: 5173,
//     hmr: false,
//     watch: {
//       usePolling: true,
//     },
//   },
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, "./src/"),
//     },
//   },
// });
export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    allowedHosts: ["it-otdel.space"],
    https: {
      key: fs.readFileSync("localhost+2-key.pem"),
      cert: fs.readFileSync("localhost+2.pem"),
    },
    host: "localhost",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
});