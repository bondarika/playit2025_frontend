import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import { PrizeModalProps } from '../../types/prizeModal';
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import prizesStore from '../../store/prizesStore';
import usePrizes from '../../hooks/usePrizes';
import { toJS } from 'mobx';

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
    const storePrizes = toJS(prizesStore.prizes);
    const { prizes: fetchedPrizes } = usePrizes();
    const prizes = storePrizes ?? fetchedPrizes;

    const currentPrize = prizes?.find((p) => p.id === prize.prize_id);
    console.log('currentPrize', currentPrize);

    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      showModal: () => setIsVisible(true),
      close: () => {
        setIsVisible(false);
      },
    }));

    if (!isVisible || !currentPrize) return null;

    const sanitizedDescription = DOMPurify.sanitize(currentPrize.description);

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
              src={avatarArray[currentPrize.prize_id - 1]}
              className="item__content-avatar"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default observer(ItemModal);
