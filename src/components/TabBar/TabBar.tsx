import RouterTab from "../RouterTab/RouterTab";
import { Routes, Route, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/Profile/ProfilePage";
import StorePage from "../../pages/StorePage";
import TaskPage from "../../pages/TaskPage/TaskPage";
// import RegistrationPage from "../../pages/RegistrationPage";
import "./styles.scss";
import Shop from "@/assets/icons/shop/shop_icon.svg?react";
import Tasks from "@/assets/icons/tasks/tasks_icon.svg?react";

function TabBar() {
  const location = useLocation();
  if (location.pathname === "/registration") {
    return null;
  }
  const selected = location.pathname.split("/")[1];

  return (
    <>
      <div style={{width: "100%"}}>
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
                  selected === "store" ? "active" : "inactive"
                }`}
              />
              <p>магазин</p>
            </div>
          </RouterTab>
        </div>
      </div>

      <Routes>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/store" element={<StorePage />} />
        {/* <Route path="/registration" element={<RegistrationPage />} /> */}
      </Routes>
    </>
  );
}

export default TabBar;
