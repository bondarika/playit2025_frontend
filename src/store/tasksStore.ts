import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { fetchTasks } from '../services/api';
import { Task } from '../types/task';
import { FetchedTask } from '../types/fetchedTask';

class TasksStore {
  tasks: Task[] | null = null;
  error: string | null = null;
  selectedTask: Task | null = null;
  cachedDay: number | null = null;

  constructor() {
    makeAutoObservable(this, {
      tasks: observable,
      error: observable,
      selectedTask: observable,
      cachedDay: observable,
      getTasks: action,
      selectTask: action,
    });
  }

  private getCurrentDay(): number {
    const startDate = new Date(2025, 3, 9); 
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + 1);
  }

  getTasks = async () => {
    const day = this.getCurrentDay();
    if (this.cachedDay !== null && this.cachedDay >= day) {
      return;
    }

    try {
      const fetchedTasks = await fetchTasks(day);
      if (!fetchedTasks) {
        throw new Error('Error when fetching tasks');
      }
      const formattedTasks: Task[] = fetchedTasks.map((task: FetchedTask) => ({
        id: task['№'],
        day: task['Номер дня'],
        difficulty: task['Сложность'],
        character: task['Персонаж'],
        description: task['О себе'],
        task: task['Задание'],
        verification: task['Формат проверки'],
        points: task['Стоимость'],
        link: task['Ссылка'],
      }));
      runInAction(() => {
        this.tasks = formattedTasks;
        this.cachedDay = day;
        this.error = null;
      });
    } catch (error: any) {
      console.error('Error when getting tasks:', error);
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Неизвестная ошибка';
      });
    }
  };

  selectTask(task: Task) {
    this.selectedTask = task;
  }
}

const tasksStore = new TasksStore();
export default tasksStore;
