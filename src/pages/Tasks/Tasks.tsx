import React, { useEffect, useRef, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import useTasks from '../../hooks/useTasks';
import { TaskProps } from '../../types/taskProps';
import TaskModal from '../../components/TaskModal/TaskModal';
import WebApp from '@twa-dev/sdk';
import useUser from '../../hooks/useUser';
import Loader from '../../components/Loader/Loader';
import CustomError from '../../components/CustomError/CustomError';
import icons from '../../assets/icons';
import useTimeoutError from '../../hooks/useTimeoutError';
import { ModalHandle } from '../../types/modalHandle';
import userStore from '../../store/userStore';
import { toJS } from 'mobx';
import tasksStore from '../../store/tasksStore';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');

function TaskPage(): React.ReactElement {
  const modalRef = useRef<ModalHandle | null>(null);
  useEffect(() => {
    getTasks();
  }, []);

  const storeUser = userStore.user;
  const { user: fetchedUser } = useUser({
    id: userData.id,
    username: userData.username,
  });
  const user = storeUser ?? fetchedUser;

  const storeTasks = toJS(tasksStore.tasks);
  console.log('storeTasks', storeTasks);
  const { tasks: fetchedTasks } = useTasks();
  const tasks = storeTasks ?? fetchedTasks;

  const [selectedTask, setSelectedTask] = useState<TaskProps['task'] | null>(
    null
  );

  const timeoutError = useTimeoutError(!!user || !!tasks);

  const handleTaskClick = (task: TaskProps['task']) => {
    tasksStore.selectTask(task);
    setSelectedTask(task);
    modalRef.current?.showModal();
  };

  if (timeoutError) {
    return (
      <div>
        <CustomError />
      </div>
    );
  }

  return tasks && user ? (
    <>
      <header>
        <h1>ЗАДАНИЯ</h1>
        <div className="balance">
          <img src={icons['coin_bag_red']} />
          <p className="balance__text">{user?.balance}</p>
        </div>
      </header>

      <div className="tasks">
        {tasks
          .sort((a, b) => Number(a.done) - Number(b.done))
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))}
      </div>
      {selectedTask && <TaskModal ref={modalRef} task={selectedTask} />}
    </>
  ) : (
    <Loader />
  );
}

export default TaskPage;
function getTasks() {
  throw new Error('Function not implemented.');
}
