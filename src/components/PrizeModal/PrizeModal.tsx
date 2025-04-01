import { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalHandle } from '../../types/modalHandle';
import './styles.scss';
import icons from '../../assets/icons';
import Button from '../Button/Button';
import Cookies from 'js-cookie';

function PrizeModal({ task }: PrizeModalProps, ref: React.Ref<ModalHandle>) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal: () => setIsVisible(true),
    close: () => setIsVisible(false),
  }));

  if (!isVisible) return null;

  return (
    <div className="item">
      <div className="item_content">
        <button role="close" onClick={() => setIsVisible(false)}>
          <img src={icons['close']} />
        </button>

        <img src={''} className="item_content-avatar" />
        <p className="item_content-tag">в наличии: 2 шт</p>
        <h2 className="item_content-title">крутые носочки ITSE</h2>
        <p className="item_content-description">описание:</p>
        <p className="item_content-text">
          именно здесь будет располагаться информация о призе, которую
          необходимо придумать! (думаю, что хватит 1–2 предложения о том, как
          это круто)
        </p>
      </div>
    </div>
  );
}

export default forwardRef(PrizeModal);
