import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App.tsx";
import { init, miniApp } from "@telegram-apps/sdk";

const initializeTelegramSDK = async () => {
  try {
    await init()

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
    }
  } catch (error) {
    console.log("Ошибка инициализации", error)
  }
}

initializeTelegramSDK();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
