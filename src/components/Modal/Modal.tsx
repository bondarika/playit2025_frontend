import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalProps } from '../../types/modal';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';

function Modal(props: ModalProps, ref: React.Ref<ModalHandle>) {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal_content">
        <button className="modal_close" onClick={() => setIsVisible(false)}>
          <img src={icons["close"]} />
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default forwardRef<ModalHandle, ModalProps>(Modal);
