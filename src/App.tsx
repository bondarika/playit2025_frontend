import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.scss";
import TabBar from "./components/TabBar/TabBar";
import WebApp from "@twa-dev/sdk";

export default function App() {
  WebApp.expand();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="profile" />} />
        <Route path="*" element={<TabBar />} />
      </Routes>
    </BrowserRouter>
  );
}
