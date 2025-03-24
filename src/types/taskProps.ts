import { ITask } from "./task";

export interface TaskProps {
  task: ITask;
  onClick: () => void;
}
