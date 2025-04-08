import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { fetchTasks } from '../services/api';
import { Task } from '../types/task';
import { FetchedTask } from '../types/fetchedTask';

class TasksStore {
  tasks: Task[] | null = null;
  error: string | null = null;
  selectedTask: Task | null = null;

  constructor() {
    makeAutoObservable(this, {
      tasks: observable,
      error: observable,
      selectedTask: observable,
      getTasks: action,
      selectTask: action,
      // markTaskAsDone: action,
    });
  }

  getTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
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
      }));
      runInAction(() => {
        this.tasks = formattedTasks;
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

  // markTaskAsDone(taskId: number) {
  //   runInAction(() => {
  //     if (this.tasks) {
  //       const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
  //       if (taskIndex !== -1) {
  //         this.tasks[taskIndex] = { ...this.tasks[taskIndex], done: true };
  //       }
  //     }
  //   });
  // }
}

const tasksStore = new TasksStore();
export default tasksStore;
