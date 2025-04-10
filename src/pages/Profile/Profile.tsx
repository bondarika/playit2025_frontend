import WebApp from '@twa-dev/sdk';
import './styles.scss';
import icons from '../../assets/icons';
import { useUser } from '../../hooks/useUser';
import { observer } from 'mobx-react-lite';
import CustomError from '../../components/CustomError/CustomError';
import Loader from '../../components/Loader/Loader';
import useTimeoutError from '../../hooks/useTimeoutError';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');
// const hash = params.get("hash") || "null";
// params.delete("hash");
// params.sort();
// const checkDataString = params.toString().replaceAll("&", "\n");

function ProfilePage(): React.ReactElement {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openPrizes') === 'true') {
      setIsDropdownOpen(true);
    }
  }, [location.search]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const { user, error } = useUser({
    id: userData.id,
    username: userData.username,
  });

  const timeoutError = useTimeoutError(!!user || !!error);

  if (timeoutError) {
    return (
      <div>
        <CustomError />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomError />
      </div>
    );
  }

  return user ? (
    <div>
      <header>
        <h1 className="header">ПРОФИЛЬ</h1>
        <button
          style={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: 'transparent',
            padding: '0px',
          }}
          onClick={() => setAreSettingsOpen((prev) => !prev)}
        >
          <img src={icons['settings']} alt="Настройки" />
        </button>
        {areSettingsOpen && (
          <div className="profile__settings">
            <a
              href="https://t.me/playit_2025"
              className="profile__settings-item"
            >
              <p
                style={{
                  padding: '8px 0px 8px 15px',
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                мне нужна помощь
              </p>
              <img
                src={icons['help_black']}
                style={{ padding: '8px 15px 8px 0px' }}
              />
            </a>
            <div className="profile__settings-text">
              <p>developed by itse x tech.dep</p>
            </div>
          </div>
        )}
      </header>
      <div className="profile">
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
              <img src={icons['coin_bag_white']} alt="Баланс" />
              <p>{user.balance}</p>
            </div>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">выполнено заданий</p>
            <div className="profile__box">
              <p>{user.done_tasks.length}/35</p>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="profile__info-stats"
              style={{
                padding: '0',
                borderRadius: isDropdownOpen ? '12px 12px 0px 0px' : '12px',
              }}
            >
              <p className="profile__maintext">мои призы</p>
              <img
                src={icons['arrow']}
                style={{
                  marginRight: '10px',
                  transform: isDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </button>
            {isDropdownOpen && (
              <div
                className="profile__dropdown"
                style={{
                  borderRadius:
                    user.prizes.length > 0 ? '' : '0px 0px 12px 12px',
                }}
              >
                {user.prizes.length > 0 ? (
                  [
                    ...user.prizes,
                    {
                      id: 'last',
                      title:
                        'вы сможете получить призы\nпосле завершения мероприятия',
                      value: '',
                    },
                  ].map((prize, index, arr) => (
                    <div
                      key={prize.id}
                      className={`profile__dropdown-item ${
                        index === arr.length - 1
                          ? 'profile__dropdown-item-last'
                          : ''
                      }`}
                    >
                      <span
                        style={{ padding: '8px 10px', whiteSpace: 'pre-line' }}
                      >
                        {prize.title}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <div
                      className="profile__dropdown-item"
                      style={{ borderRadius: '0px 0px 12px 12px' }}
                    >
                      <span
                        className="profile__dropdown-item-last"
                        style={{ padding: '8px 10px', whiteSpace: 'pre-line' }}
                      >
                        у вас пока что нет призов, вы можете купить что-нибудь в
                        магазине
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="profile__identifier">
            <p>идентификатор пользователя:</p>
            <p>{user.telegram_id}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

const ObservedProfilePage = observer(ProfilePage);
export default ObservedProfilePage;
