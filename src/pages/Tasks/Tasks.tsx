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
import useTimeoutError from '../../hooks/useTimeoutError';
import { ModalHandle } from '../../types/modalHandle';
import userStore from '../../store/userStore';
import tasksStore from '../../store/tasksStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Balance from '../../components/Balance/Balance';
// import TechHour from '../../components/TechHour/TechHour';

const params = new URLSearchParams(WebApp.initData);
const userData = JSON.parse(params.get('user') || 'null');

const TaskPage = observer(() => {
  const tasksModalRef = useRef<ModalHandle | null>(null);
  const { user: fetchedUser } = useUser({
    id: userData.id,
    username: userData.username,
  });
  const user = userStore.user ?? fetchedUser;

  const storeTasks = toJS(tasksStore.tasks);
  const { tasks: fetchedTasks } = useTasks();
  const tasks = storeTasks ?? fetchedTasks;

  const [selectedTask, setSelectedTask] = useState<TaskProps['task'] | null>(
    null
  );

  const timeoutError = useTimeoutError(!!user || !!tasks);

  const handleTaskClick = (task: TaskProps['task']) => {
    tasksStore.selectTask(task);
    setSelectedTask(task);
    tasksModalRef.current?.showModal();
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
        <Balance />
      </header>

      <div className="tasks">
        {[...tasks]
          .sort((a, b) => {
            const aDone = user?.done_tasks.includes(a.id);
            const bDone = user?.done_tasks.includes(b.id);
            return Number(aDone) - Number(bDone);
          })
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
              isInProgress={userStore.inProgressTasks.includes(task.id)}
              isDone={userStore.doneTasks.includes(task.id)}
            />
          ))}
      </div>
      {selectedTask && <TaskModal ref={tasksModalRef} task={selectedTask} />}
    </>
  ) : (
    <Loader />
  );
    // return <TechHour />;
});

export default TaskPage;
