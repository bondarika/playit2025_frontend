import RouterTab from "../RouterTab/RouterTab";
import { Routes, Route, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/Profile/ProfilePage";
import StorePage from "../../pages/StorePage";
import TaskPage from "../../pages/TaskPage";
import RegistrationPage from "../../pages/RegistrationPage";
import "./styles.scss";

function TabBar() {
  const location = useLocation();
  if (location.pathname === "/registration") {
    return null;
  }
  return (
    <>
      <div className="tab-bar">
        <RouterTab to="/tasks">задания</RouterTab>
        <RouterTab to="/profile">профиль</RouterTab>
        <RouterTab to="/store">магазин</RouterTab>
      </div>
      <Routes>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default TabBar;
