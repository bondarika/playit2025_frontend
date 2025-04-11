import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TabBar from './components/TabBar/TabBar';
import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center;">
          <p style="font-family: 'SF Pro Display', Arial, sans-serif; font-size: 18px; color: #333;">
            Это приложение доступно только на мобильных устройствах.
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
