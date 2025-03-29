import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import Cookies from 'js-cookie';
import icons from '../../assets/icons';
import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import { ModalProps } from '../../types/modal';
import { submitTask } from '../../services/api';

const characterAvatars: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/characters_a/*.webp',
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

function Modal({ task }: ModalProps, ref: React.Ref<ModalHandle>) {
  const [isVisible, setIsVisible] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const userId = Cookies.get('user_id');
      if (!userId) {
        throw new Error('User ID not found in cookies');
      }
      formData.append('task_id', task.id.toString());
      formData.append('user_id', userId);
      formData.append('value', task.points.toString());

      if (task.verification === 'автоматически') {
        formData.append('text', userAnswer);
      } else if (task.verification === 'модерация' && file) {
        formData.append('file', file);
      }

      await submitTask(formData);
      setIsVisible(false);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="modal">
      <div
        className="modal_content"
        style={{
          backgroundColor: `#${hexCodes[task.id - 1]}`,
        }}
      >
        <button role="close" onClick={() => setIsVisible(false)}>
          <img src={icons['close']} />
        </button>
        <img src={avatarArray[task.id - 1]} className="modal_content-avatar" />
        <h2>{task.character}</h2>
        <p>{task.description}</p>

        {task.verification === 'автоматически' && (
          <div>
            <input
              type="text"
              placeholder="напиши сюда ответ"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button onClick={handleSubmit}>отправить</button>
          </div>
        )}

        {task.verification === 'модерация' && (
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>отправить</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(Modal);
