import WebApp from '@twa-dev/sdk';
import Prize from '../../components/Prize/Prize';
import usePrizes from '../../hooks/usePrizes';
import './styles.scss';
import useUser from '../../hooks/useUser';
import Error from '../../components/CustomError/CustomError';
import Loader from '../../components/Loader/Loader';
import icons from '../../assets/icons';
import useTimeoutError from '../../hooks/useTimeoutError';
import { PrizeProps } from '../../types/prizeProps';
import { useRef, useState } from 'react';
import PrizeModal from '../../components/PrizeModal/PrizeModal';
import { ModalHandle } from '../../types/modalHandle';

function StorePage(): React.ReactElement {
  const params = new URLSearchParams(WebApp.initData);
  const userData = JSON.parse(params.get('user') || 'null');
  const modalRef = useRef<ModalHandle | null>(null);
  const { prizes, loading, error: prizesError } = usePrizes();
  const { user, error: userError } = useUser({
    id: userData.id,
    username: userData.username,
  });
  const [selectedPrize, setSelectedPrize] = useState<
    PrizeProps['prize'] | null
  >(null);

  const timeoutError = useTimeoutError(!!user || !!prizesError || !!userError);

  const handlePrizeClick = (prize: PrizeProps['prize']) => {
    setSelectedPrize(prize);
    modalRef.current?.showModal();
  };

  if (timeoutError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (prizesError || userError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header>
        <h1>МАГАЗИН</h1>
        <div className="balance">
          <img src={icons['coin_bag_red']} />
          <p className="balance__text">{user?.balance}</p>
        </div>
      </header>

      <div className="store">
        {prizes.map((prize) => (
          <Prize
            key={prize.id}
            prize={prize}
            onClick={() => handlePrizeClick(prize)}
          />
        ))}
      </div>
      {selectedPrize && <PrizeModal ref={modalRef} prize={selectedPrize} />}
    </>
  );
}

export default StorePage;
