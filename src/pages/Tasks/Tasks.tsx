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

  return (
    <div>
      <header>
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
      <Task task={tasks[0]}/>
    </div>
  );
}

export default TaskPage;
