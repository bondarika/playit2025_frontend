import { Route, Routes, BrowserRouter } from 'react-router-dom';
import TabBar from './components/TabBar/TabBar';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import NoFullsize from './components/NoFullsize/NoFullsize';

export default function App() {
  const [isScreenLocked, setIsScreenLocked] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 521) {
        setIsScreenLocked(true);
      } else {
        setIsScreenLocked(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (isScreenLocked) {
    return <NoFullsize />;
  }
  WebApp.expand();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<TabBar />} />
      </Routes>
    </BrowserRouter>
  );
}