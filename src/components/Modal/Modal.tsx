import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import Cookies from 'js-cookie';
import icons from '../../assets/icons';
import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import { ModalProps } from '../../types/modal';
import { submitTask } from '../../services/api';
import Button from '../Button/Button';

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
      const userId = Cookies.get('user_id');
      if (!userId) {
        throw new Error('User ID not found in cookies');
      }

      const requestBody: {
        task_id: number;
        user_id: number;
        value: number;
        user_answer?: string;
      } = {
        task_id: task.id,
        user_id: parseInt(userId, 10),
        value: task.points,
      };

      if (task.verification === 'автоматически') {
        requestBody.user_answer = userAnswer;
      } else if (task.verification === 'модерация' && file) {
        console.warn('File uploads are not supported in this request format.');
      }

      console.log('Request Body:', requestBody);

      await submitTask(requestBody);
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
        <div className="modal_content_main">
          <div className="modal_content_main_title">
            <h2 className="modal_content_main_title-character">
              {task.character}
            </h2>
            <div className="modal_content_main_title-points">
              <p>{`награда: ${task.points}`}</p>
              <img src={icons['coin']} />
            </div>
          </div>
          <p>{task.description}</p>
          <p className="modal_content_main-task">задание</p>
          <p style={{ marginBottom: '20px' }}>{task.task}</p>

          {task.verification === 'автоматически' && (
            <div>
              <input
                type="text"
                placeholder="напиши сюда ответ"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <Button onClick={handleSubmit}>отправить</Button>
            </div>
          )}

          {task.verification === 'модерация' && (
            <div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => handleFileChange(e)}
                />
                <label htmlFor="fileInput">
                  прикрепи сюда решение
                </label>
              </div>
              <Button onClick={handleSubmit}>отправить</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Modal);
