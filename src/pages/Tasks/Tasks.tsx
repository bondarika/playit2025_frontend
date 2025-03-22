import React, { useEffect, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import { fetchTasks } from '../../services/api';

function TaskPage(): React.ReactElement {
  interface Task {
    id: number;
    day: number;
    difficulty: string;
    character: string;
    description: string;
    task: string;
    verification: string;
    answer: any;
    points: number;
    avatar: null;
  }

  interface Tasks {
    status: number;
    details: string;
    data: Task[];
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <header>
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
      <Task />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.character}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
