import {
  useNavigate,
  useResolvedPath,
  useLocation,
} from "react-router-dom";
import { RouterTabProps } from "./types";
import './styles.scss';


function RouterTab({ children, to }: RouterTabProps) {
  const navigate = useNavigate();

  const { pathname: toPathname } = useResolvedPath(to);
  const { pathname: locationPathname } = useLocation();

  const selected = locationPathname.startsWith(toPathname);

  return (
    <button className="router-tab" onClick={() => navigate(to)} aria-selected={selected}>
      {children}
    </button>
  );
}

export default RouterTab;
