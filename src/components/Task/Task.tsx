﻿import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import './styles.scss';
import icons from '../../assets/icons';
import { TaskProps } from '../../types/taskProps';

const characterAvatars: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/characters_b/*.png',
  {
    eager: true,
  }
);

const avatarArray = Object.values(characterAvatars).map(
  (img) => (img as { default: string }).default
);
const avatarNames = Object.keys(characterAvatars).map(
  (path) => path.split('/').pop()?.replace('.png', '') ?? ''
);

const hexCodes = avatarNames.map((avatar) => extractHexFromImageName(avatar));

function Task({ task, onClick }: TaskProps) {
  return (
    <div
      onClick={!task.done ? onClick : undefined}
      className={`task ${task.done ? 'task__disabled' : ''}`}
      style={{
        background: task.done
          ? 'linear-gradient(275deg, #30A952 15.76%, rgba(48, 169, 82, 0.00) 100.77%), linear-gradient(90deg, rgba(28, 32, 37, 0.00) 23.38%, #1C2025 43.82%), url(<path-to-image>) lightgray 154.097px -9.863px / -48.169% 145.719% no-repeat'
          : `#${hexCodes[task.id - 1]}`,
        pointerEvents: task.done ? 'none' : 'auto',
      }}
    >
      {task.done && <div className="task__disabled" />}
      <img src={avatarArray[task.id - 1]} className="task_image" />
      <div className="task_main">
        <div>
          <h2 className="task_name">{task.character}</h2>
          <p className="task_description">{task.description}</p>
        </div>
        <div className="task_reward">
          <p>{task.points}</p>
          <img src={icons['coin']} />
        </div>
      </div>
    </div>
  );
}

export default Task;
