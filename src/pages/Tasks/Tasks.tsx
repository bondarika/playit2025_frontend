import React, { useEffect, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import { fetchTasks } from '../../services/api';
import { ITask } from '../../types/task';

function TaskPage(): React.ReactElement {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const formattedTasks = fetchedTasks.map((task) => ({
          id: task['№'],
          day: task['Номер дня'],
          difficulty: task['Сложность'],
          character: task['Персонаж'],
          description: task['О себе'],
          task: task['Задание'],
          verification: task['Формат проверки'],
          points: task['Стоимость'],
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  return (
    <div>
      <header>
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
      {tasks.map((task) => (
        <div key={task.id}>
          <Task task={task} />
        </div>
      ))}
    </div>
  );
}

export default TaskPage;
