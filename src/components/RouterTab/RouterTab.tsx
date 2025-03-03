import { useNavigate, useLocation } from "react-router-dom";
import { RouterTabProps } from "./types";
import "./styles.scss";

function RouterTab({ children, to }: RouterTabProps) {
  const navigate = useNavigate();

  const toPathname = `/${to}`;
  const { pathname: locationPathname } = useLocation();

  const selected = locationPathname.startsWith(toPathname);

  return (
    <button role="tab" onClick={() => navigate(to)} aria-selected={selected}>
      {children}
    </button>
  );
}

export default RouterTab;
