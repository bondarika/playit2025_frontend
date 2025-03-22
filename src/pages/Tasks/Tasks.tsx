import React, { useEffect, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import { fetchTasks } from '../../services/api';
import {ITask} from "../../types/task"

function TaskPage(): React.ReactElement {
  const [tasks, setTasks] = useState<ITask[]>([]);

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

  console.log(tasks);
  console.log(tasks[1]);

  return (
    <div>
      <header>
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
    </div>
  );
}

export default TaskPage;
