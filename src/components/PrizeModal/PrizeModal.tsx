import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import Button from '../Button/Button';
import Cookies from 'js-cookie';
import { PrizeModalProps } from '../../types/prizeModal';
import { buyPrize } from '../../services/api';

const characterAvatars: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/characters_a/*.webp',
  {
    eager: true,
  }
);

const avatarArray = Object.values(characterAvatars).map(
  (img) => (img as { default: string }).default
);

function PrizeModal({ prize }: PrizeModalProps, ref: React.Ref<ModalHandle>) {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => {
      setIsConfirming(false);
      setPurchaseSuccess(false);
      setIsVisible(false);
    },
  }));

  if (!isVisible) return null;

  const handleBuyClick = () => {
    setIsConfirming(true);
  };

  const handleCancelClick = () => {
    setIsConfirming(false);
  };

  const handleSubmit = async () => {
    try {
      const userId = Cookies.get('user_id');
      if (!userId) {
        throw new Error('Пользовательский id не найден в cookies');
      }

      const response = await buyPrize(userId, prize.title, prize.price);

      if (response.data.status === '200') {
        setIsConfirming(false);
        setPurchaseSuccess(true);
      } else {
        throw new Error('Ошибка при покупке приза');
      }
    } catch (error) {
      console.error('Ошибка при покупке приза:', error);
      setPurchaseSuccess(false);
    }
  };

  return (
    <div className="item">
      <div className="item__content">
        <button
          role="close"
          onClick={() => (ref as React.RefObject<ModalHandle>).current?.close()}
        >
          <img src={icons['close']} />
        </button>

        <div>
          <img src={avatarArray[prize.id]} className="item__content-avatar" />
          <div style={{ padding: '0px 4px' }}>
            <p className="item__content-tag">в наличии: {prize.quantity} шт</p>
            <h2 className="item__content-title">{prize.title}</h2>
            <p className="item__content-description">описание:</p>
            <p className="item__content-text">{prize.description}</p>
          </div>
        </div>

        <div className="item__content__purchase">
          {purchaseSuccess ? (
            <div className="item__content__purchase-success">
              <p>всё успешно!</p>
              <p>ищите приз в профиле</p>
            </div>
          ) : (
            <>
              {!isConfirming ? (
                <Button onClick={handleBuyClick}>купить</Button>
              ) : (
                <div className="item__content__purchase-confirmation">
                  <p style={{ margin: '0px 12px' }}>
                    вы покупаете&nbsp;<b>{prize.title}</b>
                    &nbsp;за&nbsp;{prize.price}
                    &nbsp;
                    <img src={icons['coin']} />
                  </p>
                  {/* <div>{user.}</div> */}
                  <div className="item__content__buttons">
                    <Button
                      onClick={handleCancelClick}
                      className="item__content__buttons-cancel"
                    >
                      отмена
                    </Button>
                    <Button onClick={handleSubmit}>подтвердить</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(PrizeModal);
