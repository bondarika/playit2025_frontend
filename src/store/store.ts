import { makeAutoObservable } from 'mobx';
import { makeRequest, fetchUserData } from '../services/api';
import { User } from '../types/user';

class UserStore {
  user: User | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this); 
  }

  async authenticate(userData: { id: number; username: string }) {
    try {
      await makeRequest(userData);
      const fetchedUser = await fetchUserData();
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
