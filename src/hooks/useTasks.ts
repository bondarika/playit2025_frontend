import { useEffect } from 'react';
import tasksStore from '../store/tasksStore';

const useTasks = () => {
  const { tasks, error, getTasks } = tasksStore;

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      getTasks();
    }
  }, [tasks, error, getTasks]);

  return { tasks, error };
};

export default useTasks;
