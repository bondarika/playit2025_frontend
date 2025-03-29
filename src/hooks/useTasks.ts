import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import { ITask } from '../types/task';
import { IFetchedTask } from '../types/fetchedTask';

const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const formattedTasks: ITask[] = fetchedTasks.map(
          (task: IFetchedTask) => ({
            id: task['№'],
            day: task['Номер дня'],
            difficulty: task['Сложность'],
            character: task['Персонаж'],
            description: task['О себе'],
            task: task['Задание'],
            verification: task['Формат проверки'],
            points: task['Стоимость'],
          })
        );
        setTasks(formattedTasks);
        setError(null); 
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return { tasks, loading, error };
};

export default useTasks;
