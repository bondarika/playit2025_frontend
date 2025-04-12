import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { makeRequest, fetchUserData, fetchTop } from '../services/api';
import { User } from '../types/user';
import { Prize } from '../types/prize';

class UserStore {
  user: User | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      error: observable,
      authenticate: action,
      clearUser: action,
      markTaskAsDone: action,
      markTaskAsInProgress: action,
      updateBalance: action,
      addPrize: action,
    });
  }

  addPrize(prize: Prize) {
    if (this.user) {
      this.user.prizes.push(prize);
    }
  }
  updateBalance = (newBalance: number) => {
    if (this.user) {
      this.user.balance = newBalance;
    }
  };

  get doneTasks() {
    return [...new Set(this.user?.done_tasks ?? [])];
  }

  get inProgressTasks() {
    return this.user?.in_progress ?? [];
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

  getTopUsers = async () => {
    if (!this.user) {
      throw new Error('User is not authenticated');
    }
    try {
      await fetchTop();
      const data = await fetchTop();
      return data;
    } catch (error) {
      console.error('Error fetching top users:', error);
      throw error;
    }
  };

  clearUser = () => {
    this.user = null;
    this.error = null;
    document.cookie = 'user_id=; path=/; max-age=0';
  };

  markTaskAsDone = async (taskId: number) => {
    if (!this.user) {
      throw new Error('User is not authenticated');
    }
    if (this.user.done_tasks.includes(taskId)) {
      return;
    }
    runInAction(() => {
      if (!this.user?.done_tasks.includes(taskId)) {
        this.user?.done_tasks.push(taskId);
      }
    });
  };

  markTaskAsInProgress = async (taskId: number) => {
    if (!this.user) {
      throw new Error('User is not authenticated');
    }
    if (this.user.in_progress.includes(taskId)) {
      return;
    }
    runInAction(() => {
      this.user?.in_progress.push(taskId);
    });
  };
}

const userStore = new UserStore();
export default userStore;
