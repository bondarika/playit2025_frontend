import { useLocation, NavLink } from "react-router-dom";
import Shop from "@/assets/icons/shop/shop_icon.svg?react";
import Tasks from "@/assets/icons/tasks/tasks_icon.svg?react";
import "./styles.scss";

function TabBar() {
  const location = useLocation();

  return (
    <div style={{ width: "100%" }} key={location.pathname}>
      <div className="tabbar">
        <NavLink
          to="/tasks"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tasks />
          <p>задания</p>
        </NavLink>

        <NavLink to="/profile">
          <div></div>
        </NavLink>

        <NavLink
          to="/store"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shop />
          <p>магазин</p>
        </NavLink>
      </div>
    </div>
  );
}

export default TabBar;
