import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.scss";
import TabBar from "./components/TabBar/TabBar";
import WebApp from "@twa-dev/sdk";

export default function App() {
  WebApp.expand();
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      document.body.style.height = window.visualViewport?.height + "px";
    });
  }
  // This will ensure user never overscroll the page
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/profile" />} />
      </Routes>
      <TabBar />
    </BrowserRouter>
  );
}
