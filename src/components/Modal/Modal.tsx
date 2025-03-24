import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ModalProps } from '../../types/modal';
import { ModalHandle } from '../../types/modalHandle';

function Modal(props: ModalProps, ref: React.Ref<ModalHandle>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef}>
        {props.children}
    </dialog>
  );
}

export default forwardRef<ModalHandle, ModalProps>(Modal);
