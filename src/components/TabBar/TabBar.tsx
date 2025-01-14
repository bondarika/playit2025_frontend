import RouterTab from "../RouterTab/RouterTab";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage";
import StorePage from "../../pages/StorePage";
import TaskPage from "../../pages/TaskPage";
import './styles.scss';

function TabBar() {
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
      </Routes>
    </>
  );
}

export default TabBar;
