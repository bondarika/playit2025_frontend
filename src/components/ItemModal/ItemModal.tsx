import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import { PrizeModalProps } from '../../types/prizeModal';
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/userStore';
import useUser from '../../hooks/useUser';
import WebApp from '@twa-dev/sdk';

const prizes: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/prizes_large/*.webp',
  {
    eager: true,
  }
);

const avatarArray = Object.values(prizes).map(
  (img) => (img as { default: string }).default
);

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');

const ItemModal = forwardRef(
  ({ prize }: PrizeModalProps, ref: React.Ref<ModalHandle>) => {
    const [isVisible, setIsVisible] = useState(false);

    const storeUser = userStore.user;
    const { user: fetchedUser } = useUser({
      id: userData.id,
      username: userData.username,
    });
    const user = storeUser ?? fetchedUser;

    useImperativeHandle(ref, () => ({
      showModal: () => setIsVisible(true),
      close: () => {
        setIsVisible(false);
      },
    }));

    const fullPrize = user?.prizes.find((p) => p.id === prize.id);
    

    if (!isVisible || !prize || !fullPrize) return null;

    const sanitizedDescription = DOMPurify.sanitize(fullPrize.description);

    return (
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
            <div>
              <h2 className="item__content-title">{prize.title}</h2>
              <p className="item__content-description">описание:</p>
              <p
                className="item__content-text"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            </div>
            <img
              src={avatarArray[fullPrize.prize_id - 1]}
              className="item__content-avatar"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default observer(ItemModal);
