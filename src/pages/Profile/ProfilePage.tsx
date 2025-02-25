import React, { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import "./styles.scss";
import icons from "../../assets/icons";

let id: number;
let username: string;

if (
  WebApp.initDataUnsafe.user &&
  WebApp.initDataUnsafe.user.id &&
  WebApp.initDataUnsafe.user.username
) {
  id = WebApp.initDataUnsafe.user.id;
  username = WebApp.initDataUnsafe.user.username;
} else {
  id = 1192157985;
  username = "sn9skwlkr";
}

function ProfilePage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";
  const [error, setError] = useState<string>(""); // Для хранения ошибок
  interface User {
    id: number;
    username: string;
    telegram_id: number;
    name: string;
    balance: number;
    role: string;
    done_tasks: number[];
    group_number: number;
  }

  const [user, setUser] = useState<User | null>(null); // Для хранения данных о пользователе

  // Функция для отправки POST-запроса для получения токена
  async function makeRequest() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/users/telegram-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: id,
            username: username,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      const loggedIn = await response.json();
      console.log("Ответ сервера (POST):", loggedIn);
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
      const response = await fetch(`${API_BASE_URL}/auth/users/whoami`, {
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
      // console.log(data)

      if (data.status === "success") {
        //  console.log("Ответ сервера (GET):", data);
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
  useEffect(() => {
    makeRequest(); // Сначала выполняем POST-запрос
  }, []);

  useEffect(() => {
    fetchUserData(); // Запускаем GET-запрос, если user получен
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return user ? (
    <div>
      <header>
        <h1 className="header">профиль</h1>
        <img src={icons["settings"]} alt="Настройки" />
      </header>
      <div className="profile">
        <div className="profile__picture">
          <div className="profile__picture-avatar"></div>
          <h3 className="profile__subtitle">
            {user.username ? user.username : user.telegram_id}
          </h3>
        </div>
        <div className="profile__info">
          <div className="profile__info-block">
            <h3 className="profile__subtitle">фио</h3>
            <p className="profile__maintext">{user.name}</p>
          </div>
          <div className="profile__info-block">
            <h3 className="profile__subtitle">группа</h3>
            <p className="profile__maintext">{user.group_number}</p>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">баланс</p>
            <div className="profile__box">
              <img src={icons["coin_bag"]} alt="Баланс" />
              <p>{user.balance}</p>
            </div>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">выполнено заданий</p>
            <div className="profile__box">
              <p>{user.done_tasks.length}/35</p>
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
    </div>
  ) : (
    <h1>А данных нет блин</h1>
  );
}

export default ProfilePage;
