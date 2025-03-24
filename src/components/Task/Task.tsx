import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import './styles.scss';
import icons from '../../assets/icons';
import { TaskProps } from '../../types/taskProps';

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

function Task({ task, onClick }: TaskProps) {
  return (
    <div
      onClick={onClick}
      className="task"
      style={{
        background: `linear-gradient(90deg, transparent 23.38%, #${
          hexCodes[task.id - 1]
        } 43.82%)`,
      }}
    >
      <img src={avatarArray[task.id - 1]} className="task_image" />
      <div className="task_main">
        <div className="task_character">
          <h2 className="task_name">{task.character}</h2>
          <p className="task_description">{task.description}</p>
        </div>
        <div className="task_reward">
          <p>{task.points}</p>
          <img src={icons["coin"]} />
        </div>
      </div>
    </div>
  );
}

export default Task;
