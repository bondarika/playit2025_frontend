import WebApp from '@twa-dev/sdk';
import './styles.scss';
import icons from '../../assets/icons';
import { useProfile } from '../../hooks/useProfile';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Error from '../../components/Error/Error';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');
// const hash = params.get("hash") || "null";
// params.delete("hash");
// params.sort();
// const checkDataString = params.toString().replaceAll("&", "\n");

function ProfilePage(): React.ReactElement {
  const { user, error } = useProfile({
    id: userData.id,
    username: userData.username,
  });

  const [loading, setLoading] = useState(true);
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        setTimeoutError(true);
        setLoading(false);
      }
    }, 30000);

    if (user || error) {
      clearTimeout(timeout);
      setLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [user, error]);

  if (timeoutError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  return user ? (
    <div>
      <header>
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h1 className="header">ПРОФИЛЬ</h1>
          <img src={icons['settings']} alt="Настройки" />
        </div>
      </header>
      <div className="profile">
        <div className="container">
          <div className="profile__picture">
            <img src={userData.photo_url} className="profile__picture-avatar" />
            <h3 className="profile__subtitle">
              {user.username ? user.username : user.telegram_id}
            </h3>
          </div>
          <div className="profile__info">
            <div className="profile__info-block">
              <h3 className="profile__subtitle">фио</h3>
              <p className="profile__maintext">{user.full_name}</p>
            </div>
            <div className="profile__info-block">
              <h3 className="profile__subtitle">группа</h3>
              <p className="profile__maintext">{user.group_number}</p>
            </div>
            <div className="profile__info-stats">
              <p className="profile__maintext">баланс</p>
              <div className="profile__box">
                <img src={icons['coin_bag']} alt="Баланс" />
                <p>{user.balance}</p>
              </div>
            </div>
            <div className="profile__info-stats">
              <p className="profile__maintext">выполнено заданий</p>
              <div className="profile__box">
                <p>{user.done_tasks.length}/35</p>
              </div>
            </div>
            <div className="profile__info-stats">
              <p className="profile__maintext">мои призы</p>
              <img
                src={icons['arrow']}
                alt="Открыть"
                style={{ marginRight: '10px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}

const ObservedProfilePage = observer(ProfilePage);
export default ObservedProfilePage;
