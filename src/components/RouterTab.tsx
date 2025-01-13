import { ReactNode } from "react";
import {
  useLocation,
  useNavigate,
  useResolvedPath,
  To,
} from "react-router-dom";

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

export default RouterTab;
