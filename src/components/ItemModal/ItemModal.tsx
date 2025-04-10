import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import { PrizeModalProps } from '../../types/prizeModal';
import CustomError from '../CustomError/CustomError';
import DOMPurify from 'dompurify';
import userStore from '../../store/userStore';
import Loader from '../Loader/Loader';
import useTimeoutError from '../../hooks/useTimeoutError';
import useUser from '../../hooks/useUser';
import WebApp from '@twa-dev/sdk';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');

const prizes: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/prizes_large/*.webp',
  {
    eager: true,
  }
);

const avatarArray = Object.values(prizes).map(
  (img) => (img as { default: string }).default
);

const ItemModal = forwardRef(
  ({ prize }: PrizeModalProps, ref: React.Ref<ModalHandle>) => {
    const storeUser = userStore.user;
    const { user: fetchedUser } = useUser({
      id: userData.id,
      username: userData.username,
    });
    const user = storeUser ?? fetchedUser;

    const [isVisible, setIsVisible] = useState(false);
    const timeoutError = useTimeoutError(!!user);

    useImperativeHandle(ref, () => ({
      showModal: () => setIsVisible(true),
      close: () => {
        setIsVisible(false);
      },
    }));

    if (!isVisible || !prize) return null;

    const sanitizedDescription = DOMPurify.sanitize(prize.description);

    if (timeoutError) {
      return (
        <div>
          <CustomError />
        </div>
      );
    }

    return user ? (
      <div className="item">
        <div className="item__content">
          <button
            role="close"
            onClick={() =>
              (ref as React.RefObject<ModalHandle>).current?.close()
            }
          >
            <img src={icons['close']} />
          </button>

          <div>
            <img
              src={avatarArray[prize.id - 1]}
              className="item__content-avatar"
            />
            <div style={{ padding: '0px 4px' }}>
              <p className="item__content-tag">
                в наличии: {prize.quantity} шт
              </p>
              <h2 className="item__content-title">{prize.title}</h2>
              <p className="item__content-description">описание:</p>
              <p
                className="item__content-text"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
);

export default ItemModal;
