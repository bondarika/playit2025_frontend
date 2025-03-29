import { action, makeAutoObservable, observable } from 'mobx';
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

  async authenticate(userData: { id: number; username: string }) {
    try {
      const loginResponse = await makeRequest(userData);
      console.log('Login Response:', loginResponse);
      const fetchedUser = await fetchUserData();
      if (!fetchedUser) {
        throw new Error('Fetched user data is undefined');
      }
      this.user = fetchedUser;
      this.error = null;
      document.cookie = `user_id=${fetchedUser.id}; path=/; max-age=259200`;
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : 'Неизвестная ошибка';
    }
  }

  clearUser() {
    this.user = null;
    this.error = null;
    document.cookie = 'user_id=; path=/; max-age=0';
  }
}

const userStore = new UserStore();
export default userStore;
