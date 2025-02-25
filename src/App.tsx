import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import "./App.scss";
import TabBar from "./components/TabBar/TabBar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/profile" />} />
        <Route path="/*" element={<TabBar />} />
      </Routes>
    </BrowserRouter>
  );
}
