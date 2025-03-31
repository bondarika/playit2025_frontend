import React, { useEffect, useRef, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import useTasks from '../../hooks/useTasks';
import { TaskProps } from '../../types/taskProps';
import TaskModal from '../../components/TaskModal/TaskModal';
import WebApp from '@twa-dev/sdk';
import useUser from '../../hooks/useUser';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import icons from '../../assets/icons';

function TaskPage(): React.ReactElement {
  const { tasks, loading, error: tasksError } = useTasks();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedTask, setSelectedTask] = useState<TaskProps['task'] | null>(
    null
  );

  const handleTaskClick = (task: TaskProps['task']) => {
    setSelectedTask(task);
    modalRef.current?.showModal();
  };

  const params = new URLSearchParams(WebApp.initData);
  const userData = JSON.parse(params.get('user') || 'null');
  const { user, error: userError } = useUser({
    id: userData.id,
    username: userData.username,
  });

  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        setTimeoutError(true);
      }
    }, 30000);

    if (user || tasksError || userError) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [user, tasksError, userError]);

  if (timeoutError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (tasksError || userError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header>
        <h1>ЗАДАНИЯ</h1>
        <div className="balance">
          <img src={icons['coin_bag_red']} />
          <p className="balance__text">{user?.balance}</p>
        </div>
      </header>

      <div className="tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        ))}
      </div>
      {selectedTask && <TaskModal ref={modalRef} task={selectedTask} />}
    </>
  );
}

export default TaskPage;
