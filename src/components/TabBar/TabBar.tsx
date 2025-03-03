import { Routes, Route, Navigate } from "react-router-dom";
import RouterTab from "../RouterTab/RouterTab";
import ProfilePage from "../../pages/Profile/ProfilePage";
import StorePage from "../../pages/StorePage";
import TaskPage from "../../pages/TaskPage/TaskPage";
import Shop from "@/assets/icons/shop/shop_icon.svg?react";
import Tasks from "@/assets/icons/tasks/tasks_icon.svg?react";
import "./styles.scss";

const TabRoutes = () => (
  <Routes>
    <Route path="tasks" element={<TaskPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="store" element={<StorePage />} />
    <Route path="*" element={<Navigate to="profile" />} />
  </Routes>
);

function TabBar() {
  return (
    <>
      <div style={{ width: "100%" }} key={location.pathname}>
        <div className="tabbar">
          <RouterTab to="tasks">
            <div className="tabbar__tab">
              <Tasks />
              <p>задания</p>
            </div>
          </RouterTab>
          <RouterTab to="profile">
            <div></div>
          </RouterTab>
          <RouterTab to="store">
            <div className="tabbar__tab">
              <Shop />
              <p>магазин</p>
            </div>
          </RouterTab>
        </div>
      </div>

      <TabRoutes />
    </>
  );
}

export default TabBar;
