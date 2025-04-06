import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import RouterTab from '../RouterTab/RouterTab';
import Store from '../../pages/Store/Store';
import Task from '../../pages/Tasks/Tasks';
import Shop from '@/assets/icons/shop/shop_icon.svg?react';
import Tasks from '@/assets/icons/tasks/tasks_icon.svg?react';
import './styles.scss';
import ObservedProfilePage from '../../pages/Profile/Profile';
import WebApp from '@twa-dev/sdk';

function TabBar() {
  const location = useLocation();
  const selected = location.pathname.split('/')[1];
  const params = new URLSearchParams(WebApp.initData);
  const userData = JSON.parse(params.get('user') || 'null');

  return (
    <>
      <div className="tabbar" key={location.pathname}>
        <RouterTab to="/tasks">
          <div className="tabbar__tab">
            <Tasks
              style={{ width: '16px', height: '16px' }}
              className={`icon-${selected === 'tasks' ? 'active' : 'inactive'}`}
            />
            <p>задания</p>
          </div>
        </RouterTab>
        <div className="tabbar__profile">
          <RouterTab to="/profile">
            <div
              style={{
                background: selected === 'profile' ? 'none' : '#F6E9F0',
                backdropFilter: selected === 'profile' ? 'none' : 'blur(16px)',
              }}
            >
              <img
                src={userData.photo_url}
                alt="профиль"
                className="tabbar__profile-avatar"
                style={{
                  boxSizing: 'border-box',
                  border:
                    selected === 'profile'
                      ? '1.5px solid rgba(207, 80, 105, 1)'
                      : 'none',
                }}
              />
            </div>
          </RouterTab>
        </div>

        <RouterTab to="/store">
          <div className="tabbar__tab">
            <Shop
              style={{ width: '19px', height: '19px' }}
              className={`icon-${selected === 'store' ? 'active' : 'inactive'}`}
            />
            <p>магазин</p>
          </div>
        </RouterTab>
      </div>

      <Routes>
        <Route index element={<Navigate to="/profile" />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/profile" element={<ObservedProfilePage />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </>
  );
}

export default TabBar;
