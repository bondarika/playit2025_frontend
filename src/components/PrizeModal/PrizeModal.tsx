﻿import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import Button from '../Button/Button';
import Cookies from 'js-cookie';
import { PrizeModalProps } from '../../types/prizeModal';
import { buyPrize } from '../../services/api';
import CustomError from '../CustomError/CustomError';
import DOMPurify from 'dompurify';
import userStore from '../../store/userStore';
import { runInAction } from 'mobx';
import Loader from '../Loader/Loader';
import useTimeoutError from '../../hooks/useTimeoutError';
import useUser from '../../hooks/useUser';
import WebApp from '@twa-dev/sdk';
import prizesStore from '../../store/prizesStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { getCachedImage, preloadImage } from '../../utils/imageCache';

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

const PrizeModal = forwardRef(
  ({ prize }: PrizeModalProps, ref: React.Ref<ModalHandle>) => {
    useEffect(() => {
      const preloadAllImages = async () => {
        await Promise.all(avatarArray.map((src) => preloadImage(src)));
      };

      preloadAllImages();
    }, []);
    const navigate = useNavigate();

    const storeUser = userStore.user;
    const { user: fetchedUser } = useUser({
      id: userData.id,
      username: userData.username,
    });
    const user = storeUser ?? fetchedUser;

    const [isVisible, setIsVisible] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [buyError, setBuyError] = useState('');

    const timeoutError = useTimeoutError(!!user);

    useImperativeHandle(ref, () => ({
      showModal: () => setIsVisible(true),
      close: () => {
        setBuyError('');
        setIsConfirming(false);
        setPurchaseSuccess(false);
        setIsVisible(false);
      },
    }));

    useEffect(() => {
      if (isVisible) {
        console.log('Prize ID:', prize.id);
        console.log('Prize Info:', prize);
      }
    }, [isVisible, prize]);

    if (!isVisible) return null;

    const handleBuyClick = () => {
      setBuyError('');
      setIsConfirming(true);
    };

    const handleCancelClick = () => {
      setBuyError('');
      setIsConfirming(false);
    };

    const handleSubmit = async () => {
      setBuyError('');
      try {
        const userId = Cookies.get('user_id');
        if (!userId) {
          throw new Error('Пользовательский id не найден в cookies');
        }

        const response = await buyPrize(
          userId,
          prize.title,
          prize.price,
          prize.id
        );

        if (response.status === 'success') {
          console.log(prize.prize_id);
          runInAction(() => {
            if (userStore.user) {
              userStore.user.balance -= prize.price;
              userStore.addPrize({
                id: prize.id,
                title: prize.title,
                description: prize.description,
                price: prize.price,
                quantity: 1,
                tags: prize.tags || [],
                prize_id: prize.prize_id,
              });
            }
            prizesStore.updatePrizeQuantity(prize.id, prize.quantity - 1);
          });

          setIsConfirming(false);
          setPurchaseSuccess(true);
        } else {
          setBuyError('произошла ошибка');
          throw new Error('Ошибка при покупке приза');
        }
      } catch (error) {
        setBuyError('произошла ошибка');
        console.error('Ошибка при покупке приза:', error);
        setPurchaseSuccess(false);
      }
    };

    const sanitizedDescription = DOMPurify.sanitize(prize.description);

    if (timeoutError) {
      return (
        <div>
          <CustomError />
        </div>
      );
    }

    return user ? (
      <div className="prizemodal">
        <div className="prizemodal__content">
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
              src={
                getCachedImage(avatarArray[prize.id - 1])?.src ||
                avatarArray[prize.id - 1]
              }
              className="prizemodal__content-avatar"
            />
            <div style={{ padding: '0px 4px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <p className="prizemodal__content-tag">
                  в наличии: {prize.quantity} шт
                </p>
                {prize.tags.map((tag, index) => (
                  <p key={index} className="prizemodal__content-tag">
                    {tag}
                  </p>
                ))}
              </div>
              <h2 className="prizemodal__content-title">{prize.title}</h2>
              <p className="prizemodal__content-description">описание:</p>
              <p
                className="prizemodal__content-text"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            </div>
          </div>

          <div className="prizemodal__content__purchase">
            {!isConfirming && !purchaseSuccess && (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'row',
                      gap: '4px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p className="prizemodal__content__purchase-price">
                      {prize.price}
                    </p>
                    <img
                      src={icons['coin']}
                      style={{ width: '15px', height: '15px' }}
                    />
                  </div>
                  <Button
                    onClick={handleBuyClick}
                    style={{ minWidth: '250px' }}
                    disabled={
                      !user ||
                      user.balance === undefined ||
                      user.balance < prize.price ||
                      prize.quantity === 0
                    }
                  >
                    {prize.quantity === 0 && <p>нет в наличии</p>}
                    {user &&
                      user.balance !== undefined &&
                      user.balance < prize.price &&
                      prize.quantity !== 0 && <p>недостаточно средств</p>}
                    {user &&
                      user.balance !== undefined &&
                      user.balance >= prize.price &&
                      prize.quantity !== 0 && <p> купить</p>}
                  </Button>
                </div>
              </>
            )}

            {isConfirming && !purchaseSuccess && (
              <>
                <div className="prizemodal__content__purchase-confirmation">
                  <div style={{ margin: '0px 4px' }}>
                    вы покупаете&nbsp;
                    <p
                      style={{
                        display: 'inline',
                        color: 'CF5069',
                      }}
                    >
                      {prize.title}
                    </p>
                    &nbsp;за&nbsp;{prize.price}&nbsp;монет
                  </div>
                  {user ? (
                    <div className="prizemodal__content__purchase-balance">
                      <div className="prizemodal__content__purchase-balance-text">
                        <img src={icons['coin_bag_red']} />
                        <p>{user.balance}</p>
                      </div>
                      <img src={icons['shop_arrow']} />
                      <div className="prizemodal__content__purchase-balance-text">
                        <img src={icons['coin_bag_red']} />
                        <p>{user.balance - prize.price}</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="prizemodal__content__buttons">
                    <Button
                      onClick={handleCancelClick}
                      className="prizemodal__content__buttons-cancel"
                    >
                      отмена
                    </Button>
                    <Button onClick={handleSubmit}>подтвердить</Button>
                  </div>
                </div>
                {buyError && (
                  <p className="prizemodal__content__purchase-confirmation-error">
                    {buyError}
                  </p>
                )}
              </>
            )}

            {purchaseSuccess && (
              <div className="prizemodal__content__purchase-success">
                <div style={{ alignSelf: 'flex-start' }}>
                  <p style={{ width: '100%' }}>всё успешно!</p>
                  <p style={{ width: '100%' }}>ищите приз в профиле</p>
                </div>
                <img src={icons['arrow_success']} />
                <Button onClick={() => navigate('/profile?openPrizes=true')}>
                  перейти в профиль
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
);

export default observer(PrizeModal);
