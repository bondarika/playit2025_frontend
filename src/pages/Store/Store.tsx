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
import userStore from '../../store/userStore';
import { observer } from 'mobx-react-lite';
import prizesStore from '../../store/prizesStore';
import { toJS } from 'mobx';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');

const StorePage = observer(() => {
  const modalRef = useRef<ModalHandle | null>(null);

  const storeUser = userStore.user;
  const { user: fetchedUser } = useUser({
    id: userData.id,
    username: userData.username,
  });
  const user = storeUser ?? fetchedUser;

  const storePrizes = toJS(prizesStore.prizes);
  console.log('storePrizes', storePrizes);
  const { prizes: fetchedPrizes } = usePrizes();
  const prizes = storePrizes ?? fetchedPrizes;

  const [selectedPrize, setSelectedPrize] = useState<
    PrizeProps['prize'] | null
  >(null);

  const timeoutError = useTimeoutError(!!user || !!prizes);

  const handlePrizeClick = (prize: PrizeProps['prize']) => {
    prizesStore.selectPrize(prize);
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

  return prizes && user ? (
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
  ) : (
    <Loader />
  );
});

export default StorePage;
