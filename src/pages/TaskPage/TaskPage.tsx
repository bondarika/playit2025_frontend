﻿import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";

function TaskPage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";
  const [error, setError] = useState<string>(""); // Для хранения ошибок
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
      console.log(data);
      // if (data.status === "success") {
      //   setUser(data.user); // Устанавливаем данные пользователя в состояние
      // } else {
      //   setError(data.message); // Обрабатываем ошибки с сервера
      // }
    } catch (error) {
      setError("Ошибка при загрузке данных.");
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }
  useEffect(() => {
    fetchTasks(); // Сначала выполняем POST-запрос
  }, []);
  return (
    <div>
      <header>
        <h1 className="header">Задания</h1>
        {/* <img src={icons["coin_bag"]} alt="Баланс" /> */}
      </header>
    </div>
  );
}

export default TaskPage;
