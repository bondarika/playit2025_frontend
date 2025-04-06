import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import Button from '../Button/Button';
import Cookies from 'js-cookie';
import { PrizeModalProps } from '../../types/prizeModal';
import { buyPrize } from '../../services/api';
import useUser from '../../hooks/useUser';
import WebApp from '@twa-dev/sdk';
import CustomError from '../CustomError/CustomError';
import DOMPurify from 'dompurify';

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

function PrizeModal({ prize }: PrizeModalProps, ref: React.Ref<ModalHandle>) {
  const { user, error: userError } = useUser({
    id: userData.id,
    username: userData.username,
  });
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

  const sanitizedDescription = DOMPurify.sanitize(prize.description);

  if (userError) {
    return (
      <div>
        <CustomError />
      </div>
    );
  }

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
            <p
              className="item__content-text"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
        </div>

        <div className="item__content__purchase">
          {!isConfirming ? (
            !purchaseSuccess ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    onClick={handleBuyClick}
                    disabled={
                      !user ||
                      user.balance === undefined ||
                      user.balance < prize.price
                    }
                  >
                    купить
                  </Button>
                  {user &&
                    user.balance !== undefined &&
                    user.balance < prize.price && (
                      <p className="item__content__purchase-warning">
                        Недостаточно средств
                      </p>
                    )}
                </div>
              </>
            ) : (
              <>
                <div className="item__content__purchase-success">
                  <p>всё успешно!</p>
                  <p>ищите приз в профиле</p>
                </div>
                ;
              </>
            )
          ) : (
            <>
              <div className="item__content__purchase-confirmation">
                <p style={{ margin: '0px 12px' }}>
                  вы покупаете&nbsp;<b>{prize.title}</b>
                  &nbsp;за&nbsp;{prize.price}
                  &nbsp;
                  <img
                    src={icons['coin']}
                    style={{ width: '16px', height: '16px' }}
                  />
                </p>
                {user ? (
                  <div className="item__content__purchase-balance">
                    <div className="item__content__purchase-balance-text">
                      <img src={icons['coin_bag_red']} />
                      <p>{user.balance}</p>
                    </div>
                    <img src={icons['shop_arrow']} />
                    <div className="item__content__purchase-balance-text">
                      <img src={icons['coin_bag_red']} />
                      <p>{user.balance - prize.price}</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(PrizeModal);
