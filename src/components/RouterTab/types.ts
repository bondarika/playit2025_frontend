import { ReactNode } from "react";
import { To } from "react-router-dom";

export interface RouterTabProps {
  children: ReactNode;
  to: To;
}