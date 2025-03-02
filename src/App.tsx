import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.scss";
import TabBar from "./components/TabBar/TabBar";
import WebApp from "@twa-dev/sdk";
import TaskPage from "./pages/TaskPage/TaskPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import StorePage from "./pages/StorePage";

export default function App() {
  WebApp.expand();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />

        <Route element={<TabBar />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
