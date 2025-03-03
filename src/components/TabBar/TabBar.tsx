import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RouterTab from "../RouterTab/RouterTab";
import ProfilePage from "../../pages/Profile/ProfilePage";
import StorePage from "../../pages/StorePage";
import TaskPage from "../../pages/TaskPage/TaskPage";
import Shop from "@/assets/icons/shop/shop_icon.svg?react";
import Tasks from "@/assets/icons/tasks/tasks_icon.svg?react";
import "./styles.scss";

function TabBar() {
  const location = useLocation();
  const selected = location.pathname.split("/")[1];
  return (
    <>
      <div style={{ width: "100%" }} key={location.pathname}>
        <div className="tabbar">
          <RouterTab to="/tasks">
            <div className="tabbar__tab">
              <Tasks
                className={`icon-${
                  selected === "tasks" ? "active" : "inactive"
                }`}
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
                className={`icon-${
                  selected === "shop" ? "active" : "inactive"
                }`}
              />
              <p>магазин</p>
            </div>
          </RouterTab>
        </div>
      </div>

      <Routes>
        <Route index element={<Navigate to="/profile" />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/store" element={<StorePage />} />
      </Routes>
    </>
  );
}

export default TabBar;
