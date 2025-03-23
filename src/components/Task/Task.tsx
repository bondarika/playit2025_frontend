import { ITask } from '../../types/task';
import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import './styles.scss';
import coin_icon from '@/assets/icons/coin_icon.svg';

const characterAvatars: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/characters/*.png',
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

type TaskProps = {
  task: ITask;
};

function Task({ task }: TaskProps) {
  return (
    <div
      className="task"
      style={{
        background: `linear-gradient(90deg, transparent 23.38%, #${
          hexCodes[task.id - 1]
        } 43.82%)`,
      }}
    >
      <img src={avatarArray[task.id - 1]} className="task_image" />
      <div className='task_main'>
        <div className="task_character">
          <h2 className="task_name">{task.character}</h2>
          <p className="task_description">{task.description}</p>
        </div>
        <div className="task_reward">
          <p>{task.points}</p>
          <img src={coin_icon} />
        </div>
      </div>
    </div>
  );
}

export default Task;
