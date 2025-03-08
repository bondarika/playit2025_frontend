import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RouterTab from "../RouterTab/RouterTab";
import Store from "../../pages/Store/Store";
import Task from "../../pages/Tasks/Tasks";
import Shop from "@/assets/icons/shop/shop_icon.svg?react";
import Tasks from "@/assets/icons/tasks/tasks_icon.svg?react";
import "./styles.scss";
import Profile from "../../pages/Profile/Profile";
import WebApp from "@twa-dev/sdk";

function TabBar() {
  const location = useLocation();
  const selected = location.pathname.split("/")[1];
  const params = new URLSearchParams(WebApp.initData);
  const userData = JSON.parse(params.get("user") || "null");

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
            <div>
              <img
                src={userData.photo_url}
                alt="профиль"
                className="tabbar__avatar"
              />
            </div>
          </RouterTab>
          <RouterTab to="/store">
            <div className="tabbar__tab">
              <Shop
                className={`icon-${
                  selected === "store" ? "active" : "inactive"
                }`}
              />
              <p>магазин</p>
            </div>
          </RouterTab>
        </div>
      </div>

      <Routes>
        <Route index element={<Navigate to="/profile" />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </>
  );
}

export default TabBar;
