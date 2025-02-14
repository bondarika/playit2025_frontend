import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import "./App.scss";
import TabBar from "./components/TabBar/TabBar";
import RegistrationPage from "./pages/RegistrationPage";

export default function App() {
  return (
    <BrowserRouter basename="playit">
      <Routes>
        <Route index element={<Navigate to="/profile" />} />
        {/* <Route path="/registration" element={<RegistrationPage />} /> */}
        <Route path="/*" element={<TabBar />} />
      </Routes>
    </BrowserRouter>
  );
}
