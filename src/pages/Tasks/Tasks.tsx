import React, { useRef, useState } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import Modal from '../../components/Modal/Modal';
import useTasks from '../../hooks/useTasks';
import { TaskProps } from '../../types/taskProps';

function TaskPage(): React.ReactElement {
  const { tasks, loading, error } = useTasks();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedTask, setSelectedTask] = useState<TaskProps['task'] | null>(
    null
  );

  const handleTaskClick = (task: TaskProps['task']) => {
    setSelectedTask(task);
    modalRef.current?.showModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>ЗАДАНИЯ</h1>
        </div>
      </header>

      <div className="tasks">
        <div className="container" style={{ width: `calc(100% - 20px)` }}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </div>
      </div>
      {selectedTask && (
        <div style={{ width: '100%', position: 'fixed' }}>
          <div className="container">
            <Modal ref={modalRef} task={selectedTask} />
          </div>
        </div>
      )}
    </>
  );
}

export default TaskPage;
