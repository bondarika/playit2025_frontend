import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import './styles.scss';
import icons from '../../assets/icons';
import { TaskProps } from '../../types/taskProps';
import DOMPurify from 'dompurify';

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

function Task({ task, onClick, isDone }: TaskProps) {
  const sanitizedDescription = DOMPurify.sanitize(task.description);
  return (
    <div
      onClick={!isDone ? onClick : undefined}
      className={`task ${isDone ? 'task__disabled' : ''}`}
      style={{ background: `#${hexCodes[task.id - 1]}` }}
    >
      {task.done && (
        <img
          src={icons['check']}
          className="task__checkmark"
        />
      )}
      <img src={avatarArray[task.id - 1]} className="task_image" />
      <div className="task_main">
        <div>
          <h2 className="task_name">{task.character}</h2>
          <p
            className="task_description"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
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
