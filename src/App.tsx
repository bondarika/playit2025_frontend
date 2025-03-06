import { Route, Routes, BrowserRouter } from "react-router-dom";
import TabBar from "./components/TabBar/TabBar";
import WebApp from "@twa-dev/sdk";

export default function App() {
  WebApp.expand();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<TabBar />} />
      </Routes>
    </BrowserRouter>
  );
}
