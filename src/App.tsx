import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TabBar from './components/TabBar/TabBar';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; text-align: center;">
           <img src="src/assets/images/qr.png" alt="Mobile Only" style="width: auto; height: 180px; margin-bottom: 20px;" />
          <p style="font-family: 'SF Pro Display', Arial, sans-serif; font-size: 20px; font-weight: 600; color: rgba(207, 80, 105, 1);">
            PlayIT доступно только на мобильных устройствах 😔
          </p>
        </div>
      `;
    }
  }, []);
  WebApp.expand();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<TabBar />} />
      </Routes>
    </BrowserRouter>
  );
}