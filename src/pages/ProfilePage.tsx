import React, { useEffect, useState } from "react";

function ProfilePage(): React.ReactElement {
  const [user, setUser] = useState<any>(null); // Для хранения данных о пользователе
  const [error, setError] = useState<string>(""); // Для хранения ошибок

  // Функция для отправки POST-запроса для получения токена
  async function makeRequest() {
    try {
      const response = await fetch(
        "http://localhost:8000/playit/auth/users/telegram-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: 337683248,
            username: "bondarika",
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Ответ сервера (POST):", data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка при отправке данных на сервер:", error.message);
      } else {
        console.error("Ошибка при отправке данных на сервер:", error);
      }
    }
  }

  // Функция для выполнения GET-запроса с использованием токена
  async function fetchUserData() {
    try {
      const response = await fetch(
        "http://localhost:8000/playit/auth/users/whoami",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setUser(data.user); // Устанавливаем данные пользователя в состояние
      } else {
        setError(data.message); // Обрабатываем ошибки с сервера
      }
    } catch (error) {
      setError("Ошибка при загрузке данных пользователя.");
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }

  // Используем useEffect для выполнения POST-запроса при монтировании компонента
  useEffect(() => {
    makeRequest(); // Сначала выполняем POST-запрос
  }, []);

  // Используем useEffect для выполнения GET-запроса после получения токена
  useEffect(() => {
    fetchUserData(); // Запускаем GET-запрос, если токен получен
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Профиль</h1>
      {user ? (
        <>
          <p style={{color: "#111111"}}>{user.username}</p>
          <p>ID: {user.id}</p>
          <p>Телеграм ID: {user.telegram_id}</p>
          <p>Баланс: {user.balance}</p>
          <p>Роль: {user.role}</p>
          <p>Выполнено задач: {user.done_tasks}</p>
          <p>Группа: {user.group_number}</p>
        </>
      ) : (
        <h1>А данных нет блин</h1>
      )}
    </div>
  );
}

export default ProfilePage;
