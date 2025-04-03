import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import Button from '../Button/Button';
import Cookies from 'js-cookie';
import { PrizeModalProps } from '../../types/prizeModal';
import { buyPrize } from '../../services/api';

function PrizeModal({ prize }: PrizeModalProps, ref: React.Ref<ModalHandle>) {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  const handleSubmit = async () => {
    try {
      const userId = Cookies.get('user_id');
      if (!userId) {
        throw new Error('Пользовательский id не найден в cookies');
      }
      await buyPrize(userId, prize.title, prize.price);
      setIsVisible(false);
    } catch (error) {
      console.error('Ошибка при покупке приза:', error);
    }
  };

  return (
    <div className="item">
      <div className="item_content">
        <button role="close" onClick={() => setIsVisible(false)}>
          <img src={icons['close']} />
        </button>

        <img src={''} className="item_content-avatar" />
        <p className="item_content-tag">в наличии: {prize.quantity} шт</p>
        <h2 className="item_content-title">{prize.title}</h2>
        <p className="item_content-description">описание:</p>
        <p className="item_content-text">{prize.description}</p>
        <Button onClick={handleSubmit}>купить</Button>
      </div>
    </div>
  );
}

export default forwardRef(PrizeModal);
