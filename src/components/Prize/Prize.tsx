import { PrizeProps } from '../../types/prizeProps';
import './styles.scss';
import icons from '../../assets/icons';

const prizes: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/prizes_small/*.webp',
  {
    eager: true,
  }
);

const avatarArray = Object.values(prizes).map(
  (img) => (img as { default: string }).default
);

function Prize({ prize, onClick }: PrizeProps) {
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
          <div className="prize__content__price">
            <p className="prize__content__price-text">{prize.price}</p>
            <img src={icons['coin']} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Prize;
