import React, { useEffect, useState } from "react";

function ProfilePage(): React.ReactElement {
  const [user, setUser] = useState<any>(null); // Для хранения данных о пользователе
  const [error, setError] = useState<string>(""); // Для хранения ошибок
  const [token, setToken] = useState<string | null>(null); // Для хранения полученного токена

  // Функция для отправки POST-запроса для получения токена
  async function makeRequest() {
    try {
      const response = await fetch(
        "http://188.225.58.99:8000/playit/auth/users/telegram-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: 337683248,
            username: "bondarika",
          }),
          // credentials: "include", 
        }
      );


      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Ответ сервера (POST):", data);
      if (data.token) {
        setToken(data.token); // Сохраняем токен в состояние
      } else {
        setError("Токен не получен.");
      }
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
    if (!token) return; // Если нет токена, не выполняем запрос

    try {
      const response = await fetch(
        "http://188.225.58.99:8000/playit/auth/users/whoami",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
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
    if (token) {
      fetchUserData(); // Запускаем GET-запрос, если токен получен
    }
  }, [token]); // Этот эффект сработает только при изменении токена

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Профиль</h1>
      {user ? (
        <>
          <h2>{user.username}</h2>
          <p>ID: {user.id}</p>
          <p>Телеграм ID: {user.telegram_id}</p>
          <p>Баланс: {user.balance}</p>
          <p>Роль: {user.role}</p>
          <p>Выполнено задач: {user.done_tasks}</p>
          <p>Группа: {user.group_number}</p>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default ProfilePage;
