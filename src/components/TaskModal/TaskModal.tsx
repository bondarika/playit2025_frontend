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
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/userStore';

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

const TaskModal = forwardRef(
  ({ task }: TaskModalProps, ref: React.Ref<ModalHandle>) => {
    const [submitError, setSubmitError] = useState('');
    const [isInProgress, setIsInProgress] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const textInputRef = useRef<HTMLInputElement | null>(null);
    const sanitizedDescription = DOMPurify.sanitize(task.description);
    const sanitizedTask = DOMPurify.sanitize(task.task);
    const sanitizedLink = DOMPurify.sanitize(task.link);

    useImperativeHandle(ref, () => ({
      showModal: () => setIsVisible(true),
      close: () => {
        setFile(null);
        setUserAnswer('');
        setIsVisible(false);
      },
    }));

    if (!isVisible) return null;

    const handleSubmit = async () => {
      setSubmitError('');
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
            user_id: parseInt(userId, 10),
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

        const response = await submitTask(requestBody, endpoint);
        if (response?.status === 200) {
          setIsInProgress(true);
          userStore.markTaskAsInProgress(task.id);
          setTimeout(() => {
            (ref as React.RefObject<ModalHandle>).current?.close();
            setIsInProgress(false);
          }, 10000);
        }
        if (response?.is_correct === true) {
          setIsCorrect(true);
          userStore.markTaskAsDone(task.id);
          if (userStore.user) {
            const newBalance = userStore.user.balance + task.points;
            userStore.updateBalance(newBalance);
          }
          setTimeout(() => {
            setIsCorrect(false);
          }, 5000);
        }
        if (response?.is_correct === false) {
          setIsIncorrect(true);
          setTimeout(() => {
            setIsIncorrect(false);
          }, 5000);
        }
        setFile(null);
        setUserAnswer('');
      } catch (error: unknown) {
        console.error('Ошибка при отправке задания:', error);
        if (error.response?.status === 413) {
          setSubmitError('cлишком большой размер файла');
        } else if (error.response?.status === 400) {
          setSubmitError('yеподдерживаемый формат файла');
        } else {
          setSubmitError('произошла ошибка при отправке – попробуйте ещё раз');
        }
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
          <button
            role="close"
            onClick={() =>
              (ref as React.RefObject<ModalHandle>).current?.close()
            }
          >
            <img src={icons['close']} />
          </button>

          <img
            src={avatarArray[task.id - 1]}
            className="modal_content-avatar"
          />
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
            <p dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            <p className="modal_content_main-task">задание</p>
            <p
              style={{ marginBottom: '20px' }}
              dangerouslySetInnerHTML={{ __html: sanitizedTask }}
            />
            {task.link != null && (
              <p className="modal_content_main-task">материалы</p>
            )}
            <p
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                marginBottom: '20px',
              }}
              dangerouslySetInnerHTML={{ __html: sanitizedLink }}
            />

            {task.verification === 'автоматически' && (
              <div style={{ width: '100%' }}>
                {isCorrect ? (
                  <div className="modal_content_main-correct">
                    <p>верно</p>
                  </div>
                ) : isIncorrect ? (
                  <div className="modal_content_main-incorrect">
                    <p>неверно</p>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="напиши сюда ответ"
                      value={userAnswer}
                      ref={textInputRef}
                      onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!userAnswer.trim()}
                    >
                      отправить
                    </Button>
                    {submitError && { submitError }}
                  </>
                )}
              </div>
            )}

            {task.verification === 'модерация' && (
              <div>
                {isInProgress ? (
                  <div className="modal_content_main-in_progress">
                    <p>на проверке</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e, setFile)}
                      />
                      <label htmlFor="fileInput">
                        {loading
                          ? 'идёт загрузка файла'
                          : file
                          ? file.name
                          : 'прикрепи сюда решение'}
                      </label>
                    </div>
                    <Button onClick={handleSubmit} disabled={!file || loading}>
                      {loading ? 'загрузка...' : 'отправить'}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default observer(TaskModal);
