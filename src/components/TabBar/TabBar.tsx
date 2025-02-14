import RouterTab from "../RouterTab/RouterTab";
import { Routes, Route, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/Profile/ProfilePage";
import StorePage from "../../pages/StorePage";
import TaskPage from "../../pages/TaskPage";
import RegistrationPage from "../../pages/RegistrationPage";
import "./styles.scss";
import Shop from "/src/assets/icons/shop/shop_icon.svg?react";
import Tasks from "/src/assets/icons/tasks/tasks_icon.svg?react";

function TabBar() {
  const location = useLocation();
  if (location.pathname === "/registration") {
    return null;
  }
  const selected = location.pathname.split("/")[1];

  return (
    <>
      <div className="tabbar">
        <RouterTab to="/tasks">
          <div className="tabbar__tab">
            <Tasks
              className={`icon-${selected === "tasks" ? "active" : "inactive"}`}
            />
            <p>задания</p>
          </div>
        </RouterTab>
        <RouterTab to="/profile">
          <div></div>
        </RouterTab>
        <RouterTab to="/store">
          <div className="tabbar__tab">
            <Shop
              className={`icon-${selected === "shop" ? "active" : "inactive"}`}
            />
            <p>магазин</p>
          </div>
        </RouterTab>
      </div>
      <Routes>
        <Route path="playit/tasks" element={<TaskPage />} />
        <Route path="playit/profile" element={<ProfilePage />} />
        <Route path="playit/store" element={<StorePage />} />
        <Route path="playit/registration" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default TabBar;
