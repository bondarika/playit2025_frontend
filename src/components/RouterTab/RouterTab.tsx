import { useNavigate, useLocation, useResolvedPath } from "react-router-dom";
import { RouterTabProps } from "./types";
import "./RouterTab.module.scss";

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

export default RouterTab;
