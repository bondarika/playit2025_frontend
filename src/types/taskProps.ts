import { Task } from './task';

export interface TaskProps {
  task: Task;
  onClick: () => void;
  isDone: boolean;
  isInProgress: boolean;
}
