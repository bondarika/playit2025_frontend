import React, { useEffect, useState } from "react";
import Task from "../../components/Task/Task";
import "./styles.scss";

function TaskPage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";
  const [error, setError] = useState<string>("");
  interface Task {
    id: number;
    day: number;
    difficulty: string;
    character: string;
    description: string;
    task: string;
    verification: string;
    answer: any;
    points: number;
    avatar: null;
  }

  interface Tasks {
    status: number;
    details: string;
    data: Task[];
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
      const tasks: Task[] = data.data;
      console.log(data);
      console.log(tasks);
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
        <h1 className="header">ЗАДАНИЯ</h1>
      </header>
      <Task />
    </div>
  );
}

export default TaskPage;
