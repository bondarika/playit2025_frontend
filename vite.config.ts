import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), svgr({})],
  server: {
    allowedHosts: ["it-otdel.space"],
    host: "it-otdel.space", // Замените true на конкретный домен
    port: 5173,
    hmr: {
      host: "it-otdel.space", // Явно указываем хост для HMR WebSocket
      protocol: "wss", // Используйте "wss", если сервер работает по HTTPS
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
});
