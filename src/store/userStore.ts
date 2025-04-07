import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { makeRequest, fetchUserData } from '../services/api';
import { User } from '../types/user';

class UserStore {
  user: User | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      error: observable,
      authenticate: action,
      clearUser: action,
    });
  }

  authenticate = async (userData: { id: number; username: string }) => {
    try {
      await makeRequest(userData);
      const fetchedUser = await fetchUserData();
      if (!fetchedUser) {
        throw new Error('Fetched user data is undefined');
      }

      runInAction(() => {
        this.user = fetchedUser;
        this.error = null;
      });

      document.cookie = `user_id=${fetchedUser.id}; path=/; max-age=259200`;
    } catch (error: any) {
      console.error('Error during authentication:', error);
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Неизвестная ошибка';
      });
    }
  };

  clearUser = () => {
    this.user = null;
    this.error = null;
    document.cookie = 'user_id=; path=/; max-age=0';
  };
}

const userStore = new UserStore();
export default userStore;
