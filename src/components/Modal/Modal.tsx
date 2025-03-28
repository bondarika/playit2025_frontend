import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import { extractHexFromImageName } from '../../utils/extractHexFromImage';
import { ModalProps } from '../../types/modal';

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

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  console.log(characterAvatars);
  console.log(avatarArray);

  return (
    <div className="modal">
      <div className="modal_container">
        <div
          className="modal_content"
          style={{
            backgroundColor: `#${hexCodes[task.id - 1]}`,
          }}
        >
          <div
            className="modal_content-main"
            style={{
              backgroundColor: `#${hexCodes[task.id - 1]}`,
            }}
          >
            {' '}
            <button role="close" onClick={() => setIsVisible(false)}>
              <img src={icons['close']} />
            </button>
            <h2>{task.character}</h2>
            <p>{task.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Modal);
