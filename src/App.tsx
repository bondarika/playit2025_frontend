import { ReactNode } from "react";
import {
  useNavigate,
  Route,
  Routes,
  Navigate,
  useResolvedPath,
  BrowserRouter,
  To,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import ProfilePage from "./pages/ProfilePage";
import StorePage from "./pages/StorePage";
import TaskPage from "./pages/TaskPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/profile" />} />
        <Route path="/*" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

function Page() {
  return (
    <>
      <div role="tablist">
        <RouterTab to="/profile">Tab 1</RouterTab>
        <RouterTab to="/store">Tab 2</RouterTab>
        <RouterTab to="/tasks">Tab 3</RouterTab>
      </div>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </>
  );
}

interface RouterTabProps {
  children: ReactNode;
  to: To;
}

function RouterTab({ children, to }: RouterTabProps) {
  const navigate = useNavigate();

  const { pathname: toPathname } = useResolvedPath(to);
  const { pathname: locationPathname } = useLocation();

  const selected = locationPathname.startsWith(toPathname);

  return (
    <button role="tab" onClick={() => navigate(to)} aria-selected={selected}>
      {children}
    </button>
  );
}
