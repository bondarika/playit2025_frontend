import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";

function TaskPage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";
  const [error, setError] = useState<string>(""); // Для хранения ошибок
  interface Tasks {
    data: string[];
  }
  const [tasks, setTasks] = useState<Tasks | null>(null);
  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/get-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();

      // if (data.status === 0) {
      //   setTasks(data.data);
      //   console.log(tasks)
      // } else {
      //   setError(data.message);
      // }

      setTasks(data.data);
      console.log("ghbdtn");
      // setError(data.message);
    } catch (error) {
      setError("Ошибка при загрузке данных.");
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <header>
        <h1 className="header">Задания</h1>
        {/* <img src={icons["coin_bag"]} alt="Баланс" /> */}
        <p style={{ color: "black" }}>{tasks?.data}</p>
      </header>
    </div>
  );
}

export default TaskPage;
