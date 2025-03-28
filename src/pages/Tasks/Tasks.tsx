import React, { useRef } from 'react';
import Task from '../../components/Task/Task';
import './styles.scss';
import Modal from '../../components/Modal/Modal';
import useTasks from '../../hooks/useTasks';

function TaskPage(): React.ReactElement {
  const { tasks, loading, error } = useTasks();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleTaskClick = () => {
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
        <div className="container" style={{ padding: '0px' }}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} onClick={handleTaskClick} />
          ))}
          <Modal ref={modalRef}>
            <p> привет</p>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default TaskPage;
