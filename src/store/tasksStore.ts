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
    const startDate = new Date(2025, 3, 10, 13);
    const today = new Date();
    const isBefore13PM = today.getHours() < 13;
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays + (isBefore13PM ? 0 : 1));
  }

  getTasks = async () => {
    const day = this.getCurrentDay();
    console.log('Current day:', day);
    if (this.cachedDay !== null && this.cachedDay >= day) {
      return;
    }

    try {
      const fetchedTasks: any[] | null = [];
      for (let i = this.cachedDay || 1; i <= day; i++) {
        const tasksForDay = await fetchTasks(i);
        if (!tasksForDay) {
          throw new Error(`Error when fetching tasks for day ${i}`);
        }
        fetchedTasks.push(
          ...tasksForDay.map((task: FetchedTask) => ({
            id: task['№'],
            day: task['Номер дня'],
            difficulty: task['Сложность'],
            character: task['Персонаж'],
            description: task['О себе'],
            task: task['Задание'],
            verification: task['Формат проверки'],
            points: task['Стоимость'],
            link: task['Ссылка'],
            answer_format: task['Формат ответа'],
          }))
        );
      }

      runInAction(() => {
        this.tasks = fetchedTasks;
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
