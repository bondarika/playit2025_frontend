import React, { useEffect, useRef, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import { fetchTasks } from '../../services/api';
import { ITask } from '../../types/task';
import { IFormattedTask } from '../../types/formattedTask';
import { IFetchedTask } from '../../types/fetchedTask';
import Modal from '../../components/Modal/Modal';

function TaskPage(): React.ReactElement {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const formattedTasks: IFormattedTask[] = fetchedTasks.map(
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
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  const modalRef = useRef<HTMLDialogElement>(null);
  const handleTaskClick = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      <header>
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
      {tasks.map((task) => (
        <div key={task.id}>
          <Task task={task} onClick={handleTaskClick} />
        </div>
      ))}
      <Modal ref={modalRef}>
        <div style={{width: "390px", backgroundColor: "red", height: "90px"}}>привет</div>
      </Modal>
    </div>
  );
}

export default TaskPage;
