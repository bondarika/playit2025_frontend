import { ITask } from "../../types/task";
import "./styles.scss";
import Coin from "@/assets/icons/coin/coin_icon.svg?react";

type TaskProps = {
  task: ITask;
};

function Task({ task }: TaskProps) {
  console.log('Task Props:', task); 
  return (
    <div className="task">
      <div className="task__info">
        <p className="task__character">{task.character}</p>
        <div
          className="task__description"
          style={{ width: '118px', height: '40px', textAlign: 'left' }}
        >
          {task.description}
        </div>
      </div>
      <div className="task__points">
        <p className="task__description">{task.points}</p>
        <Coin />
      </div>
    </div>
  );
}

export default Task;
