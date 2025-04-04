import WebApp from '@twa-dev/sdk';
import './styles.scss';
import icons from '../../assets/icons';
import { useUser } from '../../hooks/useUser';
import { observer } from 'mobx-react-lite';
import CustomError from '../../components/CustomError/CustomError';
import Loader from '../../components/Loader/Loader';
import useTimeoutError from '../../hooks/useTimeoutError';
import { useState } from 'react';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');
// const hash = params.get("hash") || "null";
// params.delete("hash");
// params.sort();
// const checkDataString = params.toString().replaceAll("&", "\n");

function ProfilePage(): React.ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        <img src={icons['settings']} alt="Настройки" />
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
                        'вы сможете получить призы после завершения мероприятия',
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
                      <span style={{ paddingLeft: '10px' }}>{prize.title}</span>
                      <span style={{ paddingRight: '10px' }}>
                        {prize.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    <p style={{ paddingLeft: '10px' }}>нет призов</p>
                  </>
                )}
              </div>
            )}
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
