import WebApp from '@twa-dev/sdk';
import Prize from '../../components/Prize/Prize';
import usePrizes from '../../hooks/usePrizes';
import './styles.scss';
import useUser from '../../hooks/useUser';
import Error from '../../components/CustomError/CustomError';
import Loader from '../../components/Loader/Loader';
import useTimeoutError from '../../hooks/useTimeoutError';
import { PrizeProps } from '../../types/prizeProps';
import { useEffect, useRef, useState } from 'react';
import PrizeModal from '../../components/PrizeModal/PrizeModal';
import { ModalHandle } from '../../types/modalHandle';
import userStore from '../../store/userStore';
import { observer } from 'mobx-react-lite';
import prizesStore from '../../store/prizesStore';
import { toJS } from 'mobx';
import Balance from '../../components/Balance/Balance';
import Advertisment from '../../components/Advertisment/Advertisment';
import { preloadImage } from '../../utils/imageCache';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');

const StorePage = observer(() => {
  const storeModalRef = useRef<ModalHandle | null>(null);

  const storeUser = userStore.user;
  const { user: fetchedUser } = useUser({
    id: userData.id,
    username: userData.username,
  });
  const user = storeUser ?? fetchedUser;

  const storePrizes = toJS(prizesStore.prizes);
  const { prizes: fetchedPrizes } = usePrizes();
  const prizes = storePrizes ?? fetchedPrizes;

  const [selectedPrize, setSelectedPrize] = useState<
    PrizeProps['prize'] | null
  >(null);

  const timeoutError = useTimeoutError(!!user || !!prizes);

  const handlePrizeClick = (prize: PrizeProps['prize']) => {
    prizesStore.selectPrize(prize);
    setSelectedPrize(prize);
    storeModalRef.current?.showModal();
  };

  if (timeoutError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return prizes && user ? (
    <>
      <header>
        <h1>МАГАЗИН</h1>
        <Balance />
      </header>

      <div className="store">
        <Advertisment />
        {prizes.map((prize) => (
          <Prize
            key={prize.id}
            prize={prize}
            onClick={() => handlePrizeClick(prize)}
          />
        ))}
      </div>
      {selectedPrize && (
        <PrizeModal ref={storeModalRef} prize={selectedPrize} />
      )}
    </>
  ) : (
    <Loader />
  );
});

export default StorePage;
