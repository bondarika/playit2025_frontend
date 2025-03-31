import { useEffect } from 'react';
import userStore from '../store/store';

export function useUser(userData: { id: number; username: string }) {
  const { user, error, authenticate } = userStore;

  useEffect(() => {
    if (!user) {
      authenticate(userData);
    }
  }, [user, userData, authenticate]);

  return { user, error };
}

export default useUser;
