﻿import WebApp from '@twa-dev/sdk';
import './styles.scss';
import icons from '../../assets/icons';
import { useUser } from '../../hooks/useUser';
import { observer } from 'mobx-react-lite';
import CustomError from '../../components/CustomError/CustomError';
import Loader from '../../components/Loader/Loader';
import useTimeoutError from '../../hooks/useTimeoutError';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PrizeProps } from '../../types/prizeProps';
import { ModalHandle } from '../../types/modalHandle';
import ItemModal from '../../components/ItemModal/ItemModal';
import prizesStore from '../../store/prizesStore';
import { toJS } from 'mobx';
import userStore from '../../store/userStore';
// import TechHour from '../../components/TechHour/TechHour';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');
// const hash = params.get("hash") || "null";
// params.delete("hash");
// params.sort();
// const checkDataString = params.toString().replaceAll("&", "\n");

const ProfilePage = observer(() => {
  const [topUsers, setTopUsers] = useState<
    Array<Array<{ id: string; username: string }>>
  >([]);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openPrizes') === 'true') {
      setIsDropdownOpen(true);
    }
  }, [location.search]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTopDropdownOpen, setIsTopDropdownOpen] = useState(false);
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const profileModalRef = useRef<ModalHandle | null>(null);
  const [selectedProfilePrize, setSelectedProfilePrize] = useState<
    PrizeProps['prize'] | null
  >(null);

  const { user, error } = useUser({
    id: userData.id,
    username: userData.username,
  });

  const handlePrizeClick = (prize: PrizeProps['prize']) => {
    if (prize) {
      console.log('Selected prize:', toJS(prize));
      prizesStore.selectPrize(prize);
      setSelectedProfilePrize(prize);
      profileModalRef.current?.showModal();
    }
  };

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const topUsers = await userStore.getTopUsers();
        setTopUsers(topUsers);
      } catch (err) {
        console.error('Error fetching top users:', err);
      }
    };

    fetchTopUsers();
  }, []);
  console.log('Top users:', topUsers);

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
                style={{ padding: '10px 15px 10px 0px' }}
              />
            </a>
            <div className="profile__settings-text">
              <span style={{ margin: '10px 0px 0px 15px' }}>designed by</span>
              <span
                style={{
                  color: 'rgba(207, 80, 105, 1)',
                  margin: '0px 0px 10px 15px',
                }}
              >
                bozhenkas x yduwoqj
              </span>
            </div>
            <div className="profile__settings-text">
              <p style={{ margin: '10px 0px 0px 15px' }}>developed by</p>
              <p
                style={{
                  color: 'rgba(207, 80, 105, 1)',
                  margin: '0px 0px 10px 15px',
                }}
              >
                bondarika x stremilovv
              </p>
            </div>
            <div className="profile__settings-text">
              <p style={{ margin: '10px 0px 0px 15px' }}>written by</p>
              <p
                style={{
                  color: 'rgba(207, 80, 105, 1)',
                  margin: '0px 0px 0px 15px',
                }}
              >
                stigende, marrioo, dnchhe,
              </p>
              <p
                style={{
                  color: 'rgba(207, 80, 105, 1)',
                  margin: '0px 0px 10px 15px',
                }}
              >
                manya azur, dzhar
              </p>
            </div>
            <div className="profile__settings-text">
              <p style={{ margin: '10px 0px 0px 15px' }}>graphics by</p>
              <p
                style={{
                  color: 'rgba(207, 80, 105, 1)',
                  margin: '0px 0px 10px 15px',
                }}
              >
                annbdito x densdensdensdens
              </p>
            </div>
            <div className="profile__settings-text">
              <p
                style={{
                  margin: '10px 0px 10px 15px',
                }}
              >
                playIT 2025 by itse x tech.dep
              </p>
            </div>
          </div>
        )}
      </header>
      <div className="profile">
        <div className="profile__picture">
          <img src={userData.photo_url} className="profile__picture-avatar" />
          <h3 className="profile__subtitle">
            {user.username ? `@${user.username}` : user.telegram_id}
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
              <p>{userStore.doneTasks.length}/36</p>
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
                  user.prizes
                    .map((prize) => (
                      <div
                        key={prize.id}
                        className="profile__dropdown-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handlePrizeClick(prize)}
                      >
                        <span
                          style={{
                            padding: '8px 10px',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {prize.title}
                        </span>
                      </div>
                    ))
                    .concat(
                      <div
                        key="last"
                        className="profile__dropdown-item profile__dropdown-item-last"
                        style={{ borderRadius: '0px 0px 12px 12px' }}
                      >
                        <span
                          style={{
                            padding: '8px 10px',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          вы сможете получить призы
                          <br />
                          после завершения мероприятия
                        </span>
                      </div>
                    )
                ) : (
                  <div
                    className="profile__dropdown-item"
                    style={{ borderRadius: '0px 0px 12px 12px' }}
                  >
                    <span
                      className="profile__dropdown-item-last"
                      style={{ padding: '8px 10px', whiteSpace: 'pre-line' }}
                    >
                      <p>у вас пока что нет призов</p>
                      <p>вы можете купить что-нибудь в магазине</p>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ width: '100%' }}>
            <button
              onClick={() => setIsTopDropdownOpen((prev) => !prev)}
              className="profile__info-stats"
              style={{
                padding: '0',
                borderRadius: isTopDropdownOpen ? '12px 12px 0px 0px' : '12px',
              }}
            >
              <p className="profile__maintext">топ игроков</p>
              <img
                src={icons['arrow']}
                style={{
                  marginRight: '10px',
                  transform: isTopDropdownOpen
                    ? 'rotate(90deg)'
                    : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </button>
            {isTopDropdownOpen && (
              <div
                className="profile__dropdown"
                style={{
                  borderRadius: '0px 0px 12px 12px',
                }}
              >
                {Array.isArray(topUsers[0]) &&
                  topUsers[0].map((user, index) => (
                    <div
                      key={user.id || index}
                      className="profile__dropdown-item"
                    >
                      <span
                        style={{
                          padding: '8px 10px',
                          whiteSpace: 'pre-line',
                          color: 'black',
                        }}
                      >
                        {index + 1}. {user.username}
                      </span>
                    </div>
                  ))}
                {topUsers[1] && typeof topUsers[1] === 'object' && (
                  <div key={topUsers[1].id} className="profile__dropdown-item">
                    <span
                      style={{
                        padding: '8px 10px',
                        whiteSpace: 'pre-line',
                        color: 'rgba(207, 80, 105, 1)',
                      }}
                    >
                      {topUsers[1].rank}. {topUsers[1].username}
                    </span>
                  </div>
                )}
                <div
                  key="last"
                  className="profile__dropdown-item profile__dropdown-item-last"
                  style={{ borderRadius: '0px 0px 12px 12px' }}
                >
                  <span
                    style={{
                      padding: '8px 10px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    топ определяется по максимально возможному балансу
                    <br />
                    то есть покупки в магазине на него не влияют
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="profile__identifier">
            <p>идентификатор пользователя:</p>
            <p>{user.telegram_id}</p>
          </div>
        </div>
      </div>
      {selectedProfilePrize && (
        <ItemModal ref={profileModalRef} prize={selectedProfilePrize} />
      )}
    </div>
  ) : (
    <Loader />
  );

  // return <TechHour />;
});

export default ProfilePage;

// .concat(
//   <div
//     key="last"
//     className="profile__dropdown-item profile__dropdown-item-last"
//     style={{ borderRadius: '0px 0px 12px 12px' }}
//   >
//     <span
//       style={{
//         padding: '8px 10px',
//         whiteSpace: 'pre-line',
//       }}
//     >
//       топ определяется по максимально возможному балансу
//       <br />
//       то есть покупки в магазине на него не влияют
//     </span>
//   </div>
// )
