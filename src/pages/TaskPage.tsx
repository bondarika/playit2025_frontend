import React from 'react';

function TaskPage(): React.ReactElement {
  // async function fetchTasks() {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/playit/tasks/get-all",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Ошибка: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     if (data.status === "success") {
  //       setUser(data.user); // Устанавливаем данные пользователя в состояние
  //     } else {
  //       setError(data.message); // Обрабатываем ошибки с сервера
  //     }
  //   } catch (error) {
  //     setError("Ошибка при загрузке данных пользователя.");
  //     console.error(
  //       "Ошибка при отправке данных на сервер:",
  //       error instanceof Error ? error.message : error
  //     );
  //   }
  // }
  return (
    <div>
      <h1>Задания</h1>
    </div>
  );
}

export default TaskPage;
