import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ModalProps } from '../../types/modal';
import icons from '../../assets/icons';

type ModalHandle = {
  showModal: () => void;
  close: () => void;
};

function Modal(props: ModalProps, ref: React.Ref<ModalHandle>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef}>
      <button onClick={() => dialogRef.current?.close()}>
        <img src={icons["close"]} />
      </button>
      {props.children}
    </dialog>
  );
}

export default forwardRef<ModalHandle, ModalProps>(Modal);
