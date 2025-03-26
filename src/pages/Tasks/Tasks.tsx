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
    <div>
      <header>
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
      <div className='tasks'>
        {tasks.map((task) => (
          <div key={task.id}>
            <Task task={task} onClick={handleTaskClick} />
          </div>
        ))}
        <Modal ref={modalRef}>
          <p> привет</p>
        </Modal>
      </div>
    </div>
  );
}

export default TaskPage;
