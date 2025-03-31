import WebApp from '@twa-dev/sdk';
import Prize from '../../components/Prize/Prize';
import usePrizes from '../../hooks/usePrizes';
import './styles.scss';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import icons from '../../assets/icons';

function StorePage(): React.ReactElement {
  const params = new URLSearchParams(WebApp.initData);
  const userData = JSON.parse(params.get('user') || 'null');
  const { prizes, loading, error: prizesError } = usePrizes();
  const { user, error: userError } = useUser({
    id: userData.id,
    username: userData.username,
  });

  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        setTimeoutError(true);
      }
    }, 30000);

    if (user || prizesError || userError) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [user, prizesError, userError]);

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
    <div>
      <header>
        <h1>МАГАЗИН</h1>
        <div className="balance">
          <img src={icons['coin_bag_red']} />
          <p className="balance__text">{user?.balance}</p>
        </div>
      </header>

      <div className="store">
        {prizes.map((prize) => (
          <Prize key={prize.id} prize={prize} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}

export default StorePage;
