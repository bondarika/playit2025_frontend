import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import "./styles.scss";

function ProfilePage(): React.ReactElement {
  const API_BASE_URL = "http://188.225.58.99:8000/playit";
  const [error, setError] = useState<string>(""); // Для хранения ошибок
  interface User {
    id: number;
    username: string;
    telegram_id: number;
    balance: number;
    role: string;
    done_tasks: number;
    group_number: number;
  }

  const [user, setUser] = useState<User | null>(null); // Для хранения данных о пользователе

  // Функция для отправки POST-запроса для получения токена
  async function makeRequest() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/playit/auth/users/telegram-login`,
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
        `${API_BASE_URL}/playit/auth/users/whoami`,
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
      setError(
        `Ошибка при загрузке данных пользователя: ${
          error instanceof Error ? error.message : error
        }`
      );
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }
  console.log("перед пост запросом");
  useEffect(() => {
    makeRequest(); // Сначала выполняем POST-запрос
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData(); // Запускаем GET-запрос, если user получен
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <header>
        <h1 className="header">Профиль</h1>
        <img src={icons["settings"]} alt="Настройки" />
      </header>
      <div className="profile">
        <div className="profile__picture">
          <div className="profile__picture-avatar">
            {/*МЕНЯЕМ на реальную аватарку*/}
          </div>
          <h3 className="profile__subtitle">@bondarika</h3>
          {/*МЕНЯЕМ на реальный юзернейм*/}
        </div>
        <div className="profile__info">
          <div className="profile__info-block">
            <h3 className="profile__subtitle">фио</h3>
            <p className="profile__maintext">Бондаренко Дарья Сергеевна</p>
          </div>
          <div className="profile__info-block">
            <h3 className="profile__subtitle">группа</h3>
            <p className="profile__maintext">ИСТ-221</p>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">баланс</p>
            <div className="profile__box">
              <img src={icons["coin_bag"]} alt="Баланс" />
              <p>200</p>
            </div>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">выполнено заданий</p>
            <div className="profile__box">
              <p>0/15</p>
            </div>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">мои призы</p>
            <img
              src={icons["arrow"]}
              alt="Открыть"
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>
      </div>

      {/*       
      {user ? (
        <>
          <p style={{ color: "#111111" }}>{user.username}</p>
          <p>ID: {user.id}</p>
          <p>Телеграм ID: {user.telegram_id}</p>
          <p>Баланс: {user.balance}</p>
          <p>Роль: {user.role}</p>
          <p>Выполнено задач: {user.done_tasks}</p>
          <p>Группа: {user.group_number}</p>
        </>
      ) : (
        <h1>А данных нет блин</h1>
      )} */}
    </div>
  );
}

export default ProfilePage;
