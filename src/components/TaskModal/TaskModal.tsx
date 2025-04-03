import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import Cookies from 'js-cookie';
import icons from '../../assets/icons';
import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import { TaskModalProps } from '../../types/taskModal';
import { submitTask } from '../../services/api';
import Button from '../Button/Button';
import { convertFileToBinary } from '../../utils/convertFileToBinary';

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

function TaskModal({ task }: TaskModalProps, ref: React.Ref<ModalHandle>) {
  const [isVisible, setIsVisible] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => {
      setIsVisible(false);
      setFile(null);
      setUserAnswer('');
    },
  }));

  if (!isVisible) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userId = Cookies.get('user_id');
      if (!userId) {
        throw new Error('Пользовательский id не найден в cookies');
      }

      let endpoint = '/tasks/create/autocheck';
      let requestBody: Record<string, string | number> | FormData = {};

      if (task.verification === 'автоматически') {
        requestBody = {
          task_id: task.id,
          user_id: userId,
          value: task.points,
          user_answer: userAnswer || '',
        };
      } else if (task.verification === 'модерация') {
        endpoint = '/tasks/create/moderation';
        requestBody = new FormData();
        requestBody.append('task_id', task.id.toString());
        requestBody.append('user_id', parseInt(userId, 10).toString());
        requestBody.append('value', task.points.toString());
        requestBody.append('text', ' ');
        if (file) {
          const binaryFile = await convertFileToBinary(file);
          requestBody.append(
            'file',
            new Blob([binaryFile], { type: file.type }),
            file.name
          );
        }
      }

      //убрать
      if (requestBody instanceof FormData) {
        for (const [key, value] of requestBody.entries()) {
          if (value instanceof File) {
            console.log(
              `${key}: ${value.name}, size: ${value.size}, type: ${value.type}`
            );
          } else {
            console.log(`${key}:`, value);
          }
        }
      } else {
        console.log('Request Body:', requestBody);
      }
      //убрать

      await submitTask(requestBody, endpoint);
      setFile(null);
      setUserAnswer('');
    } catch (error) {
      console.error('Ошибка при отправке задания:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
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
              <p>награда:</p>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>{task.points}</p>
                <img src={icons['coin']} style={{ marginLeft: '2px' }} />
              </div>
            </div>
          </div>
          <p>{task.description}</p>
          <p className="modal_content_main-task">задание</p>
          <p style={{ marginBottom: '20px' }}>{task.task}</p>

          {task.verification === 'автоматически' && (
            <div style={{ width: '100%' }}>
              <input
                type="text"
                placeholder="напиши сюда ответ"
                value={userAnswer}
                ref={textInputRef}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <Button onClick={handleSubmit} disabled={!userAnswer.trim()}>
                отправить
              </Button>
            </div>
          )}

          {task.verification === 'модерация' && (
            <div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, setFile)}
                />
                <label htmlFor="fileInput">
                  {file ? file.name : 'прикрепи сюда решение'}
                </label>
              </div>
              <Button onClick={handleSubmit} disabled={!file}>
                {loading ? 'Загрузка...' : 'отправить'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(TaskModal);
