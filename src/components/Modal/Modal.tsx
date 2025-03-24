import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ModalProps } from '../../types/modal';

type ModalHandle = {
  showModal: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <>
      <dialog ref={dialogRef} className="modal">
        <button onClick={() => dialogRef.current?.close()}>Закрыть</button>
        {props.children}
      </dialog>
    </>
  );
});

export default Modal;
