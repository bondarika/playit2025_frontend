import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import { TaskProps } from '../../types/taskProps';
import { ModalProps } from '../../types/modal';

const characterAvatars: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/characters_a/*.png',
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

function Modal(
  { task, children }: ModalProps & { task: TaskProps['task'] },
  ref: React.Ref<ModalHandle>
) {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  return (
    <div
      className="modal"
      style={{
        backgroundColor: task ? `#${hexCodes[task.id - 1]}` : 'transparent',
      }}
    >
      <div className="modal_content">
        <button
          className="modal_close"
          onClick={() => setIsVisible(false)}
          style={{ color: 'rgba(231, 231, 233, 1)' }}
        >
          <img src={icons['close']} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default forwardRef(Modal);
