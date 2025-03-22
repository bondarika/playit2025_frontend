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
        const formattedTasks = fetchedTasks.map((task: ITask) => ({
          id: task.id,
          day: task.day,
          difficulty: task.difficulty,
          character: task.character,
          description: task.description,
          task: task.task, 
          verification: task.verification,
          points: task.points,
        }));
        console.log(formattedTasks)
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
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
