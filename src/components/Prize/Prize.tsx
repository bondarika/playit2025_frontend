import { PrizeProps } from '../../types/prizeProps';
import './styles.scss';
import icons from '../../assets/icons';
import { observer } from 'mobx-react-lite';
import { preloadImage } from '../../utils/imageCache';
import { useEffect } from 'react';

const prizes: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/prizes_small/*.webp',
  {
    eager: true,
  }
);

const avatarArray = Object.values(prizes).map(
  (img) => (img as { default: string }).default
);

const Prize = observer(({ prize, onClick }: PrizeProps) => {
  useEffect(() => {
    const preloadAllImages = async () => {
      await Promise.all(avatarArray.map((src) => preloadImage(src)));
    };

    preloadAllImages();
  }, []);
  return (
    <>
      <div className="prize" onClick={onClick}>
        <img
          src={avatarArray[prize.id - 1]}
          alt="приз"
          className="prize__image"
        />
        <div className="prize__content">
          <h2 className="prize__content__title">{prize.title}</h2>
          {prize.quantity === 0 ? (
            <p className="prize__content__not_available">нет в наличии</p>
          ) : (
            <div className="prize__content__price">
              <p className="prize__content__price-text">{prize.price}</p>
              <img src={icons['coin']} />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default Prize;
