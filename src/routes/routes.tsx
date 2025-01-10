import ProfilePage from "../pages/ProfilePage";
import StorePage from "../pages/StorePage";
import TaskPage from "../pages/TaskPage";
import { RouteObject } from 'react-router';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProfilePage />,
  },
  {
    path: "/store",
    element: <StorePage />,
  },
  {
    path: "/tasks",
    element: <TaskPage />,
  },
];

export default routes;
