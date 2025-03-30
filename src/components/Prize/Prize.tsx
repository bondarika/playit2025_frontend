import { PrizeProps } from '../../types/prizeProps';
import './styles.scss';
import icons from '../../assets/icons';

const characterAvatars: Record<string, { default: string }> = import.meta.glob(
  '@/assets/images/characters_b/*.png',
  {
    eager: true,
  }
);

const avatarArray = Object.values(characterAvatars).map(
  (img) => (img as { default: string }).default
);

function Prize({ prize }: PrizeProps) {
  return (
    <>
      <div className="prize">
        <img
          src={avatarArray[prize.id - 1]}
          alt="приз"
          className="prize__image"
        />
        <div className="prize__content">
          <h2 className="prize__content__title">{prize.title}</h2>
          <div className="prize__content__price">
            <p className="prize__content__price-text">{prize.price}</p>
            <img src={icons['coin']} alt="монеток" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Prize;
