import { useEffect } from 'react';
import tasksStore from '../store/tasksStore';

const useTasks = () => {
  const { tasks, error, getTasks, isLoading } = tasksStore;

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      getTasks();
    }
  }, [tasks, error, getTasks]);

  return { tasks, error, isLoading };
};

export default useTasks;
