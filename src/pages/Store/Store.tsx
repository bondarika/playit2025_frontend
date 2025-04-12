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
import TechHour from '../../components/TechHour/TechHour';

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

  useEffect(() => {
    const prize = prizes?.find((prize) => prize.id === 23); 
    if (prize) {
      console.log(`Title of prize 23: ${prize.title}`);
      console.log(`Quantity of prize 23: ${prize.quantity}`);
    } else {
      console.log('Prize with ID 23 not found');
    }
  }, [prizes]);



  if (timeoutError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  // return prizes && user ? (
  //   <>
  //     <header>
  //       <h1>МАГАЗИН</h1>
  //       <Balance />
  //     </header>

  //     <div className="store">
  //       <Advertisment />
  //       {prizes.map((prize) => (
  //         <Prize
  //           key={prize.id}
  //           prize={prize}
  //           onClick={() => handlePrizeClick(prize)}
  //         />
  //       ))}
  //     </div>
  //     {selectedPrize && (
  //       <PrizeModal ref={storeModalRef} prize={selectedPrize} />
  //     )}
  //   </>
  // ) : (
  //   <Loader />
  // );
    return <TechHour />;
});

export default StorePage;
